import { useState, useRef } from "react";
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
    desc: "Глубокая очистка любых типов обивки — ткань, велюр, флок, рогожка. Цена зависит от размера и степени загрязнения.",
  },
  {
    icon: "Armchair",
    title: "Чистка кресел",
    desc: "Бережная обработка кресел и пуфов с устранением загрязнений и запахов.",
  },
  {
    icon: "BedDouble",
    title: "Чистка матраса",
    desc: "Гигиеническая очистка, дезинфекция и устранение пятен любой сложности.",
  },
  {
    icon: "Car",
    title: "Автомобильный салон",
    desc: "Химчистка сидений, потолка, дверных карт профессиональным оборудованием.",
  },
  {
    icon: "Wind",
    title: "Чистка ковров",
    desc: "Профессиональная стирка ковров и ковровых покрытий любого размера.",
  },
  {
    icon: "Shield",
    title: "Защитная пропитка",
    desc: "Нанесение защитного покрытия от загрязнений и жидкостей — продлевает срок службы.",
  },
];

const PORTFOLIO = [
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/3586bc42-2da9-4be4-9158-e64aff94c49a.jpg",
    title: "Диван из велюра",
    tag: "Велюр",
  },
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/671084fb-37c6-488d-a9a2-8eeadf4c1132.jpg",
    title: "Оборудование Santoemma",
    tag: "Оборудование",
  },
  {
    img: "https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/39fe7936-fb08-4117-b22f-0d44bea30999.jpg",
    title: "Работа мастеров",
    tag: "Процесс",
  },
];

type BlogPost = {
  date: string;
  tag: string;
  title: string;
  desc: string;
  videoUrl?: string;
};

const BLOG_POSTS_INITIAL: BlogPost[] = [
  {
    date: "15 апреля 2025",
    tag: "Уход",
    title: "Как часто нужно делать химчистку дивана?",
    desc: "Разбираем, от чего зависит частота профессиональной чистки и почему раз в год — это минимум для семей с детьми и домашними животными. Ткань накапливает пыль, микробы и запахи даже при внешней чистоте.",
  },
  {
    date: "02 апреля 2025",
    tag: "Советы",
    title: "5 пятен, которые нельзя тереть",
    desc: "Вино, кофе, жир — рассказываем, как не испортить обивку при попытке убрать пятно самостоятельно. Правило первое: промокайте, не трите. Трение вбивает загрязнение глубже в волокна.",
  },
  {
    date: "20 марта 2025",
    tag: "Материалы",
    title: "Велюр или рогожка: что легче чистить?",
    desc: "Сравниваем популярные материалы обивки с точки зрения ухода и долговечности. Спойлер: рогожка прощает больше ошибок, но велюр выглядит роскошнее.",
  },
];

const TIPS = [
  { num: "01", title: "Чистите пятна сразу", desc: "Свежее пятно убрать в 5 раз легче. Промокайте, не трите — иначе пятно расширяется." },
  { num: "02", title: "Пылесосьте еженедельно", desc: "Пыль и шерсть забивают волокна. Регулярный пылесос продлевает жизнь обивки." },
  { num: "03", title: "Избегайте прямых солнечных лучей", desc: "УФ-излучение выцветает ткань. Используйте шторы в солнечные часы." },
  { num: "04", title: "Переворачивайте подушки", desc: "Меняйте стороны раз в месяц — равномерный износ сохраняет форму." },
  { num: "05", title: "Не используйте кипяток", desc: "Горячая вода деформирует ткань и закрепляет белковые пятна. Только холодная." },
  { num: "06", title: "Доверяйте профессионалам", desc: "Раз в 12–18 месяцев обращайтесь к профессионалам — это продлит срок службы мебели." },
];

const REVIEWS = [
  { name: "Марина К.", city: "Брянск", text: "Результат потряс — диван как новый. Запись онлайн очень удобна, всё чётко по времени.", rating: 5 },
  { name: "Алексей В.", city: "Брянск", text: "Мастер приехал точно в срок, работал аккуратно. Пятна от кофе и красного вина — всё ушло.", rating: 5 },
  { name: "Светлана Р.", city: "Брянская обл.", text: "Заказала чистку кресел и матраса. Качество отличное. Запах свежести держится уже третью неделю.", rating: 5 },
];

