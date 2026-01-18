import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    // Read documents from app-config
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    const documents = readJsonFile(documentsPath) || [];
    const documentIndex = documents.findIndex(doc => doc.id === id);

    if (documentIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const document = documents[documentIndex];
    
    if (document.status !== 'archived') {
      return NextResponse.json(
        { error: 'Document is not archived' },
        { status: 400 }
      );
    }

    const restoredDoc = {
      ...document,
      status: 'active',
      archivedAt: undefined,
      updatedAt: new Date().toISOString()
    };

    documents[documentIndex] = restoredDoc;
    fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2), 'utf8');

    return NextResponse.json({ success: true, document: restoredDoc });
  } catch (error) {
    console.error('Restore document error:', error);
    return NextResponse.json(
      { error: 'Failed to restore document' },
      { status: 500 }
    );
  }
}
