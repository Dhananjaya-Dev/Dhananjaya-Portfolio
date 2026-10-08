/**
 * Serverless API Function for Portfolio Contact Form (/api/contact)
 * Compatible with Vercel, Netlify, and Node.js server environments.
 *
 * Security Architecture:
 * - Credentials are read strictly from process.env on the server.
 * - No API keys or secrets are ever bundled or exposed in client-side code.
 * - If no email provider is configured, returns honest status (configured: false).
 * - Never returns upstream secrets or sensitive error payloads to client.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, subject, message } = body;

    // Strict Field Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ error: 'Subject is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    // Real recipient restored after successful diagnostic test
    const recipientEmail = 'dhananjayabrk@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    // Resend API Integration (Official Testing Sender for Unverified Domains)
    if (
      resendApiKey &&
      resendApiKey.trim().length > 0 &&
      !resendApiKey.includes('<I will enter this locally>')
    ) {
      const emailText = `New Recruiter Inquiry - Portfolio Contact Form\n\n` +
        `Recruiter Name: ${name.trim()}\n` +
        `Recruiter Email: ${email.trim()}\n` +
        `Subject: ${subject.trim()}\n\n` +
        `Message:\n${message.trim()}\n\n` +
        `---\n` +
        `Hit Reply in your email client to reply directly to ${email.trim()}.`;

      const emailHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
  <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 20px;">
    <h2 style="color: #0f172a; margin: 0 0 4px 0; font-size: 20px;">New Recruiter Inquiry</h2>
    <p style="color: #64748b; margin: 0; font-size: 13px;">Dhananjaya Barik Portfolio Contact Form</p>
  </div>
  
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 130px;"><strong>Recruiter Name:</strong></td>
      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name.trim())}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Recruiter Email:</strong></td>
      <td style="padding: 8px 0; color: #0284c7; font-size: 14px;"><a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Subject:</strong></td>
      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${escapeHtml(subject.trim())}</td>
    </tr>
  </table>
  
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</p>
    <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
  </div>
  
  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; color: #94a3b8; font-size: 12px;">
    <p style="margin: 0;">Hit Reply in your email client to reply directly to <strong>${escapeHtml(email.trim())}</strong>.</p>
  </div>
</div>`;

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Dhananjaya Barik Portfolio <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: email.trim(),
            subject: `[Portfolio Inquiry] ${subject.trim()}`,
            text: emailText,
            html: emailHtml
          })
        });

        const resendData = (await response.json()) as { id?: string; message?: string; name?: string };

        if (response.ok) {
          return res.status(200).json({
            success: true,
            configured: true,
            message: 'Your message has been sent successfully to Dhananjaya Barik.'
          });
        } else {
          return res.status(502).json({
            success: false,
            configured: true,
            error: 'Email provider was unable to deliver the message. Please contact directly at dhananjayabrk@gmail.com.'
          });
        }
      } catch {
        return res.status(502).json({
          success: false,
          configured: true,
          error: 'Network issue communicating with email provider. Please contact directly at dhananjayabrk@gmail.com.'
        });
      }
    }

    // Honest fallback when RESEND_API_KEY is not configured yet
    return res.status(503).json({
      success: false,
      configured: false,
      message: 'The message service is not configured yet. Please use the email or LinkedIn links below.'
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing the contact form.'
    });
  }
}
