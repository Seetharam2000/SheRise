import { Router } from 'express'

const router = Router()

// JWT + Google OAuth: placeholder. In production add passport-google-oauth20, jwt sign/verify, MongoDB user model.
router.get('/google', (req, res) => {
  res.redirect('#') // Replace with Google OAuth URL
})

router.get('/google/callback', (req, res) => {
  res.redirect(process.env.CLIENT_URL + '/dashboard' || '/')
})

router.post('/login', (req, res) => {
  res.json({ token: 'placeholder-jwt', user: { name: 'Guest' } })
})

export { router as authRouter }
