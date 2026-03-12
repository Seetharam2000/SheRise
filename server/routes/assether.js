import { Router } from 'express'

const queries = []

const router = Router()

router.get('/queries', (req, res) => {
  res.json(queries)
})

router.post('/queries', (req, res) => {
  const { question, state } = req.body || {}
  if (!question) return res.status(400).json({ error: 'question is required' })
  const q = {
    id: queries.length + 1,
    question,
    state: state || '',
    createdAt: new Date().toISOString(),
  }
  queries.push(q)
  res.status(201).json(q)
})

export { router as assetherRouter }

