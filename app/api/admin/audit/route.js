import { NextResponse } from 'next/server';
import { validateSession } from '@/utils/auth';
import { getLogsByFilter, getRecentLogs } from '@/utils/auditLog';

// GET - Retrieve audit logs with filters
export async function GET(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    const filters = {
      user: searchParams.get('user') || undefined,
      action: searchParams.get('action') || undefined,
      entity: searchParams.get('entity') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      limit: parseInt(searchParams.get('limit') || '100')
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const logs = Object.keys(filters).length > 1 
      ? getLogsByFilter(filters)
      : getRecentLogs(filters.limit || 100);

    // Get unique users and actions for filter options
    const uniqueUsers = [...new Set(logs.map(log => log.user.email))];
    const uniqueActions = [...new Set(logs.map(log => log.action))];
    const uniqueEntities = [...new Set(logs.map(log => log.entity))];

    return NextResponse.json({
      logs,
      filters: {
        users: uniqueUsers,
        actions: uniqueActions,
        entities: uniqueEntities
      },
      total: logs.length
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
