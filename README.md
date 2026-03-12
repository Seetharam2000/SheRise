# SheRise
<<<<<<< HEAD

**The world's most comprehensive women's career, safety, and financial empowerment platform.**

Design: Gucci-inspired luxury aesthetic — dark cinematic backgrounds (#0a0a0a, #111), cream/gold serif typography (Playfair Display, Cormorant Garamond), glassmorphism cards, Framer Motion animations, full-bleed hero, editorial layouts.

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Router, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB (connection ready; add `MONGODB_URI` in `.env`)
- **Auth:** JWT + Google OAuth (placeholder routes in `server/routes/auth.js`)
- **APIs (placeholders / stubs):** Twilio, Google Speech/TTS, Dialogflow, Google Maps, Kaabil, Coursera, GeM, Claude (Anthropic)

## Quick start

```bash
# Install all dependencies
npm run install:all

# Copy env and add your keys
cp .env.example .env

# Run client + server together
npm run dev
```

- **Client:** http://localhost:3000  
- **API:** http://localhost:5000  

## Project structure

```
├── client/                 # React frontend
│   ├── public/             # manifest.json (PWA), favicon
│   └── src/
│       ├── components/     # Layout (Navbar, Footer), landing, VaaniBot, ui (GlassCard)
│       ├── context/        # Theme, A11y (high contrast, font size)
│       └── pages/          # Landing, Onboarding, Dashboard, FeaturePage, ReStart, Vaani, Admin
├── server/                 # Express API
│   ├── routes/             # onboarding, auth
│   └── index.js
├── .env.example
└── package.json            # install:all, dev (concurrently client + server)
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing: hero, stats, 15 feature cards, testimonials, partners, impact |
| `/onboarding` | 5-step form → personalized dashboard (POST `/api/onboarding`) |
| `/dashboard` | Personalized dashboard with goal progress, SheScore, XP, quick links to all features |
| `/restart` | ReStart: re-entry inputs, 12-week timeline, Resume Gap Explainer, What Changed |
| `/vaani` | VaaniBot: voice/text query, sample intents (Dialogflow) |
| `/admin` | Admin panel: analytics, heatmaps, Drone zones, API stats |
| `/network`, `/skillbridge`, `/confidence`, `/jobs`, `/simulate`, `/fundher`, `/biasdetect`, `/kalashop`, `/assether`, `/aisakhi`, `/shescore`, `/gigshe`, `/safety` | Feature pages (self-contained placeholders; wire APIs per spec) |

## Design & accessibility

- **Colors:** #0a0a0a, #111, #f5f0e8, #c9a84c (gold), #b5485d (rose), #1a3a2a (emerald)
- **Fonts:** Playfair Display (headings), Cormorant Garamond (subheads), Inter (body)
- **Dark/Light** toggle in nav and footer
- **High contrast** and **font size** in footer Accessibility section
- **Skip link** and focus-visible styles for WCAG 2.1 AA
- **PWA:** `manifest.json` and installable app support

## Environment variables

See `.env.example`. Add at least:

- `MONGODB_URI` for MongoDB
- `ANTHROPIC_API_KEY` for Claude (ReStart, ConfidenceOS, FundHer, BiasDetect, etc.)
- `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` for auth
- Twilio, Google (Speech, Maps, Dialogflow), Kaabil, Coursera, GeM as you integrate

## Building for production

```bash
cd client && npm run build
# Serve dist/ with your preferred static host; point API to your Express server.
```

---

*Every woman deserves a career, a voice, and a future she owns.*
=======
A Powerful Women empowerment tool
>>>>>>> d60ff2ba79476f5ddbec6c4f7459ddce576d89e3
