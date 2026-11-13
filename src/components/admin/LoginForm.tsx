"use client";

import { Eye, EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Kirib bo'lmadi");
      }
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass w-full max-w-sm rounded-[1.5rem] p-7">
      <h1 className="font-display text-xl font-semibold">Admin panel</h1>
      <p className="mt-1.5 text-[0.95rem] text-ash">Loyihalarni boshqarish uchun kiring.</p>
      <label className="mt-6 block text-[0.9rem] text-ash" htmlFor="username">
        Login
      </label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-line bg-ink/50 px-3.5 text-bone outline-none focus:border-turq/60"
        required
      />
      <label className="mt-4 block text-[0.9rem] text-ash" htmlFor="password">
        Parol
      </label>
      <div className="relative mt-2">
        <input
          id="password"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full rounded-xl border border-line bg-ink/50 pl-3.5 pr-11 text-bone outline-none focus:border-turq/60"
          required
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Parolni yashirish" : "Parolni ko'rsatish"}
          aria-pressed={show}
          className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ash transition-colors hover:text-bone"
        >
          {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      {error ? <p className="mt-3 text-[0.9rem] text-warn">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-turq font-medium text-ink transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Tekshirilmoqda…" : "Kirish"}
      </button>
    </form>
  );
}
