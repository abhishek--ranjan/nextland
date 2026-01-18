import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile, writeJsonFile } from '@/utils/dataHelper';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'notices.json');
    const data = readJsonFile(filePath);
    const notices = Array.isArray(data) ? data : data.notices || [];
    
    const notice = notices.find(n => n.id === id);

    if (!notice) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ notice });
  } catch (error) {
    console.error('Get notice error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notice' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'notices.json');
    const data = readJsonFile(filePath);
    const notices = Array.isArray(data) ? data : data.notices || [];

    const index = notices.findIndex(n => n.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    const updatedNotice = {
      ...notices[index],
      ...body,
      id: notices[index].id,
      createdAt: notices[index].createdAt,
      createdBy: notices[index].createdBy,
      updatedAt: new Date().toISOString()
    };

    notices[index] = updatedNotice;
    writeJsonFile(filePath, notices);

    return NextResponse.json({ success: true, notice: updatedNotice });
  } catch (error) {
    console.error('Update notice error:', error);
    return NextResponse.json(
      { error: 'Failed to update notice' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const mode = getDataMode();
    const filePath = path.join(process.cwd(), 'data', mode, 'app-config', 'notices.json');
    const data = readJsonFile(filePath);
    const notices = Array.isArray(data) ? data : data.notices || [];
    
    const index = notices.findIndex(n => n.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }
    
    // Archive instead of delete
    const updatedNotice = {
      ...notices[index],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    notices[index] = updatedNotice;
    writeJsonFile(filePath, notices);

    return NextResponse.json({ success: true, notice: updatedNotice });
  } catch (error) {
    console.error('Archive notice error:', error);
    return NextResponse.json(
      { error: 'Failed to archive notice' },
      { status: 500 }
    );
  }
}
