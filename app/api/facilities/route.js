import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import path from 'path';

export async function GET(request) {
  try {
    const mode = getDataMode();
    const facilitiesPath = path.join(process.cwd(), 'data', mode, 'facilities.json');
    const facilities = readJsonFile(facilitiesPath);

    if (!facilities) {
      return NextResponse.json(
        { error: 'Facilities data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(facilities);
  } catch (error) {
    console.error('Get facilities error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch facilities data' },
      { status: 500 }
    );
  }
}
