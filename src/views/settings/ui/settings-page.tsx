import {
  AudioSettings,
  VisualSettings,
  LearningSettings,
  DownloadSettings,
  AboutSettings,
} from "@/widgets/settings-sections";

export function SettingsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
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
          <div className="space-y-4">
            <AudioSettings />
            <VisualSettings />
            <LearningSettings />
            <DownloadSettings />
            <AboutSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
