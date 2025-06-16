"use client";

import {
  Lightbulb,
  Eye,
  Volume2,
  PenTool,
  AArrowDown,
  VolumeX,
} from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

export function WritingInstructions() {
  const { t } = useI18n();

  return (
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
          <div className="text-red-400 font-bold">{t("writing.important")}</div>
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
  );
}