const TIMES = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { const d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; }

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
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
  const [bookingComment, setBookingComment] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [activeBlogPost, setActiveBlogPost] = useState<number | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS_INITIAL);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newVideo, setNewVideo] = useState("");

  const today = new Date();
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); };
  const handleNextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); };

  const isDayDisabled = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart || d.getDay() === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleBookingSubmit = () => { if (!bookingName || !bookingPhone) return; setBookingSuccess(true); };

  const resetBooking = () => {
    setBookingOpen(false); setBookingStep(1); setSelectedDate(null); setSelectedTime(null);
    setSelectedService(""); setBookingName(""); setBookingPhone(""); setBookingComment("");
    setBookingSuccess(false); setPhotoFile(null); setPhotoPreview(null);
  };

  const handleAddBlog = () => {
    if (!newTitle || !newDesc) return;
    const now = new Date();
    const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    setBlogPosts([{ date: dateStr, tag: newTag || "Статья", title: newTitle, desc: newDesc, videoUrl: newVideo }, ...blogPosts]);
    setNewTitle(""); setNewDesc(""); setNewTag(""); setNewVideo(""); setShowAddBlog(false);
  };

  return (
    <div className="min-h-screen bg-[#111] font-body text-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-semibold text-white tracking-tight">
            Fresh<span className="text-white/40">&</span>Comfort
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`text-sm font-body tracking-wide transition-colors ${activeSection === item.id ? "text-white font-medium" : "text-white/50 hover:text-white"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:block">
            <button onClick={() => setBookingOpen(true)} className="bg-white text-[#111] text-sm px-6 py-2.5 hover:bg-white/90 transition-colors font-body font-medium tracking-wide">
              Записаться
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-sm font-body text-white/60 hover:text-white transition-colors py-1">{item.label}</button>
            ))}
            <button onClick={() => { setMobileMenuOpen(false); setBookingOpen(true); }} className="bg-white text-[#111] text-sm px-6 py-2.5 w-full text-center mt-2 font-medium">
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex flex-col bg-[#111]">
        <div className="flex-1 grid lg:grid-cols-2 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-6 font-body">Профессиональная химчистка · Брянск</p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-white mb-8">
              Чистота,<br />
              <em className="italic text-white/60">которую</em><br />
              чувствуешь
            </h1>
            <p className="text-white/50 text-lg font-body leading-relaxed max-w-md mb-10">
              Возвращаем мягкой мебели первоначальный вид и свежесть. Оборудование Santoemma Sabrina — профессиональный результат у вас дома.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setBookingOpen(true)} className="bg-white text-[#111] px-8 py-4 text-sm tracking-widest uppercase font-body font-medium hover:bg-white/90 transition-colors">
                Записаться онлайн
              </button>
              <button onClick={() => scrollTo("services")} className="border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase font-body hover:border-white/60 transition-colors">
                Наши услуги
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
              <img src="https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/3586bc42-2da9-4be4-9158-e64aff94c49a.jpg"
                alt="Химчистка мебели" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-white/10 px-6 py-4 shadow-2xl">
              <p className="font-display text-3xl font-semibold text-white">1 год</p>
              <p className="text-xs text-white/40 font-body mt-1">на рынке · уже 100+ клиентов</p>
            </div>
            <div className="absolute top-6 -right-4 bg-white text-[#111] px-4 py-3">
              <p className="text-xs font-body font-medium">Santoemma</p>
              <p className="font-display text-lg font-semibold">Sabrina</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#161616]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "1 год", label: "уверенного старта" },
              { val: "100+", label: "довольных клиентов" },
              { val: "24ч", label: "сухой результат" },
              { val: "100%", label: "безопасные средства" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-semibold text-white">{s.val}</p>
                <p className="text-xs text-white/40 font-body mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 md:px-12 lg:px-20 bg-[#161616]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Что мы делаем</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white">Услуги</h2>
            <p className="text-white/40 font-body mt-4 max-w-xl">
              Цена рассчитывается индивидуально — по размеру, материалу и степени загрязнения.
              Просто пришлите фото, и мы назовём точную стоимость.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#161616] p-8 group hover:bg-[#1e1e1e] transition-colors cursor-default">
                <div className="w-10 h-10 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Icon name={s.icon as "Sofa"} size={20} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-medium text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm font-body leading-relaxed mb-6">{s.desc}</p>
                <button onClick={() => setBookingOpen(true)}
                  className="text-xs font-body text-white/40 hover:text-white transition-colors flex items-center gap-1 border-b border-white/10 pb-px hover:border-white/40">
                  Узнать цену по фото <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <button onClick={() => setBookingOpen(true)} className="bg-white text-[#111] px-10 py-4 text-sm tracking-widest uppercase font-body font-medium hover:bg-white/90 transition-colors">
              Отправить фото для расчёта цены
            </button>
            <p className="text-white/30 text-xs font-body">Ответим в течение 15 минут</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-20 bg-[#111]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden bg-[#1a1a1a]">
              <img src="https://cdn.poehali.dev/projects/64b1e0e9-f90b-46b3-b28a-e52580697f94/files/39fe7936-fb08-4117-b22f-0d44bea30999.jpg"
                alt="Наши мастера" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute bottom-8 right-8 bg-[#111] border border-white/10 p-6 max-w-xs shadow-2xl">
              <p className="font-display text-4xl font-light text-white">2024</p>
              <p className="text-sm text-white/40 font-body mt-1">Год основания — молодая, но дерзкая команда</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Наша команда</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white mb-8">О нас</h2>
            <p className="text-white/60 font-body leading-relaxed mb-6">
              Fresh&Comfort — это двое парней из Брянска, которые решили делать химчистку мебели по-настоящему хорошо. Мы молодые, но упорные: вкладываемся в профессиональное оборудование Santoemma Sabrina и честно подходим к каждому клиенту.
            </p>
            <p className="text-white/60 font-body leading-relaxed mb-10">
              Мы не называем цену наобум — сначала смотрим на реальное состояние мебели. Пришлите фото, и получите точный расчёт без лишних слов.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "CheckCircle", text: "Выезд по Брянску и области" },
                { icon: "CheckCircle", text: "Оборудование Santoemma" },
                { icon: "CheckCircle", text: "Безопасная сертифицированная химия" },
                { icon: "CheckCircle", text: "Цена по факту — без сюрпризов" },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <Icon name={f.icon as "CheckCircle"} size={15} className="text-white/60 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60 font-body">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 px-6 md:px-12 lg:px-20 bg-[#161616]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Наши работы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white">Портфолио</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="group overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <h3 className="font-display text-xl text-white">{p.title}</h3>
                  <span className="text-xs text-white/40 font-body border border-white/15 px-3 py-1">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 px-6 md:px-12 lg:px-20 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Полезно знать</p>
              <h2 className="font-display text-5xl md:text-6xl font-light text-white">Блог</h2>
            </div>
            <button onClick={() => setShowAddBlog(!showAddBlog)}
              className="flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-5 py-2.5 text-sm font-body transition-colors">
              <Icon name={showAddBlog ? "X" : "Plus"} size={14} />
              {showAddBlog ? "Отмена" : "Добавить запись"}
            </button>
          </div>

          {showAddBlog && (
            <div className="bg-[#1a1a1a] border border-white/10 p-6 mb-8 animate-fade-in">
              <p className="font-display text-xl text-white mb-5">Новая запись в блог</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Заголовок *"
                  className="bg-[#111] border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/40 transition-colors" />
                <input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Тег (например: Советы)"
                  className="bg-[#111] border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/40 transition-colors" />
              </div>
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Текст статьи *" rows={4}
                className="w-full bg-[#111] border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/40 transition-colors resize-none mb-4" />
              <div className="flex items-center gap-3 mb-5">
                <Icon name="Youtube" size={16} className="text-white/40 flex-shrink-0" />
                <input value={newVideo} onChange={e => setNewVideo(e.target.value)} placeholder="Ссылка на YouTube-видео (необязательно)"
                  className="flex-1 bg-[#111] border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/40 transition-colors" />
              </div>
              <button onClick={handleAddBlog} disabled={!newTitle || !newDesc}
                className="bg-white text-[#111] px-8 py-3 text-sm font-body font-medium hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Опубликовать
              </button>
            </div>
          )}

          <div className="space-y-px bg-white/5">
            {blogPosts.map((post, i) => (
              <div key={i} className="bg-[#111] p-8 md:p-10 cursor-pointer group" onClick={() => setActiveBlogPost(activeBlogPost === i ? null : i)}>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs text-white/30 font-body">{post.date}</span>
                      <span className="text-xs text-white/60 border border-white/15 px-2 py-0.5 font-body">{post.tag}</span>
                      {post.videoUrl && getYouTubeId(post.videoUrl) && (
                        <span className="text-xs text-white/40 border border-white/10 px-2 py-0.5 font-body flex items-center gap-1">
                          <Icon name="Play" size={10} />Видео
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-white group-hover:text-white/70 transition-colors">{post.title}</h3>
                    {activeBlogPost === i && (
                      <div className="mt-4 animate-fade-in">
                        <p className="text-white/60 font-body leading-relaxed mb-4">{post.desc}</p>
                        {post.videoUrl && getYouTubeId(post.videoUrl) && (
                          <div className="aspect-video mt-4 overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${getYouTubeId(post.videoUrl)}`}
                              className="w-full h-full"
                              allowFullScreen
                              title={post.title}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <Icon name={activeBlogPost === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-white/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-20 px-6 md:px-12 lg:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Эксперты советуют</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white">Рекомендации</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {TIPS.map((tip) => (
              <div key={tip.num} className="bg-[#0a0a0a] p-8 group hover:bg-[#111] transition-colors">
                <p className="font-display text-5xl font-light text-white/10 mb-6 group-hover:text-white/20 transition-colors">{tip.num}</p>
                <h3 className="font-display text-xl font-medium text-white mb-3">{tip.title}</h3>
                <p className="text-white/50 text-sm font-body leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-10 font-body">Отзывы клиентов</p>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
                <div key={i} className="border border-white/10 p-8 bg-[#111]">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={13} className="text-white/50 fill-white/50" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm font-body leading-relaxed mb-6 italic">«{r.text}»</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-white text-lg">{r.name}</p>
                    <p className="text-xs text-white/30 font-body">{r.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6 md:px-12 lg:px-20 bg-[#161616]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4 font-body">Связь с нами</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white mb-10">Контакты</h2>

            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "8 (950) 698-68-85" },
                { icon: "Mail", label: "Email", value: "freshcomfort@yandex.ru" },
                { icon: "MapPin", label: "Адрес", value: "г. Брянск, Брянская область" },
                { icon: "Clock", label: "График", value: "Ежедневно: 9:00–21:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-white/10">
                    <Icon name={c.icon as "Phone"} size={15} className="text-white/50 group-hover:text-[#111] transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-body">{c.label}</p>
                    <p className="text-white font-body font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 p-8 md:p-10">
            <h3 className="font-display text-3xl font-light text-white mb-2">Написать нам</h3>
            <p className="text-white/40 text-sm font-body mb-6">Можете сразу прислать фото мебели — рассчитаем цену</p>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя"
                className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors" />
              <input type="tel" placeholder="Телефон"
                className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors" />
              <textarea placeholder="Ваш вопрос или пожелание" rows={3}
                className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none" />
              <button className="w-full bg-white text-[#111] py-4 text-sm tracking-widest uppercase font-body font-medium hover:bg-white/90 transition-colors">
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 text-white/40 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-white text-lg">Fresh<span className="text-white/30">&</span>Comfort</p>
          <p className="text-xs font-body">© 2025 Fresh&Comfort · Брянск</p>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xs font-body hover:text-white transition-colors">{item.label}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={resetBooking} />
          <div className="relative bg-[#161616] border border-white/10 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {!bookingSuccess ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h3 className="font-display text-2xl text-white">Онлайн-запись</h3>
                    <p className="text-xs text-white/40 font-body mt-1">Шаг {bookingStep} из 3</p>
                  </div>
                  <button onClick={resetBooking} className="text-white/40 hover:text-white transition-colors">
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="flex h-1 bg-white/5">
                  <div className="bg-white transition-all duration-500" style={{ width: `${(bookingStep / 3) * 100}%` }} />
                </div>

                <div className="p-6">
                  {bookingStep === 1 && (
                    <div>
                      <p className="font-display text-xl text-white mb-6">Выберите услугу</p>
                      <div className="space-y-2">
                        {SERVICES.map((s) => (
                          <button key={s.title} onClick={() => setSelectedService(s.title)}
                            className={`w-full text-left px-4 py-4 border transition-colors font-body text-sm ${
                              selectedService === s.title
                                ? "border-white bg-white text-[#111]"
                                : "border-white/10 text-white hover:border-white/30"
                            }`}>
                            {s.title}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 border border-white/10 p-4 bg-[#111]">
                        <p className="text-white/60 text-sm font-body mb-3 flex items-center gap-2">
                          <Icon name="Camera" size={14} />
                          Прикрепите фото мебели — мы рассчитаем цену
                        </p>
                        <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        {photoPreview ? (
                          <div className="relative">
                            <img src={photoPreview} alt="preview" className="w-full h-40 object-cover" />
                            <button onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                              className="absolute top-2 right-2 bg-black/60 text-white p-1 hover:bg-black transition-colors">
                              <Icon name="X" size={14} />
                            </button>
                            <p className="text-xs text-white/40 font-body mt-2 truncate">{photoFile?.name}</p>
                          </div>
                        ) : (
                          <button onClick={() => photoInputRef.current?.click()}
                            className="w-full border border-dashed border-white/15 py-8 text-center text-white/30 hover:text-white/60 hover:border-white/30 transition-colors text-sm font-body flex flex-col items-center gap-2">
                            <Icon name="Upload" size={20} />
                            Нажмите для загрузки фото
                          </button>
                        )}
                      </div>

                      <button disabled={!selectedService} onClick={() => setBookingStep(2)}
                        className="mt-6 w-full bg-white text-[#111] py-4 text-sm tracking-widest uppercase font-body font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        Далее
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <p className="font-display text-xl text-white mb-6">Выберите дату и время</p>

                      <div className="border border-white/10 p-4 mb-4 bg-[#111]">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={handlePrevMonth} className="text-white/40 hover:text-white transition-colors"><Icon name="ChevronLeft" size={18} /></button>
                          <p className="font-display text-lg text-white">{MONTHS[calMonth]} {calYear}</p>
                          <button onClick={handleNextMonth} className="text-white/40 hover:text-white transition-colors"><Icon name="ChevronRight" size={18} /></button>
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                          {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map((d) => (
                            <div key={d} className="text-center text-xs text-white/30 font-body py-1">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const disabled = isDayDisabled(day);
                            const selected = selectedDate === dateStr;
                            return (
                              <button key={day} disabled={disabled} onClick={() => setSelectedDate(dateStr)}
                                className={`aspect-square text-xs font-body transition-colors ${
                                  selected ? "bg-white text-[#111] font-medium"
                                  : disabled ? "text-white/15 cursor-not-allowed"
                                  : "hover:bg-white/10 text-white/70"
                                }`}>
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {selectedDate && (
                        <div>
                          <p className="text-xs text-white/40 font-body mb-3 uppercase tracking-wide">Время</p>
                          <div className="grid grid-cols-4 gap-2">
                            {TIMES.map((t) => (
                              <button key={t} onClick={() => setSelectedTime(t)}
                                className={`py-2 text-xs font-body border transition-colors ${
                                  selectedTime === t ? "border-white bg-white text-[#111] font-medium" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                                }`}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setBookingStep(1)} className="flex-1 border border-white/15 text-white/60 py-4 text-sm font-body hover:border-white/40 hover:text-white transition-colors">Назад</button>
                        <button disabled={!selectedDate || !selectedTime} onClick={() => setBookingStep(3)}
                          className="flex-1 bg-white text-[#111] py-4 text-sm font-body font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          Далее
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <p className="font-display text-xl text-white mb-2">Ваши данные</p>
                      <div className="bg-[#111] border border-white/10 p-4 mb-6 text-sm font-body">
                        <p className="text-white/40">Услуга: <span className="text-white">{selectedService}</span></p>
                        <p className="text-white/40">Дата: <span className="text-white">{selectedDate}</span></p>
                        <p className="text-white/40">Время: <span className="text-white">{selectedTime}</span></p>
                        {photoFile && <p className="text-white/40 mt-1">Фото прикреплено: <span className="text-white/60 text-xs">{photoFile.name}</span></p>}
                      </div>
                      <div className="space-y-4">
                        <input type="text" placeholder="Ваше имя *" value={bookingName} onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-[#111] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors" />
                        <input type="tel" placeholder="Телефон *" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full bg-[#111] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors" />
                        <textarea placeholder="Комментарий (тип мебели, адрес, этаж...)" rows={3} value={bookingComment} onChange={e => setBookingComment(e.target.value)}
                          className="w-full bg-[#111] border border-white/10 px-4 py-3 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none" />
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setBookingStep(2)} className="flex-1 border border-white/15 text-white/60 py-4 text-sm font-body hover:border-white/40 hover:text-white transition-colors">Назад</button>
                        <button disabled={!bookingName || !bookingPhone} onClick={handleBookingSubmit}
                          className="flex-1 bg-white text-[#111] py-4 text-sm font-body font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          Подтвердить запись
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-6">
                  <Icon name="Check" size={28} className="text-[#111]" />
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Запись принята!</h3>
                <p className="text-white/50 font-body text-sm leading-relaxed mb-2">
                  Мы свяжемся с вами в ближайшее время.<br />
                  <span className="text-white font-medium">{selectedService}</span> — {selectedDate} в {selectedTime}
                </p>
                {photoFile && <p className="text-white/30 text-xs font-body mb-6">Фото получено — рассчитаем цену при звонке.</p>}
                <button onClick={resetBooking} className="mt-4 bg-white text-[#111] px-10 py-4 text-sm tracking-widest uppercase font-body font-medium hover:bg-white/90 transition-colors">
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Float CTA */}
      <button onClick={() => setBookingOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white text-[#111] px-5 py-3 shadow-xl hover:bg-white/90 transition-colors flex items-center gap-2 font-body font-medium text-sm">
        <Icon name="Calendar" size={16} />
        Записаться
      </button>
    </div>
  );
}
