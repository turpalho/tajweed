"use client";

import { File, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { WritingGroup } from "@/entities/writing";

interface WritingGroupsGridProps {
  writingGroups: WritingGroup[];
}

export function WritingGroupsGrid({ writingGroups }: WritingGroupsGridProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {writingGroups.map((group) => (
        <div
          key={group.id}
          className="group relative cursor-pointer"
          onClick={() => router.push(`/writing/${group.id}`)}
        >
          {/* Glass morphism card */}
          <div className="relative bg-secondary rounded-3xl p-6 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-[#E0E0E0]/15">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[#E0E0E0] group-hover:text-[#E0E0E0]/90 transition-colors flex-1">
                {getLocalizedText(group.title)}
              </h3>
              {group.isDownloaded && (
                <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
              )}
            </div>

            <div className="flex gap-2 mb-6 justify-center">
              {group.letters.map((letter, index) => (
                <div
                  key={index}
                  className="text-3xl font-arabic text-[#E0E0E0] group-hover:scale-110 transition-transform duration-300"
                >
                  {letter.letter}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="px-4 flex items-center gap-2 py-2 bg-primary border border-[#E0E0E0]/30 rounded-2xl text-sm font-medium text-[#E0E0E0] hover:bg-[#E0E0E0]/30 transition-colors cursor-pointer">
                <File size={20} color="#E0E0E0" />
                {t("writing.pdfCopybook")}
              </div>
              <div className="px-4 flex items-center gap-2 py-2 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer">
                <Video size={20} color="#E0E0E0" />
                {t("writing.videoLesson")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
