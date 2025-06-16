"use client";

import { File } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingPdfInfoProps {
  group: WritingGroup;
}

export function WritingPdfInfo({ group }: WritingPdfInfoProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("writing.pdfCopybook")}
      </h3>
      <div className="bg-primary rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <File size={32} color="#E0E0E0" />
            <div>
              <p className="text-[#E0E0E0] font-medium">
                {getLocalizedText(group.title)} - {t("writing.copybook")}
              </p>
              <p className="text-[#E0E0E0]/70 text-sm">
                PDF {t("writing.format")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
