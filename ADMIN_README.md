# Admin panel

Saytga loyiha qo'shish, tahrirlash, o'chirish va rasm yuklash uchun.

## Ishga tushirish (lokal)
1. `.env.local.example` ni `.env.local` deb nusxalang, `ADMIN_USERNAME`, `ADMIN_PASSWORD` va `ADMIN_SECRET` ni yozing.
2. `npm run dev`
3. Brauzerda `http://localhost:3000/admin` — parolni kiriting.

## Nima qila olasiz
- **Loyihalar**: yangi qo'shish, tahrirlash, o'chirish. Har birida nom, tavsif,
  imkoniyatlar, texnologiyalar, havolalar (tugmalar), ketgan vaqt, rol, holat.
- **Rasm yuklash**: har bir loyihaga bir nechta rasm; birinchisi muqova bo'ladi,
  strelkalar bilan tartibini o'zgartirasiz.
- **Aloqa / linklar**: email va ijtimoiy tarmoqlar (Telegram, LinkedIn, GitHub...).

## Ma'lumot qayerda saqlanadi
- Matnlar: `data/content.json`
- Yangi yuklangan rasmlar: `public/uploads/`
- Oldingi skrinshotlar: `public/projects/` (o'zgarmaydi)

## Muhim: hosting
Admin jonli ishlashi uchun sayt endi **Node ilova** sifatida ishlaydi (static emas):
`npm run build` keyin `npm start`. Plesk'da "Node.js" ilovasi qilib sozlang va
`ADMIN_PASSWORD`, `ADMIN_SECRET` ni server muhit o'zgaruvchilariga qo'ying.
`data/` va `public/uploads/` papkalariga yozish huquqi bo'lishi kerak.
