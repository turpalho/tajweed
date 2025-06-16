"use client";

import { Play } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { getYouTubeId } from "@/shared/lib/youtube-player";

interface YouTubePlayerProps {
  videoUrl: string;
  title: string;
}

export function YouTubePlayer({ videoUrl, title }: YouTubePlayerProps) {
  const { t } = useI18n();
  const youtubeId = getYouTubeId(videoUrl);

  if (!youtubeId) {
    return (
      <div className="aspect-video bg-primary rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <Play size={48} color="#E0E0E0" className="mx-auto mb-4" />
          <p className="text-[#E0E0E0]/70">{t("lessons.videoUnavailable")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-2xl overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
