import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addToCart(product) {
    setItems(prev => {
      const existing = prev.find(
        i => i.id === product.id && i.size === product.size && i.color === product.color
      )
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === product.size && i.color === product.color
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id, size, color) {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)))
  }

  function updateQty(id, size, color, delta) {
    setItems(prev =>
      prev
        .map(i => (i.id === id && i.size === size && i.color === color ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    )
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
