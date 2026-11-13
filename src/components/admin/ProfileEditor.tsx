/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import type { Fact, Profile, Service, SkillGroup } from "@/lib/content";

const input =
  "h-11 w-full rounded-xl border border-line bg-ink/50 px-3.5 text-bone outline-none focus:border-turq/60";
const area =
  "w-full rounded-xl border border-line bg-ink/50 px-3.5 py-2.5 text-bone outline-none focus:border-turq/60";
const label = "mb-1.5 block text-[0.88rem] text-ash";
const btnPrimary =
  "inline-flex h-11 items-center justify-center rounded-xl bg-turq px-5 font-medium text-ink transition hover:brightness-110 disabled:opacity-60";
const btnGhost =
  "inline-flex h-11 items-center justify-center rounded-xl border border-line px-4 text-ice transition hover:bg-turq/10";
const card = "glass space-y-5 rounded-[1.5rem] p-6";

async function uploadOne(file: File, folder: string): Promise<string | null> {
  const fd = new FormData();
  fd.append("folder", folder);
  fd.append("files", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  return res.ok && data.urls?.[0] ? data.urls[0] : null;
}

function FileField({
  currentLabel,
  value,
  accept,
  folder,
  onChange,
  onToast,
}: {
  currentLabel: string;
  value: string;
  accept: string;
  folder: string;
  onChange: (url: string) => void;
  onToast: (m: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className={btnGhost} disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? "Yuklanmoqda…" : currentLabel}
      </button>
      {value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-[0.9rem] text-ice underline">
          Joriy faylni ochish
        </a>
      ) : (
        <span className="text-[0.9rem] text-ash">Fayl yo'q</span>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setBusy(true);
          const url = await uploadOne(f, folder);
          setBusy(false);
          if (ref.current) ref.current.value = "";
          if (url) {
            onChange(url);
            onToast("Yuklandi");
          } else {
            onToast("Yuklab bo'lmadi");
          }
        }}
      />
    </div>
  );
}

