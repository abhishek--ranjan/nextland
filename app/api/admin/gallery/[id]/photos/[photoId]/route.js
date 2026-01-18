import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request, { params }) {
  try {
    const { id, photoId } = await params;
    const galleryDir = path.join(process.cwd(), 'data', 'demo', 'gallery');
    const albumPath = path.join(galleryDir, `${id}.json`);

    if (!fs.existsSync(albumPath)) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    const album = JSON.parse(fs.readFileSync(albumPath, 'utf-8'));
    
    // Find and remove photo
    const photoIndex = album.photos.findIndex(p => p.id === photoId);
    if (photoIndex === -1) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    const photo = album.photos[photoIndex];
    
    // Delete physical file
    const photoPath = path.join(process.cwd(), 'public', photo.path);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    // Remove from album
    album.photos.splice(photoIndex, 1);

    // Update cover photo if it was deleted
    if (album.coverPhoto === photo.path) {
      album.coverPhoto = album.photos.length > 0 ? album.photos[0].path : null;
    }

    album.updatedAt = new Date().toISOString();
    fs.writeFileSync(albumPath, JSON.stringify(album, null, 2));

    return NextResponse.json({ success: true, album });
  } catch (error) {
    console.error('Delete photo error:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
