import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import { profile } from '../data/content'
import { CONTACT_FORM_ENDPOINT } from '../config'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    // No endpoint configured → fall back to the user's email client.
    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const channels = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
  ]

  const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:placeholder:text-slate-500'

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="07 — Contact"
        title="Let's build something reliable together"
        lead="Have a project, a role, or an idea worth discussing? Drop me a message — I'll get back to you soon."
      />

      <div className="mt-10 grid grid-cols-1 gap-8">
        {/* Form */}
        <Reveal>
          {status === 'success' ? (
            <div className="flex items-center gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="text-brand-500" />
              <p className="text-sm">
                Thanks — your message is on its way. I'll reply as soon as I can!
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  placeholder="Your name"
                  className={inputCls}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  required
                  placeholder="Your email"
                  className={inputCls}
                />
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                required
                rows={4}
                placeholder="What would you like to build or discuss?"
                className={`${inputCls} resize-none`}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent2-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  <Send size={16} />
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </button>
                {status === 'error' && (
                  <span className="text-sm text-red-500">
                    Something went wrong — email me directly at {profile.email}.
                  </span>
                )}
              </div>
            </form>
          )}
        </Reveal>

        {/* Contact channels + socials */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {channels.map((c, i) => {
            const inner = (
              <motion.div
                whileHover={{ y: -3 }}
                className="flex h-full items-center gap-3 rounded-2xl glass p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <c.icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                    {c.label}
                  </p>
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {c.value}
                  </p>
                </div>
              </motion.div>
            )
            return c.href ? (
              <a key={c.label} href={c.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: profile.socials.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-brand-400"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
