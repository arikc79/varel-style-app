import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const categories = [
  { label: 'Джинси', icon: '👖' },
  { label: 'Костюми', icon: '🧥' },
  { label: 'Спорт', icon: '👟' },
  { label: 'Куртки', icon: '🧣' },
  { label: 'Сорочки', icon: '👔' },
  { label: 'Кросівки', icon: '👞' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    supabase.from('products').select('*').limit(4).then(({ data }) => {
      if (data) setFeatured(data)
    })
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
          alt="VAREL Hero"
          className="w-full h-full object-cover object-top brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-main/30 via-transparent to-surface-main" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-on-surface-variant/80 mb-3">
            Преміум чоловічий одяг · Вінниця · Since 2020
          </p>
          <h1 className="font-garamond text-[72px] leading-none text-on-surface">VAREL</h1>
          <h2 className="font-garamond text-[32px] italic text-primary mt-[-6px] mb-6">everyday style</h2>
          <p className="font-montserrat text-sm text-on-surface-variant/70 mb-8">
            Одяг для тих, хто знає собі ціну
          </p>
          <div className="flex flex-col gap-3 px-4">
            <Link to="/catalog" className="gold-gradient-bg gold-glow-hover py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] text-center transition-all active:scale-95">
              Переглянути каталог
            </Link>
            <Link to="/about" className="border border-primary py-4 font-montserrat text-button-text text-primary uppercase tracking-[3px] text-center transition-all hover:bg-primary/10">
              Про бренд
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface-container border-y border-outline-variant/10 py-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-4 min-w-max">
          {categories.map(({ label, icon }) => (
            <Link
              key={label}
              to={`/catalog?category=${label}`}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-card border border-outline-variant/20 flex items-center justify-center text-xl group-hover:border-primary transition-all">
                {icon}
              </div>
              <span className="font-montserrat text-[9px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Нова Колекція */}
      {featured.length > 0 && (
        <section className="px-4 pt-8 pb-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-garamond text-2xl text-on-surface uppercase tracking-wider">Нова Колекція</h2>
            <Link to="/catalog" className="font-montserrat text-[10px] text-primary uppercase tracking-widest border-b border-primary/40">
              Дивитись все
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative aspect-[3/4] bg-surface-card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 font-montserrat text-[9px] tracking-[2px] text-surface-main uppercase">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="pt-2 pb-1">
                  <p className="font-garamond text-base text-on-surface leading-tight">{product.name}</p>
                  <p className="font-garamond text-price-tag text-primary text-sm">₴ {product.price.toLocaleString('uk-UA')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Brand statement */}
      <section className="mx-4 my-6 bg-surface-card border border-outline-variant/20 p-6">
        <p className="font-garamond text-lg text-on-surface leading-relaxed mb-3">
          З 2020 року — чоловічий одяг із натуральних тканин.
        </p>
        <p className="font-montserrat text-xs text-on-surface-variant leading-relaxed">
          Відбираємо матеріали вручну. Без масового виробництва — лише обмежені партії для тих, хто цінує деталь.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant/10 px-4 pt-8 pb-4 mt-4">
        <div className="font-garamond text-2xl tracking-[0.3em] text-primary text-center mb-6">VAREL</div>
        <p className="font-montserrat text-xs text-on-surface-variant text-center leading-relaxed mb-6">
          Створюємо стиль для чоловіків, що цінують якість, традиції та сучасний комфорт.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-montserrat text-[10px] uppercase tracking-widest text-primary mb-3">Навігація</p>
            {[['/', 'Головна'], ['/catalog', 'Каталог товарів'], ['/cart', 'Кошик'], ['/checkout', 'Доставка та оплата']].map(([to, label]) => (
              <Link key={to} to={to} className="block font-montserrat text-xs text-on-surface-variant hover:text-primary transition-colors mb-2">{label}</Link>
            ))}
          </div>
          <div>
            <p className="font-montserrat text-[10px] uppercase tracking-widest text-primary mb-3">Контакти</p>
            <p className="font-montserrat text-xs text-on-surface-variant mb-2">вул. Зодчих, 2, Вінниця<br/>(ТЦ Forum)</p>
            <p className="font-montserrat text-xs text-on-surface-variant mb-2">+380 97 123 45 67</p>
            <p className="font-montserrat text-xs text-on-surface-variant">info@varel.ua</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center border-t border-outline-variant/10 pt-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">share</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">send</span>
        </div>
        <p className="font-montserrat text-[9px] text-on-surface-variant/40 text-center mt-4">© 2024 VAREL. Всі права захищено.</p>
      </footer>
    </main>
  )
}
