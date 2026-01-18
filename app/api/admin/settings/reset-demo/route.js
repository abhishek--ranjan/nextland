import { NextResponse } from 'next/server';
import { validateSession } from '@/utils/auth';
import { resetAllDemoData, getResetStats } from '@/utils/resetDemoData';

// POST - Reset all demo data (Super admin only)
export async function POST(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Super admin validation
    // For demo purposes, username 'admin' is considered super admin
    // In production, use proper role-based access control
    if (session.username !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Super admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Require explicit confirmation
    if (!body.confirm || body.confirmText !== 'RESET ALL DATA') {
      return NextResponse.json(
        { error: 'Confirmation required. Please type "RESET ALL DATA" to confirm.' },
        { status: 400 }
      );
    }

    // Get stats before reset
    const statsBefore = await getResetStats();

    // Perform reset
    const result = await resetAllDemoData();

    return NextResponse.json({
      success: true,
      message: 'All demo data has been reset to defaults',
      statsBefore,
      timestamp: result.timestamp,
      performedBy: session.username
    });
  } catch (error) {
    console.error('Error resetting demo data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to reset demo data' },
      { status: 500 }
    );
  }
}

// GET - Get current data stats
export async function GET(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Super admin only
    if (session.username !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Super admin access required' },
        { status: 403 }
      );
    }

    const stats = await getResetStats();

    return NextResponse.json({
      stats,
      isSuperAdmin: true
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json(
      { error: 'Failed to get statistics' },
      { status: 500 }
    );
  }
}
