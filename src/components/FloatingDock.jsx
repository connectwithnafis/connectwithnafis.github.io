import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import ChatPanel from './chat/ChatPanel'
import WhatsAppPanel, { WhatsAppIcon } from './chat/WhatsAppPanel'

export default function FloatingDock() {
  const [open, setOpen] = useState(null) // null | 'chat' | 'whatsapp'
  const [chatSeen, setChatSeen] = useState(false)

  const toggle = (which) => {
    setOpen((cur) => (cur === which ? null : which))
    if (which === 'chat') setChatSeen(true)
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {/* Panels */}
      <AnimatePresence mode="wait">
        {open === 'chat' && <ChatPanel key="chat" onClose={() => setOpen(null)} />}
        {open === 'whatsapp' && <WhatsAppPanel key="wa" onClose={() => setOpen(null)} />}
      </AnimatePresence>

      {/* Launcher buttons */}
      <div className="flex flex-col items-center gap-3">
        {/* WhatsApp */}
        <Fab
          label="Chat on WhatsApp"
          onClick={() => toggle('whatsapp')}
          active={open === 'whatsapp'}
          className="bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/40"
          delay={0.15}
          pulse
        >
          {open === 'whatsapp' ? <X size={22} /> : <WhatsAppIcon size={24} />}
        </Fab>

        {/* AI Assistant */}
        <Fab
          label="Ask me anything"
          onClick={() => toggle('chat')}
          active={open === 'chat'}
          className="bg-gradient-to-br from-brand-500 to-accent2-500 shadow-brand-500/40"
          delay={0.05}
          badge={!chatSeen}
        >
          {open === 'chat' ? <X size={22} /> : <Bot size={24} />}
        </Fab>
      </div>
    </div>
  )
}

function Fab({ children, label, onClick, active, className = '', delay = 0, pulse, badge }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`group relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-shadow hover:shadow-xl ${className}`}
    >
      {/* attention ring */}
      {pulse && !active && (
        <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-20" />
      )}

      {/* unread badge */}
      {badge && !active && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
          1
        </span>
      )}

      <span className="relative">{children}</span>

      {/* hover label (desktop) */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block dark:bg-white dark:text-slate-900">
        {label}
      </span>
    </motion.button>
  )
}
