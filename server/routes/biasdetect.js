import { Router } from 'express'

const flaggedWords = ['rockstar', 'aggressive', 'dominate', 'ninja']

const router = Router()

router.post('/jd', (req, res) => {
  const { text } = req.body || {}
  if (!text) return res.status(400).json({ error: 'text is required' })
  const lower = text.toLowerCase()
  const flags = flaggedWords
    .filter((w) => lower.includes(w))
    .map((w) => ({
      word: w,
      reason: 'Can discourage women applicants; prefer neutral, inclusive wording.',
      suggestion: w === 'rockstar' ? 'skilled' : 'collaborative',
    }))
  res.json({ flags, biasScore: flags.length * 10 })
})

router.post('/resume', (req, res) => {
  const { text } = req.body || {}
  if (!text) return res.status(400).json({ error: 'text is required' })
  res.json({
    notes: ['Your resume may undersell your achievements. Use strong, action verbs and quantify impact.'],
  })
})

export { router as biasdetectRouter }

