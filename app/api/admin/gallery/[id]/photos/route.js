import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const files = formData.getAll('photos');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No photos provided' },
        { status: 400 }
      );
    }

    const galleryDir = path.join(process.cwd(), 'data', 'demo', 'gallery');
    const albumPath = path.join(galleryDir, `${id}.json`);

    if (!fs.existsSync(albumPath)) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }

    const album = JSON.parse(fs.readFileSync(albumPath, 'utf-8'));

    // Create photos directory for this album
    const photosDir = path.join(process.cwd(), 'public', 'images', 'gallery', id);
    if (!fs.existsSync(photosDir)) {
      fs.mkdirSync(photosDir, { recursive: true });
    }

    const uploadedPhotos = [];

    for (const file of files) {
      // Validate image type
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      // Validate image size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        continue; // Skip files that are too large
      }

      // Generate unique photo ID
      const photoId = `${id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const ext = file.name.split('.').pop();
      const fileName = `${photoId}.${ext}`;
      const filePath = path.join(photosDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      const photo = {
        id: photoId,
        path: `/images/gallery/${id}/${fileName}`,
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString()
      };

      uploadedPhotos.push(photo);
      album.photos.push(photo);
    }

    // Set first photo as cover if no cover exists
    if (!album.coverPhoto && uploadedPhotos.length > 0) {
      album.coverPhoto = uploadedPhotos[0].path;
    }

    album.updatedAt = new Date().toISOString();
    fs.writeFileSync(albumPath, JSON.stringify(album, null, 2));

    return NextResponse.json({ 
      success: true, 
      album,
      uploadedCount: uploadedPhotos.length 
    });
  } catch (error) {
    console.error('Upload photos error:', error);
    return NextResponse.json(
      { error: 'Failed to upload photos' },
      { status: 500 }
    );
  }
}
