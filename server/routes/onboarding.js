import { Router } from 'express'

const router = Router()

// Claude API integration: in production use Anthropic SDK with claude-sonnet-4-20250514
async function getClaudeRecommendations(form) {
  const goalMap = {
    job: ['jobs', 'shescore', 'simulate'],
    reskill: ['simulate', 'restart', 'skillbridge'],
    restart: ['restart', 'network', 'confidence'],
    grow: ['shescore', 'network', 'simulate'],
    business: ['fundher', 'kalashop', 'assether'],
    network: ['network', 'shescore'],
    rights: ['biasdetect', 'confidence', 'safety'],
  }
  const recommended = goalMap[form.goal] || ['restart', 'shescore']
  return { recommended, message: 'Dashboard personalized for you.' }
}

router.post('/', async (req, res) => {
  try {
    const form = req.body
    const result = await getClaudeRecommendations(form)
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Onboarding failed' })
  }
})

export { router as onboardingRouter }
