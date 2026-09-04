# AI Chat Backend (free, serverless)

This is a tiny **Cloudflare Worker** that powers the portfolio's AI assistant with a
real LLM (**Google Gemini**, free tier). It keeps the API key server-side so it never
ships to the browser.

> The portfolio works fine **without** this — the chat falls back to a built-in
> offline bot. Deploy this only when you want smarter, conversational answers.

## Why two hosts?

- **GitHub Pages** hosts the website (static files) — it can't run backend code.
- **Cloudflare Workers** runs this small API for free (100k requests/day).
- The site calls the Worker over HTTPS. Both are free.

## One-time setup (~5 minutes)

### 1. Get a free Gemini API key
Go to <https://aistudio.google.com/apikey> → **Create API key**. Copy it.
(Free tier is plenty for a portfolio.)

### 2. Install Wrangler & log in
```bash
npm install -g wrangler   # or use: npx wrangler ...
wrangler login            # opens the browser to your free Cloudflare account
```

### 3. Add your key as a secret
```bash
cd server
wrangler secret put GEMINI_API_KEY
# paste the key when prompted
```

### 4. Deploy
```bash
wrangler deploy
```
Wrangler prints a URL like:
```
https://nahid-portfolio-chat.<your-subdomain>.workers.dev
```

### 5. Point the site at it
In the project root, create a `.env` file (copy from `.env.example`):
```
VITE_CHAT_API_URL=https://nahid-portfolio-chat.<your-subdomain>.workers.dev
```
Then rebuild / redeploy the site:
```bash
cd ..
npm run build      # or: npm run deploy
```

Done — the assistant now uses Gemini, and automatically falls back to the
offline bot if the API ever fails.

## Test it quickly
```bash
curl -X POST https://YOUR-WORKER-URL \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What tech does Nahid use?"}]}'
```

## Options
Set these in `wrangler.toml` under `[vars]` (or as secrets):

| Variable         | Default             | Purpose                                   |
| ---------------- | ------------------- | ----------------------------------------- |
| `GEMINI_MODEL`   | `gemini-3.6-flash`  | Any current Gemini model id               |
| `ALLOWED_ORIGIN` | `*`                 | Lock CORS to your site (recommended)      |

To restrict CORS to your deployed site, set:
```toml
[vars]
ALLOWED_ORIGIN = "https://connectwithnafis.github.io"
```

## Editing what the bot knows
The assistant's facts live in the `KNOWLEDGE` string near the top of `worker.js`.
Keep employer-internal product names **anonymous** there, just like on the site.

## Alternatives (also free)
- **Cloudflare Workers AI** (no external key) — swap the Gemini `fetch` for an
  `env.AI.run('@cf/meta/llama-3.1-8b-instruct', ...)` binding.
- **Groq** (fast, free tier) — OpenAI-compatible; change the URL, model and auth header.
