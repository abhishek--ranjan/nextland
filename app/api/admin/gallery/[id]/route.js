import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile, writeJsonFile } from '@/utils/dataHelper';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'gallery.json');
    const data = readJsonFile(filePath);
    const albums = Array.isArray(data) ? data : data.albums || [];
    
    const album = albums.find(a => a.id === id);

    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ album });
  } catch (error) {
    console.error('Get album error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'gallery.json');
    const data = readJsonFile(filePath);
    const albums = Array.isArray(data) ? data : data.albums || [];

    const index = albums.findIndex(a => a.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    const updated = {
      ...albums[index],
      ...body,
      id: albums[index].id,
      createdAt: albums[index].createdAt,
      createdBy: albums[index].createdBy,
      updatedAt: new Date().toISOString()
    };

    albums[index] = updated;
    writeJsonFile(filePath, albums);

    return NextResponse.json({ success: true, album: updated });
  } catch (error) {
    console.error('Update album error:', error);
    return NextResponse.json(
      { error: 'Failed to update album' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'gallery.json');
    const data = readJsonFile(filePath);
    const albums = Array.isArray(data) ? data : data.albums || [];
    
    const index = albums.findIndex(a => a.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }
    
    const updated = {
      ...albums[index],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    albums[index] = updated;
    writeJsonFile(filePath, albums);

    return NextResponse.json({ success: true, album: updated });
  } catch (error) {
    console.error('Archive album error:', error);
    return NextResponse.json(
      { error: 'Failed to archive album' },
      { status: 500 }
    );
  }
}
