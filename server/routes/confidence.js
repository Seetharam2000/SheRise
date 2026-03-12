import { Router } from 'express'

const entries = []

const router = Router()

router.get('/entries', (req, res) => {
  res.json(entries)
})

router.post('/entries', (req, res) => {
  const { scenario, feeling, score } = req.body || {}
  if (!scenario) return res.status(400).json({ error: 'scenario is required' })
  const entry = {
    id: entries.length + 1,
    scenario,
    feeling: feeling || '',
    score: typeof score === 'number' ? score : null,
    createdAt: new Date().toISOString(),
  }
  entries.push(entry)
  res.status(201).json(entry)
})

export { router as confidenceRouter }

