import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/onest";
import "./globals.css";
import { site } from "@/data/site";
import { LANG_HEADER, defaultLang, isLang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { getSettings } from "@/lib/content";
import { jsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";

// Titles, descriptions, canonical and hreflang links are set per page in src/lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: ui.en.meta.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.yandex ? { yandex: site.verification.yandex } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#020c10",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const header = (await headers()).get(LANG_HEADER);
  const lang = isLang(header) ? header : defaultLang;
  const settings = await getSettings();

  return (
    <html lang={lang} className="antialiased">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-2 focus:text-ink"
        >
          {ui[lang].skip}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([personJsonLd(lang, settings), websiteJsonLd(lang)]),
          }}
        />
      </body>
    </html>
  );
}
