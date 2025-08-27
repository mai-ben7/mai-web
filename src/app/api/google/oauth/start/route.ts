import { NextRequest, NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google';

export async function GET(request: NextRequest) {
  try {
    const authUrl = await getAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication URL' },
      { status: 500 }
    );
  }
}
