import { NextResponse } from 'next/server';
import { getContact, updateContact, createFromSchema } from '@/utils/dataStore';
import { validateSession } from '@/utils/auth';

// GET - Retrieve contact information
export async function GET(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contact = getContact();

    // Return default structure if no contact data exists
    if (!contact) {
      return NextResponse.json({
        officeAddress: '',
        officePhone: '',
        officeEmail: '',
        emergencyContact: '',
        emergencyPhone: '',
        mapUrl: '',
        officeHours: '',
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error reading contact:', error);
    
    // Return default structure on error
    return NextResponse.json({
      officeAddress: '',
      officePhone: '',
      officeEmail: '',
      emergencyContact: '',
      emergencyPhone: '',
      mapUrl: '',
      officeHours: '',
      updatedAt: new Date().toISOString()
    });
  }
}

// PUT - Update contact information
export async function PUT(request) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validation
    if (!body.officeAddress || !body.officeEmail) {
      return NextResponse.json(
        { error: 'Office address and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.officeEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contactData = createFromSchema('contact', {
      officeAddress: body.officeAddress,
      officePhone: body.officePhone,
      officeEmail: body.officeEmail,
      emergencyContact: body.emergencyContact,
      emergencyPhone: body.emergencyPhone,
      mapUrl: body.mapUrl,
      officeHours: body.officeHours,
      updatedBy: session.username
    });

    await updateContact(contactData);

    return NextResponse.json({
      success: true,
      message: 'Contact information updated successfully',
      data: contactData
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact information' },
      { status: 500 }
    );
  }
}
