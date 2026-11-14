"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { useId, useState } from "react";
import { site } from "@/data/site";
import type { Lang } from "@/i18n/config";
import { ui, type Dictionary } from "@/i18n/ui";
import { Reveal, RevealLines } from "./Reveal";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(values: Fields, t: Dictionary["contact"]): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2)
    errors.name = t.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = t.errEmail;
  if (values.message.trim().length < 10)
    errors.message = t.errMessage;
  return errors;
}

const fieldClass =
  "mt-2 w-full rounded-xl border bg-ink/50 px-4 py-3.5 text-bone placeholder:text-ash/60 transition-colors duration-300 focus:border-turq focus:outline-none focus-visible:outline-none";

type ContactProps = { lang: Lang; email?: string; socials?: { label: string; href: string }[] };

export function Contact({ lang, email = site.email, socials = site.socials as unknown as { label: string; href: string }[] }: ContactProps) {
  const t = ui[lang].contact;
  const uid = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    setSent(false);
    if (touched) setErrors(validate(next, t));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(values, t);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    // The site is static, so the message is handed to the visitor's mail app.
    const subject = t.subject(values.name.trim());
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (
    key: keyof Fields,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label htmlFor={`${uid}-${key}`} className="text-[0.95rem] text-bone/80">
        {label}
      </label>
      <input
        id={`${uid}-${key}`}
        name={key}
        value={values[key]}
        onChange={(e) => update(key, e.target.value)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `${uid}-${key}-error` : undefined}
        className={`${fieldClass} ${errors[key] ? "border-warn" : "border-line"}`}
        {...props}
      />
      {errors[key] ? (
        <p id={`${uid}-${key}-error`} className="mt-2 text-[0.9rem] text-warn">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <h2
            id="contact-title"
            className="break-words font-display text-[clamp(1.7rem,9vw,2.1rem)] font-semibold sm:text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.05] tracking-[-0.03em]"
          >
            <RevealLines lines={[t.heading[0]]} />
            <RevealLines
              lines={[t.heading[1]]}
              delay={0.09}
              className="text-glow"
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg text-ash">
              {t.lead}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex min-h-12 max-w-full items-center gap-2.5 break-all rounded-xl border border-turq/45 px-5 py-2 sm:px-6 font-medium text-ice transition-[background-color,box-shadow,transform] duration-300 hover:bg-turq/12 hover:shadow-[0_0_26px_-6px_rgb(53_224_210/0.7)] active:scale-[0.98]"
            >
              <Mail size={18} aria-hidden="true" />
              {email}
            </a>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 border-b border-line pb-1 text-lg transition-colors duration-300 hover:border-turq"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="text-ash transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-turq"
                    />
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass space-y-5 rounded-[2rem] p-6 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", t.name, {
                type: "text",
                autoComplete: "name",
                placeholder: "Toxtamuratov Bekzod",
              })}
              {field("email", t.email, {
                type: "email",
                autoComplete: "email",
                placeholder: "name@example.com",
                inputMode: "email",
              })}
            </div>
            <div>
              <label
                htmlFor={`${uid}-message`}
                className="text-[0.95rem] text-bone/80"
              >
                {t.message}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t.messagePlaceholder}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? `${uid}-message-error` : undefined
                }
                className={`${fieldClass} resize-y ${errors.message ? "border-warn" : "border-line"}`}
              />
              {errors.message ? (
                <p
                  id={`${uid}-message-error`}
                  className="mt-2 text-[0.9rem] text-warn"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-turq px-7 font-medium text-ink shadow-[0_0_30px_-6px_rgb(53_224_210/0.8)] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.99] sm:w-auto"
            >
              {t.submit}
              <Send
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <div aria-live="polite" className="min-h-6">
              <AnimatePresence>
                {sent ? (
                  <motion.p
                    className="text-[0.95rem] text-turq"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {t.sent}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
