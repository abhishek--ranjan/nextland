import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Read committee members from app-config
    const mode = getDataMode();
    const committeePath = path.join(process.cwd(), 'data', mode, 'app-config', 'committee.json');
    const members = readJsonFile(committeePath) || [];
    const member = members.find(m => m.id === id);

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Get member error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Read committee members from app-config
    const mode = getDataMode();
    const committeePath = path.join(process.cwd(), 'data', mode, 'app-config', 'committee.json');
    const members = readJsonFile(committeePath) || [];
    const existingIndex = members.findIndex(m => m.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    const updated = {
      ...members[existingIndex],
      ...body,
      id: members[existingIndex].id,
      createdAt: members[existingIndex].createdAt,
      updatedAt: new Date().toISOString()
    };

    members[existingIndex] = updated;
    fs.writeFileSync(committeePath, JSON.stringify(members, null, 2), 'utf8');

    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    console.error('Update member error:', error);
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Read committee members from app-config
    const mode = getDataMode();
    const committeePath = path.join(process.cwd(), 'data', mode, 'app-config', 'committee.json');
    const members = readJsonFile(committeePath) || [];
    const existingIndex = members.findIndex(m => m.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }
    
    const updated = {
      ...members[existingIndex],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    members[existingIndex] = updated;
    fs.writeFileSync(committeePath, JSON.stringify(members, null, 2), 'utf8');

    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    console.error('Archive member error:', error);
    return NextResponse.json(
      { error: 'Failed to archive member' },
      { status: 500 }
    );
  }
}
