"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/shared/lib/i18n/context";
import { languageFlags, locales, type Locale } from "@/shared/lib/i18n";
import { saveAppSettings } from "@/shared/lib/app-settings";

type MenuItem = {
  labelKey: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.lessons", href: "/lessons" },
  { labelKey: "nav.quran", href: "/quran" },
  { labelKey: "nav.settings", href: "/settings" },
];

export function VerticalMenu() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const activeIndex = menuItems.findIndex((item) => item.href === pathname);
    if (activeIndex !== -1) {
      const itemHeight = 80; // h-20 = 80px
      const gap = 8; // gap-2 = 8px
      const topPosition = activeIndex * (itemHeight + gap);

      setIndicatorTop(topPosition);
      setIsInitialized(true);
    }
  }, [pathname]);

  const handleLanguageChange = (lang: Locale) => {
    setLocale(lang);
    // Синхронизируем с настройками приложения
    saveAppSettings({ interfaceLanguage: lang });
  };

  return (
    <div
      data-menu="vertical"
      className="fixed top-0 right-0 h-screen w-11 z-50 flex flex-col items-center justify-between border-l-3 border-accent bg-white/5 backdrop-blur-sm"
    >
      {/* Переключатель языков вверху */}
      <div className="flex flex-col gap-1 pt-4">
        {locales.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`w-8 h-8 rounded-md text-sm transition-all duration-300 ${
              locale === lang
                ? "bg-accent text-white shadow-lg scale-110"
                : "bg-white/10 hover:bg-white/20 text-white hover:scale-105"
            }`}
            title={lang.toUpperCase()}
          >
            {languageFlags[lang]}
          </button>
        ))}
      </div>

      {/* Основное меню по центру */}
      <nav ref={navRef} className="flex flex-col gap-2 relative">
        {/* Анимированный индикатор */}
        <div
          className={`absolute -left-1 w-11 h-20 bg-accent transition-all duration-400 ease-out ${
            isInitialized ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translateY(${indicatorTop}px)`,
            transition:
              "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-in-out",
          }}
        />

        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center justify-center
                w-9 h-20 transition-all duration-300
                ${
                  isActive
                    ? "scale-105"
                    : "hover:bg-accent/20 hover:scale-110 hover:border-accent hover:border-t-2 hover:border-b-2"
                }
              `}
            >
              <span
                className={`
                  text-xs font-semibold transition-all duration-300 writing-mode-vertical-rl text-orientation-mixed
                  ${isActive ? "text-white font-bold" : "text-primary"}
                `}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  // Для арабского языка добавляем поддержку RTL
                  direction: locale === "ar" ? "rtl" : "ltr",
                }}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Пустой блок для баланса снизу */}
      <div className="pb-4 opacity-0">
        <div className="w-8 h-8"></div>
      </div>
    </div>
  );
}
