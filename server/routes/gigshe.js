import { Router } from 'express'

const gigs = [
  { id: 1, type: 'Content moderation', level: 'Beginner', city: 'Remote', estimate: '₹10–20K/month' },
  { id: 2, type: 'Online tutoring', level: 'Intermediate', city: 'Any', estimate: '₹15–30K/month' },
]

const incomes = []

const router = Router()

router.get('/gigs', (req, res) => {
  res.json(gigs)
})

router.post('/income', (req, res) => {
  const { month, amount } = req.body || {}
  if (!month || !amount) return res.status(400).json({ error: 'month and amount are required' })
  const entry = { id: incomes.length + 1, month, amount, createdAt: new Date().toISOString() }
  incomes.push(entry)
  res.status(201).json(entry)
})

router.get('/income', (req, res) => {
  res.json(incomes)
})

export { router as gigsheRouter }

