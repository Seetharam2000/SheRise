import { Router } from 'express'

const products = []

const router = Router()

router.get('/products', (req, res) => {
  res.json(products)
})

router.post('/products', (req, res) => {
  const { name, category, price, village } = req.body || {}
  if (!name || !category) return res.status(400).json({ error: 'name and category are required' })
  const product = {
    id: products.length + 1,
    name,
    category,
    price: price || 'TBD',
    village: village || '',
    createdAt: new Date().toISOString(),
  }
  products.push(product)
  res.status(201).json(product)
})

export { router as kalashopRouter }

