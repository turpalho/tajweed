"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface CourseSelectorProps {
  activeTab: "1" | "2";
  onTabChange: (tab: "1" | "2") => void;
}

export function CourseSelector({
  activeTab,
  onTabChange,
}: CourseSelectorProps) {
  const { t } = useI18n();

  return (
    <div className="flex justify-center w-full">
      <div className="bg-secondary rounded-3xl p-2 shadow-2xl max-w-full overflow-hidden">
        <div className="flex gap-2">
          <button
            onClick={() => onTabChange("1")}
            className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
              activeTab === "1"
                ? "bg-[#E0E0E0]/5 backdrop-blur-sm border border-[#E0E0E0]/10 text-[#E0E0E0]"
                : "text-[#E0E0E0]/60 hover:text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/5"
            }`}
          >
            {t("lessons.basicTajweed")}
          </button>
          <button
            onClick={() => onTabChange("2")}
            className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
              activeTab === "2"
                ? "bg-[#E0E0E0]/5 backdrop-blur-sm border border-[#E0E0E0]/10 text-[#E0E0E0]"
                : "text-[#E0E0E0]/60 hover:text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/5"
            }`}
          >
            {t("lessons.advancedRules")}
          </button>
        </div>
      </div>
    </div>
  );
}
