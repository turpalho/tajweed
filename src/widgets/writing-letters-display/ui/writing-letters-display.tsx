"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingLettersDisplayProps {
  group: WritingGroup;
}

export function WritingLettersDisplay({ group }: WritingLettersDisplayProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6 md:p-8">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
        {t("writing.lettersInGroup")}
      </h3>
      <div
        className="grid grid-cols-2 gap-4 sm:gap-6"
        style={{ direction: "rtl" }}
      >
        {[...group.letters].reverse().map((letter, index) => (
          <div key={index} className="text-center">
            <div className="bg-primary rounded-2xl p-6 sm:p-8 mb-4 aspect-square flex items-center justify-center">
              <div className="text-5xl sm:text-6xl md:text-7xl text-[#E0E0E0] font-arabic">
                {letter.letter}
              </div>
            </div>
            <h4 className="text-lg font-semibold text-[#E0E0E0] mb-1">
              {getLocalizedText(letter.name)}
            </h4>
            <p className="text-sm text-[#E0E0E0]/70">
              {letter.transliteration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
