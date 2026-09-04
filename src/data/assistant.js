// ─────────────────────────────────────────────────────────────
//  Lightweight, offline "AI" assistant that speaks in FIRST PERSON
//  as Nahid. Answers questions using the portfolio content via
//  keyword intent matching. No API/key needed (safe for static hosting).
//  To upgrade to a real LLM, set VITE_CHAT_API_URL (see /server).
// ─────────────────────────────────────────────────────────────
import {
  profile,
  skills,
  experience,
  projects,
  education,
  certifications,
} from './content'

export const welcomeMessage = `Hey! 👋 I'm ${profile.firstName} (well, my AI stand-in). Ask me about my skills, experience, projects, or how to reach me.`

export const quickReplies = [
  'What do you do?',
  'Your tech skills?',
  'Work experience',
  'Show your projects',
  'How can I reach you?',
]

const has = (text, ...words) => words.some((w) => text.includes(w))

/**
 * Returns a plain-text, first-person reply for a user message.
 * Newlines (\n) are preserved by the chat UI.
 */
export function getBotReply(raw) {
  const text = (raw || '').toLowerCase().trim()

  if (!text) return 'Ask me anything about my skills, experience, or projects!'

  // Greetings
  if (has(text, 'hi', 'hello', 'hey', 'salam', 'assalam', 'good morning', 'good evening')) {
    return `Hello! 😊 Great to meet you. Ask me about my skills, experience, projects, or how to get in touch.`
  }

  // Who / about
  if (has(text, 'who', 'about', 'yourself', 'introduce', 'summary', 'do you do', 'what do you')) {
    return `I'm ${profile.name}, a ${profile.role} based in ${profile.location}.\n\n${profile.summary}`
  }

  // Skills / tech
  if (has(text, 'skill', 'tech', 'stack', 'tool', 'language', 'framework', 'know', 'expert')) {
    const lines = skills.map((g) => `• ${g.title}: ${g.items.join(', ')}`)
    return `Here's my toolkit:\n\n${lines.join('\n\n')}`
  }

  // Experience / work
  if (has(text, 'experience', 'work', 'job', 'career', 'company', 'employ', 'role', 'position')) {
    const lines = experience.map((c) => {
      const roles = c.roles.map((r) => `   – ${r.role} (${r.period})`).join('\n')
      return `• ${c.company} — ${c.duration}\n${roles}`
    })
    return `I have ~4 years of experience:\n\n${lines.join('\n\n')}\n\nI grew from Junior Software Engineer to Software Engineer II at Innospace Infotech.`
  }

  // Projects
  if (has(text, 'project', 'built', 'build', 'portfolio', 'made', 'work on', 'app')) {
    const lines = projects
      .slice(0, 4)
      .map((p) => `• ${p.name} (${p.tag}) — ${p.highlights.join(', ')}`)
    return `Here are some of my key projects:\n\n${lines.join('\n\n')}\n\nScroll to the Projects section for the full list!`
  }

  // Contact
  if (has(text, 'contact', 'email', 'reach', 'hire', 'connect', 'message', 'talk', 'available', 'get in touch')) {
    return `You can reach me here:\n\n📧 ${profile.email}\n📱 ${profile.phone}\n💼 LinkedIn: ${profile.socials.linkedin}\n💻 GitHub: ${profile.socials.github}\n\nI'm currently open to new opportunities!`
  }

  // WhatsApp
  if (has(text, 'whatsapp', 'chat', 'wa.me', 'phone')) {
    return `You can message me directly on WhatsApp at +${profile.whatsapp} — just tap the green WhatsApp button in the corner. 💬`
  }

  // Education
  if (has(text, 'education', 'study', 'studied', 'degree', 'university', 'college', 'cgpa', 'graduate')) {
    const ed = education[0]
    return `🎓 I hold a ${ed.degree} from ${ed.school}, ${ed.location} (${ed.period}) — ${ed.detail}.\n\n${ed.extra}`
  }

  // Certifications
  if (has(text, 'certif', 'course', 'training', 'bootcamp')) {
    const lines = certifications.map((c) => `• ${c.name} — ${c.issuer} (${c.period})`)
    return `My certifications:\n\n${lines.join('\n')}`
  }

  // Location
  if (has(text, 'location', 'where', 'based', 'live', 'city', 'country', 'from', 'remote')) {
    return `I'm based in ${profile.location}, and I'm open to both remote and on-site opportunities.`
  }

  // Resume
  if (has(text, 'resume', 'cv', 'download')) {
    return profile.resumeUrl
      ? `You can download my résumé from the button in the sidebar. 📄`
      : `My full experience is right here on this page — feel free to browse the Experience and Projects sections! For a PDF, just email me at ${profile.email}.`
  }

  // Thanks
  if (has(text, 'thank', 'thanks', 'cool', 'awesome', 'nice', 'great')) {
    return `You're welcome! 🙌 Anything else you'd like to know about me?`
  }

  // Fallback
  return `I'm not totally sure about that one 🤔 — but I can tell you about my:\n\n• Skills & tech stack\n• Work experience\n• Projects\n• Education\n• Contact details\n\nWhat would you like to know?`
}
