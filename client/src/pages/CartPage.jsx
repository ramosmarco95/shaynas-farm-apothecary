import { Link } from 'react-router-dom'
import useCartStore from '../context/cartStore'

function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  // Calculate order total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="px-8 py-24 text-center">
        <h2 className="text-2xl font-medium text-forest-shadow mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="bg-forest-shadow text-amber-canvas px-8 py-3 rounded-pill hover:bg-deep-earth transition-colors inline-block"
        >
          Browse the Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-medium text-forest-shadow">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-forest-shadow/40 hover:text-forest-shadow transition-colors"
        >
          Clear cart
        </button>
      </div>

      {/* Cart items */}
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-pale-ochre rounded p-4 border border-forest-shadow/10"
          >
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* Info */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-deep-earth">
                {item.category}
              </span>
              <h3 className="font-medium text-forest-shadow">{item.name}</h3>
              <p className="text-sm text-forest-shadow/50">{item.size}</p>
            </div>

            {/* Quantity + remove */}
            <div className="flex flex-col items-end justify-between">
              <p className="font-medium text-forest-shadow">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-forest-shadow/20 text-forest-shadow hover:bg-forest-shadow hover:text-amber-canvas transition-colors"
                >
                  −
                </button>
                <span className="text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-forest-shadow/20 text-forest-shadow hover:bg-forest-shadow hover:text-amber-canvas transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-forest-shadow/30 hover:text-forest-shadow transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order total */}
      <div className="mt-10 border-t border-forest-shadow/10 pt-6 flex items-center justify-between">
        <span className="text-lg font-medium text-forest-shadow">Total</span>
        <span className="text-2xl font-medium text-forest-shadow">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout placeholder */}
      <button className="w-full mt-6 bg-forest-shadow text-amber-canvas py-4 rounded-pill hover:bg-deep-earth transition-colors">
        Proceed to Checkout
      </button>

    </div>
  )
}

export default CartPage