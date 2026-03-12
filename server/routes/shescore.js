import { Router } from 'express'

const router = Router()

router.get('/summary', (req, res) => {
  res.json({
    score: 72,
    skills: [40, 60, 80],
    confidence: [50, 65, 78],
    salary: [20, 30, 45],
  })
})

export { router as shescoreRouter }

