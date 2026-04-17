import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return false;
  }

  if (limit.count >= 5) { // Max 5 requests per minute
    return true;
  }

  limit.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Try to save to Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      // Use Service Role key if available (real key), otherwise fallback to Anon Key
      const isRealServiceKey = supabaseServiceKey && supabaseServiceKey !== 'your-service-role-key';
      const activeKey = isRealServiceKey ? supabaseServiceKey : supabaseAnonKey;

      if (supabaseUrl && activeKey && supabaseUrl !== 'your-project-url') {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, activeKey);

        const { error } = await supabase.from('messages').insert({
          sender_name: name,
          email,
          message,
          ip_address: ip,
          user_agent: req.headers.get('user-agent'),
          status: 'unread',
        });

        if (error) throw error;
      }
    } catch (dbError) {
      console.error('Supabase error (non-critical):', dbError);
    }

    // Try to send email via Resend
    try {
      const resendKey = process.env.RESEND_API_KEY;
      const adminEmail = process.env.ADMIN_EMAIL;

      if (resendKey && resendKey !== 're_your_api_key' && adminEmail) {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);

        await resend.emails.send({
          from: 'Ahmed Universe <onboarding@resend.dev>',
          to: adminEmail,
          subject: `🎮 New message from ${name}`,
          replyTo: email,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
      }
    } catch (emailError) {
      console.error('Resend error (non-critical):', emailError);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
