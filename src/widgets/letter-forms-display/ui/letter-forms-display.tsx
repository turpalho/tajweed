"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterFormsDisplayProps {
  letter: ArabicLetter;
}

export function LetterFormsDisplay({ letter }: LetterFormsDisplayProps) {
  const { t } = useI18n();

  const forms = [
    { key: "final", label: t("alphabet.atEnd") },
    { key: "medial", label: t("alphabet.inMiddle") },
    { key: "initial", label: t("alphabet.atBeginning") },
    { key: "isolated", label: t("alphabet.isolated") },
  ] as const;

  const formsRTL = [
    { key: "isolated", label: t("alphabet.isolated") },
    { key: "initial", label: t("alphabet.atBeginning") },
    { key: "medial", label: t("alphabet.inMiddle") },
    { key: "final", label: t("alphabet.atEnd") },
  ] as const;

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
        {t("alphabet.letterForms")}
      </h3>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6">
        {forms.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
              <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                {letter.positions[key]}
              </div>
            </div>
            <p className="text-sm text-[#E0E0E0]/70">{label}</p>
          </div>
        ))}
      </div>

      {/* Mobile (RTL) */}
      <div
        className="grid sm:hidden grid-cols-2 md:grid-cols-4 gap-6"
        style={{ direction: "rtl" }}
      >
        {formsRTL.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
              <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                {letter.positions[key]}
              </div>
            </div>
            <p className="text-sm text-[#E0E0E0]/70">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
