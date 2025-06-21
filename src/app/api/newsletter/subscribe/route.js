import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { email, userAgent } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
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

    // Check if email previously bounced or already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, bounced, bounced_at')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    // Handle existing subscriber
    if (existingSubscriber) {
      if (existingSubscriber.bounced) {
        // Reset bounce status for resubscription
        const { data: updatedData, error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            bounced: false,
            bounced_at: null,
            bounce_reason: null,
            source: source,
            user_agent: userAgent || 'unknown',
            created_at: new Date().toISOString() // Update subscription time
          })
          .eq('email', email.toLowerCase().trim())
          .select();

        if (updateError) {
          console.error('Error updating bounced subscriber:', updateError);
          return NextResponse.json(
            { error: 'Failed to resubscribe' },
            { status: 500 }
          );
        }

        // Send welcome email for resubscribed user
        const emailResult = await sendWelcomeEmail(email.toLowerCase().trim());
        
        if (!emailResult.success) {
          console.error('Failed to send welcome email to resubscribed user:', emailResult.error);
        }

        return NextResponse.json(
          { 
            message: 'Successfully resubscribed to newsletter',
            subscriber: updatedData[0],
            emailSent: emailResult.success,
            resubscribed: true
          },
          { status: 200 }
        );
      } else {
        // Already subscribed and not bounced
        return NextResponse.json(
          { error: 'Email already subscribed', type: 'duplicate' },
          { status: 409 }
        );
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
