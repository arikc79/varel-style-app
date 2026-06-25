export default function Store() {
  return (
    <main className="pb-4">
      {/* Map */}
      <section className="relative h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
          alt="Вінниця"
          className="w-full h-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.6)] animate-pulse">
            <span className="material-symbols-outlined text-on-primary text-[20px]">location_on</span>
          </div>
        </div>
      </section>

      {/* Info Card */}
      <div className="mx-4 mt-6">
        <div className="bg-surface-card border border-outline-variant/20 p-6 relative overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <h1 className="font-garamond text-2xl text-on-surface uppercase tracking-widest mb-6">ЛОКАЦІЯ</h1>

          <span className="material-symbols-outlined text-primary text-[28px] block mb-3">storefront</span>

          <p className="font-garamond text-lg text-on-surface mb-1">
            вулиця Зодчих, 2, Вінниця
          </p>
          <p className="font-montserrat text-sm text-primary mb-6">(ТЦ Forum)</p>

          <div className="border-t border-b border-outline-variant/10 py-5 mb-6 grid grid-cols-2 gap-4">
            {[['ПН-СБ', '10:00–20:00'], ['НД', '11:00–18:00']].map(([day, time]) => (
              <div key={day}>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{day}</p>
                <p className="font-garamond text-lg text-primary">{time}</p>
              </div>
            ))}
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full gold-gradient-bg py-3 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95"
          >
            Прокласти маршрут
          </a>
        </div>
      </div>
    </main>
  )
}
