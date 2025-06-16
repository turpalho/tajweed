"use client";

import { ReciterSettingsWidget } from "@/widgets/settings-reciter";
import { AudioSettingsWidget } from "@/widgets/settings-audio";
import { VisualSettingsWidget } from "@/widgets/settings-visual";
import { LearningSettingsWidget } from "@/widgets/settings-learning";
import { DownloadSettingsWidget } from "@/widgets/settings-downloads";
import { AboutSettingsWidget } from "@/widgets/settings-about";
import { PageHero } from "@/widgets/page-hero";
import { useI18n } from "@/shared/lib/i18n/context";

export function SettingsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <PageHero title={t("settings.title")} />

          {/* Settings Sections */}
          <div className="space-y-4 flex flex-col gap-2">
            <ReciterSettingsWidget />
            <AudioSettingsWidget />
            <VisualSettingsWidget />
            <LearningSettingsWidget />
            <DownloadSettingsWidget />
            <AboutSettingsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
