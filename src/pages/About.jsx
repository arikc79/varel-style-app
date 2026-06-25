import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Ексклюзивність',
    text: 'Обмежені тиражі: кожен виріб виготовляється партією не більше 30 одиниць. Без повторів сезону.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    colSpan: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Майстерність',
    text: 'Ручна обробка країв, французькі шви, перевірка кожного стібка перед відправкою.',
    image: null,
    colSpan: '',
  },
  {
    title: 'Спадщина',
    text: 'Класичний крій із Неаполя, адаптований під сучасний гардероб.',
    image: null,
    colSpan: '',
  },
  {
    title: 'Матеріали',
    text: 'Тканини від Vitale Barberis Canonico та Solbiati — вовна, льон, бавовна преміум-класу.',
    image: null,
    colSpan: 'md:col-span-2',
  },
]

export default function About() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative h-[500px] flex flex-col justify-end px-6 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-35"
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
            alt="VAREL колекція"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-main via-surface-main/50 to-transparent" />
        </div>
        <div className="relative z-10">
          <h1 className="font-garamond text-4xl text-on-surface leading-tight mb-3">
            Про VAREL
          </h1>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed max-w-xs">
            Вінниця, 2020. Чоловічий одяг із натуральних тканин — без масових партій, без компромісів.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-12 px-4 grid grid-cols-1 gap-10 items-center">
        <div className="relative group">
          <div className="absolute -inset-3 border border-primary/15 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
          <img
            className="relative z-10 w-full aspect-[4/3] object-cover grayscale contrast-125"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
            alt="VAREL Atelier"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-garamond text-2xl text-on-surface">Наша Історія</h2>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">
            VAREL починався як ательє для чоловіків, яким набридло обирати між масмаркетом і завищеними цінами за бренд. Перша колекція — 12 позицій, всі розпродані за 3 тижні. З того часу ми не змінили принципів: малі партії, перевірені матеріали, жодної синтетики без причини.
          </p>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">
            Зараз у каталозі понад 500 позицій, але кожна проходить відбір вручну. Якщо щось не відповідає стандарту — не потрапляє до продажу.
          </p>
          <Link
            to="/catalog"
            className="w-fit mt-2 px-8 py-4 gold-gradient-bg gold-glow-hover font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all duration-300 active:scale-95"
          >
            До каталогу
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="py-6 px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 md:row-span-2 bg-surface-card p-8 border border-outline-variant/20 flex flex-col justify-end relative overflow-hidden group min-h-[280px]">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              src={values[0].image}
              alt={values[0].title}
              loading="lazy"
            />
            <div className="relative z-10">
              <h3 className="font-garamond text-xl mb-3 text-on-surface">{values[0].title}</h3>
              <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">{values[0].text}</p>
            </div>
          </div>
          {values.slice(1).map((v) => (
            <div key={v.title} className={`bg-surface-card p-6 border border-outline-variant/20 flex flex-col justify-end ${v.colSpan}`}>
              <h3 className="font-garamond text-lg mb-2 text-on-surface">{v.title}</h3>
              <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
