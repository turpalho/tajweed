"use client";

import { Eye, File, PenTool } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

export function WritingPracticeInstructions() {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("writing.practiceInstructions")}
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-primary rounded-2xl">
          <Eye size={24} color="#ED6F4C" className="mt-1 flex-shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[#E0E0E0] font-medium mb-1">
              {t("writing.step1")}
            </h4>
            <p className="text-[#E0E0E0]/70 text-sm">
              {t("writing.watchVideo")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-primary rounded-2xl">
          <File size={24} color="#ED6F4C" className="mt-1 flex-shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[#E0E0E0] font-medium mb-1">
              {t("writing.step2")}
            </h4>
            <p className="text-[#E0E0E0]/70 text-sm">
              {t("writing.downloadPrint")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-primary rounded-2xl">
          <PenTool size={24} color="#ED6F4C" className="mt-1 flex-shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[#E0E0E0] font-medium mb-1">
              {t("writing.step3")}
            </h4>
            <p className="text-[#E0E0E0]/70 text-sm">
              {t("writing.practiceTogether")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
