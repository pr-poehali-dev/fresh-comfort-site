import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О нас" },
  { id: "portfolio", label: "Портфолио" },
  { id: "blog", label: "Блог" },
  { id: "tips", label: "Рекомендации" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  {
    icon: "Sofa",
    title: "Химчистка дивана",
    desc: "Глубокая очистка любых типов обивки — ткань, велюр, флок, рогожка",
    price: "от 2 500 ₽",
  },
  {
    icon: "Armchair",
    title: "Чистка кресел",
    desc: "Бережная обработка кресел и пуфов с устранением загрязнений и запахов",
    price: "от 800 ₽",
  },
  {
    icon: "BedDouble",
    title: "Чистка матраса",
    desc: "Гигиеническая очистка, дезинфекция и устранение пятен",
    price: "от 1 500 ₽",
  },
  {
    icon: "Car",
    title: "Автомобильный салон",
    desc: "Химчистка сидений, потолка, дверных карт",
    price: "от 3 000 ₽",
  },
  {
    icon: "Star",
    title: "Чистка ковров",
    desc: "Профессиональная стирка ковров и ковровых покрытий",
    price: "от 120 ₽/м²",
  },
  {
    icon: "Shield",
    title: "Защитная пропитка",
    desc: "Нанесение защитного покрытия от загрязнений и жидкостей",
    price: "от 600 ₽",
  },
];

const PORTFOLIO = [
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/19c7f961-e127-4251-83ae-75558e8721a5.jpg",
    title: "Диван из велюра",
    tag: "Велюр",
  },
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/73d3f5fc-1986-4786-8b6f-2f3bbedbae8b.jpg",
    title: "Кресло в гостиную",
    tag: "Флок",
  },
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/51567d44-497f-4654-8014-6c83ef58bb54.jpg",
    title: "Угловой диван",
    tag: "Рогожка",
  },
];

const BLOG_POSTS = [
  {
    date: "15 апреля 2026",
    tag: "Уход",
    title: "Как часто нужно делать химчистку дивана?",
    desc: "Разбираем, от чего зависит частота профессиональной чистки и почему раз в год — это минимум для семей с детьми и домашними животными. Ткань накапливает пыль, микробы и запахи даже при внешней чистоте.",
  },
  {
    date: "02 апреля 2026",
    tag: "Советы",
    title: "5 пятен, которые нельзя тереть",
    desc: "Вино, кофе, жир — рассказываем, как не испортить обивку при попытке убрать пятно самостоятельно. Правило первое: промокайте, не трите. Трение вбивает загрязнение глубже в волокна.",
  },
  {
    date: "20 марта 2026",
    tag: "Материалы",
    title: "Велюр или рогожка: что легче чистить?",
    desc: "Сравниваем популярные материалы обивки с точки зрения ухода и долговечности. Спойлер: рогожка прощает больше ошибок, но велюр выглядит роскошнее.",
  },
];

const TIPS = [
  {
    num: "01",
    title: "Чистите пятна сразу",
    desc: "Свежее пятно убрать в 5 раз легче, чем засохшее. Промокайте, не трите — иначе пятно расширяется.",
  },
  {
    num: "02",
    title: "Пылесосьте еженедельно",
    desc: "Пыль и шерсть домашних животных забивают волокна ткани. Регулярный пылесос продлевает жизнь обивки.",
  },
  {
    num: "03",
    title: "Избегайте прямых солнечных лучей",
    desc: "УФ-излучение выцветает ткань. Используйте шторы или жалюзи в солнечные часы.",
  },
  {
    num: "04",
    title: "Переворачивайте подушки",
    desc: "Меняйте стороны подушек раз в месяц — это обеспечит равномерный износ и сохранит форму.",
  },
  {
    num: "05",
    title: "Не используйте кипяток",
    desc: "Горячая вода деформирует ткань и закрепляет белковые пятна (кровь, молоко). Только холодная вода.",
  },
  {
    num: "06",
    title: "Доверяйте профессионалам",
    desc: "Раз в 12–18 месяцев обращайтесь к профессионалам — это продлит срок службы мебели на годы.",
  },
];

const REVIEWS = [
  {
    name: "Марина К.",
    city: "Москва",
    text: "Привезли диван в ужасном состоянии — после трёх лет с двумя детьми. Результат потряс: как новый. Запись онлайн очень удобна, всё чётко по времени.",
    rating: 5,
  },
  {
    name: "Алексей В.",
    city: "Москва",
    text: "Чистили угловой диван из рогожки. Мастер приехал точно в срок, работал аккуратно. Пятна от кофе и красного вина — всё ушло. Рекомендую.",
    rating: 5,
  },
  {
    name: "Светлана Р.",
    city: "Подмосковье",
    text: "Заказала чистку кресел и матраса. Цена адекватная, качество отличное. Запах свежести держится уже третью неделю. Буду обращаться регулярно.",
    rating: 5,
  },
];

