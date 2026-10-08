/**
 * Serverless API Function for Gemini AI Chatbot Endpoint (e.g., Vercel, Netlify, Node server).
 *
 * Security Architecture:
 * - Reads GEMINI_API_KEY from environment variables on the server.
 * - API key is NEVER sent to or accessible by client-side browser code.
 * - Never commits secrets to source control.
 */

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      useFallback: true
    });
  }

  const { message } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
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

  try {
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
      return res.status(502).json({
        error: 'Upstream Gemini API error',
        useFallback: true
      });
    }

    const data = await upstreamRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({
      reply,
      isGemini: true
    });
  } catch {
    return res.status(500).json({
      error: 'Internal server error',
      useFallback: true
    });
  }
}
