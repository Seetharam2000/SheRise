import { Router } from 'express'

const applications = []

const router = Router()

router.get('/applications', (req, res) => {
  res.json(applications)
})

router.post('/applications', (req, res) => {
  const { name, idea, amount, state } = req.body || {}
  if (!name || !idea) return res.status(400).json({ error: 'name and idea are required' })
  const app = {
    id: applications.length + 1,
    name,
    idea,
    amount: amount || 'Not specified',
    state: state || 'Unknown',
    createdAt: new Date().toISOString(),
  }
  applications.push(app)
  res.status(201).json(app)
})

export { router as fundherRouter }

