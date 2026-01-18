import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const noticesDir = path.join(process.cwd(), 'data', 'demo', 'notices');
    const filePath = path.join(noticesDir, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    const notice = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    if (notice.status !== 'archived') {
      return NextResponse.json(
        { error: 'Notice is not archived' },
        { status: 400 }
      );
    }

    const restoredNotice = {
      ...notice,
      status: 'draft',
      archivedAt: undefined,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(restoredNotice, null, 2));

    return NextResponse.json({ success: true, notice: restoredNotice });
  } catch (error) {
    console.error('Restore notice error:', error);
    return NextResponse.json(
      { error: 'Failed to restore notice' },
      { status: 500 }
    );
  }
}
