import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email, userAgent } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Extract source from Referer header
    const referer = request.headers.get('referer');
    let source = 'unknown';
    
    if (referer) {
      try {
        const url = new URL(referer);
        source = url.pathname || '/';
      } catch (error) {
        console.warn('Failed to parse referer URL:', referer);
        source = 'unknown';
      }
    }

    // Insert into newsletter_subscribers table
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase().trim(),
          source: source,
          user_agent: userAgent || 'unknown',
        }
      ])
      .select();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505' || error.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Email already subscribed', type: 'duplicate' },
          { status: 409 }
        );
      } else {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
          { error: 'Failed to subscribe' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        subscriber: data[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
