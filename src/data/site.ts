/**
 * All site content lives in this file.
 * Lines marked PLACEHOLDER are sample text — replace them with your own.
 */

export const site = {
  name: "Bekzod Toxtamuratov",
  firstName: "Bekzod",
  lastName: "Toxtamuratov",
  role: "Full-Stack Developer: Frontend & Backend.",
  url: "https://bekzodjs.uz",
  location: "Tashkent, Uzbekistan",
  intro:
    "I design and build fast websites and Telegram bots with JavaScript, from the first sketch to the day they go live.",
  description:
    "Portfolio of Bekzod Toxtamuratov, a frontend developer in Tashkent building websites, Telegram bots and Mini Apps with JavaScript, React and Next.js.",
  /**
   * Your portrait. Put the file in /public (for example public/profile.webp)
   * and set this to "/profile.webp". Leave empty to show the placeholder.
   */
  photo: "/profile.webp",
  /** Résumé PDF in /public. Leave empty to hide the download buttons. */
  cv: "/Bekzod_Toxtamuratov_CV.pdf",
  // Contact address shown on the site and used by the contact form.
  email: "bekzodtoxtamuratov03@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/bekzodjs" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/developerbekzod/" },
    { label: "Telegram", href: "https://t.me/prog_r_ammer" },
  ],
  /**
   * Search-engine ownership codes. Paste only the code from the meta tag that
   * Google Search Console / Yandex Webmaster give you (the content="..." part).
   * Leave empty if you verified another way (DNS or HTML file).
   */
  verification: {
    google: "",
    yandex: "",
  },
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const ielts = {
  score: "6.0",
  level: "Academic · CEFR B2",
  taken: "September 2025",
  note: "I read documentation, write specs and join calls in English, so working with an international team needs no translator. Russian: B2.",
  /** Certificate file in /public, e.g. "/IELTS_Certificate.pdf". The download button is hidden while empty. */
  certificate: "/IELTS_Certificate.pdf",
};

export const about = {
  paragraphs: [
    "I'm a full-stack developer from Tashkent. I build the whole product in JavaScript and TypeScript: React and Next.js interfaces, NestJS and PostgreSQL backends, and Telegram bots that take orders and payments without sending people to another app.",
    "I care about the parts visitors feel before they notice them: pages that open at once, layouts that hold up on a small phone, forms that tell you what went wrong.",
    "Alongside client work I'm finishing a master's degree in computer engineering, so the questions I ask about a product tend to go one layer deeper than the screen.",
  ],
  facts: [
    { term: "Based in", detail: "Tashkent, Uzbekistan" },
    { term: "Focus", detail: "Websites, Telegram bots and Mini Apps" },
    { term: "Studying", detail: "Master's in Computer Engineering, TUIT" },
    { term: "Open to", detail: "Freelance projects and collaborations" },
  ],
};

export type Skill = { name: string; glyph: string; note: string };

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", glyph: "</>", note: "Semantic, accessible markup" },
      { name: "CSS", glyph: "{ }", note: "Layout, motion, responsive design" },
      { name: "JavaScript", glyph: "JS", note: "The language I think in" },
      { name: "TypeScript", glyph: "TS", note: "Types that catch bugs early" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", glyph: "Re", note: "Component-driven interfaces" },
      { name: "Next.js", glyph: "Nx", note: "Fast, SEO-friendly sites" },
      { name: "Tailwind CSS", glyph: "Tw", note: "Design systems in code" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", glyph: "No", note: "APIs and Telegram bots" },
      { name: "NestJS", glyph: "Ns", note: "REST APIs and microservices" },
      { name: "PostgreSQL", glyph: "Pg", note: "Schemas, queries, Prisma and TypeORM" },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { name: "Docker", glyph: "Dk", note: "Containers and deployment" },
      { name: "Git & GitHub", glyph: "Gt", note: "Clean history, team workflow" },
    ],
  },
];

