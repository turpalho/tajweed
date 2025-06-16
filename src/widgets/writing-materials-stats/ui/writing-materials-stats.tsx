"use client";

import { Download, Loader2 } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

interface WritingMaterialsStatsProps {
  totalPDFs: number;
  totalVideos: number;
  isDownloading: boolean;
  onDownloadAll: () => void;
}

export function WritingMaterialsStats({
  totalPDFs,
  totalVideos,
  isDownloading,
  onDownloadAll,
}: WritingMaterialsStatsProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-4 md:mb-0">
          {t("writing.availableMaterials")}
        </h3>
        <button
          onClick={onDownloadAll}
          disabled={isDownloading}
          className="px-6 py-3 bg-primary border border-[#E0E0E0]/30 rounded-2xl text-[#E0E0E0] font-medium hover:bg-[#E0E0E0]/30 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            {isDownloading ? (
              <>
                <Loader2 size={16} color="#E0E0E0" className="animate-spin" />
                {t("writing.downloading")}
              </>
            ) : (
              <>
                <Download size={16} color="#E0E0E0" />
                {t("writing.downloadAllPdf")}
              </>
            )}
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#E0E0E0] mb-2">
            {totalPDFs}
          </div>
          <div className="text-sm text-[#E0E0E0]/60 font-light">
            {t("writing.pdfCopybooks")}
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#E0E0E0] mb-2">
            {totalVideos}
          </div>
          <div className="text-sm text-[#E0E0E0]/60 font-light">
            {t("writing.videoLessons")}
          </div>
        </div>
      </div>
    </div>
  );
}
