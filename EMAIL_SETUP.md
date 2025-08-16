# Email Setup Guide

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **API Key**: Get your API key from the Resend dashboard
3. **Domain Verification**: Verify your domain in Resend (optional but recommended)

## Environment Configuration

Add the following to your `.env.local` file:

```env
# Required: Your Resend API key
RESEND_API_KEY=your_resend_api_key_here

# Email Configuration (optional - defaults will be used if not set)
FROM_EMAIL=Your Name <noreply@yourdomain.com>
TO_EMAIL=your-email@example.com
CONTACT_US_EMAIL=contact@yourdomain.com
SENDER_NAME=Your Organization Name
```

### Environment Variables Explained

- **RESEND_API_KEY** (required): Your Resend API key from the dashboard
- **FROM_EMAIL** (optional): The email address that will appear as the sender. Default: `Chess Victoria <noreply@chessvictoria.com>`
- **TO_EMAIL** (optional): The email address where contact form submissions will be sent. Default: `contact@chessvictoria.com`
- **CONTACT_US_EMAIL** (optional): The public contact email address shown in the email footer. Default: `contact@chessvictoria.com`
- **SENDER_NAME** (optional): The name of your organization that appears in the email footer. Default: `Chess Victoria`

## Domain Verification (Recommended)

1. Go to your Resend dashboard
2. Add and verify your domain
3. Use your verified domain in the "from" email address

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out the form and submit
4. Check your email for the received message

## Troubleshooting

- **API Key Error**: Ensure your `RESEND_API_KEY` is correctly set in `.env.local`
- **Wrong Email Address**: Check that `FROM_EMAIL` and `TO_EMAIL` are correctly configured in your environment variables
- **Domain Not Verified**: Use a verified domain or Resend's sandbox domain for testing
- **Email Not Received**: Check your spam folder and Resend dashboard for delivery status

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive configuration
- Consider rate limiting for production use
