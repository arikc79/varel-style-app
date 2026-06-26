import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const categories = ['Всі', 'Джинси', 'Сорочки', 'Костюми', 'Спорт', 'Куртки', 'Кросівки']

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'Всі')
  const [products, setProducts] = useState([])
  const [clubEmail, setClubEmail] = useState('')
  const [clubJoined, setClubJoined] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let q = supabase.from('products').select('*').order('created_at', { ascending: false })
    if (activeCategory !== 'Всі') q = q.eq('category', activeCategory)
    q.then(({ data, error }) => {
      if (error) console.error('Supabase error:', error)
      setProducts(data || [])
      setLoading(false)
    })
  }, [activeCategory])

  return (
    <main className="pb-4">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="font-garamond text-2xl text-on-surface mb-1">Колекція 2024</h1>
        <div className="h-px w-16 bg-primary opacity-50" />
      </div>

      {/* Filter pills */}
      <div className="sticky top-14 z-40 bg-surface-main/95 backdrop-blur-md border-b border-outline-variant/10 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 min-w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-montserrat text-[11px] uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'gold-pill-active'
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pt-5">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center py-20 font-montserrat text-on-surface-variant text-sm">Товарів не знайдено</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8">
            {products.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative aspect-[3/4] bg-surface-card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 font-montserrat text-[9px] tracking-[2px] text-surface-main uppercase">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="font-garamond text-base text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="font-garamond text-sm text-primary mt-0.5">
                    ₴ {product.price.toLocaleString('uk-UA')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* VAREL CLUB */}
      <div className="mx-4 mt-10 mb-2 bg-surface-card border border-outline-variant/20 p-6 text-center">
        <h3 className="font-garamond text-xl text-primary uppercase tracking-widest mb-3">VAREL CLUB</h3>
        <p className="font-montserrat text-xs text-on-surface-variant leading-relaxed mb-5">
          Отримуйте доступ до ексклюзивних пріоритетних та закритих знижок нашої спільноти.
        </p>
        {clubJoined ? (
          <p className="font-montserrat text-sm text-primary py-3">Дякуємо! Ми зв'яжемось з вами незабаром.</p>
        ) : (
          <>
            <input
              type="email"
              value={clubEmail}
              onChange={e => setClubEmail(e.target.value)}
              placeholder="Ваш email"
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface placeholder:text-on-surface-variant/55 py-2 outline-none text-sm font-montserrat mb-4 transition-all"
            />
            <button
              onClick={() => { if (clubEmail) setClubJoined(true) }}
              className="w-full gold-gradient-bg py-3 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95"
            >
              Приєднатись
            </button>
          </>
        )}
      </div>
    </main>
  )
}
