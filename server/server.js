import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ─────────────────────────────────────────
// Parse incoming JSON request bodies
app.use(express.json())

// Allow requests from your React frontend
app.use(cors({
  origin: 'http://localhost:5173'
}))

// ── Routes ─────────────────────────────────────────────
app.use('/api/products', productRoutes)

// ── Health check ───────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Shayna\'s Farm Apothecary API is running' })
})

// ── Start server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})