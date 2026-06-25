import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { SidebarProvider } from './context/SidebarContext'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Contact from './pages/Contact'
import Store from './pages/Store'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SidebarProvider>
          {/* Desktop background */}
          <div className="min-h-screen bg-[#0a0a0a] flex items-start justify-center">
            {/* Mobile container */}
            <div className="relative w-full max-w-[430px] min-h-screen bg-surface-main overflow-x-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
              <Header />
              <CartSidebar />
              <div className="pb-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </div>
              <BottomNav />
            </div>
          </div>
        </SidebarProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
