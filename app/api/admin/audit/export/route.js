import { NextResponse } from 'next/server';
import { validateSession } from '@/utils/auth';
import { getLogsByFilter } from '@/utils/auditLog';
import { getActionLabel } from '@/utils/auditLogClient';

// GET - Export audit logs to CSV
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
      limit: 10000 // Max export limit
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const logs = getLogsByFilter(filters);

    // Generate CSV
    const csvHeader = 'Timestamp,User,Email,Action,Entity,Entity ID,Details\n';
    const csvRows = logs.map(log => {
      const timestamp = new Date(log.timestamp).toLocaleString();
      const user = log.user.name || log.user.email;
      const email = log.user.email;
      const action = getActionLabel(log.action);
      const entity = log.entity.charAt(0).toUpperCase() + log.entity.slice(1);
      const entityId = log.entityId || '-';
      const details = JSON.stringify(log.details).replace(/"/g, '""');
      
      return `"${timestamp}","${user}","${email}","${action}","${entity}","${entityId}","${details}"`;
    }).join('\n');

    const csv = csvHeader + csvRows;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="audit-log-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Error exporting audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to export audit logs' },
      { status: 500 }
    );
  }
}
