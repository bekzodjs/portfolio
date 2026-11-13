# bekzodjs.uz — portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit the content

Everything shown on the site (name, texts, skills, projects, timeline, email, social links) lives in one file:
`src/data/site.ts`. Lines marked `PLACEHOLDER` are sample content to replace.

To use a real project screenshot, put the image in `public/projects/` and set `image: "/projects/your-file.webp"` on that project.

## Build and deploy (Plesk / any static hosting)

```bash
npm run build
```

The finished site is written to the `out/` folder as plain HTML, CSS and JS.
Upload the **contents** of `out/` into the `bekzodjs.uz` folder in the Plesk file manager.

## Structure

```
src/app/         layout (SEO metadata, fonts), page, global styles, icon
src/components/  Nav, Backdrop, Hero, About, Skills, Projects, Services, Process, Experience, Contact, Footer
src/data/site.ts all content
public/          profile.webp (your photo), og.png (share image), robots.txt, sitemap.xml
```

The contact form validates input and then opens the visitor's mail app with the message written.
The site is static, so no server or database is needed.
