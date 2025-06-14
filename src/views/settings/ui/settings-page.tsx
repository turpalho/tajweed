import {
  AudioSettings,
  VisualSettings,
  AboutSettings,
} from "@/widgets/settings-sections";

export function SettingsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                Настройки
              </span>
            </h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4 flex flex-col gap-2">
            <AudioSettings />
            <VisualSettings />
            <AboutSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
