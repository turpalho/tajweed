"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import { useQuickNavigation } from "../model/use-quick-navigation";
import type { QuickNavigationProps } from "../model/types";

export function QuickNavigationCards({ onNavigate }: QuickNavigationProps) {
  const { t } = useI18n();
  const { navigationItems } = useQuickNavigation();

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {navigationItems.map((item) => (
        <div key={item.id} onClick={() => onNavigate(item.path)}>
          <div className="relative min-h-[250px] flex items-center justify-center bg-secondary rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-[#E0E0E0]/15 group cursor-pointer">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <item.icon size={48} color="#E0E0E0" />
              </div>
              <h3 className="font-semibold text-lg text-[#E0E0E0] mb-2 group-hover:text-[#E0E0E0]/90 transition-colors">
                {t(item.titleKey)}
              </h3>
              <p className="text-sm text-[#E0E0E0]/60 group-hover:text-[#E0E0E0]/70 transition-colors font-light">
                {item.subtitle}
              </p>
            </div>

            <div className="absolute inset-0 rounded-3xl ring-1 ring-[#E0E0E0]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
