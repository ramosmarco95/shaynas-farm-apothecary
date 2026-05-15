import { Link } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

function HomePage() {
  // Filter to only featured products
  const featuredProducts = products.filter((p) => p.isFeatured)

  return (
    <div>

      {/* Hero section */}
      <section
        className="px-8 py-24 text-center"
        style={{ background: 'linear-gradient(184deg, rgb(143,119,75), rgb(186,157,106) 51%, rgb(214,189,151) 65%, rgb(244,230,205))' }}
      >
        <p className="text-sm uppercase tracking-widest text-amber-canvas/80 mb-4">
          Small batch. Grown with intention.
        </p>
        <h1 className="text-5xl font-medium text-amber-canvas mb-6 leading-tight">
          Shayna's Farm<br />Apothecary
        </h1>
        <p className="text-amber-canvas/80 max-w-md mx-auto mb-8 leading-relaxed">
          Handcrafted herbal goods made from plants grown on our small family farm. 
          Honest ingredients. Thoughtful recipes. Made for everyday wellness.
        </p>
        <Link
          to="/products"
          className="bg-forest-shadow text-amber-canvas px-8 py-3 rounded-pill hover:bg-deep-earth transition-colors inline-block"
        >
          Shop the Collection
        </Link>
      </section>

      {/* Featured products */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-forest-shadow mb-2">
            Featured Products
          </h2>
          <p className="text-forest-shadow/60">
            A few of our most loved goods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="border border-forest-shadow text-forest-shadow px-8 py-3 rounded-pill hover:bg-forest-shadow hover:text-amber-canvas transition-colors inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>

    </div>
  )
}

export default HomePage