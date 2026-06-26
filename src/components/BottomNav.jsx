import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', icon: 'home', label: 'Головна' },
  { path: '/catalog', icon: 'apparel', label: 'Каталог' },
  { path: '/cart', icon: 'shopping_cart', label: 'Кошик' },
  { path: '/about', icon: 'info', label: 'Про нас' },
  { path: '/contact', icon: 'contact_phone', label: 'Контакти' },
]

export default function BottomNav() {
  const location = useLocation()

  if (/^\/product\//.test(location.pathname)) return null

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex justify-around items-center py-2 bg-surface-container z-50 border-t border-outline-variant/20 shadow-[0_-4px_20px_rgba(201,168,76,0.08)]">
      {navItems.map(({ path, icon, label }) => {
        const active = location.pathname === path
        return (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center gap-0.5 px-2 transition-all duration-150 active:scale-90 ${
              active ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{icon}</span>
            <span className="font-montserrat text-[9px] uppercase tracking-wider">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
