import { SurahPage } from "@/views/quran/ui/surah-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SurahDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SurahPage surahId={id} />;
}
