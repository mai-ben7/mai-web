import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/google';
import { SERVICES } from '@/config/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      note,
      start,
      end,
      service
    } = body;

    // Validate required fields
    if (!name || !email || !start || !end || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trainerEmail = process.env.TRAINER_EMAIL;
    if (!trainerEmail) {
      return NextResponse.json(
        { error: 'Trainer email not configured' },
        { status: 500 }
      );
    }

    const serviceConfig = SERVICES.find(s => s.id === service);
    if (!serviceConfig) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const result = await createBooking(
      trainerEmail,
      name,
      email,
      phone || '',
      start,
      end,
      note || '',
      serviceConfig
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
