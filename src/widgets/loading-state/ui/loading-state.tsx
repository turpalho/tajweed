"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-[#E0E0E0]">
          {message || t("common.loading")}
        </span>
      </div>
    </div>
  );
}
