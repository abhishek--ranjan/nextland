import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Read events from app-config
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    const events = readJsonFile(eventsPath) || [];
    const event = events.find(evt => evt.id === id);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Read events from app-config
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    const events = readJsonFile(eventsPath) || [];
    const existingIndex = events.findIndex(evt => evt.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const updated = {
      ...events[existingIndex],
      ...body,
      id: events[existingIndex].id,
      createdAt: events[existingIndex].createdAt,
      updatedAt: new Date().toISOString()
    };

    events[existingIndex] = updated;
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf8');

    return NextResponse.json({ success: true, event: updated });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Read events from app-config
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    const events = readJsonFile(eventsPath) || [];
    const existingIndex = events.findIndex(evt => evt.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    const updated = {
      ...events[existingIndex],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    events[existingIndex] = updated;
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf8');

    return NextResponse.json({ success: true, event: updated });
  } catch (error) {
    console.error('Archive event error:', error);
    return NextResponse.json(
      { error: 'Failed to archive event' },
      { status: 500 }
    );
  }
}
