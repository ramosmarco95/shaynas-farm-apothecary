import products from '../data/products'
import ProductCard from '../components/ProductCard'

function ProductsPage() {
  return (
    <div className="px-8 py-12 max-w-6xl mx-auto">
      
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-medium text-forest-shadow mb-2">
          The Shop
        </h1>
        <p className="text-forest-shadow/60">
          Handmade in small batches. Grown with care.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  )
}

export default ProductsPage