import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');

    // Read gallery albums from app-config based on environment
    const mode = getDataMode();
    const galleryPath = path.join(process.cwd(), 'data', mode, 'app-config', 'gallery.json');
    let albums = readJsonFile(galleryPath) || [];

    // Filter out null/undefined albums
    albums = albums.filter(album => album && album.id);

    // Ensure default fields
    albums = albums.map(album => ({
      ...album,
      status: album.status || 'active',
      category: album.category || 'general',
      photos: album.photos || []
    }));

    // Filter by category
    if (category && category !== 'all') {
      albums = albums.filter(album => album.category === category);
    }

    // Filter by year
    if (year && year !== 'all') {
      albums = albums.filter(album => {
        const albumYear = new Date(album.date).getFullYear().toString();
        return albumYear === year;
      });
    }

    // Sort by date (newest first)
    albums.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}
