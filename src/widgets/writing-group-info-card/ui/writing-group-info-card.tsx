"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingGroupInfoCardProps {
  group: WritingGroup;
  isDownloaded: boolean;
}

export function WritingGroupInfoCard({
  group,
  isDownloaded,
}: WritingGroupInfoCardProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
    <div className="bg-secondary rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("writing.aboutGroup")}
      </h3>
      <div className="space-y-3">
        <div className="text-center mb-4">
          <div
            className="flex gap-2 justify-center mb-4 flex-row-reverse"
            dir="rtl"
          >
            {group.letters.map((letter, index) => (
              <div
                key={index}
                className="text-3xl sm:text-4xl text-[#E0E0E0] font-arabic"
              >
                {letter.letter}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-[#E0E0E0]/60">
          <div className="flex justify-between">
            <span>{t("writing.groupName")}</span>
            <span className="text-[#E0E0E0] text-right">
              {getLocalizedText(group.title)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("writing.lettersCount")}</span>
            <span className="text-[#E0E0E0]">{group.letters.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("writing.status")}</span>
            <span
              className={`${
                isDownloaded ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {isDownloaded
                ? t("writing.downloaded")
                : t("writing.notDownloaded")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
