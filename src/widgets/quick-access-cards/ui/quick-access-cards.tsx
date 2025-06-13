"use client";

import { useRouter } from "next/navigation";

const quickAccessItems = [
  {
    id: "lessons",
    title: "Видео уроки",
    icon: "🎥",
    subtitle: "2 курса обучения",
    path: "/lessons",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "alphabet",
    title: "Арабский алфавит",
    icon: "🔤",
    subtitle: "28 букв с произношением",
    path: "/alphabet",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "quran",
    title: "Коран онлайн",
    icon: "📖",
    subtitle: "Текст и аудио",
    path: "/quran",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "writing",
    title: "Прописи букв",
    icon: "✍️",
    subtitle: "PDF + видео написания",
    path: "/writing",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export function QuickAccessCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {quickAccessItems.map((item) => (
        <div key={item.id} onClick={() => router.push(item.path)}>
          {/* Glass morphism card */}
          <div className="relative min-h-[250px] flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors font-light">
                {item.subtitle}
              </p>
            </div>

            {/* Hover effect ring */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
