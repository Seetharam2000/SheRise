import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { A11yProvider } from './context/A11yContext'
import { LanguageProvider } from './context/LanguageContext'
import { Navbar } from './components/Layout/Navbar'
import { Footer } from './components/Layout/Footer'
import { VaaniBotWidget } from './components/VaaniBot/VaaniBotWidget'
import { LanguageChip } from './components/ui/LanguageChip'
import { Landing } from './pages/Landing'
import { Onboarding } from './pages/Onboarding'
import { Dashboard } from './pages/Dashboard'
import { FeaturePage } from './pages/FeaturePage'
import { ReStartPage } from './pages/ReStartPage'
import { VaaniPage } from './pages/VaaniPage'
import { AdminPage } from './pages/AdminPage'
import { LoginPage } from './pages/LoginPage'
import { SheNetworkPage } from './pages/SheNetworkPage'
import { SkillBridgePage } from './pages/SkillBridgePage'
import { ConfidencePage } from './pages/ConfidencePage'
import { SafeCareerPage } from './pages/SafeCareerPage'
import { FundHerPage } from './pages/FundHerPage'
import { BiasDetectPage } from './pages/BiasDetectPage'
import { KalaShopPage } from './pages/KalaShopPage'
import { AssetHerPage } from './pages/AssetHerPage'
import { AISakhiPage } from './pages/AISakhiPage'
import { SheScorePage } from './pages/SheScorePage'
import { GigShePage } from './pages/GigShePage'
import { SimuLearnPage } from './pages/SimuLearnPage'
import { VolunteerPage } from './pages/VolunteerPage'

const featureRoutes = [
  { path: 'restart', title: 'ReStart', tagline: 'AI-powered career re-entry' },
  { path: 'network', title: 'SheNetwork', tagline: 'Bias-aware mentorship' },
  { path: 'skillbridge', title: 'SkillBridge', tagline: 'WhatsApp/SMS learning' },
  { path: 'confidence', title: 'ConfidenceOS', tagline: 'AI psychological coaching' },
  { path: 'jobs', title: 'SafeCareer', tagline: 'Safety-aware job board' },
  { path: 'simulate', title: 'SimuLearn', tagline: 'Interview & reskilling simulator' },
  { path: 'vaani', title: 'VaaniBot', tagline: 'Voice-first career chatbot' },
  { path: 'fundher', title: 'FundHer', tagline: "Women's entrepreneurship finance" },
  { path: 'biasdetect', title: 'BiasDetect', tagline: 'AI workplace bias auditor' },
  { path: 'kalashop', title: 'KalaShop', tagline: "Craft-to-commerce platform" },
  { path: 'assether', title: 'AssetHer', tagline: 'Property rights & ownership' },
  { path: 'aisakhi', title: 'AI Sakhi', tagline: 'Bias-free AI career coach' },
  { path: 'shescore', title: 'SheScore', tagline: 'Career progress analytics' },
  { path: 'gigshe', title: 'GigShe', tagline: 'Safe gig economy onboarding' },
  { path: 'safety', title: 'DroneWatch + Drone Didi', tagline: 'Community safety network' },
]

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f0e8]">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pt-3 md:px-6">
        <LanguageChip />
      </div>
      <div id="main" className="flex-1">{children}</div>
      <Footer />
      <VaaniBotWidget />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <A11yProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Landing />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/restart" element={<ReStartPage />} />
                <Route path="/vaani" element={<VaaniPage />} />
              <Route path="/network" element={<SheNetworkPage />} />
              <Route path="/skillbridge" element={<SkillBridgePage />} />
              <Route path="/confidence" element={<ConfidencePage />} />
              <Route path="/jobs" element={<SafeCareerPage />} />
              <Route path="/simulate" element={<SimuLearnPage />} />
              <Route path="/fundher" element={<FundHerPage />} />
              <Route path="/biasdetect" element={<BiasDetectPage />} />
              <Route path="/kalashop" element={<KalaShopPage />} />
              <Route path="/assether" element={<AssetHerPage />} />
              <Route path="/aisakhi" element={<AISakhiPage />} />
              <Route path="/shescore" element={<SheScorePage />} />
              <Route path="/gigshe" element={<GigShePage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LanguageProvider>
      </A11yProvider>
    </ThemeProvider>
  )
}
