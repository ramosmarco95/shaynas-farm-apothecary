import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="bg-pale-ochre rounded border border-forest-shadow/10 overflow-hidden hover:shadow-md transition-shadow">
      
      {/* Product image */}
      <div className="h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col gap-2">
        
        {/* Category tag */}
        <span className="text-xs uppercase tracking-widest text-deep-earth">
          {product.category}
        </span>

        {/* Product name */}
        <h3 className="text-forest-shadow font-medium text-lg leading-snug">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-sm text-forest-shadow/70 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Price and link */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-forest-shadow font-medium">
            ${product.price.toFixed(2)}
          </span>
          <Link
            to={`/products/${product.slug}`}
            className="bg-forest-shadow text-amber-canvas text-sm px-5 py-2 rounded-pill hover:bg-deep-earth transition-colors"
          >
            View
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ProductCard