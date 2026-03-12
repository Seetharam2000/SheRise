import { Router } from 'express'

const jobs = [
  {
    id: 1,
    title: 'Customer Support Associate',
    company: 'Kaabil Partner – Women First',
    city: 'Chennai',
    remote: 'Hybrid',
    safetyScore: 4.5,
    salary: '₹3–4 LPA',
    kaabilUrl: 'https://kaabilprogram.org/jobs',
  },
  {
    id: 2,
    title: 'Data Entry (WFH)',
    company: 'Inclusive Tech Services',
    city: 'Mumbai',
    remote: 'Remote',
    safetyScore: 4.8,
    salary: '₹2–3 LPA',
    kaabilUrl: 'https://kaabilprogram.org/jobs',
  },
]

const router = Router()

router.get('/', (req, res) => {
  const { city, remote } = req.query
  let list = jobs
  if (city) list = list.filter((j) => j.city.toLowerCase().includes(city.toLowerCase()))
  if (remote) list = list.filter((j) => j.remote.toLowerCase() === remote.toLowerCase())
  res.json(list)
})

export { router as jobsRouter }

