import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderEmailTemplateToString } from './EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const fromEmail = process.env.FROM_EMAIL || 'Chess Victoria <noreply@chessvictoria.com>';
    const contactUsEmail = process.env.CONTACT_US_EMAIL || 'contact@chessvictoria.com';
    // Support multiple comma-separated emails
    const contactEmailList = contactUsEmail
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
    const senderName = process.env.SENDER_NAME || 'Chess Victoria';

    // Render the email template to HTML string
    const html = await renderEmailTemplateToString({
      name,
      email,
      phone,
      subject,
      message,
      senderName,
      contactUsEmail: contactEmailList.join(', '),
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmailList.length > 0 ? contactEmailList : [contactUsEmail],
      subject: `[Chess Victoria] Contact Us Form: ${subject || 'New Contact Message'}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
