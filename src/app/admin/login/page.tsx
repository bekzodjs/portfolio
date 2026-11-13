import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin · Kirish", robots: { index: false } };

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="grid min-h-svh place-items-center px-5 py-16">
      <LoginForm />
    </main>
  );
}
