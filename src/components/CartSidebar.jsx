import { Link } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'

export default function CartSidebar() {
  const { open, setOpen } = useSidebar()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[60]"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-[220px] z-[70] bg-surface-card border-l border-outline-variant/30 flex flex-col p-6 transition-transform duration-400 shadow-[0_0_40px_rgba(201,168,76,0.1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxWidth: '220px', right: open ? 'max(0px, calc(50vw - 215px))' : '-220px', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-garamond text-xl tracking-widest uppercase text-primary">ВАШ КОШИК</h2>
          <button onClick={() => setOpen(false)} className="text-on-surface material-symbols-outlined">close</button>
        </div>
        <nav className="flex flex-col gap-6">
          {[
            { to: '/cart', icon: 'shopping_bag', label: 'Переглянути кошик', active: true },
            { to: '/checkout', icon: 'payments', label: 'Оформлення' },
            { to: '/catalog', icon: 'apparel', label: 'До каталогу' },
            { to: '/contact', icon: 'support_agent', label: 'Підтримка' },
          ].map(({ to, icon, label, active }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 transition-colors ${
                active ? 'text-primary border-b border-primary pb-2' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span className="font-montserrat text-sm">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
