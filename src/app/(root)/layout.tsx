"use client";

import { I18nProvider } from "@/shared/lib/i18n/context";
import { VerticalMenu } from "@/widgets/vertical-menu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nProvider>
      <div className="min-h-screen flex">
        <main className="w-full flex-1 px-2 md:pr-2">{children}</main>
        <div className="h-full w-11"></div>
      </div>
      <VerticalMenu />
    </I18nProvider>
  );
}
