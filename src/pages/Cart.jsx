import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, totalPrice, removeFromCart, updateQty } = useCart()

  return (
    <main className="px-4 pt-5 pb-6">
      <h1 className="font-garamond text-2xl text-on-surface mb-1">Кошик ({items.length})</h1>
      <div className="h-px w-16 bg-primary mb-6" />

      {items.length === 0 ? (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-[64px] text-outline-variant block mb-4">shopping_bag</span>
          <p className="font-montserrat text-on-surface-variant text-sm mb-8">Кошик порожній</p>
          <Link to="/catalog" className="gold-gradient-bg px-8 py-3 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all">
            До каталогу
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-surface-card border border-outline-variant/10">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-garamond text-lg text-on-surface leading-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-on-surface-variant hover:text-error transition-colors ml-2 flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="font-montserrat text-[11px] text-on-surface-variant border border-outline-variant/20 px-2 py-0.5">Розмір: {item.size}</span>
                    <span className="font-montserrat text-[11px] text-on-surface-variant border border-outline-variant/20 px-2 py-0.5">Колір: {item.color}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-outline-variant/30">
                      <button onClick={() => updateQty(item.id, item.size, item.color, -1)} className="px-3 py-2.5 text-primary hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="px-3 font-montserrat text-sm text-on-surface">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.color, 1)} className="px-3 py-2.5 text-primary hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <span className="font-garamond text-lg text-primary">₴{(item.price * item.qty).toLocaleString('uk-UA')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Підсумок */}
          <div className="bg-surface-card border border-outline-variant/20 p-5 mb-5">
            <h2 className="font-garamond text-xl text-on-surface mb-4">Підсумок</h2>
            <div className="space-y-2 mb-4 pb-4 border-b border-outline-variant/10">
              <div className="flex justify-between">
                <span className="font-montserrat text-sm text-on-surface-variant">Товари ({items.length})</span>
                <span className="font-montserrat text-sm text-on-surface">₴{totalPrice.toLocaleString('uk-UA')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-montserrat text-sm text-on-surface-variant">Доставка</span>
                <span className="font-montserrat text-sm text-primary">Безкоштовно</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-montserrat text-sm uppercase tracking-wider text-on-surface">Разом:</span>
              <span className="font-garamond text-2xl text-primary">₴{totalPrice.toLocaleString('uk-UA')}</span>
            </div>
          </div>

          <Link to="/checkout" className="block w-full text-center gold-gradient-bg gold-glow-hover py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95 mb-3">
            Оформити замовлення
          </Link>
          <div className="flex items-center justify-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="font-montserrat text-[10px] uppercase tracking-widest">Secure Checkout</span>
          </div>
        </>
      )}
    </main>
  )
}
