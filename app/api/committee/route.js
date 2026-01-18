import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getDataPath } from '@/utils/dataHelper';

export async function GET() {
  try {
    const dataDir = getDataPath('committee');
    const masterFilePath = path.join(dataDir, 'master.json');
    
    // Read master file
    const masterData = await fs.readFile(masterFilePath, 'utf8');
    const committeeIndex = JSON.parse(masterData);
    
    // Read individual committee member files
    const committeeMembers = await Promise.all(
      committeeIndex.map(async (member) => {
        const memberFilePath = path.join(dataDir, `${member.id}.json`);
        const memberData = await fs.readFile(memberFilePath, 'utf8');
        return JSON.parse(memberData);
      })
    );
    
    // Sort by designation hierarchy
    const designationOrder = [
      'President',
      'Vice President',
      'Secretary',
      'Joint Secretary',
      'Treasurer',
      'Member'
    ];
    
    committeeMembers.sort((a, b) => {
      const aIndex = designationOrder.indexOf(a.designation);
      const bIndex = designationOrder.indexOf(b.designation);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
    
    return NextResponse.json(committeeMembers);
  } catch (error) {
    console.error('Error reading committee data:', error);
    return NextResponse.json({ error: 'Failed to load committee data' }, { status: 500 });
  }
}
