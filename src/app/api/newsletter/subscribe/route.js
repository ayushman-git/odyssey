import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';

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

    // Send welcome email
    const emailResult = await sendWelcomeEmail(email.toLowerCase().trim());
    
    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Note: We don't fail the subscription if email fails
      // The user is still successfully subscribed
    } else {
      console.log(`Welcome email sent successfully to ${email}. Articles included: ${emailResult.articlesIncluded}`);
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        subscriber: data[0],
        email: {
          sent: emailResult.success,
          articlesIncluded: emailResult.articlesIncluded || 0,
          generated: emailResult.emailGenerated || false
        }
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
