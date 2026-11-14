/** Languages the public site is published in. English lives at "/", the others under "/uz" and "/ru". */
export const locales = ["en", "uz", "ru"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

const prefix = (lang: Lang) => (lang === defaultLang ? "" : `/${lang}`);

export const homePath = (lang: Lang) => prefix(lang) || "/";
export const projectPath = (lang: Lang, slug: string) => `${prefix(lang)}/projects/${slug}`;

/** Short labels for the language switcher. */
export const langLabel: Record<Lang, string> = { en: "EN", uz: "UZ", ru: "RU" };
export const langName: Record<Lang, string> = { en: "English", uz: "O'zbekcha", ru: "Русский" };
export const ogLocale: Record<Lang, string> = { en: "en_US", uz: "uz_UZ", ru: "ru_RU" };

/** Request header the proxy sets so the root layout can write <html lang>. */
export const LANG_HEADER = "x-site-lang";
