import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    // Read events from app-config
    const mode = getDataMode();
    const eventsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'events.json');
    const events = readJsonFile(eventsPath) || [];
    const eventIndex = events.findIndex(evt => evt.id === id);

    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const event = events[eventIndex];
    
    if (event.status !== 'archived') {
      return NextResponse.json(
        { error: 'Event is not archived' },
        { status: 400 }
      );
    }

    const restoredEvent = {
      ...event,
      status: 'published',
      archivedAt: undefined,
      updatedAt: new Date().toISOString()
    };

    events[eventIndex] = restoredEvent;
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf8');

    return NextResponse.json({ success: true, event: restoredEvent });
  } catch (error) {
    console.error('Restore event error:', error);
    return NextResponse.json(
      { error: 'Failed to restore event' },
      { status: 500 }
    );
  }
}
