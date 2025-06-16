"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Surah } from "@/entities/quran";
import { useLocalizedText } from "@/shared/lib/localized-data";

interface SurahPageHeaderProps {
  surah: Surah;
}

export function SurahPageHeader({ surah }: SurahPageHeaderProps) {
  const router = useRouter();
  const { getLocalizedText } = useLocalizedText();

  const handleBack = () => {
    router.push("/quran");
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={handleBack}
        className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
      >
        <ArrowLeft size={24} color="#E0E0E0" />
      </button>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-[#E0E0E0] font-arabic">
            {surah.nameArabic}
          </h1>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#E0E0E0]">
              {surah.name}
            </h2>
            <p className="text-[#E0E0E0]/70 text-sm">
              {surah.transliteration} - {getLocalizedText(surah.translation)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
