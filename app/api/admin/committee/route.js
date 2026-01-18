import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Read committee members from app-config based on environment
    const mode = getDataMode();
    const committeePath = path.join(process.cwd(), 'data', mode, 'app-config', 'committee.json');
    let members = readJsonFile(committeePath) || [];

    // Filter out any null/undefined records and ensure id exists
    members = members.filter(member => member && member.id);

    // Add default displayOrder and status if missing
    members = members.map((member, index) => ({
      ...member,
      displayOrder: member.displayOrder ?? (index + 1),
      status: member.status || 'active',
      email: member.email || '',
      phone: member.phone || ''
    }));

    // Apply filters
    if (status && status !== 'all') {
      members = members.filter(member => member.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      members = members.filter(member =>
        member.name.toLowerCase().includes(searchLower) ||
        member.designation.toLowerCase().includes(searchLower)
      );
    }

    // Sort by display order or designation
    members.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Get committee members error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch committee members' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, designation, email, phone, termStart, termEnd, displayOrder } = body;

    // Validation
    if (!name || !designation) {
      return NextResponse.json(
        { error: 'Name and designation are required' },
        { status: 400 }
      );
    }

    // Generate member ID
    const now = new Date();
    const memberId = `COM-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    // Create member object
    const member = {
      id: memberId,
      name,
      designation,
      email: email || '',
      phone: phone || '',
      flat: body.flat || '',
      term: body.term || '',
      termStart: termStart || '',
      termEnd: termEnd || '',
      responsibilities: body.responsibilities || '',
      displayOrder: displayOrder || 999,
      status: 'active',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    // Save to app-config file
    const mode = getDataMode();
    const committeePath = path.join(process.cwd(), 'data', mode, 'app-config', 'committee.json');
    const members = readJsonFile(committeePath) || [];
    members.push(member);
    
    // Write updated members array
    const appConfigDir = path.dirname(committeePath);
    if (!fs.existsSync(appConfigDir)) {
      fs.mkdirSync(appConfigDir, { recursive: true });
    }
    fs.writeFileSync(committeePath, JSON.stringify(members, null, 2), 'utf8');

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Create committee member error:', error);
    return NextResponse.json(
      { error: 'Failed to create committee member' },
      { status: 500 }
    );
  }
}
