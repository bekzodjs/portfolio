import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = homeMetadata("uz");

export default function Home() {
  return <HomePage lang="uz" />;
}
