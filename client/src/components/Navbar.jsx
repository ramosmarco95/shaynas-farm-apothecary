import { Link } from 'react-router-dom'
import useCartStore from '../context/cartStore'

function Navbar() {
  const items = useCartStore((state) => state.items)

  // Count total items across all quantities
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-forest-shadow text-amber-canvas px-8 py-4 flex items-center justify-between">

      <Link to="/" className="text-xl font-medium tracking-wide hover:text-sunken-gold transition-colors">
        Shayna's Farm Apothecary
      </Link>

      <div className="flex gap-8 text-sm">
        <Link to="/" className="hover:text-sunken-gold transition-colors">Home</Link>
        <Link to="/products" className="hover:text-sunken-gold transition-colors">Shop</Link>
        <Link to="/about" className="hover:text-sunken-gold transition-colors">About</Link>
        <Link to="/contact" className="hover:text-sunken-gold transition-colors">Contact</Link>
        <Link to="/cart" className="hover:text-sunken-gold transition-colors">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>

    </nav>
  )
}

export default Navbar