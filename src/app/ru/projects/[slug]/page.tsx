import { ProjectPage, projectPageMetadata } from "@/components/ProjectPage";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return projectPageMetadata("ru", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProjectPage lang="ru" slug={(await params).slug} />;
}
