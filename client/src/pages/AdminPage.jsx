import { useState, useEffect } from 'react'
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'

// The fields our form needs to collect
const emptyForm = {
  name: '',
  slug: '',
  category: 'Soaps',
  price: '',
  shortDescription: '',
  description: '',
  ingredients: '',
  size: '',
  stock: '',
  imageUrl: '',
  isFeatured: false,
}

const categories = ['Salves', 'Soaps', 'Teas', 'Skincare', 'Candles', 'Tinctures', 'Oils', 'Other']

function AdminPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_KEY

  // Load products on mount
  useEffect(() => {
    if (isAuthenticated) fetchProducts()
  }, [isAuthenticated])

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load products' })
    }
  }

  // ── Password gate ─────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-canvas">
        <div className="bg-pale-ochre border border-forest-shadow/10 rounded p-10 w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-medium text-forest-shadow text-center">
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border border-forest-shadow/20 rounded px-4 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
          />
          <button
            onClick={() => {
              if (passwordInput === ADMIN_PASSWORD) {
                setIsAuthenticated(true)
              } else {
                setMessage({ type: 'error', text: 'Incorrect password' })
              }
            }}
            className="bg-forest-shadow text-amber-canvas py-2 rounded-pill hover:bg-deep-earth transition-colors"
          >
            Enter
          </button>
          {message && (
            <p className="text-red-700 text-sm text-center">{message.text}</p>
          )}
        </div>
      </div>
    )
  }

  // ── Form handlers ─────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage(null)
    try {
      if (editingId) {
        await updateProduct(editingId, form)
        setMessage({ type: 'success', text: 'Product updated successfully' })
      } else {
        await createProduct(form)
        setMessage({ type: 'success', text: 'Product created successfully' })
      }
      setForm(emptyForm)
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product._id)
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      shortDescription: product.shortDescription,
      description: product.description,
      ingredients: product.ingredients || '',
      size: product.size || '',
      stock: product.stock,
      imageUrl: product.imageUrl,
      isFeatured: product.isFeatured,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    try {
      await deleteProduct(id)
      setMessage({ type: 'success', text: 'Product deleted' })
      fetchProducts()
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete product' })
    }
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setMessage(null)
  }

  // ── Render ────────────────────────────────────────────

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">

      <h1 className="text-4xl font-medium text-forest-shadow mb-2">
        Admin Panel
      </h1>
      <p className="text-forest-shadow/50 mb-10 text-sm">
        Manage your product inventory
      </p>

      {/* Status message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded text-sm ${
          message.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* ── Product Form ── */}
      <div className="bg-pale-ochre border border-forest-shadow/10 rounded p-8 mb-12">
        <h2 className="text-xl font-medium text-forest-shadow mb-6">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Size */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Size</label>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Image URL — full width */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Short description — full width */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Short Description</label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Description — full width */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Full Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth resize-none"
            />
          </div>

          {/* Ingredients — full width */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-deep-earth">Ingredients</label>
            <input
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              className="border border-forest-shadow/20 rounded px-3 py-2 bg-amber-canvas text-forest-shadow focus:outline-none focus:border-deep-earth"
            />
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
              className="accent-deep-earth w-4 h-4"
            />
            <label htmlFor="isFeatured" className="text-sm text-forest-shadow">
              Featured product
            </label>
          </div>

        </div>

        {/* Form actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-forest-shadow text-amber-canvas px-8 py-2 rounded-pill hover:bg-deep-earth transition-colors disabled:opacity-40"
          >
            {loading ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button
              onClick={handleCancel}
              className="border border-forest-shadow/30 text-forest-shadow px-8 py-2 rounded-pill hover:bg-forest-shadow/5 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ── Product List ── */}
      <div>
        <h2 className="text-xl font-medium text-forest-shadow mb-6">
          Current Products ({products.length})
        </h2>
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 bg-pale-ochre border border-forest-shadow/10 rounded p-4"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-forest-shadow">{product.name}</p>
                <p className="text-xs text-deep-earth uppercase tracking-widest">
                  {product.category} · ${product.price} · {product.stock} in stock
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-sm border border-forest-shadow/20 text-forest-shadow px-4 py-1 rounded-pill hover:bg-forest-shadow hover:text-amber-canvas transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-sm border border-red-300 text-red-700 px-4 py-1 rounded-pill hover:bg-red-700 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AdminPage