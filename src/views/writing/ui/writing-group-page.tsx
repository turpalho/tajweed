"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { useWritingGroupData } from "@/features/writing-group-data";
import { WritingGroupHeader } from "@/widgets/writing-group-header";
import { YouTubePlayer } from "@/widgets/youtube-player";
import { WritingLettersDisplay } from "@/widgets/writing-letters-display";
import { WritingMaterialControls } from "@/widgets/writing-material-controls";
import { WritingPdfInfo } from "@/widgets/writing-pdf-info";
import { WritingPracticeInstructions } from "@/widgets/writing-practice-instructions";
import { WritingGroupInfoCard } from "@/widgets/writing-group-info-card";
import { WritingGroupNavigation } from "@/widgets/writing-group-navigation";
import { WritingProgressCard } from "@/widgets/writing-progress-card";

interface WritingGroupPageProps {
  groupId: string;
}

export function WritingGroupPage({ groupId }: WritingGroupPageProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const {
    group,
    writingGroups,
    currentIndex,
    previousGroup,
    nextGroup,
    isDownloaded,
    handleDownloadPDF,
  } = useWritingGroupData(groupId);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {t("writing.groupNotFound")}
          </h1>
          <button
            onClick={() => (window.location.href = "/writing")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("writing.returnToWriting")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <WritingGroupHeader group={group} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Lesson */}
              <div className="rounded-3xl">
                <YouTubePlayer
                  videoUrl={group.videoUrl}
                  title={getLocalizedText(group.title)}
                />
              </div>

              <WritingLettersDisplay group={group} />
              <WritingMaterialControls
                isDownloaded={isDownloaded}
                onDownload={handleDownloadPDF}
              />
              <WritingPdfInfo group={group} />
              <WritingPracticeInstructions />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <WritingGroupInfoCard group={group} isDownloaded={isDownloaded} />
              <WritingGroupNavigation
                previousGroup={previousGroup}
                nextGroup={nextGroup}
              />
              <WritingProgressCard
                currentIndex={currentIndex}
                totalGroups={writingGroups.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
