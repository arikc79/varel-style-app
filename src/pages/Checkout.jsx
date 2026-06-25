import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'

export default function Checkout() {
  const { items, totalPrice } = useCart()
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState('nova')
  const [payment, setPayment] = useState('card')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ customer_name: '', phone: '', city: '', delivery_branch: '' })

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.from('orders').insert({
      ...form, delivery_type: delivery, payment_type: payment, items, total: totalPrice,
    })
    if (error) { setError('Помилка. Спробуйте ще раз.'); setSubmitting(false); return }
    navigate('/order-success')
  }

  const inputClass = "w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface placeholder:text-on-surface-variant/55 py-2.5 outline-none transition-all font-montserrat text-sm"
  const labelClass = "font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block"

  return (
    <main className="px-4 pt-5 pb-6">
      <h1 className="font-garamond text-3xl text-primary uppercase mb-6">Оформлення<br/>Замовлення</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full border border-primary flex items-center justify-center text-primary font-montserrat text-sm font-bold">1</span>
            <h2 className="font-garamond text-xl text-on-surface">Персональні дані</h2>
          </div>
          <div className="space-y-5">
            <div><label className={labelClass}>Прізвище та Ім'я</label><input required name="customer_name" value={form.customer_name} onChange={handleChange} className={inputClass} placeholder="Олександр Коваленко" /></div>
            <div><label className={labelClass}>Номер телефону</label><input required name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+38 (0__) ___ __ __" type="tel" /></div>
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full border border-primary flex items-center justify-center text-primary font-montserrat text-sm font-bold">2</span>
            <h2 className="font-garamond text-xl text-on-surface">Спосіб доставки</h2>
          </div>
          <div className="space-y-3 mb-5">
            {[
              { value: 'nova', label: 'НОВА ПОШТА', sub: 'Відділення або поштомат', icon: 'local_shipping' },
              { value: 'ukr', label: 'УКРПОШТА', sub: 'Стандартна доставка', icon: 'mail' },
            ].map(d => (
              <label key={d.value} className={`flex items-center gap-4 p-4 bg-surface-card border cursor-pointer transition-all ${delivery === d.value ? 'border-primary' : 'border-outline-variant/30'}`}>
                <input type="radio" name="delivery" className="sr-only" checked={delivery === d.value} onChange={() => setDelivery(d.value)} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${delivery === d.value ? 'border-primary' : 'border-outline-variant'}`}>
                  {delivery === d.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <div className="flex-grow">
                  <div className={`font-montserrat text-sm font-bold tracking-wider ${delivery === d.value ? 'text-primary' : 'text-on-surface-variant'}`}>{d.label}</div>
                  <div className="font-montserrat text-xs text-on-surface-variant">{d.sub}</div>
                </div>
                <span className={`material-symbols-outlined text-[20px] ${delivery === d.value ? 'text-primary' : 'text-on-surface-variant'}`}>{d.icon}</span>
              </label>
            ))}
          </div>
          <div className="space-y-5">
            <div><label className={labelClass}>Місто</label><input required name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Київ" /></div>
            <div><label className={labelClass}>Відділення</label><input required name="delivery_branch" value={form.delivery_branch} onChange={handleChange} className={inputClass} placeholder="№1, вул. Пирогова, 2" /></div>
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full border border-primary flex items-center justify-center text-primary font-montserrat text-sm font-bold">3</span>
            <h2 className="font-garamond text-xl text-on-surface">Оплата</h2>
          </div>
          <div className="space-y-3">
            {[
              { value: 'card', label: 'Оплата карткою онлайн', sub: '(Apple/Google Pay)', icon: 'credit_card' },
              { value: 'cod', label: 'Післяплата при отриманні', sub: '', icon: 'payments' },
            ].map(p => (
              <label key={p.value} className={`flex items-center gap-4 p-4 bg-surface-card border cursor-pointer transition-all ${payment === p.value ? 'border-primary' : 'border-outline-variant/30'}`}>
                <input type="radio" name="payment" className="sr-only" checked={payment === p.value} onChange={() => setPayment(p.value)} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${payment === p.value ? 'border-primary' : 'border-outline-variant'}`}>
                  {payment === p.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <div className="flex-grow">
                  <div className={`font-montserrat text-sm ${payment === p.value ? 'text-primary' : 'text-on-surface-variant'}`}>{p.label}</div>
                  {p.sub && <div className="font-montserrat text-xs text-on-surface-variant">{p.sub}</div>}
                </div>
                <span className={`material-symbols-outlined text-[20px] ${payment === p.value ? 'text-primary' : 'text-on-surface-variant'}`}>{p.icon}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Cart Summary */}
        <section className="bg-surface-card border border-outline-variant/20 p-4">
          <h3 className="font-garamond text-xl text-primary mb-4">ВАШ КОШИК</h3>
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 mb-3">
              <img src={item.image} alt={item.name} className="w-12 h-14 object-cover flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <p className="font-garamond text-sm text-on-surface truncate">{item.name}</p>
                <p className="font-montserrat text-xs text-on-surface-variant">Розмір: {item.size}</p>
                <p className="font-garamond text-sm text-primary">₴{(item.price * item.qty).toLocaleString('uk-UA')}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-outline-variant/10 pt-3 mt-3 space-y-1">
            <div className="flex justify-between font-montserrat text-xs text-on-surface-variant">
              <span>Сума:</span><span>₴{totalPrice.toLocaleString('uk-UA')}</span>
            </div>
            <div className="flex justify-between font-montserrat text-xs text-on-surface-variant">
              <span>Доставка</span><span>За тарифами перевізника</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/20">
            <span className="font-garamond text-xl text-on-surface">ЗАГАЛОМ:</span>
            <span className="font-garamond text-2xl text-primary">₴{totalPrice.toLocaleString('uk-UA')}</span>
          </div>
        </section>

        {error && <p className="font-montserrat text-error text-sm">{error}</p>}

        <button type="submit" disabled={submitting || items.length === 0}
          className="w-full gold-gradient-bg gold-glow-hover py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95 disabled:opacity-50">
          {submitting ? 'Збереження...' : 'Підтвердити замовлення'}
        </button>
        <p className="font-montserrat text-[10px] text-on-surface-variant/50 text-center">
          Натискаючи на кнопку, ви погоджуєтесь з умовами публічної оферти
        </p>
      </form>
    </main>
  )
}
