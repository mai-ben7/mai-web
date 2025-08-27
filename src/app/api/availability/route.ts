import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/google';
import { SERVICES } from '@/config/services';

console.log('[slots] impl=2.2 route wired to google.ts getAvailableSlots');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const serviceId = searchParams.get('service');

  if (!date) {
    return NextResponse.json(
      { error: 'Date parameter is required' },
      { status: 400 }
    );
  }

  if (!serviceId) {
    return NextResponse.json(
      { error: 'Service parameter is required' },
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

  try {
    const serviceConfig = SERVICES.find(s => s.id === serviceId);
    if (!serviceConfig) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    console.log('[slots] Calling getAvailableSlots with service config:', serviceConfig);
    const slots = await getAvailableSlots(trainerEmail, date, serviceConfig);

    return NextResponse.json({ slots });
  } catch (error: any) {
    console.error('Error getting available slots:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get available slots' },
      { status: 500 }
    );
  }
}