export function ProfileEditor({
  initial,
  onToast,
  onDone,
}: {
  initial: Profile;
  onToast: (m: string) => void;
  onDone: () => void;
}) {
  const [p, setP] = useState<Profile>(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Profile>(k: K, v: Profile[K]) {
    setP((prev) => ({ ...prev, [k]: v }));
  }
  function setIelts<K extends keyof Profile["ielts"]>(k: K, v: string) {
    setP((prev) => ({ ...prev, ielts: { ...prev.ielts, [k]: v } }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    setSaving(false);
    if (res.ok) {
      onToast("Saqlandi");
      onDone();
    } else {
      onToast("Saqlab bo'lmadi");
    }
  }

  // --- facts helpers ---
  function setFact(i: number, key: keyof Fact, v: string) {
    set("aboutFacts", p.aboutFacts.map((f, idx) => (idx === i ? { ...f, [key]: v } : f)));
  }
  // --- services helpers ---
  function setService(i: number, key: keyof Service, v: string) {
    set("services", p.services.map((s, idx) => (idx === i ? { ...s, [key]: v } : s)) as Service[]);
  }
  // --- skills helpers ---
  function setGroup(i: number, g: SkillGroup) {
    set("skillGroups", p.skillGroups.map((x, idx) => (idx === i ? g : x)));
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Basic */}
      <div className={card}>
        <h2 className="font-display text-lg font-semibold">Asosiy</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Ism</label>
            <input className={input} value={p.firstName} onChange={(e) => set("firstName", e.target.value)} />
          </div>
          <div>
            <label className={label}>Familiya</label>
            <input className={input} value={p.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Rol (lavozim)</label>
          <input className={input} value={p.role} onChange={(e) => set("role", e.target.value)} />
        </div>
        <div>
          <label className={label}>Intro (bosh sahifadagi qisqa matn)</label>
          <textarea className={area} rows={2} value={p.intro} onChange={(e) => set("intro", e.target.value)} />
        </div>
        <div>
          <label className={label}>Manzil</label>
          <input className={input} value={p.location} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div>
          <label className={label}>Foto (rasm)</label>
          <FileField currentLabel="+ Rasm yuklash" value={p.photo} accept="image/*" folder="profile" onChange={(u) => set("photo", u)} onToast={onToast} />
        </div>
        <div>
          <label className={label}>CV (rezyume, PDF)</label>
          <FileField currentLabel="+ CV yuklash" value={p.cv} accept="application/pdf" folder="docs" onChange={(u) => set("cv", u)} onToast={onToast} />
        </div>
      </div>

      {/* About */}
      <div className={card}>
        <h2 className="font-display text-lg font-semibold">About</h2>
        <div>
          <label className={label}>Abzaslar (orasida bo'sh qator)</label>
          <textarea
            className={area}
            rows={5}
            value={p.aboutParagraphs.join("\n\n")}
            onChange={(e) => set("aboutParagraphs", e.target.value.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean))}
          />
        </div>
        <div>
          <label className={label}>Faktlar (chap: sarlavha, o'ng: matn)</label>
          <div className="space-y-2">
            {p.aboutFacts.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input className={input + " sm:max-w-[12rem]"} placeholder="Based in" value={f.term} onChange={(e) => setFact(i, "term", e.target.value)} />
                <input className={input} placeholder="Tashkent, Uzbekistan" value={f.detail} onChange={(e) => setFact(i, "detail", e.target.value)} />
                <button type="button" className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10" onClick={() => set("aboutFacts", p.aboutFacts.filter((_, idx) => idx !== i))}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" className={btnGhost + " mt-2"} onClick={() => set("aboutFacts", [...p.aboutFacts, { term: "", detail: "" }])}>+ Fakt qo'shish</button>
        </div>
      </div>

      {/* IELTS */}
      <div className={card}>
        <h2 className="font-display text-lg font-semibold">IELTS</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Ball</label>
            <input className={input} value={p.ielts.score} onChange={(e) => setIelts("score", e.target.value)} />
          </div>
          <div>
            <label className={label}>Daraja</label>
            <input className={input} value={p.ielts.level} onChange={(e) => setIelts("level", e.target.value)} />
          </div>
          <div>
            <label className={label}>Topshirilgan sana</label>
            <input className={input} value={p.ielts.taken} onChange={(e) => setIelts("taken", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Izoh</label>
          <textarea className={area} rows={2} value={p.ielts.note} onChange={(e) => setIelts("note", e.target.value)} />
        </div>
        <div>
          <label className={label}>Sertifikat (PDF)</label>
          <FileField currentLabel="+ Sertifikat yuklash" value={p.ielts.certificate} accept="application/pdf" folder="docs" onChange={(u) => setIelts("certificate", u)} onToast={onToast} />
        </div>
      </div>

      {/* Skills */}
      <div className={card}>
        <h2 className="font-display text-lg font-semibold">Technical Skills</h2>
        {p.skillGroups.map((g, gi) => (
          <div key={gi} className="rounded-2xl border border-line p-4">
            <div className="mb-3 flex gap-2">
              <input className={input} placeholder="Guruh nomi (Languages)" value={g.title} onChange={(e) => setGroup(gi, { ...g, title: e.target.value })} />
              <button type="button" className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10" onClick={() => set("skillGroups", p.skillGroups.filter((_, idx) => idx !== gi))}>Guruhni o'chirish</button>
            </div>
            <div className="space-y-2">
              {g.skills.map((sk, si) => (
                <div key={si} className="flex gap-2">
                  <input className={input + " sm:max-w-[9rem]"} placeholder="Nomi (React)" value={sk.name} onChange={(e) => setGroup(gi, { ...g, skills: g.skills.map((x, idx) => (idx === si ? { ...x, name: e.target.value } : x)) })} />
                  <input className={input + " sm:max-w-[6rem]"} placeholder="Belgi (Re)" value={sk.glyph} onChange={(e) => setGroup(gi, { ...g, skills: g.skills.map((x, idx) => (idx === si ? { ...x, glyph: e.target.value } : x)) })} />
                  <input className={input} placeholder="Izoh" value={sk.note} onChange={(e) => setGroup(gi, { ...g, skills: g.skills.map((x, idx) => (idx === si ? { ...x, note: e.target.value } : x)) })} />
                  <button type="button" className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10" onClick={() => setGroup(gi, { ...g, skills: g.skills.filter((_, idx) => idx !== si) })}>✕</button>
                </div>
              ))}
            </div>
            <button type="button" className={btnGhost + " mt-2"} onClick={() => setGroup(gi, { ...g, skills: [...g.skills, { name: "", glyph: "", note: "" }] })}>+ Skill</button>
          </div>
        ))}
        <button type="button" className={btnGhost} onClick={() => set("skillGroups", [...p.skillGroups, { title: "", skills: [] }])}>+ Guruh qo'shish</button>
      </div>

      {/* Services */}
      <div className={card}>
        <h2 className="font-display text-lg font-semibold">Services</h2>
        {p.services.map((sv, i) => (
          <div key={i} className="flex flex-wrap gap-2">
            <select className={input + " sm:max-w-[9rem]"} value={sv.icon} onChange={(e) => setService(i, "icon", e.target.value)}>
              <option value="web">Web</option>
              <option value="bot">Bot</option>
              <option value="design">Design</option>
            </select>
            <input className={input + " sm:max-w-[12rem]"} placeholder="Sarlavha" value={sv.title} onChange={(e) => setService(i, "title", e.target.value)} />
            <input className={input} placeholder="Tavsif" value={sv.detail} onChange={(e) => setService(i, "detail", e.target.value)} />
            <button type="button" className="shrink-0 rounded-xl border border-warn/40 px-3 text-warn hover:bg-warn/10" onClick={() => set("services", p.services.filter((_, idx) => idx !== i))}>✕</button>
          </div>
        ))}
        <button type="button" className={btnGhost} onClick={() => set("services", [...p.services, { icon: "web", title: "", detail: "" }])}>+ Xizmat qo'shish</button>
      </div>

      <div className="sticky bottom-4">
        <button type="submit" className={btnPrimary + " w-full shadow-[0_0_30px_-6px_rgb(53_224_210/0.8)]"} disabled={saving}>
          {saving ? "Saqlanmoqda…" : "Hammasini saqlash"}
        </button>
      </div>
    </form>
  );
}
