import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDataPath } from '@/utils/dataHelper';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');

    // Read master file
    const masterPath = path.join(getDataPath('notices'), 'notice-master.json');
    const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));

    // Read individual notice files
    const notices = [];
    for (const notice of masterData) {
      const noticePath = path.join(getDataPath('notices'), `${notice.id}.json`);
      if (fs.existsSync(noticePath)) {
        const noticeData = JSON.parse(fs.readFileSync(noticePath, 'utf-8'));
        notices.push(noticeData);
      }
    }

    // Filter by category
    let filteredNotices = notices;
    if (category && category !== 'all') {
      filteredNotices = filteredNotices.filter(n => n.category === category);
    }

    // Filter by year
    if (year && year !== 'all') {
      filteredNotices = filteredNotices.filter(n => n.date.startsWith(year));
    }

    // Sort by date (newest first)
    filteredNotices.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(filteredNotices);
  } catch (error) {
    console.error('Error reading notices:', error);
    return NextResponse.json({ error: 'Failed to load notices' }, { status: 500 });
  }
}
