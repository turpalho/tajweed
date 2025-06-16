"use client";

import { CheckCircle } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

interface SurahReadingControlProps {
  isRead: boolean;
  onToggle: () => void;
}

export function SurahReadingControl({
  isRead,
  onToggle,
}: SurahReadingControlProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("quran.learningSurah")}
      </h3>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
          isRead
            ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
            : "bg-accent text-white hover:bg-accent/80"
        }`}
      >
        <CheckCircle size={20} />
        {isRead ? t("quran.surahRead") : t("quran.markAsRead")}
      </button>
    </div>
  );
}
