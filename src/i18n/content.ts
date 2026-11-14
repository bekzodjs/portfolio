import type { TimelineItem } from "@/data/site";
import type { Profile, Project } from "@/lib/content";
import type { Lang } from "./config";

/**
 * Uzbek and Russian versions of the site content, keyed by the English text.
 *
 * The English text is the source (src/data/site.ts and the admin panel). A text
 * that has no entry here is shown in English, so after you change or add
 * something in the admin panel, add its translation below to keep the /uz and
 * /ru pages fully translated.
 */
const T: Record<string, { uz: string; ru: string }> = {
  // ---------- Name ----------
  Bekzod: { uz: "Bekzod", ru: "Бекзод" },
  Toxtamuratov: { uz: "Toxtamuratov", ru: "Тохтамуратов" },

  // ---------- Hero ----------
  "Full-Stack Developer: Frontend & Backend.": {
    uz: "Full-stack dasturchi: frontend va backend.",
    ru: "Full-stack разработчик: фронтенд и бэкенд.",
  },
  "Creative Developer & Digital Designer.": {
    uz: "Kreativ dasturchi va raqamli dizayner.",
    ru: "Креативный разработчик и цифровой дизайнер.",
  },
  "I design and build fast websites and Telegram bots with JavaScript, from the first sketch to the day they go live.":
    {
      uz: "JavaScript yordamida tezkor veb-saytlar va Telegram botlar yarataman: birinchi chizmadan ishga tushadigan kungacha.",
      ru: "Проектирую и разрабатываю быстрые сайты и Telegram-боты на JavaScript: от первого эскиза до дня запуска.",
    },
  "Tashkent, Uzbekistan": { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан" },

  // ---------- About ----------
  "I'm a frontend developer from Tashkent. Most of my days go into JavaScript: company websites, landing pages, and Telegram bots that take orders and payments without sending people to another app.":
    {
      uz: "Men Toshkentlik frontend dasturchiman. Kunlarimning ko'p qismi JavaScript bilan o'tadi: kompaniya saytlari, lending sahifalar hamda buyurtma va to'lovlarni boshqa ilovaga o'tkazmasdan qabul qiladigan Telegram botlar.",
      ru: "Я фронтенд-разработчик из Ташкента. Большую часть времени пишу на JavaScript: сайты компаний, лендинги и Telegram-боты, которые принимают заказы и оплату, не отправляя человека в другое приложение.",
    },
  "I'm a full-stack developer from Tashkent. I build the whole product in JavaScript and TypeScript: React and Next.js interfaces, NestJS and PostgreSQL backends, and Telegram bots that take orders and payments without sending people to another app.":
    {
      uz: "Men Toshkentlik full-stack dasturchiman. Mahsulotni JavaScript va TypeScript'da boshidan oxirigacha yarataman: React va Next.js'dagi interfeyslar, NestJS va PostgreSQL'dagi backend hamda buyurtma va to'lovlarni boshqa ilovaga o'tkazmasdan qabul qiladigan Telegram botlar.",
      ru: "Я full-stack разработчик из Ташкента. Делаю продукт целиком на JavaScript и TypeScript: интерфейсы на React и Next.js, бэкенд на NestJS и PostgreSQL и Telegram-боты, которые принимают заказы и оплату, не отправляя человека в другое приложение.",
    },
  "I care about the parts visitors feel before they notice them: pages that open at once, layouts that hold up on a small phone, forms that tell you what went wrong.":
    {
      uz: "Men uchun foydalanuvchi payqamasdan his qiladigan jihatlar muhim: darhol ochiladigan sahifalar, kichik telefonda ham buzilmaydigan dizayn, xatoni tushunarli aytadigan formalar.",
      ru: "Мне важны вещи, которые посетитель чувствует раньше, чем замечает: страницы, которые открываются сразу, вёрстка, которая не ломается на маленьком телефоне, формы, которые объясняют, что пошло не так.",
    },
  "Alongside client work I'm finishing a master's degree in computer engineering, so the questions I ask about a product tend to go one layer deeper than the screen.":
    {
      uz: "Mijozlar bilan ishlash bilan birga kompyuter injiniringi bo'yicha magistraturada o'qiyman, shuning uchun mahsulot haqidagi savollarim odatda ekrandan bir qavat chuqurroq boradi.",
      ru: "Параллельно с работой над проектами я учусь в магистратуре по компьютерной инженерии, поэтому мои вопросы о продукте обычно уходят на уровень глубже экрана.",
    },
  "Based in": { uz: "Joylashuv", ru: "Город" },
  Focus: { uz: "Yo'nalish", ru: "Специализация" },
  "Websites, Telegram bots and Mini Apps": {
    uz: "Veb-saytlar, Telegram botlar va Mini App'lar",
    ru: "Сайты, Telegram-боты и Mini Apps",
  },
  Studying: { uz: "O'qish", ru: "Учёба" },
  "Master's in Computer Engineering, TUIT": {
    uz: "Kompyuter injiniringi magistraturasi, TATU",
    ru: "Магистратура по компьютерной инженерии, ТУИТ",
  },
  "Open to": { uz: "Ochiqman", ru: "Открыт для" },
  "Freelance projects and collaborations": {
    uz: "Frilans loyihalar va hamkorlik",
    ru: "Фриланс-проектов и сотрудничества",
  },

  // ---------- IELTS ----------
  "Academic · CEFR B2": { uz: "Academic · CEFR B2", ru: "Academic · CEFR B2" },
  "September 2025": { uz: "2025-yil sentabr", ru: "сентябрь 2025 года" },
  "I read documentation, write specs and join calls in English, so working with an international team needs no translator. Russian: B2.":
    {
      uz: "Hujjatlarni ingliz tilida o'qiyman, texnik topshiriqlar yozaman va qo'ng'iroqlarda qatnashaman, shuning uchun xalqaro jamoa bilan ishlashda tarjimon kerak emas. Rus tili: B2.",
      ru: "Читаю документацию, пишу спецификации и участвую в созвонах на английском, поэтому для работы с международной командой переводчик не нужен. Русский: B2.",
    },

  // ---------- Skills ----------
  "Semantic, accessible markup": {
    uz: "Semantik va qulay (accessible) belgilash",
    ru: "Семантическая и доступная разметка",
  },
  "Layout, motion, responsive design": {
    uz: "Maket, animatsiya, moslashuvchan dizayn",
    ru: "Вёрстка, анимация, адаптивный дизайн",
  },
  "The language I think in": { uz: "Men o'ylaydigan til", ru: "Язык, на котором я думаю" },
  "Types that catch bugs early": {
    uz: "Xatolarni erta ushlaydigan tiplar",
    ru: "Типы, которые ловят ошибки заранее",
  },
  "Component-driven interfaces": {
    uz: "Komponentlarga asoslangan interfeyslar",
    ru: "Интерфейсы на компонентах",
  },
  "Fast, SEO-friendly sites": { uz: "Tez va SEO'ga mos saytlar", ru: "Быстрые сайты, дружелюбные к SEO" },
  "Design systems in code": { uz: "Koddagi dizayn tizimlari", ru: "Дизайн-системы в коде" },
  "REST APIs and microservices": { uz: "REST API va mikroservislar", ru: "REST API и микросервисы" },
  "Schemas, queries, Prisma and TypeORM": {
    uz: "Sxemalar, so'rovlar, Prisma va TypeORM",
    ru: "Схемы, запросы, Prisma и TypeORM",
  },
  "Containers and deployment": { uz: "Konteynerlar va deploy", ru: "Контейнеры и деплой" },
  "APIs and Telegram bots": { uz: "API va Telegram botlar", ru: "API и Telegram-боты" },
  "Clean history, team workflow": {
    uz: "Toza tarix, jamoaviy ish tartibi",
    ru: "Чистая история, командная работа",
  },

  // ---------- Services ----------
  "Web development": { uz: "Veb-dasturlash", ru: "Веб-разработка" },
  "Company sites and landing pages in React and Next.js that load fast and rank well.": {
    uz: "React va Next.js'da tez ochiladigan va qidiruvda yaxshi chiqadigan kompaniya saytlari hamda lending sahifalar.",
    ru: "Сайты компаний и лендинги на React и Next.js, которые быстро загружаются и хорошо ранжируются.",
  },
  "Telegram bots": { uz: "Telegram botlar", ru: "Telegram-боты" },
  "Bots and Mini Apps that take orders and payments right inside the chat.": {
    uz: "Buyurtma va to'lovlarni to'g'ridan-to'g'ri chat ichida qabul qiladigan botlar va Mini App'lar.",
    ru: "Боты и Mini Apps, которые принимают заказы и оплату прямо в чате.",
  },
  "UI design": { uz: "UI dizayn", ru: "UI-дизайн" },
  "Clean, responsive interfaces designed for phones first, then scaled up.": {
    uz: "Avval telefon uchun loyihalanib, keyin katta ekranlarga moslashtirilgan toza va moslashuvchan interfeyslar.",
    ru: "Чистые адаптивные интерфейсы: сначала для телефонов, затем для больших экранов.",
  },

  // ---------- Process ----------
  Discover: { uz: "O'rganish", ru: "Изучение" },
  "We agree on the goal, the audience and the deadline.": {
    uz: "Maqsad, auditoriya va muddatni kelishib olamiz.",
    ru: "Согласуем цель, аудиторию и сроки.",
  },
  Design: { uz: "Dizayn", ru: "Дизайн" },
  "I sketch the layout and you approve it before any code.": {
    uz: "Maketni chizaman, kod yozishdan oldin siz uni tasdiqlaysiz.",
    ru: "Рисую макет, и вы утверждаете его до начала разработки.",
  },
  Build: { uz: "Ishlab chiqish", ru: "Разработка" },
  "Development in small steps, with a live preview link.": {
    uz: "Kichik qadamlar bilan ishlab chiqish, jonli ko'rish havolasi bilan.",
    ru: "Разработка небольшими шагами со ссылкой на живое превью.",
  },
  Test: { uz: "Sinov", ru: "Тестирование" },
  "Checks on real phones, slow networks and every browser.": {
    uz: "Haqiqiy telefonlarda, sekin internetda va barcha brauzerlarda tekshiruv.",
    ru: "Проверка на реальных телефонах, медленном интернете и во всех браузерах.",
  },
  Launch: { uz: "Ishga tushirish", ru: "Запуск" },
  "Domain, hosting and SSL set up, then handed over to you.": {
    uz: "Domen, hosting va SSL sozlanadi, so'ng loyiha sizga topshiriladi.",
    ru: "Настраиваю домен, хостинг и SSL и передаю проект вам.",
  },

  // ---------- Timeline ----------
  "Sep 2026 — Jun 2028 (expected)": {
    uz: "2026-yil sentabr — 2028-yil iyun (kutilmoqda)",
    ru: "Сентябрь 2026 — июнь 2028 (ожидается)",
  },
  "Master's in Computer Engineering": {
    uz: "Kompyuter injiniringi magistraturasi",
    ru: "Магистратура по компьютерной инженерии",
  },
  "Tashkent University of Information Technologies (TUIT)": {
    uz: "Toshkent axborot texnologiyalari universiteti (TATU)",
    ru: "Ташкентский университет информационных технологий (ТУИТ)",
  },
  "Deepening systems and software engineering alongside research on semantic segmentation of satellite and drone imagery.":
    {
      uz: "Tizim va dasturiy injiniringni chuqurlashtirish bilan birga sun'iy yo'ldosh va dron tasvirlarini semantik segmentatsiya qilish bo'yicha tadqiqot.",
      ru: "Углублённое изучение системной и программной инженерии и исследование семантической сегментации спутниковых снимков и снимков с дронов.",
    },
  "Jun 2026 — Present": { uz: "2026-yil iyun — hozirgacha", ru: "Июнь 2026 — по настоящее время" },
  "Jun 2026 — Nov 2026": { uz: "2026-yil iyun — 2026-yil noyabr", ru: "Июнь 2026 — ноябрь 2026" },
  "Backend Developer": { uz: "Backend dasturchi", ru: "Бэкенд-разработчик" },
  "I build microservices in NestJS for external integrations, including FHIR-based healthcare data exchange, with event-driven workflows on RabbitMQ and BullMQ, Redis caching, and monitoring in Grafana and Loki.":
    {
      uz: "Tashqi integratsiyalar uchun NestJS'da mikroservislar yarataman, jumladan FHIR asosidagi tibbiy ma'lumotlar almashinuvi; RabbitMQ va BullMQ'da hodisalarga asoslangan jarayonlar, Redis keshi hamda Grafana va Loki'da monitoring.",
      ru: "Разрабатываю микросервисы на NestJS для внешних интеграций, включая обмен медицинскими данными по стандарту FHIR: событийные процессы на RabbitMQ и BullMQ, кеширование в Redis, мониторинг в Grafana и Loki.",
    },
  "Built microservices in NestJS for external integrations, including FHIR-based healthcare data exchange, with event-driven workflows on RabbitMQ and BullMQ, Redis caching, and monitoring in Grafana and Loki.":
    {
      uz: "Tashqi integratsiyalar uchun NestJS'da mikroservislar yaratdim, jumladan FHIR asosidagi tibbiy ma'lumotlar almashinuvi; RabbitMQ va BullMQ'da hodisalarga asoslangan jarayonlar, Redis keshi hamda Grafana va Loki'da monitoring.",
      ru: "Разрабатывал микросервисы на NestJS для внешних интеграций, включая обмен медицинскими данными по стандарту FHIR: событийные процессы на RabbitMQ и BullMQ, кеширование в Redis, мониторинг в Grafana и Loki.",
    },
  "Aug 2024 — Mar 2025": { uz: "2024-yil avgust — 2025-yil mart", ru: "Август 2024 — март 2025" },
  "Developed REST APIs with NestJS and Koa for products, users, categories and orders, with JWT auth, role-based access control and PostgreSQL schemas in TypeORM, working in an Agile team.":
    {
      uz: "NestJS va Koa'da mahsulotlar, foydalanuvchilar, kategoriyalar va buyurtmalar uchun REST API'lar ishlab chiqdim: JWT autentifikatsiya, rollarga asoslangan ruxsatlar va TypeORM'da PostgreSQL sxemalari. Agile jamoada ishladim.",
      ru: "Разрабатывал REST API на NestJS и Koa для товаров, пользователей, категорий и заказов: JWT-авторизация, ролевая модель доступа и схемы PostgreSQL в TypeORM. Работал в Agile-команде.",
    },
  "May 2023 — Aug 2024": { uz: "2023-yil may — 2024-yil avgust", ru: "Май 2023 — август 2024" },
  "Built backend applications in Node.js (NestJS) and cut API response time from over 10 seconds to about 0.2 by restructuring data access and optimizing queries.":
    {
      uz: "Node.js (NestJS)'da backend ilovalar yaratdim; ma'lumotlarga murojaatni qayta tuzish va so'rovlarni optimallashtirish orqali API javob vaqtini 10 soniyadan ortiqdan taxminan 0,2 soniyagacha qisqartirdim.",
      ru: "Разрабатывал бэкенд-приложения на Node.js (NestJS) и сократил время ответа API с 10 с лишним секунд примерно до 0,2 за счёт перестройки доступа к данным и оптимизации запросов.",
    },
  "Sep 2019 — Jun 2023": { uz: "2019-yil sentabr — 2023-yil iyun", ru: "Сентябрь 2019 — июнь 2023" },
  "Bachelor's in Informatics and Information Technologies": {
    uz: "Informatika va axborot texnologiyalari bakalavriati",
    ru: "Бакалавриат по информатике и информационным технологиям",
  },
  "National University of Uzbekistan": {
    uz: "O'zbekiston Milliy universiteti",
    ru: "Национальный университет Узбекистана",
  },
  "Foundations in programming, algorithms, databases and computer networks.": {
    uz: "Dasturlash, algoritmlar, ma'lumotlar bazalari va kompyuter tarmoqlari asoslari.",
    ru: "Основы программирования, алгоритмов, баз данных и компьютерных сетей.",
  },

  // ---------- Project links ----------
  "Live Demo": { uz: "Jonli demo", ru: "Открыть сайт" },
  "Open bot": { uz: "Botni ochish", ru: "Открыть бота" },
  "Admin panel": { uz: "Admin panel", ru: "Админ-панель" },

  // ---------- Ombor ----------
  "Inventory and production planning": {
    uz: "Ombor hisobi va ishlab chiqarishni rejalashtirish",
    ru: "Складской учёт и планирование производства",
  },
  "Stock accounting for ELMA's logo-branded napkin packaging: what is in the warehouse, what production needs next.":
    {
      uz: "ELMA'ning logotipli salfetka qadoqlari uchun ombor hisobi: omborda nima bor va ishlab chiqarishga keyin nima kerak.",
      ru: "Учёт запасов упаковки для салфеток с логотипами в ELMA: что есть на складе и что дальше нужно производству.",
    },
  "ELMA prints napkin packaging with customers' logos, and every logo is its own stock item. Ombor keeps that stock in one place, so the warehouse and the production team work from the same numbers.":
    {
      uz: "ELMA mijozlar logotipi tushirilgan salfetka qadoqlarini chop etadi va har bir logotip alohida ombor pozitsiyasi hisoblanadi. Ombor tizimi shu zaxirani bir joyda yuritadi, shuning uchun ombor va ishlab chiqarish jamoasi bir xil raqamlar bilan ishlaydi.",
      ru: "ELMA печатает упаковку для салфеток с логотипами заказчиков, и каждый логотип является отдельной складской позицией. Ombor хранит эти остатки в одном месте, поэтому склад и производство работают с одними и теми же цифрами.",
    },
  "I built it end to end: a NestJS REST API on PostgreSQL with Prisma and Zod validation, a React and TypeScript interface on top, and a Docker setup deployed to production with Dokploy.":
    {
      uz: "Loyihani boshidan oxirigacha o'zim yaratdim: PostgreSQL ustida Prisma va Zod validatsiyasi bilan NestJS REST API, React va TypeScript'dagi interfeys hamda Dokploy orqali productionga chiqarilgan Docker muhiti.",
      ru: "Я сделал проект целиком: REST API на NestJS и PostgreSQL с Prisma и валидацией Zod, интерфейс на React и TypeScript, Docker-окружение, развёрнутое в продакшене через Dokploy.",
    },
  "Tracks stock of logo-branded packaging per customer logo": {
    uz: "Logotipli qadoqlar zaxirasini har bir mijoz logotipi bo'yicha yuritadi",
    ru: "Ведёт остатки упаковки отдельно по каждому логотипу заказчика",
  },
  "Supports production planning from current stock levels": {
    uz: "Joriy zaxira asosida ishlab chiqarishni rejalashtirishga yordam beradi",
    ru: "Помогает планировать производство по текущим остаткам",
  },
  "Validates every request with Zod before it reaches the database": {
    uz: "Har bir so'rovni bazaga yetib borishidan oldin Zod bilan tekshiradi",
    ru: "Проверяет каждый запрос через Zod до обращения к базе данных",
  },
  "Runs in Docker and is deployed with Dokploy": {
    uz: "Docker'da ishlaydi va Dokploy orqali joylashtirilgan",
    ru: "Работает в Docker и развёрнут через Dokploy",
  },
  "Backend and frontend": { uz: "Backend va frontend", ru: "Бэкенд и фронтенд" },
  "In production at ELMA": { uz: "ELMA'da ishlab turibdi", ru: "В эксплуатации в ELMA" },

  // ---------- Davomat ----------
  "Employee attendance": { uz: "Xodimlar davomati", ru: "Учёт посещаемости сотрудников" },
  "A Telegram bot that records when employees arrive and leave, with an admin panel for attendance reports. 40+ people use it daily.":
    {
      uz: "Xodimlarning kelish va ketish vaqtini qayd etadigan Telegram bot hamda davomat hisobotlari uchun admin panel. Undan har kuni 40 dan ortiq kishi foydalanadi.",
      ru: "Telegram-бот, который фиксирует приход и уход сотрудников, и админ-панель с отчётами о посещаемости. Им ежедневно пользуются более 40 человек.",
    },
  "Employees register once in the Telegram bot. After that their check-in and check-out times are recorded automatically, with no paper journal and no separate app to install.":
    {
      uz: "Xodimlar Telegram botda bir marta ro'yxatdan o'tadi. Shundan so'ng ularning kelish va ketish vaqti avtomatik qayd etiladi: qog'oz jurnal ham, alohida ilova o'rnatish ham kerak emas.",
      ru: "Сотрудники один раз регистрируются в Telegram-боте. После этого время прихода и ухода фиксируется автоматически: без бумажного журнала и без установки отдельного приложения.",
    },
  "Managers open the admin panel to see who came in, who is late and how the month looks. The backend runs on NestJS, TypeORM and PostgreSQL; the admin panel is a React app.":
    {
      uz: "Rahbarlar admin panelda kim kelganini, kim kechikkanini va oy qanday o'tayotganini ko'radi. Backend NestJS, TypeORM va PostgreSQL'da ishlaydi; admin panel React ilovasi.",
      ru: "Руководители видят в админ-панели, кто пришёл, кто опоздал и как выглядит месяц. Бэкенд работает на NestJS, TypeORM и PostgreSQL, админ-панель написана на React.",
    },
  "Registration and daily check-in / check-out inside Telegram": {
    uz: "Ro'yxatdan o'tish va kundalik kelish / ketish belgisi Telegram ichida",
    ru: "Регистрация и ежедневная отметка прихода и ухода прямо в Telegram",
  },
  "Used by 40+ employees every working day": {
    uz: "Har ish kuni 40 dan ortiq xodim foydalanadi",
    ru: "Каждый рабочий день используют более 40 сотрудников",
  },
  "Admin panel with attendance reports": {
    uz: "Davomat hisobotlari bilan admin panel",
    ru: "Админ-панель с отчётами о посещаемости",
  },
  "Protected admin login": { uz: "Himoyalangan admin kirishi", ru: "Защищённый вход для администратора" },
  "Backend, bot and admin panel": { uz: "Backend, bot va admin panel", ru: "Бэкенд, бот и админ-панель" },
  "In production, 40+ daily users": {
    uz: "Ishlab turibdi, kuniga 40+ foydalanuvchi",
    ru: "В эксплуатации, 40+ пользователей в день",
  },

  // ---------- Elma Avtopark ----------
  "Vehicle fleet management": { uz: "Avtoparkni boshqarish", ru: "Управление автопарком" },
  "One dashboard for a company's vehicles: documents, fuel, maintenance, repairs, fines and drivers.": {
    uz: "Kompaniya avtomobillari uchun yagona panel: hujjatlar, yoqilg'i, texnik xizmat, ta'mirlash, jarimalar va haydovchilar.",
    ru: "Единая панель для автомобилей компании: документы, топливо, обслуживание, ремонты, штрафы и водители.",
  },
  "Elma Avtopark replaces the spreadsheets a fleet manager usually juggles. Every vehicle has its own record with inspection photos and documents, and the dashboard shows the whole fleet at a glance.":
    {
      uz: "Elma Avtopark avtopark menejeri odatda yuritadigan jadvallar o'rnini bosadi. Har bir avtomobilning ko'rik rasmlari va hujjatlari bilan o'z kartasi bor, panel esa butun avtoparkni bir qarashda ko'rsatadi.",
      ru: "Elma Avtopark заменяет таблицы, с которыми обычно работает менеджер автопарка. У каждого автомобиля своя карточка с фотографиями осмотров и документами, а панель показывает весь автопарк с одного взгляда.",
    },
  "Fuel and mileage are logged per month, and scheduled maintenance tracks each part's wear so the dashboard shows what needs replacing first. Repairs, accidents and fines sit in each vehicle's history, and drivers send daily inspection photos through a Telegram bot.":
    {
      uz: "Yoqilg'i va bosib o'tilgan masofa oyma-oy qayd etiladi, rejali texnik xizmat esa har bir ehtiyot qismning yeyilishini kuzatadi, shu sababli panel birinchi navbatda nimani almashtirish kerakligini ko'rsatadi. Ta'mirlar, YTHlar va jarimalar har bir avtomobil tarixida saqlanadi, haydovchilar esa kundalik ko'rik rasmlarini Telegram bot orqali yuboradi.",
      ru: "Топливо и пробег фиксируются по месяцам, а плановое обслуживание отслеживает износ каждой детали, поэтому панель показывает, что нужно заменить в первую очередь. Ремонты, ДТП и штрафы хранятся в истории каждого автомобиля, а водители присылают фотографии ежедневного осмотра через Telegram-бота.",
    },
  "An analytics screen forecasts upcoming costs by category and ranks the most expensive vehicles, with reports exportable to Excel. The interface works in Uzbek and Russian with a light and dark theme.":
    {
      uz: "Analitika sahifasi kelgusi xarajatlarni toifalar bo'yicha bashorat qiladi va eng qimmatga tushayotgan avtomobillarni saralaydi; hisobotlarni Excel'ga eksport qilish mumkin. Interfeys o'zbek va rus tillarida, yorug' va qorong'i mavzuda ishlaydi.",
      ru: "Экран аналитики прогнозирует предстоящие расходы по категориям и показывает самые затратные автомобили, отчёты выгружаются в Excel. Интерфейс работает на узбекском и русском языках, есть светлая и тёмная темы.",
    },
  "Live operations dashboard with a fleet-wide overview": {
    uz: "Butun avtopark ko'rinib turadigan jonli boshqaruv paneli",
    ru: "Оперативная панель с обзором всего автопарка",
  },
  "Vehicle registry with inspection photos and document tracking": {
    uz: "Ko'rik rasmlari va hujjatlar nazorati bilan avtomobillar reyestri",
    ru: "Реестр автомобилей с фотографиями осмотров и контролем документов",
  },
  "Fuel and mileage logging, scheduled maintenance reminders": {
    uz: "Yoqilg'i va masofa hisobi, rejali texnik xizmat eslatmalari",
    ru: "Учёт топлива и пробега, напоминания о плановом обслуживании",
  },
  "Repair log plus accident and fine records per vehicle": {
    uz: "Har bir avtomobil bo'yicha ta'mir jurnali, YTH va jarimalar qaydi",
    ru: "Журнал ремонтов, учёт ДТП и штрафов по каждому автомобилю",
  },
  "Part-wear tracking that flags what to replace first": {
    uz: "Ehtiyot qismlar yeyilishini kuzatib, nimani birinchi almashtirishni ko'rsatadi",
    ru: "Отслеживание износа деталей с подсказкой, что менять первым",
  },
  "Daily driver inspection photos via a Telegram bot": {
    uz: "Haydovchilarning kundalik ko'rik rasmlari Telegram bot orqali",
    ru: "Ежедневные фотографии осмотра от водителей через Telegram-бота",
  },
  "Cost forecasting by category and Excel export": {
    uz: "Toifalar bo'yicha xarajatlar bashorati va Excel'ga eksport",
    ru: "Прогноз расходов по категориям и экспорт в Excel",
  },
  "Driver management, spare-parts catalogue, UZ / RU and dark mode": {
    uz: "Haydovchilarni boshqarish, ehtiyot qismlar katalogi, UZ / RU va qorong'i rejim",
    ru: "Управление водителями, каталог запчастей, UZ / RU и тёмная тема",
  },

  // ---------- Edu CRM ----------
  "Learning-centre management": { uz: "O'quv markazini boshqarish", ru: "Управление учебным центром" },
  "One system to run a learning centre: students, groups, teachers, schedule, attendance, grades and payments.":
    {
      uz: "O'quv markazini yuritish uchun yagona tizim: o'quvchilar, guruhlar, o'qituvchilar, dars jadvali, davomat, baholar va to'lovlar.",
      ru: "Единая система для учебного центра: ученики, группы, преподаватели, расписание, посещаемость, оценки и оплаты.",
    },
  "Edu CRM replaces the notebooks and spreadsheets a tutoring centre runs on. The dashboard shows active students, groups, teachers and this month's debt at a glance, and every part of the centre has its own screen.":
    {
      uz: "Edu CRM o'quv markazi yuritadigan daftar va jadvallar o'rnini bosadi. Panel faol o'quvchilar, guruhlar, o'qituvchilar va shu oydagi qarzdorlikni bir qarashda ko'rsatadi, markazning har bir bo'limi uchun esa alohida sahifa bor.",
      ru: "Edu CRM заменяет тетради и таблицы, на которых держится учебный центр. Панель с одного взгляда показывает активных учеников, группы, преподавателей и задолженность за текущий месяц, а у каждого раздела центра есть свой экран.",
    },
  "Administrators keep student and teacher records, build the weekly timetable and generate the actual lessons from it, mark attendance, set grades and homework, track payments and debts, and handle incoming applications. It supports roles, a light and dark theme, and ties each teacher's pay to a configurable percentage.":
    {
      uz: "Administratorlar o'quvchi va o'qituvchilar ro'yxatini yuritadi, haftalik jadval tuzib, undan aniq darslarni yaratadi, davomatni belgilaydi, baho va uy vazifalarini qo'yadi, to'lov va qarzlarni kuzatadi hamda kelgan arizalar bilan ishlaydi. Tizimda rollar, yorug' va qorong'i mavzu bor, har bir o'qituvchining maoshi esa sozlanadigan foizga bog'langan.",
      ru: "Администраторы ведут базу учеников и преподавателей, составляют недельное расписание и создают по нему конкретные уроки, отмечают посещаемость, выставляют оценки и домашние задания, следят за оплатами и долгами, обрабатывают входящие заявки. Есть роли, светлая и тёмная темы, а зарплата каждого преподавателя привязана к настраиваемому проценту.",
    },
  "Dashboard with active students, groups, teachers and monthly debt": {
    uz: "Faol o'quvchilar, guruhlar, o'qituvchilar va oylik qarzdorlik ko'rsatilgan panel",
    ru: "Панель с активными учениками, группами, преподавателями и задолженностью за месяц",
  },
  "Student and teacher records with per-group enrolment": {
    uz: "O'quvchi va o'qituvchilar ro'yxati, guruhlarga biriktirish bilan",
    ru: "База учеников и преподавателей с зачислением по группам",
  },
  "Weekly timetable that generates dated lessons for attendance": {
    uz: "Davomat uchun sanali darslarni yaratadigan haftalik jadval",
    ru: "Недельное расписание, из которого создаются уроки с датами для учёта посещаемости",
  },
  "Attendance, grades, homework and reports in one place": {
    uz: "Davomat, baholar, uy vazifalari va hisobotlar bir joyda",
    ru: "Посещаемость, оценки, домашние задания и отчёты в одном месте",
  },
  "Payment and debt tracking, plus incoming applications": {
    uz: "To'lov va qarzlar hisobi hamda kelgan arizalar",
    ru: "Учёт оплат и долгов, а также входящие заявки",
  },
  "Roles, light / dark theme and per-teacher salary percentage": {
    uz: "Rollar, yorug' / qorong'i mavzu va har bir o'qituvchi uchun maosh foizi",
    ru: "Роли, светлая и тёмная темы, процент зарплаты для каждого преподавателя",
  },

  // ---------- Azia Stirka ----------
  "Laundry service platform": {
    uz: "Kir yuvish xizmati platformasi",
    ru: "Платформа для прачечной",
  },
  "A laundry business in one system: public website, admin panel, backend API and a Telegram bot that keeps order statuses in sync.":
    {
      uz: "Kir yuvish biznesi bitta tizimda: ommaviy sayt, admin panel, backend API va buyurtma holatlarini sinxron saqlaydigan Telegram bot.",
      ru: "Бизнес прачечной в одной системе: публичный сайт, админ-панель, бэкенд API и Telegram-бот, который синхронизирует статусы заказов.",
    },
  "Customers place an order on the website. The order is saved and pushed to Telegram at once, with inline status buttons, and a status changed in Telegram shows up in the admin panel and the other way round.":
    {
      uz: "Mijozlar saytda buyurtma beradi. Buyurtma saqlanadi va holat tugmalari bilan darhol Telegramga yuboriladi; Telegramda o'zgartirilgan holat admin panelda ham ko'rinadi va aksincha.",
      ru: "Клиенты оформляют заказ на сайте. Заказ сохраняется и сразу отправляется в Telegram с кнопками статуса; статус, изменённый в Telegram, появляется в админ-панели, и наоборот.",
    },
  "I built all four parts: a NestJS REST API, a React admin panel that installs as a PWA, a Next.js marketing site in Uzbek and Russian, and the Telegram bot. It runs in production on three subdomains with automated CI/CD.":
    {
      uz: "To'rtala qismni ham o'zim yaratdim: NestJS REST API, PWA sifatida o'rnatiladigan React admin panel, o'zbek va rus tillaridagi Next.js sayt hamda Telegram bot. Tizim avtomatlashtirilgan CI/CD bilan uchta subdomenda ishlab turibdi.",
      ru: "Я сделал все четыре части: REST API на NestJS, админ-панель на React, которая устанавливается как PWA, сайт на Next.js на узбекском и русском языках и Telegram-бота. Система работает в продакшене на трёх поддоменах с автоматическим CI/CD.",
    },
  "Orders pushed to Telegram in real time with inline status buttons": {
    uz: "Buyurtmalar holat tugmalari bilan real vaqtda Telegramga yuboriladi",
    ru: "Заказы в реальном времени отправляются в Telegram с кнопками статуса",
  },
  "Two-way status sync between Telegram and the admin panel": {
    uz: "Telegram va admin panel o'rtasida holatlarning ikki tomonlama sinxronlanishi",
    ru: "Двусторонняя синхронизация статусов между Telegram и админ-панелью",
  },
  "API with JWT auth, validation, rate limiting and Excel export": {
    uz: "JWT autentifikatsiya, validatsiya, so'rovlar cheklovi va Excel eksportli API",
    ru: "API с JWT-авторизацией, валидацией, ограничением частоты запросов и экспортом в Excel",
  },
  "Installable PWA admin panel on React, TypeScript and Vite": {
    uz: "React, TypeScript va Vite'dagi o'rnatiladigan PWA admin panel",
    ru: "Устанавливаемая PWA админ-панель на React, TypeScript и Vite",
  },
  "SSR marketing site with Uzbek and Russian versions": {
    uz: "O'zbek va rus tillaridagi SSR sayt",
    ru: "SSR-сайт с узбекской и русской версиями",
  },
  "Deployed across three subdomains with GitHub Actions": {
    uz: "GitHub Actions orqali uchta subdomenga joylashtirilgan",
    ru: "Развёрнуто на трёх поддоменах через GitHub Actions",
  },
  "Backend, frontend and bot": { uz: "Backend, frontend va bot", ru: "Бэкенд, фронтенд и бот" },
  "In production": { uz: "Ishlab turibdi", ru: "В эксплуатации" },
};

/** Translation of one English text; falls back to the English text itself. */
export function tr(lang: Lang, text: string): string;
export function tr(lang: Lang, text: string | undefined): string | undefined;
export function tr(lang: Lang, text: string | undefined): string | undefined {
  if (lang === "en" || !text) return text;
  return T[text]?.[lang] ?? text;
}

export function hasTranslation(text: string): boolean {
  return Boolean(T[text]);
}

const list = (lang: Lang, items: string[]) => items.map((item) => tr(lang, item));

export function localizeProfile(profile: Profile, lang: Lang): Profile {
  if (lang === "en") return profile;
  return {
    ...profile,
    firstName: tr(lang, profile.firstName),
    lastName: tr(lang, profile.lastName),
    role: tr(lang, profile.role),
    intro: tr(lang, profile.intro),
    location: tr(lang, profile.location),
    aboutParagraphs: list(lang, profile.aboutParagraphs),
    aboutFacts: profile.aboutFacts.map((f) => ({ term: tr(lang, f.term), detail: tr(lang, f.detail) })),
    ielts: {
      ...profile.ielts,
      level: tr(lang, profile.ielts.level),
      taken: tr(lang, profile.ielts.taken),
      note: tr(lang, profile.ielts.note),
    },
    skillGroups: profile.skillGroups.map((g) => ({
      title: g.title,
      skills: g.skills.map((s) => ({ ...s, note: tr(lang, s.note) })),
    })),
    services: profile.services.map((s) => ({ ...s, title: tr(lang, s.title), detail: tr(lang, s.detail) })),
  };
}

export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === "en") return project;
  return {
    ...project,
    tagline: tr(lang, project.tagline),
    summary: tr(lang, project.summary),
    description: list(lang, project.description),
    highlights: list(lang, project.highlights),
    links: project.links.map((l) => ({ ...l, label: tr(lang, l.label) })),
    duration: tr(lang, project.duration),
    role: tr(lang, project.role),
    status: tr(lang, project.status),
  };
}

export function localizeTimeline(items: TimelineItem[], lang: Lang): TimelineItem[] {
  if (lang === "en") return items;
  return items.map((item) => ({
    ...item,
    period: tr(lang, item.period),
    title: tr(lang, item.title),
    place: tr(lang, item.place),
    detail: tr(lang, item.detail),
  }));
}

export function localizeSteps<S extends { title: string; detail: string }>(steps: readonly S[], lang: Lang) {
  return steps.map((step) => ({ title: tr(lang, step.title), detail: tr(lang, step.detail) }));
}
