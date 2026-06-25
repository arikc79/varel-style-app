import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function OrderSuccess() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-primary text-[48px]">check</span>
        </div>
        <h1 className="font-garamond text-headline-lg text-on-surface mb-4">
          Замовлення прийнято
        </h1>
        <p className="font-montserrat text-on-surface-variant text-body-md mb-2">
          Дякуємо за покупку в VAREL.
        </p>
        <p className="font-montserrat text-on-surface-variant text-body-md mb-12">
          Ми зв'яжемося з вами найближчим часом для підтвердження.
        </p>
        <div className="w-24 h-px bg-primary mx-auto mb-12 opacity-50" />
        <Link
          to="/catalog"
          className="gold-gradient-bg gold-glow-hover px-10 py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all hover:-translate-y-0.5"
        >
          Продовжити покупки
        </Link>
      </div>
    </main>
  )
}
