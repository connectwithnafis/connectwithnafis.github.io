// ─────────────────────────────────────────────────────────────
//  Lightweight, offline "AI" assistant. Answers questions about
//  Nahid using the portfolio content via keyword intent matching.
//  (No API/key needed — safe for a static GitHub Pages deploy.)
//  To upgrade to a real LLM later, replace getBotReply() with a
//  fetch() to your backend / serverless endpoint.
// ─────────────────────────────────────────────────────────────
import {
  profile,
  skills,
  experience,
  projects,
  education,
  certifications,
} from './content'

export const welcomeMessage = `Hi! 👋 I'm Nahid's AI assistant. Ask me about his skills, experience, projects, or how to get in touch.`

export const quickReplies = [
  'What does Nahid do?',
  'Tech skills?',
  'Work experience',
  'Show projects',
  'How to contact?',
]

const has = (text, ...words) => words.some((w) => text.includes(w))

/**
 * Returns a plain-text reply for a user message.
 * Newlines (\n) are preserved by the chat UI.
 */
export function getBotReply(raw) {
  const text = (raw || '').toLowerCase().trim()

  if (!text) return "Ask me anything about Nahid — his skills, experience, or projects!"

  // Greetings
  if (has(text, 'hi', 'hello', 'hey', 'salam', 'assalam', 'yo ', 'good morning', 'good evening')) {
    return `Hello! 😊 I'm here to tell you about ${profile.name}. Try asking about his skills, experience, projects, or contact details.`
  }

  // Who / about
  if (has(text, 'who', 'about', 'yourself', 'introduce', 'summary', 'do you do', 'does nahid do', 'what does')) {
    return `${profile.name} is a ${profile.role} based in ${profile.location}.\n\n${profile.summary}`
  }

  // Skills / tech
  if (has(text, 'skill', 'tech', 'stack', 'tool', 'language', 'framework', 'know', 'expert')) {
    const lines = skills.map((g) => `• ${g.title}: ${g.items.join(', ')}`)
    return `Here's Nahid's toolkit:\n\n${lines.join('\n\n')}`
  }

  // Experience / work
  if (has(text, 'experience', 'work', 'job', 'career', 'company', 'employ', 'role', 'position')) {
    const lines = experience.map((c) => {
      const roles = c.roles.map((r) => `   – ${r.role} (${r.period})`).join('\n')
      return `• ${c.company} — ${c.duration}\n${roles}`
    })
    return `Nahid has ~4 years of experience:\n\n${lines.join('\n\n')}\n\nHe grew from Junior Software Engineer to Software Engineer II at Innospace Infotech.`
  }

  // Projects
  if (has(text, 'project', 'built', 'build', 'portfolio', 'made', 'work on', 'app')) {
    const lines = projects
      .slice(0, 4)
      .map((p) => `• ${p.name} (${p.tag}) — ${p.highlights.join(', ')}`)
    return `Some of Nahid's key projects:\n\n${lines.join('\n\n')}\n\nScroll to the Projects section for the full list!`
  }

  // Contact
  if (has(text, 'contact', 'email', 'reach', 'hire', 'connect', 'message', 'talk', 'available', 'get in touch')) {
    return `You can reach Nahid here:\n\n📧 ${profile.email}\n📱 ${profile.phone}\n💼 LinkedIn: ${profile.socials.linkedin}\n💻 GitHub: ${profile.socials.github}\n\nHe's currently open to new opportunities!`
  }

  // WhatsApp
  if (has(text, 'whatsapp', 'chat', 'wa.me', 'phone')) {
    return `You can message Nahid directly on WhatsApp at +${profile.whatsapp} — just tap the green WhatsApp button in the corner. 💬`
  }

  // Education
  if (has(text, 'education', 'study', 'studied', 'degree', 'university', 'college', 'cgpa', 'graduate')) {
    const ed = education[0]
    return `🎓 ${ed.degree}\n${ed.school}, ${ed.location}\n${ed.period} — ${ed.detail}\n\n${ed.extra}`
  }

  // Certifications
  if (has(text, 'certif', 'course', 'training', 'bootcamp')) {
    const lines = certifications.map((c) => `• ${c.name} — ${c.issuer} (${c.period})`)
    return `Nahid's certifications:\n\n${lines.join('\n')}`
  }

  // Location
  if (has(text, 'location', 'where', 'based', 'live', 'city', 'country', 'from', 'remote')) {
    return `Nahid is based in ${profile.location}, and is open to remote and on-site opportunities.`
  }

  // Resume
  if (has(text, 'resume', 'cv', 'download')) {
    return profile.resumeUrl
      ? `You can download Nahid's résumé from the button in the hero section. 📄`
      : `Nahid's full experience is right here on this page — feel free to browse the Experience and Projects sections! For a PDF, reach out via ${profile.email}.`
  }

  // Thanks
  if (has(text, 'thank', 'thanks', 'cool', 'awesome', 'nice', 'great')) {
    return `You're welcome! 🙌 Anything else you'd like to know about Nahid?`
  }

  // Fallback
  return `I'm not totally sure about that one 🤔 — but I can tell you about Nahid's:\n\n• Skills & tech stack\n• Work experience\n• Projects\n• Education\n• Contact details\n\nWhat would you like to know?`
}
