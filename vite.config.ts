import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Secure Backend API middleware for local Vite development.
 * Provides:
 * - /api/chat    : Secure Gemini LLM integration
 * - /api/contact : Secure Resend email delivery
 *
 * Security Architecture:
 * - Credentials (GEMINI_API_KEY, RESEND_API_KEY) are read strictly from server-side environment variables (.env.local / process.env).
 * - Client-side code never receives, sees, or bundles secrets.
 * - When services are not configured, returns honest status (useFallback / unconfigured) without fabricating delivery.
 */
function backendApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'backend-api-endpoints',
    configureServer(server) {
      // 1. Gemini Chatbot Endpoint (/api/chat)
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'GEMINI_API_KEY is not set in the server environment.',
              useFallback: true
            })
          );
          return;
        }

        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const { message } = JSON.parse(rawBody || '{}');
            if (!message || typeof message !== 'string') {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Message is required' }));
              return;
            }

            const systemInstruction =
              "You are Dhananjaya Barik's portfolio assistant. Answer questions using only the verified portfolio information provided to you. Dhananjaya Barik is a Full Stack Java Developer and a fresher seeking entry-level opportunities. Be concise, professional, friendly, and recruiter-focused. Never invent experience, projects, achievements, employment history, or technologies. If information is unavailable, say so clearly. Help recruiters quickly understand his technical skills, education, current project status, resume, and contact options.\n\n" +
              'VERIFIED FACTS:\n' +
              '- Name: Dhananjaya Barik\n' +
              '- Title: Full Stack Java Developer\n' +
              '- Status: Fresher • Open to Entry-Level Full Stack Java Roles\n' +
              '- Location: Hyderabad, Telangana, India\n' +
              '- Email: dhananjayabrk@gmail.com\n' +
              '- Phone: +91 7750804634\n' +
              '- Skills: Java (Core & Advanced), Spring Boot, Spring Security, JWT, Microservices, Hibernate, React.js, MySQL, Oracle SQL, Docker, AWS, Git, GitHub\n' +
              '- Education: B.Tech CSE (BPUT, Odisha, 2022-2026, CGPA 7.76), Naresh i Tech Full Stack Java training (2026), +2 Science CHSE Odisha (2019-2021)\n' +
              '- Projects: Projects are in active progress across Java, Spring Boot, React, and cloud. No projects are fabricated.';

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const upstreamRes = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: systemInstruction }]
                },
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: message }]
                  }
                ]
              })
            });

            if (!upstreamRes.ok) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error: 'Upstream Gemini API error',
                  useFallback: true
                })
              );
              return;
            }

            const data = (await upstreamRes.json()) as {
              candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
            };
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                reply,
                isGemini: true
              })
            );
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: 'Internal server error',
                useFallback: true
              })
            );
          }
        });
      });

      // 2. Contact Message Delivery Endpoint (/api/contact)
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const body = JSON.parse(rawBody || '{}');
            const { name, email, subject, message } = body;

            if (!name || typeof name !== 'string' || name.trim().length < 2) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Name must be at least 2 characters.' }));
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'A valid email address is required.' }));
              return;
            }

            if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Subject is required.' }));
              return;
            }

            if (!message || typeof message !== 'string' || message.trim().length < 10) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Message must be at least 10 characters.' }));
              return;
            }

            // Real recipient restored after successful diagnostic test
            const recipientEmail = 'dhananjayabrk@gmail.com';
            const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

            // Live Resend integration if credentials configured
            if (
              resendApiKey &&
              resendApiKey.trim().length > 0 &&
              !resendApiKey.includes('<I will enter this locally>')
            ) {
              const emailText =
                `New Recruiter Inquiry - Portfolio Contact Form\n\n` +
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
                const resendRes = await fetch('https://api.resend.com/emails', {
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

                const resendData = (await resendRes.json()) as { id?: string; message?: string; name?: string };

                if (resendRes.ok) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      configured: true,
                      emailId: resendData?.id || null,
                      message: 'Your message has been sent successfully to Dhananjaya Barik.'
                    })
                  );
                  return;
                } else {
                  console.error('[Resend Diagnostics] Status:', resendRes.status, 'Response:', resendData);
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: false,
                      configured: true,
                      resendStatus: resendRes.status,
                      resendError: resendData?.message || 'Upstream delivery error',
                      error:
                        'Email provider was unable to deliver the message. Please contact directly at dhananjayabrk@gmail.com.'
                    })
                  );
                  return;
                }
              } catch {
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    configured: true,
                    error:
                      'Network issue communicating with email provider. Please contact directly at dhananjayabrk@gmail.com.'
                  })
                );
                return;
              }
            }

            // Honest fallback when RESEND_API_KEY is not set yet
            res.statusCode = 503;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                configured: false,
                message:
                  'The message service is not configured yet. Please use the email or LinkedIn links below.'
              })
            );
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                error: 'An internal server error occurred while processing the contact form.'
              })
            );
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env and .env.local without exposing to client
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), backendApiPlugin(env)]
  };
});
