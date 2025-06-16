"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, File, Video, Download, Eye, PenTool } from "lucide-react";
import writingGroupsData from "@/shared/data/writing-groups.json";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";

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

interface WritingGroupPageProps {
  groupId: string;
}

export function WritingGroupPage({ groupId }: WritingGroupPageProps) {
  const router = useRouter();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  // Находим группу по ID
  const writingGroups = writingGroupsData as WritingGroup[];
  const group = writingGroups.find((g) => g.id === groupId);

  // Загружаем состояние из localStorage при монтировании
  useEffect(() => {
    if (group) {
      setIsDownloaded(group.isDownloaded);
    }
  }, [group]);

  // Находим предыдущую и следующую группы
  const currentIndex = writingGroups.findIndex((g) => g.id === groupId);
  const previousGroup =
    currentIndex > 0 ? writingGroups[currentIndex - 1] : null;
  const nextGroup =
    currentIndex < writingGroups.length - 1
      ? writingGroups[currentIndex + 1]
      : null;

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {t("writing.groupNotFound")}
          </h1>
          <button
            onClick={() => router.push("/writing")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("writing.returnToWriting")}
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push("/writing");
  };

  const handlePreviousGroup = () => {
    if (previousGroup) {
      router.push(`/writing/${previousGroup.id}`);
    }
  };

  const handleNextGroup = () => {
    if (nextGroup) {
      router.push(`/writing/${nextGroup.id}`);
    }
  };

  const handleDownloadPDF = () => {
    // Реализация скачивания PDF
    window.open(group.pdfUrl, "_blank");
    setIsDownloaded(true);
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(group.videoUrl);

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
            >
              <ArrowLeft size={24} color="#E0E0E0" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex gap-2 flex-row-reverse" dir="rtl">
                  {group.letters.map((letter, index) => (
                    <div
                      key={index}
                      className="text-3xl sm:text-4xl font-arabic text-[#E0E0E0]"
                    >
                      {letter.letter}
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-1">
                    {getLocalizedText(group.title)}
                  </h1>
                  <p className="text-[#E0E0E0]/70 text-sm">
                    {t("writing.group")} • {group.letters.length}{" "}
                    {t("writing.letters")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Lesson */}
              <div className="rounded-3xl">
                {videoId ? (
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                      title={getLocalizedText(group.title)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-primary rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Video
                        size={48}
                        color="#E0E0E0"
                        className="mx-auto mb-4"
                      />
                      <p className="text-[#E0E0E0]/70">
                        {t("writing.videoNotAvailable")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Letters Display */}
              <div className="bg-secondary rounded-3xl p-4 sm:p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
                  {t("writing.lettersInGroup")}
                </h3>
                <div
                  className="grid grid-cols-2 gap-4 sm:gap-6"
                  style={{ direction: "rtl" }}
                >
                  {[...group.letters].reverse().map((letter, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-primary rounded-2xl p-6 sm:p-8 mb-4 aspect-square flex items-center justify-center">
                        <div className="text-5xl sm:text-6xl md:text-7xl text-[#E0E0E0] font-arabic">
                          {letter.letter}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-[#E0E0E0] mb-1">
                        {getLocalizedText(letter.name)}
                      </h4>
                      <p className="text-sm text-[#E0E0E0]/70">
                        {letter.transliteration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDF Controls */}
              <div className="bg-secondary rounded-3xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("writing.materialControl")}
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleDownloadPDF}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                      isDownloaded
                        ? "bg-green-500/20 text-green-400"
                        : "bg-accent text-white hover:bg-accent/80"
                    }`}
                  >
                    <Download size={20} />
                    {isDownloaded
                      ? t("writing.downloaded")
                      : t("writing.download")}
                  </button>
                </div>
              </div>

              {/* PDF Copybook */}
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
                          {getLocalizedText(group.title)} -{" "}
                          {t("writing.copybook")}
                        </p>
                        <p className="text-[#E0E0E0]/70 text-sm">
                          PDF {t("writing.format")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Instructions */}
              <div className="bg-secondary rounded-3xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("writing.practiceInstructions")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-primary rounded-2xl">
                    <Eye
                      size={24}
                      color="#ED6F4C"
                      className="mt-1 flex-shrink-0"
                    />
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
                    <File
                      size={24}
                      color="#ED6F4C"
                      className="mt-1 flex-shrink-0"
                    />
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
                    <PenTool
                      size={24}
                      color="#ED6F4C"
                      className="mt-1 flex-shrink-0"
                    />
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Group Info */}
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
                      <span className="text-[#E0E0E0]">
                        {group.letters.length}
                      </span>
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

              {/* Navigation */}
              <div className="bg-secondary rounded-3xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("lessons.navigation")}
                </h3>
                <div className="space-y-3">
                  {/* Previous Group */}
                  {previousGroup && (
                    <button
                      onClick={handlePreviousGroup}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("writing.previousGroup")}
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex gap-1 flex-shrink-0 flex-row-reverse"
                          dir="rtl"
                        >
                          {previousGroup.letters
                            .slice(0, 2)
                            .map((letter, index) => (
                              <span key={index} className="text-xl font-arabic">
                                {letter.letter}
                              </span>
                            ))}
                        </div>
                        <span className="text-[#E0E0E0] font-medium text-sm min-w-0 truncate">
                          {getLocalizedText(previousGroup.title)}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Next Group */}
                  {nextGroup && (
                    <button
                      onClick={handleNextGroup}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("writing.nextGroup")}
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex gap-1 flex-shrink-0 flex-row-reverse"
                          dir="rtl"
                        >
                          {nextGroup.letters
                            .slice(0, 2)
                            .map((letter, index) => (
                              <span key={index} className="text-xl font-arabic">
                                {letter.letter}
                              </span>
                            ))}
                        </div>
                        <span className="text-[#E0E0E0] font-medium text-sm min-w-0 truncate">
                          {getLocalizedText(nextGroup.title)}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("writing.progressWriting")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#E0E0E0]/70">
                      {t("writing.group")}
                    </span>
                    <span className="text-[#E0E0E0]">
                      {currentIndex + 1} {t("alphabet.of")}{" "}
                      {writingGroups.length}
                    </span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
                      style={{
                        width: `${
                          ((currentIndex + 1) / writingGroups.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
