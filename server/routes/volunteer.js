import { Router } from 'express'
import mongoose from 'mongoose'
import { Volunteer } from '../models/Volunteer.js'

// Fallback in-memory store if MongoDB is not connected
const fallbackVolunteers = []

const router = Router()

const useDb = () => mongoose.connection.readyState === 1

router.get('/', async (req, res) => {
  try {
    if (useDb()) {
      const items = await Volunteer.find().sort({ createdAt: -1 }).lean()
      res.json(items)
    } else {
      res.json(fallbackVolunteers)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to load volunteers' })
  }
})

router.post('/', async (req, res) => {
  const { name, type, orgName, city, email } = req.body || {}
  if (!name || !type) return res.status(400).json({ error: 'name and type are required' })

  try {
    if (useDb()) {
      const created = await Volunteer.create({ name, type, orgName, city, email })
      res.status(201).json(created)
    } else {
      const entry = {
        id: fallbackVolunteers.length + 1,
        name,
        type,
        orgName: orgName || '',
        city: city || '',
        email: email || '',
        createdAt: new Date().toISOString(),
      }
      fallbackVolunteers.push(entry)
      res.status(201).json(entry)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to save volunteer' })
  }
})

export { router as volunteerRouter }

