"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingGroupNavigationProps {
  previousGroup: WritingGroup | null;
  nextGroup: WritingGroup | null;
}

export function WritingGroupNavigation({
  previousGroup,
  nextGroup,
}: WritingGroupNavigationProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const handlePreviousGroup = () => {
    if (previousGroup) {
      router.push(`/writing/${previousGroup.id}`);
    }
  };

  const handleNextGroup = () => {
    if (nextGroup) {
      router.push(`/writing/${nextGroup.id}`);
    }
  };

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("lessons.navigation")}
      </h3>
      <div className="space-y-3">
        {/* Previous Group */}
        {previousGroup && (
          <button
            onClick={handlePreviousGroup}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("writing.previousGroup")}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex gap-1 flex-shrink-0 flex-row-reverse"
                dir="rtl"
              >
                {previousGroup.letters.slice(0, 2).map((letter, index) => (
                  <span key={index} className="text-xl font-arabic">
                    {letter.letter}
                  </span>
                ))}
              </div>
              <span className="text-[#E0E0E0] font-medium text-sm min-w-0 truncate">
                {getLocalizedText(previousGroup.title)}
              </span>
            </div>
          </button>
        )}

        {/* Next Group */}
        {nextGroup && (
          <button
            onClick={handleNextGroup}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("writing.nextGroup")}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex gap-1 flex-shrink-0 flex-row-reverse"
                dir="rtl"
              >
                {nextGroup.letters.slice(0, 2).map((letter, index) => (
                  <span key={index} className="text-xl font-arabic">
                    {letter.letter}
                  </span>
                ))}
              </div>
              <span className="text-[#E0E0E0] font-medium text-sm min-w-0 truncate">
                {getLocalizedText(nextGroup.title)}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
