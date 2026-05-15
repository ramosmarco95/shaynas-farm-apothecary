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

### Environment Variables

Create a `.env` file inside `/server` with the following:

MONGO_URI=your_mongodb_connection_string
PORT=5000

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