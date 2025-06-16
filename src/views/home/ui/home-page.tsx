"use client";

import { useRouter } from "next/navigation";
import { QuickNavigationCards } from "@/features/quick-navigation";
import { ProgressSummary } from "@/features/progress-tracking";
import { useI18n } from "@/shared/lib/i18n/context";
import { useAppSettings } from "@/shared/hooks/use-app-settings";

export function HomePage() {
  const { t } = useI18n();
  const { isLoaded } = useAppSettings();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#E0E0E0]">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#E0E0E0]/10 backdrop-blur-md border border-[#E0E0E0]/20 rounded-full text-sm font-medium text-[#E0E0E0]/90 mb-2 shadow-2xl">
              <span
                className="w-2 h-2 rounded-full mr-2 animate-pulse shadow-lg"
                style={{
                  backgroundColor: "#ED6F4C",
                  boxShadow: "0 0 10px #ED6F4C50",
                }}
              />
              {t("home.activeStudy")}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              {t("home.title").split(" ")[0]}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {" "}
                {t("home.title").split(" ")[1]}
              </span>
            </h1>
          </div>

          {/* Quick Access Cards */}
          <div>
            <QuickNavigationCards onNavigate={handleNavigation} />
          </div>

          {/* Learning Progress */}
          <div>
            <ProgressSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
