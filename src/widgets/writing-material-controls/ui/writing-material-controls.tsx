"use client";

import { Download } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

interface WritingMaterialControlsProps {
  isDownloaded: boolean;
  onDownload: () => void;
}

export function WritingMaterialControls({
  isDownloaded,
  onDownload,
}: WritingMaterialControlsProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("writing.materialControl")}
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onDownload}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
            isDownloaded
              ? "bg-green-500/20 text-green-400"
              : "bg-accent text-white hover:bg-accent/80"
          }`}
        >
          <Download size={20} />
          {isDownloaded ? t("writing.downloaded") : t("writing.download")}
        </button>
      </div>
    </div>
  );
}
