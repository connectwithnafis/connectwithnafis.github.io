// ─────────────────────────────────────────────────────────────
//  Optional real-LLM chat endpoint.
//
//  Leave empty  →  the AI assistant uses the built-in OFFLINE bot
//                  (keyword answers in src/data/assistant.js).
//  Set a URL    →  the assistant calls your serverless Worker for
//                  real LLM answers, and automatically falls back
//                  to the offline bot if the request fails.
//
//  Easiest way to set it: create a `.env` file (see .env.example)
//  with  VITE_CHAT_API_URL=https://your-worker.workers.dev
//  Deploy guide: /server/README.md
// ─────────────────────────────────────────────────────────────
export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || ''

// ─────────────────────────────────────────────────────────────
//  Optional contact-form endpoint (Formspree, free).
//  Create a form at https://formspree.io → copy the endpoint URL
//  (https://formspree.io/f/xxxx) into VITE_FORMSPREE_ENDPOINT.
//  If empty, the contact form falls back to opening the user's email app.
// ─────────────────────────────────────────────────────────────
export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
