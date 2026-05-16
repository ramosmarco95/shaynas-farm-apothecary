import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../services/productService'
import useCartStore from '../context/cartStore'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductBySlug(id)
        setProduct(data)
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return (
    <div className="px-8 py-24 text-center text-forest-shadow/50">
      Loading...
    </div>
  )

  if (error || !product) return (
    <div className="px-8 py-24 text-center">
      <h2 className="text-2xl font-medium text-forest-shadow mb-4">Product not found</h2>
      <Link to="/products" className="text-deep-earth underline hover:text-sunken-gold">
        Back to Shop
      </Link>
    </div>
  )

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">
      <Link to="/products" className="text-sm text-deep-earth hover:text-sunken-gold transition-colors inline-block mb-8">
        ← Back to Shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded overflow-hidden border border-forest-shadow/10">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-deep-earth">{product.category}</span>
          <h1 className="text-4xl font-medium text-forest-shadow leading-tight">{product.name}</h1>
          <p className="text-2xl text-forest-shadow">${product.price.toFixed(2)}</p>
          <p className="text-forest-shadow/70 leading-relaxed">{product.shortDescription}</p>
          <hr className="border-forest-shadow/10" />
          <div>
            <span className="text-xs uppercase tracking-widest text-deep-earth">Size</span>
            <p className="text-forest-shadow mt-1">{product.size}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-deep-earth">Ingredients</span>
            <p className="text-forest-shadow/70 text-sm mt-1 leading-relaxed">{product.ingredients}</p>
          </div>
          <p className="text-sm text-forest-shadow/50">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="bg-forest-shadow text-amber-canvas px-8 py-3 rounded-pill hover:bg-deep-earth transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-16 max-w-2xl">
        <h2 className="text-xl font-medium text-forest-shadow mb-4">About this product</h2>
        <p className="text-forest-shadow/70 leading-relaxed">{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetailPage