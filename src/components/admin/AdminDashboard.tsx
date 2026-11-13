/* eslint-disable react/no-unescaped-entities */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Content, Profile, Project, ProjectLink, Settings } from "@/lib/content";
import { ProfileEditor } from "./ProfileEditor";

const EMPTY: Project = {
  slug: "",
  title: "",
  tagline: "",
  summary: "",
  description: [],
  highlights: [],
  tech: [],
  links: [],
  preview: "dashboard",
  duration: "",
  role: "",
  status: "",
  images: [],
};

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-ink/50 px-3.5 text-bone outline-none focus:border-turq/60";
const areaCls =
  "w-full rounded-xl border border-line bg-ink/50 px-3.5 py-2.5 text-bone outline-none focus:border-turq/60";
const labelCls = "mb-1.5 block text-[0.88rem] text-ash";
const btnPrimary =
  "inline-flex h-11 items-center justify-center rounded-xl bg-turq px-5 font-medium text-ink transition hover:brightness-110 disabled:opacity-60";
const btnGhost =
  "inline-flex h-11 items-center justify-center rounded-xl border border-line px-4 text-ice transition hover:bg-turq/10";

type Tab = "projects" | "profile" | "settings";

export function AdminDashboard({ initial, profile }: { initial: Content; profile: Profile }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>(initial.projects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState("");
  const [ask, setAsk] = useState<ConfirmState | null>(null);

  function flash(msg: string) {
    setToast(msg);
    window.clearTimeout((flash as unknown as { t?: number }).t);
    (flash as unknown as { t?: number }).t = window.setTimeout(() => setToast(""), 3000);
  }

  function logout() {
    setAsk({
      title: "Chiqish",
      message: "Admin paneldan chiqmoqchimisiz?",
      confirmLabel: "Chiqish",
      danger: false,
      onConfirm: async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      },
    });
  }

  function remove(slug: string) {
    const target = projects.find((p) => p.slug === slug);
    setAsk({
      title: "Loyihani o'chirish",
      message: `"${target?.title ?? slug}" loyihasi butunlay o'chiriladi. Buni ortga qaytarib bo'lmaydi.`,
      confirmLabel: "O'chirish",
      danger: true,
      onConfirm: async () => {
        const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
        if (res.ok) {
          setProjects((p) => p.filter((x) => x.slug !== slug));
          flash("O'chirildi");
          router.refresh();
        } else {
          flash("O'chirib bo'lmadi");
        }
      },
    });
  }

  async function save(project: Project) {
    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${project.slug}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash(data.error || "Saqlab bo'lmadi");
      return;
    }
    const saved: Project = data.project;
    setProjects((prev) => {
      if (isNew) return [...prev, saved];
      return prev.map((p) => (p.slug === saved.slug ? saved : p));
    });
    setEditing(null);
    setIsNew(false);
    flash("Saqlandi");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-[-0.02em]">Admin panel</h1>
          <p className="mt-1 text-[0.95rem] text-ash">Loyihalar va aloqa ma'lumotlari.</p>
        </div>
        <button type="button" onClick={logout} className={btnGhost}>
          Chiqish
        </button>
      </header>

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("projects")}
          className={tab === "projects" ? btnPrimary : btnGhost}
        >
          Loyihalar
        </button>
        <button
          type="button"
          onClick={() => setTab("profile")}
          className={tab === "profile" ? btnPrimary : btnGhost}
        >
          Profil / Sayt
        </button>
        <button
          type="button"
          onClick={() => setTab("settings")}
          className={tab === "settings" ? btnPrimary : btnGhost}
        >
          Aloqa / linklar
        </button>
      </div>

      {tab === "projects" ? (
        editing ? (
          <ProjectEditor
            key={editing.slug || "new"}
            value={editing}
            isNew={isNew}
            onCancel={() => {
              setEditing(null);
              setIsNew(false);
            }}
            onSave={save}
            onToast={flash}
          />
        ) : (
          <div>
            <button
              type="button"
              onClick={() => {
                setEditing({ ...EMPTY });
                setIsNew(true);
              }}
              className={`${btnPrimary} mb-5`}
            >
              + Yangi loyiha
            </button>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li
                  key={p.slug}
                  className="glass flex items-center gap-4 rounded-2xl p-4"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-ink/50">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover object-top" />
                    ) : (
                      <span className="grid h-full place-items-center text-[0.75rem] text-ash">
                        rasm yo'q
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="truncate text-[0.9rem] text-ash">{p.tagline}</p>
                    <p className="mt-0.5 text-[0.8rem] text-ash">{p.images.length} ta rasm</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing({ ...EMPTY, ...p });
                        setIsNew(false);
                      }}
                      className={btnGhost}
                    >
                      Tahrirlash
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-warn/40 px-4 text-warn transition hover:bg-warn/10"
                    >
                      O'chirish
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : tab === "profile" ? (
        <ProfileEditor initial={profile} onToast={flash} onDone={() => router.refresh()} />
      ) : (
        <SettingsEditor initial={initial.settings} onToast={flash} onDone={() => router.refresh()} />
      )}

      <ConfirmDialog ask={ask} onClose={() => setAsk(null)} />

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-line bg-ink/90 px-5 py-3 text-bone backdrop-blur">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function ProjectEditor({
  value,
  isNew,
  onCancel,
  onSave,
  onToast,
}: {
  value: Project;
  isNew: boolean;
  onCancel: () => void;
  onSave: (p: Project) => void | Promise<void>;
  onToast: (m: string) => void;
}) {
  const [p, setP] = useState<Project>(value);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof Project>(key: K, v: Project[K]) {
    setP((prev) => ({ ...prev, [key]: v }));
  }

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("slug", p.slug || p.title || "loyiha");
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        set("images", [...p.images, ...data.urls]);
        onToast(`${data.urls.length} ta rasm yuklandi`);
      } else {
        onToast(data.error || "Yuklab bo'lmadi");
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function removeImage(url: string) {
    set("images", p.images.filter((u) => u !== url));
    if (url.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      }).catch(() => {});
    }
  }

  function move(url: string, dir: -1 | 1) {
    const i = p.images.indexOf(url);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= p.images.length) return;
    const next = [...p.images];
    [next[i], next[j]] = [next[j], next[i]];
    set("images", next);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(p);
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="glass space-y-6 rounded-[1.5rem] p-6">
      <h2 className="font-display text-lg font-semibold">
        {isNew ? "Yangi loyiha" : `Tahrirlash: ${p.title}`}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Nomi *</label>
          <input className={inputCls} value={p.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Qisqa yorliq (tagline)</label>
          <input className={inputCls} value={p.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Kartochkadagi qisqa matn</label>
        <textarea className={areaCls} rows={2} value={p.summary} onChange={(e) => set("summary", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>To'liq tavsif (har bir abzas — yangi qatordan, orasida bo'sh qator)</label>
        <textarea
          className={areaCls}
          rows={5}
          value={p.description.join("\n\n")}
          onChange={(e) => set("description", e.target.value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean))}
        />
      </div>

      <div>
        <label className={labelCls}>Imkoniyatlar (har biri yangi qatordan)</label>
        <textarea
          className={areaCls}
          rows={4}
          value={p.highlights.join("\n")}
          onChange={(e) => set("highlights", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        />
      </div>

      <div>
        <label className={labelCls}>Texnologiyalar (vergul bilan ajrating)</label>
        <input
          className={inputCls}
          value={p.tech.join(", ")}
          onChange={(e) => set("tech", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>Ketgan vaqt</label>
          <input className={inputCls} value={p.duration} onChange={(e) => set("duration", e.target.value)} placeholder="2 oy" />
        </div>
        <div>
          <label className={labelCls}>Rolingiz</label>
          <input className={inputCls} value={p.role} onChange={(e) => set("role", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Holati</label>
          <input className={inputCls} value={p.status} onChange={(e) => set("status", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Chizma turi (rasm bo'lmaganda)</label>
        <select
          className={inputCls}
          value={p.preview}
          onChange={(e) => set("preview", e.target.value as Project["preview"])}
        >
          <option value="site">Sayt</option>
          <option value="bot">Bot</option>
          <option value="dashboard">Dashboard</option>
        </select>
      </div>

      <LinksEditor links={p.links} onChange={(v) => set("links", v)} />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className={labelCls + " mb-0"}>Rasmlar (birinchisi — muqova)</label>
          <button type="button" onClick={() => fileRef.current?.click()} className={btnGhost} disabled={uploading}>
            {uploading ? "Yuklanmoqda…" : "+ Rasm yuklash"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => upload(e.target.files)}
          />
        </div>
        {p.images.length === 0 ? (
          <p className="text-[0.9rem] text-ash">Hali rasm yo'q.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {p.images.map((url, i) => (
              <li key={url} className="group relative overflow-hidden rounded-xl border border-line bg-ink/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-28 w-full object-cover object-top" />
                {i === 0 ? (
                  <span className="absolute left-2 top-2 rounded-full bg-turq px-2 py-0.5 text-[0.7rem] font-medium text-ink">
                    Muqova
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-ink/80 p-1.5">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => move(url, -1)} className="rounded px-2 text-ice hover:bg-turq/20" aria-label="Chapga">‹</button>
                    <button type="button" onClick={() => move(url, 1)} className="rounded px-2 text-ice hover:bg-turq/20" aria-label="O'ngga">›</button>
                  </div>
                  <button type="button" onClick={() => removeImage(url)} className="rounded px-2 text-warn hover:bg-warn/20" aria-label="O'chirish">✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className={btnPrimary} disabled={saving}>
          {saving ? "Saqlanmoqda…" : "Saqlash"}
        </button>
        <button type="button" onClick={onCancel} className={btnGhost}>
          Bekor qilish
        </button>
      </div>
    </form>
  );
}

function LinksEditor({ links, onChange }: { links: ProjectLink[]; onChange: (v: ProjectLink[]) => void }) {
  function update(i: number, field: keyof ProjectLink, val: string) {
    const next = links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l));
    onChange(next);
  }
  return (
    <div>
      <label className={labelCls}>Havolalar (tugmalar)</label>
      <div className="space-y-2">
        {links.map((l, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls + " sm:max-w-[12rem]"}
              placeholder="Tugma nomi (Live Demo)"
              value={l.label}
              onChange={(e) => update(i, "label", e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="https://..."
              value={l.href}
              onChange={(e) => update(i, "href", e.target.value)}
            />
            <button
              type="button"
              onClick={() => onChange(links.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10"
              aria-label="O'chirish"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", href: "" }])}
        className={btnGhost + " mt-2"}
      >
        + Havola qo'shish
      </button>
    </div>
  );
}

function SettingsEditor({
  initial,
  onToast,
  onDone,
}: {
  initial: Settings;
  onToast: (m: string) => void;
  onDone: () => void;
}) {
  const [email, setEmail] = useState(initial.email);
  const [socials, setSocials] = useState<ProjectLink[]>(initial.socials);
  const [saving, setSaving] = useState(false);

  function update(i: number, field: keyof ProjectLink, val: string) {
    setSocials((s) => s.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, socials }),
    });
    setSaving(false);
    if (res.ok) {
      onToast("Saqlandi");
      onDone();
    } else {
      onToast("Saqlab bo'lmadi");
    }
  }

  return (
    <form onSubmit={submit} className="glass space-y-6 rounded-[1.5rem] p-6">
      <div>
        <label className={labelCls}>Email</label>
        <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Ijtimoiy tarmoqlar (Telegram, LinkedIn, GitHub...)</label>
        <div className="space-y-2">
          {socials.map((l, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputCls + " sm:max-w-[12rem]"}
                placeholder="Nomi (Telegram)"
                value={l.label}
                onChange={(e) => update(i, "label", e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="https://..."
                value={l.href}
                onChange={(e) => update(i, "href", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setSocials((s) => s.filter((_, idx) => idx !== i))}
                className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10"
                aria-label="O'chirish"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSocials((s) => [...s, { label: "", href: "" }])}
          className={btnGhost + " mt-2"}
        >
          + Qo'shish
        </button>
      </div>
      <button type="submit" className={btnPrimary} disabled={saving}>
        {saving ? "Saqlanmoqda…" : "Saqlash"}
      </button>
    </form>
  );
}

type ConfirmState = {
  title: string;
  message: string;
  confirmLabel: string;
  danger: boolean;
  onConfirm: () => void | Promise<void>;
};

function ConfirmDialog({ ask, onClose }: { ask: ConfirmState | null; onClose: () => void }) {
  const [busy, setBusy] = useState(false);

  async function confirm() {
    if (!ask) return;
    setBusy(true);
    try {
      await ask.onConfirm();
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {ask ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            className="glass w-full max-w-md rounded-[1.5rem] p-6"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">{ask.title}</h3>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ash">{ask.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={onClose} disabled={busy} className={btnGhost}>
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={busy}
                className={
                  ask.danger
                    ? "inline-flex h-11 items-center justify-center rounded-xl bg-warn px-5 font-medium text-ink transition hover:brightness-110 disabled:opacity-60"
                    : btnPrimary
                }
              >
                {busy ? "Bajarilmoqda…" : ask.confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
