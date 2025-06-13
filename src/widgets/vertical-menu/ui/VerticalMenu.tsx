"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Главная", href: "/" },
  { label: "Уроки", href: "/lessons" },
  { label: "Коран", href: "/quran" },
  { label: "Настройки", href: "/settings" },
];

export function VerticalMenu() {
  const pathname = usePathname();
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

  return (
    <div
      data-menu="vertical"
      className="fixed top-0 right-0 h-screen w-11 z-50 flex flex-col items-center justify-center border-l-3 border-accent"
    >
      <nav ref={navRef} className="flex flex-col gap-2 relative">
        {/* Анимированный индикатор */}
        <div
          className={`absolute -left-1 w-11 h-20 bg-accent transition-transform duration-400 ease-out ${
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
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
