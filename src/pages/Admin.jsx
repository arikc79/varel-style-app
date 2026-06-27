import { useState, useEffect } from 'react'
import { api } from '../lib/api'

const CATEGORIES = ['Джинси', 'Сорочки', 'Костюми', 'Спорт', 'Куртки', 'Кросівки']

const empty = { name: '', price: '', category: 'Костюми', badge: '', image: '', description: '', composition: '100% бавовна', country: 'Туреччина' }

export default function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function startEdit(product) {
    setEditId(product.id)
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      badge: product.badge || '',
      image: product.image || '',
      description: product.description || '',
      composition: product.composition || '100% бавовна',
      country: product.country || 'Туреччина',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditId(null)
    setForm(empty)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage({ type: 'info', text: 'Керування товарами — через Django Admin на сайті.' })
  }

  async function handleDelete(id) {
    setMessage({ type: 'info', text: `Видалення через Django Admin: /admin/products/product/${id}/delete/` })
  }

  return (
    <main className="min-h-screen pt-24 pb-32 px-4 md:px-12 max-w-container-max mx-auto">
      <div className="flex items-center justify-between mb-10 border-b border-outline-variant/20 pb-4">
        <h1 className="font-garamond text-headline-lg text-primary">Адмін-панель</h1>
        <span className="font-montserrat text-on-surface-variant text-sm uppercase tracking-widest">VAREL</span>
      </div>

      {/* Form */}
      <div className="bg-surface-card border border-outline-variant/20 p-8 mb-12">
        <h2 className="font-garamond text-headline-md text-on-surface mb-6">
          {editId ? 'Редагувати товар' : 'Додати товар'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2 md:col-span-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Назва</span>
            <input required name="name" value={form.name} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all"
              placeholder="Назва товару" />
          </label>

          <label className="space-y-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Ціна (₴)</span>
            <input required name="price" value={form.price} onChange={handleChange} type="number"
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all"
              placeholder="12500" />
          </label>

          <label className="space-y-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Категорія</span>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">URL фото</span>
            <input name="image" value={form.image} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all"
              placeholder="https://images.unsplash.com/..." />
          </label>

          {form.image && (
            <div className="md:col-span-2">
              <img src={form.image} alt="preview" className="h-40 object-cover grayscale contrast-125" />
            </div>
          )}

          <label className="space-y-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Бейдж (NEW, SALE...)</span>
            <input name="badge" value={form.badge} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all"
              placeholder="NEW" />
          </label>

          <label className="space-y-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Склад</span>
            <input name="composition" value={form.composition} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all" />
          </label>

          <label className="space-y-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Країна</span>
            <input name="country" value={form.country} onChange={handleChange}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="font-montserrat text-xs uppercase tracking-widest text-on-surface-variant">Опис</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full bg-surface-main border-b border-outline-variant focus:border-primary text-on-surface py-2 outline-none transition-all resize-none"
              placeholder="Короткий опис товару..." />
          </label>

          {message && (
            <p className={`md:col-span-2 font-montserrat text-sm ${message.type === 'ok' ? 'text-primary' : 'text-error'}`}>
              {message.text}
            </p>
          )}

          <div className="md:col-span-2 flex gap-4">
            <button type="submit" disabled={saving}
              className="gold-gradient-bg gold-glow-hover px-10 py-3 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all disabled:opacity-50">
              {saving ? 'Збереження...' : editId ? 'Зберегти зміни' : 'Додати товар'}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit}
                className="border border-outline-variant/40 px-8 py-3 font-montserrat text-button-text text-on-surface-variant uppercase tracking-[3px] hover:border-primary transition-all">
                Скасувати
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Table */}
      <h2 className="font-garamond text-headline-md text-on-surface mb-6">
        Товари ({products.length})
      </h2>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-4 p-4 bg-surface-card border border-outline-variant/10 hover:border-outline-variant/30 transition-all">
              <img src={p.image} alt={p.name} className="w-14 h-16 object-cover flex-shrink-0 grayscale" />
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-garamond text-headline-md text-on-surface truncate">{p.name}</span>
                  {p.badge && (
                    <span className="text-[10px] font-montserrat bg-primary text-on-primary px-2 py-0.5 uppercase tracking-widest flex-shrink-0">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  <span className="font-garamond text-price-tag text-primary">₴{p.price.toLocaleString('uk-UA')}</span>
                  <span className="font-montserrat text-on-surface-variant text-sm">{p.category}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(p)}
                  className="p-2 border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button onClick={() => handleDelete(p.id)}
                  className="p-2 border border-outline-variant/30 text-on-surface-variant hover:text-error hover:border-error transition-all">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
