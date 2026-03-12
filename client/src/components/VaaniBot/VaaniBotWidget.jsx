import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function VaaniBotWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#b5485d] text-white shadow-lg hover:bg-[#c95a6e] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open VaaniBot voice assistant"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-2xl" aria-hidden>🎤</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 rounded-xl border border-white/10 bg-[#111] p-4 shadow-2xl"
          >
            <p className="font-subhead text-sm text-[#f5f0e8]/90" style={{ fontFamily: 'var(--font-subhead)' }}>
              VaaniBot — Voice-first career assistant. Ask in your language.
            </p>
            <Link
              to="/vaani"
              className="mt-3 block rounded-lg bg-[#b5485d] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#c95a6e]"
            >
              Open full VaaniBot
            </Link>
            <p className="mt-2 text-xs text-[#f5f0e8]/50">
              Try: "Enakku என்ன job suitable?" or "Maternity leave rights?"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
