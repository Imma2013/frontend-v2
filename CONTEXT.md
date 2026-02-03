# Cryzo - AI-Powered Phone Marketplace

## Project Overview
Cryzo is an AI-powered phone marketplace for refurbished iPhones and iPads. The differentiator is AI-powered multi-search and chatbot assistance.

**Live Site:** https://cryzo.me

## Tech Stack

### Frontend (this repo)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **State:** React Context API
- **Auth:** Firebase Auth
- **Payments:** Stripe (React Stripe.js)

### Backend (separate repo)
- **Location:** `C:\Users\Admin\Downloads\Cryzo wholesale backend\cryzo-backend`
- **Framework:** Node.js + Express
- **Database:** MongoDB Atlas
- **LLM:** Google Gemini API (`gemini-3-flash-preview`)
- **Payments:** Stripe

### Hosting
- **Frontend:** Render.com (Static Site)
- **Backend:** Render.com (Web Service)
- **Database:** MongoDB Atlas (Free Tier)

## Key Features

1. **AI Search** - Natural language search powered by Gemini 3.0 Flash
2. **Quick Search** - Filter-based search (no AI, instant)
3. **Cryzo Copilot** - AI chatbot for product questions
4. **Product Cards** - Grade/storage/color/origin selection
5. **Stripe Checkout** - Secure payments

## Project Structure

```
frontend-v2/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx      # Main page with AI search
│   │   ├── ProductCard.tsx   # Product listing cards
│   │   ├── CartPage.tsx      # Shopping cart
│   │   ├── ChatWidget.tsx    # AI chatbot
│   │   ├── ProfileDashboard.tsx
│   │   └── ...
│   ├── services/
│   │   ├── api.ts            # Backend API calls
│   │   ├── firebase.ts       # Auth config
│   │   └── ...
│   ├── types.ts              # TypeScript types
│   └── App.tsx               # Main app
├── public/
└── package.json
```

## API Endpoints (Backend)

- `POST /api/search` - AI-powered search (Gemini)
- `GET /api/search/quick` - Filter-based search (no AI)
- `GET /api/products` - Get all products
- `POST /api/chat` - AI chatbot (Cryzo Copilot)
- `POST /api/checkout` - Create Stripe checkout session

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

### Backend (.env)
```
GEMINI_API_KEY=...
MONGODB_URI=...
STRIPE_SECRET_KEY=...
FRONTEND_URL=https://cryzo.me
```

## Development

```bash
# Frontend
cd frontend-v2
npm install
npm run dev   # http://localhost:5173

# Backend
cd cryzo-backend
npm install
npm run dev   # http://localhost:3001
```

## Current Status (Feb 2026)

### Completed
- Core marketplace functionality
- AI search with Gemini 3.0 Flash
- AI chatbot (Cryzo Copilot)
- Stripe checkout integration
- Firebase authentication
- Responsive design
- Product cards with variation selection

### Pivot Notes
- Originally wholesale-focused, now pivoting to retail
- Removed: minimum order requirements, wholesale branding
- Removed: video section, 10k units stat
- Removed: B1 (Low Batt) grade option

## Design Direction
- Dark theme (gray-950 background)
- Cyan/teal accent colors
- Glassmorphism effects
- Crystal "C" logo
- Clean, modern UI

## Contact
- sales@cryzo.co.in
- +1 940-400-9316
