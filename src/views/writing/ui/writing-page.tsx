"use client";

import { useWritingData } from "@/features/writing-data";
import { useWritingDownloads } from "@/features/writing-downloads";
import { WritingHero } from "@/widgets/writing-hero";
import { WritingInstructions } from "@/widgets/writing-instructions";
import { WritingMaterialsStats } from "@/widgets/writing-materials-stats";
import { WritingGroupsGrid } from "@/widgets/writing-groups-grid";

export function WritingPage() {
  const { writingGroups, totalPDFs, totalVideos } = useWritingData();
  const { isDownloading, downloadAllPDFs } = useWritingDownloads();

  const handleDownloadAll = () => {
    downloadAllPDFs(writingGroups);
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <WritingHero />
          <WritingInstructions />
          <WritingMaterialsStats
            totalPDFs={totalPDFs}
            totalVideos={totalVideos}
            isDownloading={isDownloading}
            onDownloadAll={handleDownloadAll}
          />
          <WritingGroupsGrid writingGroups={writingGroups} />
        </div>
      </div>
    </div>
  );
}
