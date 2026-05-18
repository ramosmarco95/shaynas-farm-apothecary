# 🌿 Shayna's Farm Apothecary

A full-stack e-commerce store for a small farm apothecary brand selling
handmade herbal goods, skincare, soaps, candles, teas, and natural products.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express.js, REST API  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (frontend), Render (backend)

## Project Structure

shaynas-farm-apothecary/
├── client/     # React frontend (Vite)
└── server/     # Node.js + Express backend

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm or yarn

### Installation

Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/shaynas-farm-apothecary.git
cd shaynas-farm-apothecary
```

Install frontend dependencies:
```bash
cd client
npm install
```

Install backend dependencies:
```bash
cd ../server
npm install
```

## Environment Variables

### Backend (`/server/.env`)
Copy `server/.env.example` to `server/.env` and fill in your values.

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `CLIENT_URL` | Frontend URL allowed by CORS |
| `ADMIN_KEY` | Secret key for admin API routes |

### Frontend (`/client/.env`)
Copy `client/.env.example` to `client/.env` and fill in your values.

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_ADMIN_KEY` | Must match server ADMIN_KEY |

### Production
Set these same variables in your deployment platform dashboards:
- Frontend variables go in Vercel project settings
- Backend variables go in Render service settings

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

### Running Locally

Start the backend:
```bash
cd server
npm run dev
```

Start the frontend:
```bash
cd client
npm run dev
```

## Status
🚧 In active development

## 🤖 AI Assistance Disclosure

This project was developed with the assistance of [Claude](https://claude.ai), an AI assistant made by Anthropic. AI support was used to help with [writing code, debugging, documentation, etc.]. All content has been reviewed and is the responsibility of the author(s).