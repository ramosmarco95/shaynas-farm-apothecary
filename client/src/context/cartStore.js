import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({

      // ── State ──────────────────────────────
      items: [],

      // ── Actions ────────────────────────────

      addToCart: (product) => {
        const { items } = get()
        const existing = items.find((item) => item.id === product.id)

        if (existing) {
          // Product already in cart — increase quantity
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          // New product — add with quantity of 1
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

    }),
    {
      name: 'shayna-cart', // localStorage key
    }
  )
)

export default useCartStore