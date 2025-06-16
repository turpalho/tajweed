"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface WritingProgressCardProps {
  currentIndex: number;
  totalGroups: number;
}

export function WritingProgressCard({
  currentIndex,
  totalGroups,
}: WritingProgressCardProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("writing.progressWriting")}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#E0E0E0]/70">{t("writing.group")}</span>
          <span className="text-[#E0E0E0]">
            {currentIndex + 1} {t("alphabet.of")} {totalGroups}
          </span>
        </div>
        <div className="w-full bg-primary rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
            style={{
              width: `${((currentIndex + 1) / totalGroups) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
