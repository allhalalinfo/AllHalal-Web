import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Initialize Resend at runtime (not at module level)
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact support directly at app@allhalal.info' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'AllHalal Website <noreply@allhalal.info>',
      to: ['app@allhalal.info'],
      replyTo: email,
      subject: `[Contact Form] ${category} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #00D094 0%, #00B87D 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #333; margin-bottom: 8px; display: block; }
              .value { color: #555; line-height: 1.6; }
              .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #00D094; }
              .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📩 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From:</span>
                  <div class="value"><strong>${name}</strong></div>
                </div>
                
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value"><a href="mailto:${email}" style="color: #00D094; text-decoration: none;">${email}</a></div>
                </div>
                
                <div class="field">
                  <span class="label">Category:</span>
                  <div class="value"><span style="background: #00D094; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${category}</span></div>
                </div>
                
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                
                <div class="footer">
                  Sent from allhalal.info contact form
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
