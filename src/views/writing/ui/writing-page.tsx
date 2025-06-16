"use client";

import {
  File,
  Video,
  Lightbulb,
  Eye,
  Volume2,
  PenTool,
  AArrowDown,
  VolumeX,
  Download,
  Loader2,
} from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import writingGroupsData from "@/shared/data/writing-groups.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LocalizedText {
  ru: string;
  en: string;
  ar: string;
}

interface WritingGroup {
  id: string;
  title: LocalizedText;
  letters: Array<{
    letter: string;
    name: LocalizedText;
    transliteration: string;
  }>;
  pdfUrl: string;
  videoUrl: string;
  isDownloaded: boolean;
}

const writingGroups: WritingGroup[] = writingGroupsData;

export function WritingPage() {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const totalPDFs = writingGroups.length;
  const totalVideos = writingGroups.length;
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAllPDFs = async () => {
    setIsDownloading(true);
    try {
      for (const group of writingGroups) {
        const link = document.createElement("a");
        link.href = group.pdfUrl;
        link.download = `group-${group.id}-writing.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Небольшая задержка между скачиваниями для избежания блокировки браузером
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error("Ошибка при скачивании файлов:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] mb-6 leading-tight tracking-tight">
              {t("writing.title")}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {t("writing.letterCopies")}
              </span>
            </h1>
          </div>

          {/* Info Section */}
          <div className="bg-secondary rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary rounded-xl">
                <Lightbulb size={24} color="#ED6F4C" />
              </div>
              <h3 className="text-xl font-semibold text-[#E0E0E0]">
                {t("writing.howToWork")}
              </h3>
            </div>

            <div className="space-y-4 text-[#E0E0E0]/80 leading-relaxed">
              <p>{t("writing.instructions")}</p>

              <div className="flex items-center gap-2 mt-4 mb-3">
                <div className="text-red-400 font-bold">
                  {t("writing.important")}
                </div>
                <div className="text-red-400">❗</div>
              </div>

              <p>
                {t("writing.pronounceAloud")}
                <VolumeX size={16} className="inline mx-1 text-[#E0E0E0]/60" />
              </p>

              <p className="mt-4">{t("writing.memoryTypes")}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3 p-4 bg-primary rounded-xl">
                  <Eye size={20} color="#ED6F4C" />
                  <span className="text-sm">{t("writing.visualMemory")}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary rounded-xl">
                  <Volume2 size={20} color="#ED6F4C" />
                  <span className="text-sm">{t("writing.auditoryMemory")}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary rounded-xl">
                  <PenTool size={20} color="#ED6F4C" />
                  <span className="text-sm">{t("writing.writingMemory")}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-primary rounded-xl">
                <div className="flex items-center gap-2">
                  <AArrowDown size={44} color="#E0E0E0" />
                  <span className="text-sm">{t("writing.association")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-secondary rounded-3xl p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-4 md:mb-0">
                {t("writing.availableMaterials")}
              </h3>
              <button
                onClick={downloadAllPDFs}
                disabled={isDownloading}
                className="px-6 py-3 bg-primary border border-[#E0E0E0]/30 rounded-2xl text-[#E0E0E0] font-medium hover:bg-[#E0E0E0]/30 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  {isDownloading ? (
                    <>
                      <Loader2
                        size={16}
                        color="#E0E0E0"
                        className="animate-spin"
                      />
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

          {/* Groups Grid */}
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
        </div>
      </div>
    </div>
  );
}
