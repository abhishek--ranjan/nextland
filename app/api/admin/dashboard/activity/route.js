import { NextResponse } from 'next/server';
import { getRecentLogs } from '@/utils/auditLog';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const logs = getRecentLogs(limit);

    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Activity logs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}
