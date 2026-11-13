import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getProfile, readContent } from "@/lib/content";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");
  const [content, profile] = await Promise.all([readContent(), getProfile()]);
  return <AdminDashboard initial={content} profile={profile} />;
}
