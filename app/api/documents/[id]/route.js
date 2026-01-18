import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Get environment from config
    const configPath = path.join(process.cwd(), 'data', 'config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    const env = config.environment || 'demo';

    // Read document details
    const docPath = path.join(process.cwd(), 'data', env, 'documents', `${id}.json`);
    
    if (!fs.existsSync(docPath)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const docData = fs.readFileSync(docPath, 'utf8');
    const document = JSON.parse(docData);

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}
