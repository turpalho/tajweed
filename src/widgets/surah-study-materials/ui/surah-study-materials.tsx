"use client";

import { FileText, Download } from "lucide-react";
import { Surah } from "@/entities/quran";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";

interface SurahStudyMaterialsProps {
  surah: Surah;
}

export function SurahStudyMaterials({ surah }: SurahStudyMaterialsProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const openPdf = () => {
    if (surah.pdfUrl) {
      window.open(surah.pdfUrl, "_blank");
    }
  };

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("quran.studyMaterials")}
      </h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={openPdf}
          className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-600/80 transition-colors"
        >
          <FileText size={20} />
          {t("quran.openPdf")}
        </button>
        <a
          href={surah.pdfUrl}
          download
          className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-600/80 transition-colors"
        >
          <Download size={20} />
          {t("quran.downloadPdf")}
        </a>
      </div>

      {surah.description && (
        <div className="bg-primary rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-accent rounded-full mt-1"></div>
            <div>
              <span className="text-[#E0E0E0]/70 text-sm block mb-1">
                {t("quran.aboutSurah")}
              </span>
              <span className="text-[#E0E0E0] text-sm">
                {getLocalizedText(surah.description)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
