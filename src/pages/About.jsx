import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { num: '500+', label: 'позицій у каталозі' },
  { num: '20+',  label: 'років досвіду' },
  { num: '10к+', label: 'задоволених клієнтів' },
]

const values = [
  {
    title: 'Повсякденний стиль',
    text: 'Від класичного костюму для важливих зустрічей до стильного повсякденного образу — у нас є все для кожного дня.',
  },
  {
    title: 'Якість і ціна',
    text: 'Тільки перевірені бренди та якісні матеріали. Справедлива ціна без переплати за назву.',
  },
  {
    title: 'Досвід і довіра',
    text: '20 років у чоловічій моді. Ми знаємо що потрібно кожному клієнту і допоможемо знайти свій стиль.',
  },
]

export default function About() {
  return (
    <main className="min-h-screen pt-16 pb-24">

      {/* Hero */}
      <section className="relative flex flex-col justify-end px-6 pb-12 overflow-hidden" style={{ height: '60vh' }}>
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-top"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp7A566_x6jXzXelnBrdxUCRJ1aIvHBY2UbnzfPxV7yv9PKUEVCB_srJ4MAxZ7Nj-mp9IGDri5rr2K36bDXesLd8bM7cuJ168ogJI3osm52Q-FbZB9MEHJw2tClVkCMrhuRLqTt6vBZbAVxqK2_flTnJJrl1XmW9uINrh5ro7u6xiwo9-P_zuNeN6o-oUb61IS7BmKJTWt-1TGKOkTqtvafvs3-RzF3eAMbKXLY5U87jmpl_degYvTbED3i9LL6DTxFcprJbFYOfk"
            alt="VAREL"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-main via-surface-main/60 to-surface-main/20" />
        </div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
            Since 2020 · Вінниця
          </p>
          <h1 className="font-garamond text-4xl text-on-surface leading-tight mb-4">
            Стиль — це не одяг.<br />
            Це <em className="text-primary not-italic">відношення</em> до себе.
          </h1>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed max-w-sm">
            VAREL everyday style — чоловічий одяг для тих, хто цінує якість і виглядає впевнено в будь-якій ситуації.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 border-y border-outline-variant/15 my-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.num}
            className={`py-7 flex flex-col items-center gap-1 ${i < 2 ? 'border-r border-outline-variant/15' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="font-garamond text-3xl text-primary">{s.num}</span>
            <span className="font-montserrat text-[9px] uppercase tracking-widest text-on-surface-variant text-center">{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Story */}
      <section className="px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h2 className="font-garamond text-2xl text-on-surface">Наша Історія</h2>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">
            VAREL починався як простий задум: зробити якісний чоловічий одяг доступним. Не масмаркет і не люксовий бутик — а розумний вибір для чоловіка, який поважає себе.
          </p>
          <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">
            Сьогодні в нашому каталозі понад 500 позицій: від джинсів та сорочок до костюмів, курток та взуття. Кожна позиція проходить ручний відбір — якщо не відповідає стандарту, не потрапляє на полицю.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-4 mb-10 flex flex-col gap-4">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-surface-card border border-outline-variant/15 p-6"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-6 h-px bg-primary mb-4" />
            <h3 className="font-garamond text-lg text-on-surface mb-2">{v.title}</h3>
            <p className="font-montserrat text-sm text-on-surface-variant leading-relaxed">{v.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Location */}
      <motion.section
        className="mx-4 bg-surface-card border border-outline-variant/15 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-montserrat text-[10px] uppercase tracking-[0.35em] text-primary mb-4">Де нас знайти</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">location_on</span>
            <div>
              <p className="font-montserrat text-sm text-on-surface">вул. Зодчих, 2</p>
              <p className="font-montserrat text-xs text-on-surface-variant">ТЦ Форум, 2 поверх · Вінниця</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">phone</span>
            <div>
              <p className="font-montserrat text-sm text-on-surface">+38 097 410 30 75</p>
              <p className="font-montserrat text-xs text-on-surface-variant">Пн–Сб: 10:00–20:00 · Нд: 11:00–18:00</p>
            </div>
          </div>
        </div>
        <div className="mt-6 h-px bg-outline-variant/15" />
        <Link
          to="/catalog"
          className="mt-5 w-full block text-center gold-gradient-bg gold-glow-hover py-4 font-montserrat text-button-text text-on-primary uppercase tracking-[3px] transition-all active:scale-95"
        >
          Переглянути каталог
        </Link>
      </motion.section>

    </main>
  )
}
