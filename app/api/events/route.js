import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDataPath } from '@/utils/dataHelper';

export async function GET() {
  try {
    const eventsPath = path.join(getDataPath('events'), 'master.json');
    
    if (!fs.existsSync(eventsPath)) {
      return NextResponse.json([]);
    }
    
    const masterData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    
    // Read individual event files
    const events = [];
    for (const item of masterData) {
      const eventPath = path.join(getDataPath('events'), `${item.id}.json`);
      if (fs.existsSync(eventPath)) {
        const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
        events.push(eventData);
      }
    }
    
    // Sort by date descending (most recent first) and limit to 4
    const sortedEvents = events
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);
    
    return NextResponse.json(sortedEvents);
  } catch (error) {
    console.error('Error reading events:', error);
    return NextResponse.json([]);
  }
}
