import { useParams, Link } from 'react-router-dom'
import products from '../data/products'

function ProductDetailPage() {
  const { id } = useParams()

  // Find the product whose slug matches the URL
  const product = products.find((p) => p.slug === id)

  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="px-8 py-24 text-center">
        <h2 className="text-2xl font-medium text-forest-shadow mb-4">
          Product not found
        </h2>
        <Link
          to="/products"
          className="text-deep-earth underline hover:text-sunken-gold"
        >
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">

      {/* Back link */}
      <Link
        to="/products"
        className="text-sm text-deep-earth hover:text-sunken-gold transition-colors inline-block mb-8"
      >
        ← Back to Shop
      </Link>

      {/* Main product layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left — product image */}
        <div className="rounded overflow-hidden border border-forest-shadow/10">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right — product info */}
        <div className="flex flex-col gap-4">

          {/* Category */}
          <span className="text-xs uppercase tracking-widest text-deep-earth">
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-4xl font-medium text-forest-shadow leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-2xl text-forest-shadow">
            ${product.price.toFixed(2)}
          </p>

          {/* Short description */}
          <p className="text-forest-shadow/70 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Divider */}
          <hr className="border-forest-shadow/10" />

          {/* Size */}
          <div>
            <span className="text-xs uppercase tracking-widest text-deep-earth">
              Size
            </span>
            <p className="text-forest-shadow mt-1">{product.size}</p>
          </div>

          {/* Ingredients */}
          <div>
            <span className="text-xs uppercase tracking-widest text-deep-earth">
              Ingredients
            </span>
            <p className="text-forest-shadow/70 text-sm mt-1 leading-relaxed">
              {product.ingredients}
            </p>
          </div>

          {/* Stock indicator */}
          <p className="text-sm text-forest-shadow/50">
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </p>

          {/* Add to cart button */}
          <button
            disabled={product.stock === 0}
            className="bg-forest-shadow text-amber-canvas px-8 py-3 rounded-pill hover:bg-deep-earth transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            Add to Cart
          </button>

        </div>
      </div>

      {/* Full description — below the grid */}
      <div className="mt-16 max-w-2xl">
        <h2 className="text-xl font-medium text-forest-shadow mb-4">
          About this product
        </h2>
        <p className="text-forest-shadow/70 leading-relaxed">
          {product.description}
        </p>
      </div>

    </div>
  )
}

export default ProductDetailPage 