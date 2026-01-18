import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const timeFilter = searchParams.get('time'); // 'upcoming' or 'past'

    // Read events from app-config based on environment
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    let events = readJsonFile(eventsPath) || [];

    // Filter out any null/undefined records and ensure id exists
    events = events.filter(event => event && event.id);

    // Add default status for events that don't have one
    events = events.map(event => ({
      ...event,
      status: event.status || 'published',
      date: event.date || event.createdAt
    }));

    // Apply filters
    if (status && status !== 'all') {
      events = events.filter(event => event.status === status);
    }

    if (category && category !== 'all') {
      events = events.filter(event => event.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower))
      );
    }

    // Time filter (upcoming vs past)
    if (timeFilter === 'upcoming') {
      const now = new Date();
      events = events.filter(event => new Date(event.date) >= now);
    } else if (timeFilter === 'past') {
      const now = new Date();
      events = events.filter(event => new Date(event.date) < now);
    }

    // Sort by date (upcoming first, then past)
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');
    const featured = formData.get('featured') === 'true';
    const image = formData.get('image');

    // Validation
    if (!title || !category || !date) {
      return NextResponse.json(
        { error: 'Title, category, and date are required' },
        { status: 400 }
      );
    }

    // Generate event ID
    const now = new Date();
    const eventId = `EVT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    let imagePath = null;

    // Handle image upload if provided
    if (image && image.size > 0) {
      // Validate image type
      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Only image files are allowed' },
          { status: 400 }
        );
      }

      // Validate image size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (image.size > maxSize) {
        return NextResponse.json(
          { error: 'Image size must be less than 5MB' },
          { status: 400 }
        );
      }

      // Save image to public/images/events
      const publicImagesDir = path.join(process.cwd(), 'public', 'images', 'events');
      if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
      }

      const ext = image.name.split('.').pop();
      const fileName = `${eventId}.${ext}`;
      const filePath = path.join(publicImagesDir, fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/images/events/${fileName}`;
    }

    // Create event object
    const event = {
      id: eventId,
      title,
      category,
      description: description || '',
      date,
      time: time || '',
      location: location || '',
      featured: featured || false,
      imagePath: imagePath,
      status: 'published',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    // Save to app-config file
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    const events = readJsonFile(eventsPath) || [];
    events.push(event);
    
    // Write updated events array
    const appConfigDir = path.dirname(eventsPath);
    if (!fs.existsSync(appConfigDir)) {
      fs.mkdirSync(appConfigDir, { recursive: true });
    }
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf8');

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
