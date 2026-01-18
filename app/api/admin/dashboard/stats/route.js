import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const demoDir = path.join(dataDir, 'demo');

    // Count files in different categories
    const noticesDir = path.join(demoDir, 'notices');
    const eventsDir = path.join(demoDir, 'events');
    const documentsDir = path.join(demoDir, 'documents');
    const galleryDir = path.join(demoDir, 'gallery');

    const stats = {
      notices: {
        total: 0,
        active: 0
      },
      events: {
        total: 0,
        upcoming: 0
      },
      documents: {
        total: 0
      },
      gallery: {
        albums: 0,
        photos: 0
      }
    };

    // Count notices
    if (fs.existsSync(noticesDir)) {
      const noticeFiles = fs.readdirSync(noticesDir).filter(f => f.endsWith('.json') && f !== 'master.json');
      stats.notices.total = noticeFiles.length;
      
      // Count active notices
      noticeFiles.forEach(file => {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(noticesDir, file), 'utf-8'));
          if (content.status === 'active' || content.status === 'Active') {
            stats.notices.active++;
          }
        } catch (e) {}
      });
    }

    // Count events
    if (fs.existsSync(eventsDir)) {
      const eventFiles = fs.readdirSync(eventsDir).filter(f => f.endsWith('.json') && f !== 'master.json');
      stats.events.total = eventFiles.length;
      
      // Count upcoming events
      const now = new Date();
      eventFiles.forEach(file => {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(eventsDir, file), 'utf-8'));
          if (new Date(content.date) > now) {
            stats.events.upcoming++;
          }
        } catch (e) {}
      });
    }

    // Count documents
    if (fs.existsSync(documentsDir)) {
      const docFiles = fs.readdirSync(documentsDir).filter(f => f.endsWith('.json') && f !== 'master.json');
      stats.documents.total = docFiles.length;
    }

    // Count gallery albums and photos
    if (fs.existsSync(galleryDir)) {
      const albumFiles = fs.readdirSync(galleryDir).filter(f => f.endsWith('.json') && f !== 'master.json');
      stats.gallery.albums = albumFiles.length;
      
      // Count total photos
      albumFiles.forEach(file => {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(galleryDir, file), 'utf-8'));
          if (content.photos && Array.isArray(content.photos)) {
            stats.gallery.photos += content.photos.length;
          }
        } catch (e) {}
      });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
