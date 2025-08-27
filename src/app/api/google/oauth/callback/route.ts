import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode, storeTrainerTokens, testConnection } from '@/lib/google';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  try {
    const tokens = await getTokensFromCode(code);
    const trainerEmail = process.env.TRAINER_EMAIL;
    
    if (!trainerEmail) {
      throw new Error('TRAINER_EMAIL not configured');
    }

    storeTrainerTokens(trainerEmail, tokens);
    
    const isConnected = await testConnection(trainerEmail);
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Trainer successfully connected to Google Calendar',
        trainerEmail
      });
    } else {
      throw new Error('Failed to test connection after storing tokens');
    }
  } catch (error: any) {
    console.error('Error in OAuth callback:', error);
    return NextResponse.json(
      { error: 'Failed to complete authentication', details: error.message },
      { status: 500 }
    );
  }
}
