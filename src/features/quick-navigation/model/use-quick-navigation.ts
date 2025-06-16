"use client";

import { Video, Type, BookOpen, PenTool } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import type { NavigationItem } from "./types";

export function useQuickNavigation() {
    const { t } = useI18n();

    const navigationItems: NavigationItem[] = [
        {
            id: "lessons",
            titleKey: "quickAccess.videoLessons",
            icon: Video,
            subtitle: `2 ${t("quickAccess.courses")}`,
            path: "/lessons",
            gradient: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: "alphabet",
            titleKey: "quickAccess.arabicAlphabet",
            icon: Type,
            subtitle: `28 ${t("quickAccess.lettersWithPronunciation")}`,
            path: "/alphabet",
            gradient: "from-green-500/20 to-emerald-500/20",
        },
        {
            id: "quran",
            titleKey: "quickAccess.quranOnline",
            icon: BookOpen,
            subtitle: t("quickAccess.textAndAudio"),
            path: "/quran",
            gradient: "from-purple-500/20 to-pink-500/20",
        },
        {
            id: "writing",
            titleKey: "quickAccess.letterCopybooks",
            icon: PenTool,
            subtitle: t("quickAccess.pdfAndVideo"),
            path: "/writing",
            gradient: "from-orange-500/20 to-red-500/20",
        },
    ];

    return { navigationItems };
}
