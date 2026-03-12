import { Router } from 'express'

const lessons = [
  { id: 1, title: 'WhatsApp Basics', language: 'ta', mode: 'whatsapp', day: 1 },
  { id: 2, title: 'Savings 101', language: 'hi', mode: 'sms', day: 1 },
  { id: 3, title: 'Work-from-home safety', language: 'ml', mode: 'whatsapp', day: 2 },
]

const enrolments = []

const router = Router()

router.get('/lessons', (req, res) => {
  const { language, mode } = req.query
  let list = lessons
  if (language) list = list.filter((l) => l.language === language)
  if (mode) list = list.filter((l) => l.mode === mode)
  res.json(list)
})

router.post('/enrol', (req, res) => {
  const { phone, language, mode } = req.body || {}
  if (!phone || !language || !mode) return res.status(400).json({ error: 'phone, language, mode are required' })
  const enrol = { id: enrolments.length + 1, phone, language, mode, createdAt: new Date().toISOString() }
  enrolments.push(enrol)
  res.status(201).json(enrol)
})

export { router as skillbridgeRouter }

