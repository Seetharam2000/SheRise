import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { onboardingRouter } from './routes/onboarding.js'
import { authRouter } from './routes/auth.js'
import { networkRouter } from './routes/network.js'
import { skillbridgeRouter } from './routes/skillbridge.js'
import { jobsRouter } from './routes/jobs.js'
import { fundherRouter } from './routes/fundher.js'
import { confidenceRouter } from './routes/confidence.js'
import { biasdetectRouter } from './routes/biasdetect.js'
import { kalashopRouter } from './routes/kalashop.js'
import { assetherRouter } from './routes/assether.js'
import { aisakhiRouter } from './routes/aisakhi.js'
import { shescoreRouter } from './routes/shescore.js'
import { gigsheRouter } from './routes/gigshe.js'
import { volunteerRouter } from './routes/volunteer.js'
import { chatRouter } from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }))
app.use(express.json())

// Optional MongoDB connection (app still runs if URI missing)
const mongoUri = process.env.MONGODB_URI
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error', err))
} else {
  console.warn('MONGODB_URI not set – running without persistent database')
}

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'SheRise API' }))
app.use('/api/onboarding', onboardingRouter)
app.use('/auth', authRouter)
app.use('/api/network', networkRouter)
app.use('/api/skillbridge', skillbridgeRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/fundher', fundherRouter)
app.use('/api/confidence', confidenceRouter)
app.use('/api/biasdetect', biasdetectRouter)
app.use('/api/kalashop', kalashopRouter)
app.use('/api/assether', assetherRouter)
app.use('/api/aisakhi', aisakhiRouter)
app.use('/api/shescore', shescoreRouter)
app.use('/api/gigshe', gigsheRouter)
app.use('/api/volunteer', volunteerRouter)
app.use('/api/chat', chatRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`SheRise API running on http://localhost:${PORT}`))
