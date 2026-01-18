import { NextResponse } from 'next/server';
import { getAllRecords, createRecord, createFromSchema } from '@/utils/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let albums = getAllRecords('gallery');

    // Filter out any null/undefined records and ensure id exists
    albums = albums.filter(album => album && album.id);

    // Add default status for albums that don't have one
    albums = albums.map(album => ({
      ...album,
      status: album.status || 'active'
    }));

    // Apply filters
    if (status && status !== 'all') {
      albums = albums.filter(album => album.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      albums = albums.filter(album =>
        album.title?.toLowerCase().includes(searchLower) ||
        (album.description && album.description.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (newest first)
    albums.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({ albums });
  } catch (error) {
    console.error('Get albums error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, date } = body;

    // Validation
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Generate album ID
    const now = new Date();
    const albumId = `GAL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    // Create album from schema
    const album = createFromSchema('gallery', {
      id: albumId,
      title,
      description: description || '',
      date: date || now.toISOString().split('T')[0],
      photos: [],
      coverImage: null,
      status: 'active'
    });

    // Save using dataStore
    await createRecord('gallery', albumId, album);

    return NextResponse.json({ success: true, album });
  } catch (error) {
    console.error('Create album error:', error);
    return NextResponse.json(
      { error: 'Failed to create album' },
      { status: 500 }
    );
  }
}
