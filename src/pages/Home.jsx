import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const HERO_SLIDES = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp7A566_x6jXzXelnBrdxUCRJ1aIvHBY2UbnzfPxV7yv9PKUEVCB_srJ4MAxZ7Nj-mp9IGDri5rr2K36bDXesLd8bM7cuJ168ogJI3osm52Q-FbZB9MEHJw2tClVkCMrhuRLqTt6vBZbAVxqK2_flTnJJrl1XmW9uINrh5ro7u6xiwo9-P_zuNeN6o-oUb61IS7BmKJTWt-1TGKOkTqtvafvs3-RzF3eAMbKXLY5U87jmpl_degYvTbED3i9LL6DTxFcprJbFYOfk',
    label: 'Преміум чоловічий одяг',
  },
  {
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    label: 'Класичний костюм VAREL',
  },
  {
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f8e?w=800&q=80',
    label: 'Нова колекція 2024',
  },
]

const CATEGORIES = ['Джинси', 'Сорочки', 'Костюми', 'Спорт', 'Куртки', 'Кросівки']

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const timer = useRef(null)

  const next = () => setCurrent(i => (i + 1) % HERO_SLIDES.length)
  const go = i => { setCurrent(i); clearInterval(timer.current); startTimer() }

  function startTimer() {
    timer.current = setInterval(next, 4500)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <img
            src={HERO_SLIDES[current].img}
            alt="VAREL"
            className="w-full h-full object-cover object-top brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-main/40 via-surface-main/50 to-surface-main" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.p
          className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-on-surface-variant/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          Преміум чоловічий одяг · Вінниця · Since 2020
        </motion.p>
        <motion.h1
          className="font-garamond text-[76px] leading-none text-on-surface tracking-wider"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        >
          VAREL
        </motion.h1>
        <motion.h2
          className="font-garamond text-[36px] italic text-primary mt-[-6px] mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        >
          everyday style
        </motion.h2>
        <motion.p
          className="font-montserrat text-sm text-on-surface-variant/70 mb-10 max-w-xs"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        >
          Одяг для тих, хто знає собі ціну
        </motion.p>
        <motion.div
          className="flex flex-col gap-3 w-full max-w-xs"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
        >
          <Link to="/catalog" className="gold-gradient-bg gold-glow-hover py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] text-center transition-all active:scale-95">
            Переглянути каталог
          </Link>
          <Link to="/about" className="border border-primary py-4 font-montserrat text-button-text text-primary uppercase tracking-[3px] text-center transition-all hover:bg-primary/10 active:scale-95">
            Про бренд
          </Link>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-24 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-on-surface-variant/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="group min-w-[190px] snap-start flex-shrink-0 block">
        <div className="relative aspect-[4/5] bg-surface-card overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {product.badge && (
            <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 font-montserrat text-[9px] tracking-[2px] text-surface-main uppercase">
              {product.badge}
            </div>
          )}
          <div className="absolute inset-0 bg-surface-main/0 group-hover:bg-surface-main/10 transition-all duration-300" />
        </div>
        <p className="font-montserrat text-[11px] uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors leading-tight mb-1">
          {product.name}
        </p>
        <p className="font-garamond text-primary text-lg">₴ {product.price?.toLocaleString('uk-UA')}</p>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('products').select('*').limit(8).then(({ data }) => {
      if (data) setFeatured(data)
      setLoading(false)
    })
  }, [])

  return (
    <main>
      <HeroCarousel />

      {/* Categories */}
      <motion.section
        className="bg-surface-container border-y border-outline-variant/10 py-4 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <div className="flex gap-6 px-4 min-w-max">
          {CATEGORIES.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to={`/catalog?category=${label}`} className="group">
                <span className="font-montserrat text-[11px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors whitespace-nowrap">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Нова Колекція */}
      <section className="pt-8 pb-4">
        <motion.div
          className="flex justify-between items-end px-4 mb-5"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        >
          <div>
            <h2 className="font-garamond text-2xl text-on-surface uppercase tracking-wider">Нова Колекція</h2>
            <div className="h-px w-16 bg-primary mt-2 opacity-60" />
          </div>
          <Link to="/catalog" className="font-montserrat text-[10px] text-primary uppercase tracking-widest flex items-center gap-1">
            Дивитись все <span className="material-symbols-outlined text-sm">trending_flat</span>
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x scrollbar-hide">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Brand statement */}
      <motion.section
        className="mx-4 my-6 bg-surface-card border border-outline-variant/20 p-6"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <p className="font-garamond text-lg text-on-surface leading-relaxed mb-3">
          З 2020 року — чоловічий одяг із натуральних тканин.
        </p>
        <p className="font-montserrat text-xs text-on-surface-variant leading-relaxed">
          Відбираємо матеріали вручну. Без масового виробництва — лише обмежені партії для тих, хто цінує деталь.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 px-4 pt-8 pb-4 mt-4">
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
            <p className="font-montserrat text-xs text-on-surface-variant mb-2">вул. Зодчих, 2, Вінниця<br />(ТЦ Forum)</p>
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
