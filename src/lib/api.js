const BASE_URL = import.meta.env.VITE_API_URL || 'https://varel-style.onrender.com'

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

// Нормалізуємо продукт з Django-формату в той що чекає UI
function normalizeProduct(p) {
  return {
    ...p,
    image: p.images?.[0]?.image_url || '',
    category: p.category || '',
  }
}

export const api = {
  async getProducts(category = null) {
    const qs = category ? `?category=${encodeURIComponent(category)}` : ''
    const data = await request(`/api/products/${qs}`)
    return data.map(normalizeProduct)
  },

  async getProduct(id) {
    const data = await request(`/api/products/${id}/`)
    return normalizeProduct(data)
  },

  async getCategories() {
    return request('/api/categories/')
  },
}
