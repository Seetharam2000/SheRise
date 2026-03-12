import { Hero } from '../components/landing/Hero'
import { StatsCounter } from '../components/landing/StatsCounter'
import { FeatureGrid } from '../components/landing/FeatureGrid'
import { Testimonials } from '../components/landing/Testimonials'
import { Partners } from '../components/landing/Partners'
import { ImpactCounter } from '../components/landing/ImpactCounter'

export function Landing() {
  return (
    <main>
      <Hero />
      <StatsCounter />
      <FeatureGrid />
      <Testimonials />
      <Partners />
      <ImpactCounter />
    </main>
  )
}
