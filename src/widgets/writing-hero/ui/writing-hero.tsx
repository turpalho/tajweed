"use client";

import { useI18n } from "@/shared/lib/i18n/context";

export function WritingHero() {
  const { t } = useI18n();

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] mb-6 leading-tight tracking-tight">
        {t("writing.title")}
        <span
          className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
          style={{
            backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
          }}
        >
          {t("writing.letterCopies")}
        </span>
      </h1>
    </div>
  );
}