const TIMES = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00",
];

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [activeBlogPost, setActiveBlogPost] = useState<number | null>(null);

  const today = new Date();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const isDayDisabled = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart || d.getDay() === 0;
  };

  const handleBookingSubmit = () => {
    if (!bookingName || !bookingPhone) return;
    setBookingSuccess(true);
  };

  const resetBooking = () => {
    setBookingOpen(false);
    setBookingStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService("");
    setBookingName("");
    setBookingPhone("");
    setBookingSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] font-body">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f7]/95 backdrop-blur-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-semibold tracking-tight text-[#141414]">
            Fresh<span className="text-[#888]">&</span>Comfort
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-body tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-[#141414] font-medium"
                    : "text-[#888] hover:text-[#141414]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-[#141414] text-white text-sm px-6 py-2.5 hover:bg-[#333] transition-colors font-body tracking-wide"
            >
              Записаться
            </button>
          </div>

          <button
            className="lg:hidden text-[#141414]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#f9f9f7] border-t border-[#e0e0e0] px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-body text-[#444] hover:text-[#141414] transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); setBookingOpen(true); }}
              className="bg-[#141414] text-white text-sm px-6 py-2.5 w-full text-center mt-2"
            >
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 grid lg:grid-cols-2 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 gap-12 items-center">
          <div className="animate-fade-in">
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-6 font-body">
              Профессиональная химчистка
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#141414] mb-8">
              Чистота,<br />
              <em className="italic">которую</em><br />
              чувствуешь
            </h1>
            <p className="text-[#666] text-lg font-body leading-relaxed max-w-md mb-10">
              Возвращаем мягкой мебели первоначальный вид и свежесть.
              Работаем аккуратно, без запаха, без вреда для ткани.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#141414] text-white px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-[#333] transition-colors"
              >
                Записаться онлайн
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="border border-[#c0c0c0] text-[#141414] px-8 py-4 text-sm tracking-widest uppercase font-body hover:border-[#141414] transition-colors"
              >
                Наши услуги
              </button>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-[4/5] overflow-hidden bg-[#e8e8e4]">
              <img
                src="https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/19c7f961-e127-4251-83ae-75558e8721a5.jpg"
                alt="Химчистка мебели"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#e0e0e0] px-6 py-4 shadow-lg">
              <p className="font-display text-3xl font-semibold text-[#141414]">500+</p>
              <p className="text-xs text-[#888] font-body mt-1">довольных клиентов</p>
            </div>
            <div className="absolute top-6 -right-6 bg-[#141414] text-white px-4 py-3">
              <p className="text-xs font-body tracking-wide">Гарантия</p>
              <p className="font-display text-lg font-medium">качества</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e0e0e0] bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "7 лет", label: "на рынке" },
              { val: "500+", label: "клиентов" },
              { val: "24ч", label: "сухой результат" },
              { val: "100%", label: "безопасные средства" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-semibold text-[#141414]">{s.val}</p>
                <p className="text-xs text-[#888] font-body mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 md:px-12 lg:px-20 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-4 font-body">Что мы делаем</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#141414]">Услуги</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0e0e0]">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#f9f9f7] p-8 hover-lift group cursor-default">
                <div className="w-10 h-10 flex items-center justify-center mb-6">
                  <Icon name={s.icon as "Sofa"} size={24} className="text-[#888] group-hover:text-[#141414] transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#141414] mb-3">{s.title}</h3>
                <p className="text-[#888] text-sm font-body leading-relaxed mb-6">{s.desc}</p>
                <p className="font-display text-xl font-semibold text-[#141414]">{s.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-[#141414] text-white px-10 py-4 text-sm tracking-widest uppercase font-body hover:bg-[#333] transition-colors"
            >
              Записаться на услугу
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden bg-[#e8e8e4]">
              <img
                src="https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/51567d44-497f-4654-8014-6c83ef58bb54.jpg"
                alt="О компании"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-white border border-[#e0e0e0] p-6 max-w-xs shadow-lg">
              <p className="font-display text-4xl font-light text-[#141414]">2017</p>
              <p className="text-sm text-[#888] font-body mt-1">Год основания компании</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-4 font-body">Наша история</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#141414] mb-8">О нас</h2>
            <p className="text-[#555] font-body leading-relaxed mb-6">
              Fresh&Comfort — команда профессионалов с семилетним опытом в индустрии химчистки мягкой мебели. Мы начинали как небольшая мастерская и выросли в одну из самых доверенных компаний региона.
            </p>
            <p className="text-[#555] font-body leading-relaxed mb-10">
              Мы используем только сертифицированную химию European Standart, безопасную для детей и животных. Наши мастера проходят регулярное обучение и знают всё о работе с любыми видами тканей.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "CheckCircle", text: "Выезд на дом или в офис" },
                { icon: "CheckCircle", text: "Гарантия результата" },
                { icon: "CheckCircle", text: "Безопасная химия" },
                { icon: "CheckCircle", text: "Страховка на работы" },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <Icon name={f.icon as "CheckCircle"} size={16} className="text-[#141414] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#555] font-body">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 px-6 md:px-12 lg:px-20 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-4 font-body">Наши работы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#141414]">Портфолио</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="group overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-[#e8e8e4]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <h3 className="font-display text-xl text-[#141414]">{p.title}</h3>
                  <span className="text-xs text-[#888] font-body border border-[#d0d0d0] px-3 py-1">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-4 font-body">Полезно знать</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#141414]">Блог</h2>
          </div>

          <div className="space-y-px bg-[#e0e0e0]">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="bg-white p-8 md:p-10 cursor-pointer group"
                onClick={() => setActiveBlogPost(activeBlogPost === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs text-[#888] font-body">{post.date}</span>
                      <span className="text-xs text-[#141414] border border-[#c0c0c0] px-2 py-0.5 font-body">{post.tag}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-[#141414] group-hover:text-[#555] transition-colors">
                      {post.title}
                    </h3>
                    {activeBlogPost === i && (
                      <p className="mt-4 text-[#666] font-body leading-relaxed animate-fade-in">{post.desc}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <Icon
                      name={activeBlogPost === i ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      className="text-[#888]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS / RECOMMENDATIONS */}
      <section id="tips" className="py-20 px-6 md:px-12 lg:px-20 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Эксперты советуют</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white">Рекомендации</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {TIPS.map((tip) => (
              <div key={tip.num} className="bg-[#141414] p-8 group hover:bg-[#1e1e1e] transition-colors">
                <p className="font-display text-5xl font-light text-white/20 mb-6 group-hover:text-white/40 transition-colors">
                  {tip.num}
                </p>
                <h3 className="font-display text-xl font-medium text-white mb-3">{tip.title}</h3>
                <p className="text-white/60 text-sm font-body leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-10 font-body">Отзывы клиентов</p>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
                <div key={i} className="border border-white/10 p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-white/60 fill-white/60" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm font-body leading-relaxed mb-6 italic">
                    «{r.text}»
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-white text-lg">{r.name}</p>
                    <p className="text-xs text-white/40 font-body">{r.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#888] uppercase mb-4 font-body">Связь с нами</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#141414] mb-10">Контакты</h2>

            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@freshcomfort.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва и область, выезд на дом" },
                { icon: "Clock", label: "График", value: "Пн–Сб: 9:00–20:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[#f5f5f3] flex items-center justify-center flex-shrink-0 group-hover:bg-[#141414] transition-colors">
                    <Icon name={c.icon as "Phone"} size={16} className="text-[#888] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[#888] font-body">{c.label}</p>
                    <p className="text-[#141414] font-body font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f5f5f3] p-8 md:p-10">
            <h3 className="font-display text-3xl font-light text-[#141414] mb-6">Написать нам</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors"
              />
              <textarea
                placeholder="Ваш вопрос или пожелание"
                rows={4}
                className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors resize-none"
              />
              <button className="w-full bg-[#141414] text-white py-4 text-sm tracking-widest uppercase font-body hover:bg-[#333] transition-colors">
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141414] text-white/60 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-white text-lg">
            Fresh<span className="text-white/40">&</span>Comfort
          </p>
          <p className="text-xs font-body">© 2026 Fresh&Comfort. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-body hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetBooking} />
          <div className="relative bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {!bookingSuccess ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-[#e0e0e0]">
                  <div>
                    <h3 className="font-display text-2xl text-[#141414]">Онлайн-запись</h3>
                    <p className="text-xs text-[#888] font-body mt-1">Шаг {bookingStep} из 3</p>
                  </div>
                  <button onClick={resetBooking} className="text-[#888] hover:text-[#141414]">
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="flex h-1 bg-[#f0f0f0]">
                  <div
                    className="bg-[#141414] transition-all duration-500"
                    style={{ width: `${(bookingStep / 3) * 100}%` }}
                  />
                </div>

                <div className="p-6">
                  {bookingStep === 1 && (
                    <div>
                      <p className="font-display text-xl text-[#141414] mb-6">Выберите услугу</p>
                      <div className="space-y-2">
                        {SERVICES.map((s) => (
                          <button
                            key={s.title}
                            onClick={() => setSelectedService(s.title)}
                            className={`w-full text-left px-4 py-4 border transition-colors font-body text-sm ${
                              selectedService === s.title
                                ? "border-[#141414] bg-[#141414] text-white"
                                : "border-[#e0e0e0] text-[#141414] hover:border-[#888]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{s.title}</span>
                              <span className={`text-xs ${selectedService === s.title ? "text-white/70" : "text-[#888]"}`}>
                                {s.price}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={!selectedService}
                        onClick={() => setBookingStep(2)}
                        className="mt-6 w-full bg-[#141414] text-white py-4 text-sm tracking-widest uppercase font-body hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Далее
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <p className="font-display text-xl text-[#141414] mb-6">Выберите дату и время</p>

                      <div className="border border-[#e0e0e0] p-4 mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={handlePrevMonth} className="text-[#888] hover:text-[#141414]">
                            <Icon name="ChevronLeft" size={18} />
                          </button>
                          <p className="font-display text-lg text-[#141414]">
                            {MONTHS[calMonth]} {calYear}
                          </p>
                          <button onClick={handleNextMonth} className="text-[#888] hover:text-[#141414]">
                            <Icon name="ChevronRight" size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 mb-2">
                          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                            <div key={d} className="text-center text-xs text-[#888] font-body py-1">{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`e-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const disabled = isDayDisabled(day);
                            const selected = selectedDate === dateStr;
                            return (
                              <button
                                key={day}
                                disabled={disabled}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`aspect-square text-xs font-body transition-colors ${
                                  selected
                                    ? "bg-[#141414] text-white"
                                    : disabled
                                    ? "text-[#ccc] cursor-not-allowed"
                                    : "hover:bg-[#f0f0f0] text-[#141414]"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {selectedDate && (
                        <div>
                          <p className="text-xs text-[#888] font-body mb-3 uppercase tracking-wide">Время</p>
                          <div className="grid grid-cols-5 gap-2">
                            {TIMES.map((t) => (
                              <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className={`py-2 text-xs font-body border transition-colors ${
                                  selectedTime === t
                                    ? "border-[#141414] bg-[#141414] text-white"
                                    : "border-[#e0e0e0] text-[#141414] hover:border-[#888]"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setBookingStep(1)}
                          className="flex-1 border border-[#d0d0d0] text-[#141414] py-4 text-sm font-body hover:border-[#141414] transition-colors"
                        >
                          Назад
                        </button>
                        <button
                          disabled={!selectedDate || !selectedTime}
                          onClick={() => setBookingStep(3)}
                          className="flex-1 bg-[#141414] text-white py-4 text-sm font-body hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Далее
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <p className="font-display text-xl text-[#141414] mb-2">Ваши данные</p>
                      <div className="bg-[#f5f5f3] p-4 mb-6 text-sm font-body">
                        <p className="text-[#888]">Услуга: <span className="text-[#141414] font-medium">{selectedService}</span></p>
                        <p className="text-[#888]">Дата: <span className="text-[#141414] font-medium">{selectedDate}</span></p>
                        <p className="text-[#888]">Время: <span className="text-[#141414] font-medium">{selectedTime}</span></p>
                      </div>

                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Ваше имя *"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder="Телефон *"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors"
                        />
                        <textarea
                          placeholder="Комментарий (тип мебели, этаж и т.д.)"
                          rows={3}
                          className="w-full border border-[#d0d0d0] bg-white px-4 py-3 text-sm font-body text-[#141414] placeholder-[#aaa] focus:outline-none focus:border-[#141414] transition-colors resize-none"
                        />
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setBookingStep(2)}
                          className="flex-1 border border-[#d0d0d0] text-[#141414] py-4 text-sm font-body hover:border-[#141414] transition-colors"
                        >
                          Назад
                        </button>
                        <button
                          disabled={!bookingName || !bookingPhone}
                          onClick={handleBookingSubmit}
                          className="flex-1 bg-[#141414] text-white py-4 text-sm font-body hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Подтвердить запись
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-[#141414] flex items-center justify-center mx-auto mb-6">
                  <Icon name="Check" size={28} className="text-white" />
                </div>
                <h3 className="font-display text-3xl text-[#141414] mb-3">Запись принята!</h3>
                <p className="text-[#888] font-body text-sm leading-relaxed mb-8">
                  Мы свяжемся с вами в ближайшее время для подтверждения записи.<br />
                  <strong className="text-[#141414]">{selectedService}</strong> — {selectedDate} в {selectedTime}
                </p>
                <button
                  onClick={resetBooking}
                  className="bg-[#141414] text-white px-10 py-4 text-sm tracking-widest uppercase font-body hover:bg-[#333] transition-colors"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating CTA */}
      <button
        onClick={() => setBookingOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#141414] text-white px-5 py-3 shadow-xl hover:bg-[#333] transition-colors flex items-center gap-2 font-body text-sm"
      >
        <Icon name="Calendar" size={16} />
        Записаться
      </button>
    </div>
  );
}
