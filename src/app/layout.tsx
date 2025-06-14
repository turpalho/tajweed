import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { VerticalMenu } from "@/widgets/vertical-menu";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Таджвид - Изучение правил чтения Корана",
  description:
    "Платформа для изучения таджвида - правил чтения священного Корана",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.className} antialiased`}>
        {/* Global Background with noise texture */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-primary"></div>
          {/* <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div> */}

          {/* Gradient overlays using project colors */}
          {/* <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#ED6F4C20" }}
          ></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#ED6F4C15" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
            style={{ backgroundColor: "#31313110" }}
          ></div> */}
        </div>

        {/* Глобальные градиентные блики */}
        {/* <div className="gradient-blur-1"></div>
        <div className="gradient-blur-2"></div>
        <div className="gradient-blur-3"></div> */}

        <div className="min-h-screen flex">
          <main className="w-full flex-1 px-2 md:pr-2">{children}</main>
          <div className="h-full w-11"></div>
        </div>
        <VerticalMenu />
      </body>
    </html>
  );
}
