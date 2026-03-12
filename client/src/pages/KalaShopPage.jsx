import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function KalaShopPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', category: '', price: '', village: '' })

  const load = async () => {
    const res = await fetch('/api/kalashop/products')
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('/api/kalashop/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', category: '', price: '', village: '' })
    load()
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          KalaShop – Crafts to commerce
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          List rural crafts and track basic product details.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <form onSubmit={submit} className="space-y-3">
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Category (e.g. pottery, textile)"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Suggested price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Village / SHG"
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
              />
              <button className="mt-2 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Add product</button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Listings</h2>
            <div className="mt-3 space-y-3 max-h-72 overflow-y-auto">
              {products.map((p) => (
                <div key={p.id} className="border-b border-white/10 pb-2 text-sm text-[#f5f0e8]/80">
                  <p className="font-medium text-[#f5f0e8]">{p.name}</p>
                  <p className="text-xs text-[#f5f0e8]/70">{p.category}</p>
                  {p.village && <p className="text-xs text-[#f5f0e8]/60">Village: {p.village}</p>}
                </div>
              ))}
              {!products.length && <p className="text-sm text-[#f5f0e8]/70">No products yet.</p>}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

