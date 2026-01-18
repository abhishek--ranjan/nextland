import { NextResponse } from 'next/server';
import { getAllRecords, createRecord, createFromSchema } from '@/utils/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // active, draft, archived
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let notices = getAllRecords('notices');

    // Filter out any null/undefined records and ensure id exists
    notices = notices.filter(notice => notice && notice.id);

    // Add default status for notices that don't have one
    notices = notices.map(notice => ({
      ...notice,
      status: notice.status || 'active'
    }));

    // Filter by status
    if (status) {
      notices = notices.filter(notice => 
        notice.status?.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by category
    if (category) {
      notices = notices.filter(notice => 
        notice.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      notices = notices.filter(notice => 
        notice.title?.toLowerCase().includes(searchLower) ||
        notice.content?.toLowerCase().includes(searchLower) ||
        notice.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by date (newest first)
    notices.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({ notices });
  } catch (error) {
    console.error('Get notices error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, content, description, pdf, attachments } = body;

    // Validate required fields
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    // Generate notice ID
    const noticeId = `NOT-${new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '')}`;
    
    // Create notice from schema
    const notice = createFromSchema('notice', {
      id: noticeId,
      title,
      category,
      content: content || '',
      description: description || '',
      date: new Date().toISOString().split('T')[0],
      pdf: pdf || null,
      attachments: attachments || [],
      status: body.status || 'draft',
      createdBy: 'admin', // TODO: Get from session
    });

    // Save using dataStore
    await createRecord('notices', noticeId, notice);

    return NextResponse.json({ success: true, notice });
  } catch (error) {
    console.error('Create notice error:', error);
    return NextResponse.json(
      { error: 'Failed to create notice' },
      { status: 500 }
    );
  }
}