export type Project = {
  /** Folder name for screenshots: public/projects/<slug>/1.png, 2.png, ... */
  slug: string;
  title: string;
  tagline: string;
  /** Short text on the card. */
  summary: string;
  /** Full text in the details window, one string per paragraph. */
  description: string[];
  highlights: string[];
  tech: string[];
  /** The first link is the main button. */
  links: { label: string; href: string }[];
  /** Drawing shown until real screenshots are added. */
  preview: "site" | "bot" | "dashboard";
  /** How long the project took, e.g. "6 weeks". Hidden while empty. */
  duration?: string;
  role?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "ombor",
    title: "Ombor",
    tagline: "Inventory and production planning",
    summary:
      "Stock accounting for ELMA's logo-branded napkin packaging: what is in the warehouse, what production needs next.",
    description: [
      "ELMA prints napkin packaging with customers' logos, and every logo is its own stock item. Ombor keeps that stock in one place, so the warehouse and the production team work from the same numbers.",
      "I built it end to end: a NestJS REST API on PostgreSQL with Prisma and Zod validation, a React and TypeScript interface on top, and a Docker setup deployed to production with Dokploy.",
    ],
    highlights: [
      "Tracks stock of logo-branded packaging per customer logo",
      "Supports production planning from current stock levels",
      "Validates every request with Zod before it reaches the database",
      "Runs in Docker and is deployed with Dokploy",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "NestJS", "Prisma", "PostgreSQL", "Docker"],
    links: [{ label: "Live Demo", href: "https://ombor.elma.uz/" }],
    preview: "dashboard",
    // TODO: duration: "…",
    role: "Backend and frontend",
    status: "In production at ELMA",
  },
  {
    slug: "davomat",
    title: "Davomat",
    tagline: "Employee attendance",
    summary:
      "A Telegram bot that records when employees arrive and leave, with an admin panel for attendance reports. 40+ people use it daily.",
    description: [
      "Employees register once in the Telegram bot. After that their check-in and check-out times are recorded automatically, with no paper journal and no separate app to install.",
      "Managers open the admin panel to see who came in, who is late and how the month looks. The backend runs on NestJS, TypeORM and PostgreSQL; the admin panel is a React app.",
    ],
    highlights: [
      "Registration and daily check-in / check-out inside Telegram",
      "Used by 40+ employees every working day",
      "Admin panel with attendance reports",
      "Protected admin login",
    ],
    tech: ["NestJS", "TypeORM", "PostgreSQL", "Telegram Bot API", "React"],
    links: [
      { label: "Open bot", href: "https://t.me/DavomatElmaBot" },
      { label: "Admin panel", href: "https://davomat.elma.uz/" },
    ],
    preview: "bot",
    // TODO: duration: "…",
    role: "Backend, bot and admin panel",
    status: "In production, 40+ daily users",
  },
  {
    slug: "avtopark",
    title: "Elma Avtopark",
    tagline: "Vehicle fleet management",
    summary:
      "One dashboard for a company's vehicles: documents, fuel, maintenance, repairs, fines and drivers.",
    description: [
      "Elma Avtopark replaces the spreadsheets a fleet manager usually juggles. Every vehicle has its own record with inspection photos and documents, and the dashboard shows the whole fleet at a glance.",
      "Fuel and mileage are logged per month, and scheduled maintenance tracks each part's wear so the dashboard shows what needs replacing first. Repairs, accidents and fines sit in each vehicle's history, and drivers send daily inspection photos through a Telegram bot.",
      "An analytics screen forecasts upcoming costs by category and ranks the most expensive vehicles, with reports exportable to Excel. The interface works in Uzbek and Russian with a light and dark theme.",
    ],
    highlights: [
      "Live operations dashboard with a fleet-wide overview",
      "Vehicle registry with inspection photos and document tracking",
      "Fuel and mileage logging, scheduled maintenance reminders",
      "Repair log plus accident and fine records per vehicle",
      "Part-wear tracking that flags what to replace first",
      "Daily driver inspection photos via a Telegram bot",
      "Cost forecasting by category and Excel export",
      "Driver management, spare-parts catalogue, UZ / RU and dark mode",
    ],
    tech: ["Vue", "Vite", "Telegram Bot API"],
    links: [
      { label: "Live Demo", href: "https://elma-avto-park.vercel.app/" },
      { label: "Open bot", href: "https://t.me/AutoParkElmaBot" },
    ],
    preview: "dashboard",
    // TODO: duration: "…",
  },
  {
    slug: "edu-crm",
    title: "Edu CRM",
    tagline: "Learning-centre management",
    summary:
      "One system to run a learning centre: students, groups, teachers, schedule, attendance, grades and payments.",
    description: [
      "Edu CRM replaces the notebooks and spreadsheets a tutoring centre runs on. The dashboard shows active students, groups, teachers and this month's debt at a glance, and every part of the centre has its own screen.",
      "Administrators keep student and teacher records, build the weekly timetable and generate the actual lessons from it, mark attendance, set grades and homework, track payments and debts, and handle incoming applications. It supports roles, a light and dark theme, and ties each teacher's pay to a configurable percentage.",
    ],
    highlights: [
      "Dashboard with active students, groups, teachers and monthly debt",
      "Student and teacher records with per-group enrolment",
      "Weekly timetable that generates dated lessons for attendance",
      "Attendance, grades, homework and reports in one place",
      "Payment and debt tracking, plus incoming applications",
      "Roles, light / dark theme and per-teacher salary percentage",
    ],
    tech: ["React", "TypeScript", "NestJS", "PostgreSQL"],
    links: [{ label: "Live Demo", href: "https://edu-crm-sandy.vercel.app/" }],
    preview: "dashboard",
    // TODO: duration: "…",
    role: "Backend and frontend",
  },
  {
    slug: "aziastirka",
    title: "Azia Stirka",
    tagline: "Laundry service platform",
    summary:
      "A laundry business in one system: public website, admin panel, backend API and a Telegram bot that keeps order statuses in sync.",
    description: [
      "Customers place an order on the website. The order is saved and pushed to Telegram at once, with inline status buttons, and a status changed in Telegram shows up in the admin panel and the other way round.",
      "I built all four parts: a NestJS REST API, a React admin panel that installs as a PWA, a Next.js marketing site in Uzbek and Russian, and the Telegram bot. It runs in production on three subdomains with automated CI/CD.",
    ],
    highlights: [
      "Orders pushed to Telegram in real time with inline status buttons",
      "Two-way status sync between Telegram and the admin panel",
      "API with JWT auth, validation, rate limiting and Excel export",
      "Installable PWA admin panel on React, TypeScript and Vite",
      "SSR marketing site with Uzbek and Russian versions",
      "Deployed across three subdomains with GitHub Actions",
    ],
    tech: ["Next.js", "React", "TypeScript", "NestJS", "Telegram Bot API", "GitHub Actions"],
    links: [{ label: "Live Demo", href: "https://aziastirka.uz" }],
    preview: "site",
    // TODO: duration: "…",
    role: "Backend, frontend and bot",
    status: "In production",
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  kind: "Work" | "Education";
  detail: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "Sep 2026 — Jun 2028 (expected)",
    title: "Master's in Computer Engineering",
    place: "Tashkent University of Information Technologies (TUIT)",
    kind: "Education",
    detail:
      "Deepening systems and software engineering alongside research on semantic segmentation of satellite and drone imagery.",
  },
  {
    period: "Jun 2026 — Present",
    title: "Backend Developer",
    place: "Elma",
    kind: "Work",
    detail:
      "Built microservices in NestJS for external integrations, including FHIR-based healthcare data exchange, with event-driven workflows on RabbitMQ and BullMQ, Redis caching, and monitoring in Grafana and Loki.",
  },
  {
    period: "Aug 2024 — Mar 2025",
    title: "Backend Developer",
    place: "Techjobs",
    kind: "Work",
    detail:
      "Developed REST APIs with NestJS and Koa for products, users, categories and orders, with JWT auth, role-based access control and PostgreSQL schemas in TypeORM, working in an Agile team.",
  },
  {
    period: "May 2023 — Aug 2024",
    title: "Backend Developer",
    place: "Najot Ta'lim",
    kind: "Work",
    detail:
      "Built backend applications in Node.js (NestJS) and cut API response time from over 10 seconds to about 0.2 by restructuring data access and optimizing queries.",
  },
  {
    period: "Sep 2019 — Jun 2023",
    title: "Bachelor's in Informatics and Information Technologies",
    place: "National University of Uzbekistan",
    kind: "Education",
    detail:
      "Foundations in programming, algorithms, databases and computer networks.",
  },
];

export const services = [
  {
    icon: "web",
    title: "Web development",
    detail: "Company sites and landing pages in React and Next.js that load fast and rank well.",
  },
  {
    icon: "bot",
    title: "Telegram bots",
    detail: "Bots and Mini Apps that take orders and payments right inside the chat.",
  },
  {
    icon: "design",
    title: "UI design",
    detail: "Clean, responsive interfaces designed for phones first, then scaled up.",
  },
] as const;

export const process = [
  { title: "Discover", detail: "We agree on the goal, the audience and the deadline." },
  { title: "Design", detail: "I sketch the layout and you approve it before any code." },
  { title: "Build", detail: "Development in small steps, with a live preview link." },
  { title: "Test", detail: "Checks on real phones, slow networks and every browser." },
  { title: "Launch", detail: "Domain, hosting and SSL set up, then handed over to you." },
] as const;
