import express from 'express'
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// Public routes — anyone can read
router.get('/', getAllProducts)
router.get('/slug/:slug', getProductBySlug)
router.get('/:id', getProductById)

// Protected routes — admin only
router.post('/', adminMiddleware, createProduct)
router.put('/:id', adminMiddleware, updateProduct)
router.delete('/:id', adminMiddleware, deleteProduct)

export default router