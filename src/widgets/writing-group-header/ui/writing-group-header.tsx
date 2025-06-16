"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingGroupHeaderProps {
  group: WritingGroup;
}

export function WritingGroupHeader({ group }: WritingGroupHeaderProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const handleBack = () => {
    router.push("/writing");
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={handleBack}
        className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
      >
        <ArrowLeft size={24} color="#E0E0E0" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex gap-2 flex-row-reverse" dir="rtl">
            {group.letters.map((letter, index) => (
              <div
                key={index}
                className="text-3xl sm:text-4xl font-arabic text-[#E0E0E0]"
              >
                {letter.letter}
              </div>
            ))}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-1">
              {getLocalizedText(group.title)}
            </h1>
            <p className="text-[#E0E0E0]/70 text-sm">
              {t("writing.group")} • {group.letters.length}{" "}
              {t("writing.letters")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
