import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Send, X } from 'lucide-react'
import { getBotReply, quickReplies, welcomeMessage } from '../../data/assistant'
import { CHAT_API_URL } from '../../config'

let idSeq = 0
const nextId = () => ++idSeq

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { id: nextId(), from: 'bot', text: welcomeMessage },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const pushBot = (text) =>
    setMessages((m) => [...m, { id: nextId(), from: 'bot', text }])

  const send = async (raw) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return
    const userMsg = { id: nextId(), from: 'user', text }
    const history = [...messages, userMsg]
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    // If a serverless LLM endpoint is configured, use it for real answers.
    // Any failure falls back to the built-in offline bot so chat never dies.
    if (CHAT_API_URL) {
      try {
        const payload = history.slice(-10).map((msg) => ({
          role: msg.from === 'bot' ? 'assistant' : 'user',
          content: msg.text,
        }))
        const res = await fetch(CHAT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
        })
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        const reply = (data.reply || '').trim()
        setTyping(false)
        pushBot(reply || getBotReply(text))
        return
      } catch {
        // network/API error → fall through to offline reply
      }
    }

    // Offline path: brief "thinking" delay for a natural feel.
    const reply = getBotReply(text)
    const delay = Math.min(1200, 400 + reply.length * 6)
    setTimeout(() => {
      setTyping(false)
      pushBot(reply)
    }, delay)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send()
  }

  const showChips = messages.length <= 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="flex h-[30rem] max-h-[68dvh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/20 dark:border-white/10 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-accent2-600 px-4 py-3.5 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
          <Code2 size={20} />
        </span>
        <div className="flex-1">
          <p className="font-display text-sm font-semibold leading-tight">Nahid's AI Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
            </span>
            Online — usually instant
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4 dark:bg-slate-950/40"
      >
        {messages.map((m) => (
          <Bubble key={m.id} from={m.from} text={m.text} />
        ))}
        {typing && <TypingBubble />}

        {showChips && (
          <div className="flex flex-wrap gap-2 pt-1">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-brand-300 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50 dark:border-brand-500/40 dark:bg-white/5 dark:text-brand-300 dark:hover:bg-white/10"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-slate-200/80 bg-white p-3 dark:border-white/10 dark:bg-slate-900"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Nahid..."
          className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          aria-label="Send message"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent2-500 text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send size={17} />
        </button>
      </form>
    </motion.div>
  )
}

function Bubble({ from, text }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'rounded-tl-sm bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200'
            : 'rounded-tr-sm bg-gradient-to-r from-brand-500 to-accent2-500 text-white'
        }`}
      >
        {text}
      </div>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm dark:bg-white/10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-300"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}
