import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDataPath } from '@/utils/dataHelper';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');

    // Read master.json
    const masterPath = path.join(getDataPath('documents'), 'master.json');
    const masterData = fs.readFileSync(masterPath, 'utf8');
    const masterRecords = JSON.parse(masterData);

    // Read full details for each document
    let documents = masterRecords.map(doc => {
      const docPath = path.join(getDataPath('documents'), `${doc.id}.json`);
      const docData = fs.readFileSync(docPath, 'utf8');
      return JSON.parse(docData);
    });

    // Filter by category
    if (category && category !== 'all') {
      documents = documents.filter(doc => doc.category === category);
    }

    // Filter by year
    if (year && year !== 'all') {
      documents = documents.filter(doc => {
        const docYear = new Date(doc.date).getFullYear().toString();
        return docYear === year;
      });
    }

    // Sort by date (newest first)
    documents.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
