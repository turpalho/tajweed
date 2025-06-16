"use client";

import Image from "next/image";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterArticulationPointProps {
  letter: ArabicLetter;
}

export function LetterArticulationPoint({
  letter,
}: LetterArticulationPointProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("alphabet.articulationPoint")}
      </h3>
      <div className="bg-white flex justify-center items-center rounded-3xl p-2 mb-4">
        <Image
          src={letter.imageUrl || "/images/default-letter.jpg"}
          alt={`${t("alphabet.articulationPoint")} ${getLocalizedText(
            letter.name
          )}`}
          width={400}
          height={400}
          className="w-full h-full sm:w-[400px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
