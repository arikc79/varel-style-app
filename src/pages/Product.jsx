import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useCart } from '../context/CartContext'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { name: 'Чорний', value: '#111111' },
  { name: 'Синій', value: '#1a2b4a' },
]

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(colors[0].name)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    api.getProduct(id)
      .then(data => { setProduct(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  function handleAdd() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="font-montserrat text-on-surface-variant">Товар не знайдено</p>
      </div>
    )
  }

  return (
    <main className="pb-32 pt-16">
      {/* Back */}
      <div className="px-4 md:px-12 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-surface-container/60 backdrop-blur-md px-4 py-2 flex items-center gap-2 border border-outline-variant/20 text-on-surface active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-montserrat text-button-text uppercase text-[12px] tracking-[2px]">Назад</span>
        </button>
      </div>

      {/* Gallery */}
      <section className="relative w-full bg-surface-card mt-4">
        <img
          className="w-full h-auto object-contain max-h-[70vh]"
          src={product.image}
          alt={product.name}
        />
      </section>

      {/* Content */}
      <div className="px-4 md:px-12 mt-8 max-w-container-max mx-auto">
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-primary text-[12px] tracking-[4px] uppercase">{product.category}</span>
          <h1 className="font-garamond text-headline-lg-mobile md:text-headline-lg text-on-surface">{product.name}</h1>
          <div className="font-garamond text-price-tag text-primary mt-1">
            ₴{product.price.toLocaleString('uk-UA')}
          </div>
        </div>

        <div className="mt-8 border-t border-outline-variant/10 pt-8 flex flex-col gap-10">
          {/* Color */}
          <div>
            <span className="font-montserrat text-on-surface-variant text-[11px] uppercase tracking-widest block mb-4">Колір</span>
            <div className="flex gap-4">
              {colors.map(c => (
                <div key={c.name} onClick={() => setSelectedColor(c.name)} className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className={`w-10 h-10 rounded-full p-[2px] transition-all ${selectedColor === c.name ? 'active-swatch' : 'border border-transparent hover:border-outline-variant/40'}`}>
                    <div className="w-full h-full rounded-full border border-outline-variant/40" style={{ backgroundColor: c.value }} />
                  </div>
                  <span className="font-montserrat text-[10px] text-on-surface uppercase tracking-wider">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-montserrat text-on-surface-variant text-[11px] uppercase tracking-widest">Розмір</span>
              <button className="font-montserrat text-primary text-[10px] uppercase tracking-widest underline decoration-primary/30 underline-offset-4">
                Таблиця розмірів
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 font-montserrat text-[12px] transition-all cursor-pointer active:scale-95 ${
                    selectedSize === size
                      ? 'border border-primary text-primary bg-primary/5'
                      : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="flex flex-col gap-4">
              <span className="font-montserrat text-on-surface-variant text-[11px] uppercase tracking-widest">Кількість</span>
              <div className="flex items-center justify-between w-32 bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/10">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-primary material-symbols-outlined text-[18px] active:scale-90 transition-transform">remove</button>
                <span className="font-montserrat text-on-surface">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="text-primary material-symbols-outlined text-[18px] active:scale-90 transition-transform">add</button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="font-montserrat text-on-surface-variant text-[13px] uppercase tracking-wider">Склад:</span>
                <span className="font-montserrat text-on-surface text-[13px]">{product.composition || '100% бавовна'}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="font-montserrat text-on-surface-variant text-[13px] uppercase tracking-wider">Країна:</span>
                <span className="font-montserrat text-on-surface text-[13px]">{product.country || 'Туреччина'}</span>
              </div>
            </div>
          </div>

          {product.description && (
            <p className="font-montserrat text-on-surface-variant text-body-md leading-relaxed opacity-80">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container/80 backdrop-blur-xl border-t border-outline-variant/20 p-4 z-50">
        <div className="max-w-container-max mx-auto flex gap-4">
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary transition-all flex-shrink-0">
            <span className="material-symbols-outlined">favorite_border</span>
          </button>
          <button
            onClick={handleAdd}
            className={`flex-1 py-4 font-montserrat text-button-text uppercase tracking-[3px] transition-all duration-300 active:scale-[0.98] ${
              added
                ? 'bg-surface-container border border-primary text-primary'
                : 'gold-gradient-bg gold-glow-hover text-on-primary'
            }`}
          >
            {added ? 'Додано до кошика ✓' : 'Додати до кошика'}
          </button>
        </div>
      </div>
    </main>
  )
}
