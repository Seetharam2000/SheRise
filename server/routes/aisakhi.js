import { Router } from 'express'

const router = Router()

router.post('/recommend', (req, res) => {
  const { interests = [], timePerWeek } = req.body || {}
  const recs = [
    {
      role: 'Prompt Engineer',
      stem: false,
      salaryRange: '₹8–15 LPA',
    },
    {
      role: 'AI Ethics Reviewer',
      stem: false,
      salaryRange: '₹10–18 LPA',
    },
  ]
  res.json({ recommendations: recs, interests, timePerWeek: timePerWeek || 'Not specified' })
})

export { router as aisakhiRouter }

