import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useSidebar } from '../context/SidebarContext'

export default function Header() {
  const { totalItems } = useCart()
  const { setOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-4 h-14 bg-surface-main/90 backdrop-blur-md border-b border-outline-variant/20">
      <div className="w-8" />

      <Link to="/" className="font-garamond text-2xl tracking-[0.25em] text-primary uppercase">
        VAREL
      </Link>

      <button
        onClick={() => setOpen(true)}
        className="relative text-primary w-8 flex justify-end"
      >
        <span className="material-symbols-outlined">shopping_bag</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-0 bg-primary text-on-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  )
}
