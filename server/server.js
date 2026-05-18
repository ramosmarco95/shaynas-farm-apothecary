import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

// Connect to MongoDB first
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin} is not allowed`))
    }
  }
}))

// Routes
app.use('/api/products', productRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Shayna\'s Farm Apothecary API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})