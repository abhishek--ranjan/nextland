import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Read gallery albums from app-config
    const mode = getDataMode();
    const galleryPath = path.join(process.cwd(), 'data', mode, 'app-config', 'gallery.json');
    const albums = readJsonFile(galleryPath) || [];
    const album = albums.find(a => a.id === id);
    
    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    );
  }
}
