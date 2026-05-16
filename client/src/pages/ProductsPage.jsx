import { useState, useEffect } from 'react'
import { getAllProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (err) {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return (
    <div className="px-8 py-24 text-center text-forest-shadow/50">
      Loading products...
    </div>
  )

  if (error) return (
    <div className="px-8 py-24 text-center text-red-700">
      {error}
    </div>
  )

  return (
    <div className="px-8 py-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-medium text-forest-shadow mb-2">The Shop</h1>
        <p className="text-forest-shadow/60">Handmade in small batches. Grown with care.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage