import { Routes, Route } from 'react-router-dom'

/* Components */
import Navbar from './components/Navbar'

/* Pages */
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
     <div className="min-h-screen bg-amber-canvas">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App