import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <main className="px-4 pt-6 pb-6">
      <h1 className="font-garamond text-3xl text-primary uppercase leading-tight mb-4">
        ЗВ'ЯЖІТЬСЯ З<br />НАМИ
      </h1>
      <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed mb-8">
        Ми цінуємо ваш час та прагнення до досконалості. Наша команда завжди готова надати професійну консультацію.
      </p>

      {/* Contacts Card */}
      <div className="bg-surface-card border border-outline-variant/10 p-5 mb-4">
        <h2 className="font-garamond text-xl text-primary mb-5">Контакти</h2>
        <div className="space-y-5">
          {[
            { icon: 'call', label: 'ТЕЛЕФОН', value: '+380 97 123 45 67' },
            { icon: 'mail', label: 'EMAIL', value: 'info@varel.ua' },
          ].map(c => (
            <div key={c.icon} className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-surface-container border border-outline-variant/20 text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
              </div>
              <div>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant">{c.label}</p>
                <p className="font-garamond text-lg text-on-surface">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-surface-container border border-outline-variant/20 text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant">INSTAGRAM</p>
                <p className="font-garamond text-base text-on-surface">@varel_official</p>
              </div>
              <div>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant">TELEGRAM</p>
                <p className="font-garamond text-base text-on-surface">@varel_sup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hours Card */}
      <div className="bg-surface-card border border-outline-variant/10 p-5 mb-6">
        <h2 className="font-garamond text-xl text-primary mb-3">Графік роботи</h2>
        <div className="flex items-baseline gap-3">
          <span className="font-garamond text-2xl text-on-surface">Пн–Сб</span>
          <span className="font-garamond text-lg text-primary">10:00 – 20:00</span>
        </div>
        <p className="font-montserrat text-sm text-on-surface-variant mt-1">Неділя: Вихідний</p>
        <p className="font-montserrat text-xs text-on-surface-variant/50 italic mt-4 pt-3 border-t border-outline-variant/10">
          * Онлайн замовлення приймаються цілодобово
        </p>
      </div>

      {/* Form */}
      <h2 className="font-garamond text-2xl text-primary uppercase mb-5">НАПИШІТЬ НАМ</h2>
      {sent ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-primary text-[48px] block mb-3">check_circle</span>
          <p className="font-garamond text-xl text-on-surface">Повідомлення відправлено</p>
          <p className="font-montserrat text-sm text-on-surface-variant mt-2">Ми зв'яжемося з вами найближчим часом</p>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-5">
          {[
            { name: 'name', label: "ВАШЕ ІМ'Я", placeholder: 'Олександр', type: 'text' },
            { name: 'phone', label: 'НОМЕР ТЕЛЕФОНУ', placeholder: '+38 (0__) ___ __ __', type: 'tel' },
            { name: 'message', label: 'ПОВІДОМЛЕННЯ', placeholder: 'Чим ми можемо вам допомогти?', type: 'textarea' },
          ].map(f => (
            <div key={f.name}>
              <label className="font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea required rows={4} placeholder={f.placeholder}
                  className="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface placeholder:text-on-surface-variant/55 py-2 outline-none font-montserrat text-sm resize-none transition-all" />
              ) : (
                <input required type={f.type} placeholder={f.placeholder}
                  className="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface placeholder:text-on-surface-variant/55 py-2 outline-none font-montserrat text-sm transition-all" />
              )}
            </div>
          ))}
          <button type="submit" className="w-full gold-gradient-bg py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95">
            НАДІСЛАТИ
          </button>
        </form>
      )}
    </main>
  )
}
