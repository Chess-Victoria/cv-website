import React from 'react';
import { render } from '@react-email/render';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  senderName: string;
  contactUsEmail: string;
}

export default function EmailTemplate({ name, email, phone, subject, message, senderName, contactUsEmail }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ color: '#333' }}>New Contact Form Submission</h2>
      <div style={{ backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8, margin: '20px 0' }}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        {phone && <p><strong>Phone:</strong> {phone}</p>}
        {subject && <p><strong>Subject:</strong> {subject}</p>}
        <p><strong>Message:</strong></p>
        <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 4, marginTop: 10 }}>
          {message.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}
        </div>
      </div>
      <p style={{ color: '#666', fontSize: 12 }}>
        This message was sent from the {senderName} contact form.<br />
        Contact us at: <a href={`mailto:${contactUsEmail}`} style={{ color: '#007bff' }}>{contactUsEmail}</a>
      </p>
    </div>
  );
}

// Helper function to render the template to HTML string using @react-email/render
export async function renderEmailTemplateToString(props: EmailTemplateProps) {
  return render(<EmailTemplate {...props} />);
}
