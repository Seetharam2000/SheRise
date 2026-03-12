import { Router } from 'express'

// Simple in-memory mentor data (women only, for demo)
const mentors = [
  { id: 1, name: 'Priya Sharma', city: 'Delhi', field: 'Data Analytics', languages: ['en', 'hi'], context: ['career returnee', 'first-gen'] },
  { id: 2, name: 'Lakshmi Iyer', city: 'Chennai', field: 'Product Management', languages: ['en', 'ta'], context: ['working mother'] },
  { id: 3, name: 'Anjali Nair', city: 'Kochi', field: 'UX Research', languages: ['en', 'ml'], context: ['career switcher'] },
]

const router = Router()

router.get('/mentors', (req, res) => {
  const { city, field, language } = req.query
  let list = mentors
  if (city) list = list.filter((m) => m.city.toLowerCase().includes(city.toLowerCase()))
  if (field) list = list.filter((m) => m.field.toLowerCase().includes(field.toLowerCase()))
  if (language) list = list.filter((m) => m.languages.includes(language))
  res.json(list)
})

router.post('/mentors', (req, res) => {
  const { name, city, field, languages = [], context = [] } = req.body || {}
  if (!name || !city || !field) return res.status(400).json({ error: 'name, city, field are required' })
  const mentor = { id: mentors.length + 1, name, city, field, languages, context }
  mentors.push(mentor)
  res.status(201).json(mentor)
})

export { router as networkRouter }

