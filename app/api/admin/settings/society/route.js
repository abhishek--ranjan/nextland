import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { validateSession } from '@/utils/auth';
import { getDataPath } from '@/utils/dataHelper';

// GET - Retrieve settings
export async function GET(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settingsPath = path.join(getDataPath(), 'settings.json');
    const data = await readFile(settingsPath, 'utf-8');
    const settings = JSON.parse(data);

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json(
      { error: 'Failed to load settings' },
      { status: 500 }
    );
  }
}

// PUT - Update society settings
export async function PUT(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validation
    if (!body.society || !body.society.name || !body.society.shortName) {
      return NextResponse.json(
        { error: 'Society name and short name are required' },
        { status: 400 }
      );
    }

    // Read current settings
    const settingsPath = path.join(getDataPath(), 'settings.json');
    const data = await readFile(settingsPath, 'utf-8');
    const currentSettings = JSON.parse(data);

    // Update only society and branding sections (preserve system settings)
    const updatedSettings = {
      ...currentSettings,
      society: {
        ...currentSettings.society,
        ...body.society
      },
      branding: body.branding || currentSettings.branding,
      features: body.features || currentSettings.features,
      updatedAt: new Date().toISOString(),
      updatedBy: session.username
    };

    await writeFile(settingsPath, JSON.stringify(updatedSettings, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
