// ─────────────────────────────────────────────────────────────
//  Cloudflare Worker — AI chat backend for Nahid's portfolio.
//  Holds the LLM API key server-side and calls Google Gemini
//  (generous free tier). Deploy guide in ./README.md
//
//  Secrets (set via `wrangler secret put ...`):
//    GEMINI_API_KEY   (required)  — free key from aistudio.google.com/apikey
//  Optional vars (wrangler.toml [vars] or secrets):
//    GEMINI_MODEL     (default "gemini-3.6-flash")
//    ALLOWED_ORIGIN   (default "*")  — e.g. "https://you.github.io"
// ─────────────────────────────────────────────────────────────

// Facts the model is allowed to use. Company product names are kept
// ANONYMOUS on purpose — do not add employer-internal product names here.
const KNOWLEDGE = `
Name: MD Nahid Uddin. Current role: Software Engineer II at Innospace Infotech Ltd, Dhaka, Bangladesh. Experience: ~4 years.

Summary: Backend-focused Software Engineer specializing in enterprise-grade reporting engines and modernizing legacy backend architectures. Expert in Clean Architecture, Domain-Driven Design (DDD) and CQRS using NestJS and PostgreSQL. Strong track record in ETL migrations and scalable, secure cloud-native systems.

Skills:
- Backend Architecture: Clean Architecture, DDD, CQRS, Modular Monolith, SOLID.
- Languages & Frameworks: C#, TypeScript, ASP.NET Core, .NET Framework, NestJS, Flutter.
- Databases & ORM: PostgreSQL, Oracle, Microsoft SQL Server, Entity Framework Core, Dapper, TypeORM.
- Cloud & DevOps: AWS (EC2, S3, Lambda, CloudWatch), Docker, Jenkins, CI/CD, IIS.
- Methodologies: Agile, System Design, RESTful API design, Microservices, RabbitMQ.

Experience:
- Innospace Infotech Ltd (Oct 2023 – Present). Progressed Junior Software Engineer -> Software Engineer -> Software Engineer II. Highlights: architected an enterprise BI reporting engine (NestJS, Clean Architecture, DDD, Docker); built a field-force tracking platform (Modular Monolith, CQRS, JWT access/refresh rotation, RBAC, PostgreSQL); led an Oracle 11g -> PostgreSQL ETL pipeline on AWS (EC2, Lambda, S3) with Python and Docker; built RESTful APIs in ASP.NET Core; migrated legacy apps to the cloud; optimized IIS deployments; earlier built ERP solutions and a cross-platform Flutter mobile app.
- Tawoon Software Solution (Nov 2022 – Jun 2023), Junior Software Engineer. Built ERP systems on .NET Core, Jenkins CI/CD pipelines, RabbitMQ message queuing, and Amazon S3 storage.

Projects (anonymized): Enterprise BI Reporting Engine; Field-Force Tracking Platform; Oracle -> PostgreSQL ETL Pipeline; Sales-Force Tracking Suite (Flutter mobile + ASP.NET Core + Oracle); In-House ERP Platform; Multi-Client ERP Systems.

Education: B-Tech in Computer Science & Engineering, Kurukshetra University, Haryana, India (2019 – 2023), CGPA 8.19/10. Was a Student Ambassador and led a Web Development Bootcamp.

Certifications: Foundational C# with Microsoft (freeCodeCamp); Web Development Bootcamp (Udemy).

Contact: email connectwithnafis@gmail.com; WhatsApp +8801876694743; LinkedIn https://www.linkedin.com/in/mdnahiduddin/; GitHub https://github.com/connectwithnafis. Currently open to new opportunities.
`.trim()

const SYSTEM_PROMPT = `You are the AI assistant on MD Nahid Uddin's personal portfolio, and you speak AS Nahid, in the FIRST PERSON ("I", "me", "my"). You are chatting with a visitor.

Rules:
- Answer ONLY using the facts below. Never invent details, employers' internal product names, dates, or numbers.
- Always speak in the first person as Nahid (e.g., "I built…", "In my experience…"). Never refer to "Nahid" in the third person.
- If a question is unrelated to me or not covered by the facts, politely say you can only help with questions about me and suggest topics (skills, experience, projects, contact).
- Keep replies short and conversational: 2–5 sentences. A friendly tone and the occasional emoji are welcome.
- Encourage the visitor to reach out or use the WhatsApp button when relevant.

FACTS (about me):
${KNOWLEDGE}`

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*'
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors })
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors)
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: 'Server not configured (missing GEMINI_API_KEY)' }, 500, cors)
    }

    let messages = []
    try {
      const body = await request.json()
      messages = Array.isArray(body?.messages) ? body.messages : []
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, cors)
    }

    // Convert to Gemini's format; keep only the last 10 turns, cap length.
    const contents = messages
      .filter((m) => m && m.content)
      .slice(-10)
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content).slice(0, 2000) }],
      }))

    if (contents.length === 0) {
      return json({ reply: "Hi! Ask me anything about Nahid's skills, experience, or projects." }, 200, cors)
    }

    const model = env.GEMINI_MODEL || 'gemini-3.6-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`

    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 400, topP: 0.9 },
        }),
      })

      if (!r.ok) {
        const detail = (await r.text()).slice(0, 300)
        return json({ error: 'LLM request failed', detail }, 502, cors)
      }

      const data = await r.json()
      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim() ||
        "Sorry, I couldn't come up with a response — try rephrasing?"

      return json({ reply }, 200, cors)
    } catch (e) {
      return json({ error: 'Upstream error', detail: String(e).slice(0, 200) }, 502, cors)
    }
  },
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}
