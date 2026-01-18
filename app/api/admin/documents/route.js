import { NextResponse } from 'next/server';
import { getAllRecords, createRecord, createFromSchema } from '@/utils/dataStore';
import { getDataPath, getDataMode, readJsonFile } from '@/utils/dataHelper';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Read documents from app-config based on environment
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    let documents = readJsonFile(documentsPath) || [];

    // Filter out any null/undefined records and ensure id exists
    documents = documents.filter(doc => doc && doc.id);

    // Map fields for compatibility and ensure date field exists
    documents = documents.map(doc => ({
      ...doc,
      date: doc.date || doc.uploadDate || doc.createdAt,
      fileSize: doc.fileSize || doc.size || 0,
      status: doc.status || 'active'
    }));

    // Apply filters
    if (status && status !== 'all') {
      documents = documents.filter(doc => doc.status === status);
    }

    if (category && category !== 'all') {
      documents = documents.filter(doc => doc.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      documents = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchLower) ||
        (doc.description && doc.description.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (newest first)
    documents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
    const file = formData.get('file');

    // Validation
    if (!title || !category || !file) {
      return NextResponse.json(
        { error: 'Title, category, and file are required' },
        { status: 400 }
      );
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Generate document ID
    const now = new Date();
    const docId = `DOC-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    // Save file to public/documents
    const publicDocsDir = path.join(process.cwd(), 'public', 'documents');
    if (!fs.existsSync(publicDocsDir)) {
      fs.mkdirSync(publicDocsDir, { recursive: true });
    }

    const fileName = `${docId}.pdf`;
    const filePath = path.join(publicDocsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Create document object
    const document = {
      id: docId,
      title,
      category,
      description: description || '',
      date: date || now.toISOString().split('T')[0],
      filePath: `/documents/${fileName}`,
      fileSize: file.size,
      uploadDate: now.toISOString().split('T')[0],
      status: 'active',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    // Save to app-config file
    const mode = getDataMode();
    const documentsPath = path.join(process.cwd(), 'data', mode, 'app-config', 'documents.json');
    const documents = readJsonFile(documentsPath) || [];
    documents.push(document);
    
    // Write updated documents array
    const appConfigDir = path.dirname(documentsPath);
    if (!fs.existsSync(appConfigDir)) {
      fs.mkdirSync(appConfigDir, { recursive: true });
    }
    fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2), 'utf8');

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('Upload document error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}
