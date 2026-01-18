import { NextResponse } from 'next/server';
import { getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Read documents from app-config
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    const documents = readJsonFile(documentsPath) || [];
    const document = documents.find(doc => doc.id === id);

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ document });
  } catch (error) {
    console.error('Get document error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Read documents from app-config
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    const documents = readJsonFile(documentsPath) || [];
    const existingIndex = documents.findIndex(doc => doc.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const updated = {
      ...documents[existingIndex],
      ...body,
      id: documents[existingIndex].id,
      createdAt: documents[existingIndex].createdAt,
      updatedAt: new Date().toISOString()
    };

    documents[existingIndex] = updated;
    fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2), 'utf8');

    return NextResponse.json({ success: true, document: updated });
  } catch (error) {
    console.error('Update document error:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Read documents from app-config
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    const documents = readJsonFile(documentsPath) || [];
    const existingIndex = documents.findIndex(doc => doc.id === id);
    
    if (existingIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    const updated = {
      ...documents[existingIndex],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    documents[existingIndex] = updated;
    fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2), 'utf8');

    return NextResponse.json({ success: true, document: updated });
  } catch (error) {
    console.error('Archive document error:', error);
    return NextResponse.json(
      { error: 'Failed to archive document' },
      { status: 500 }
    );
  }
}
