import { QuickAccessCards } from "@/widgets/quick-access-cards";
import { LearningProgress } from "@/widgets/learning-progress";

export function HomePage() {
  // В реальном приложении это будет приходить из стора или API
  const progressData = {
    totalProgress: 45,
    learnedLetters: 12,
    completedLessons: 8,
    readSurahs: 3,
  };

  const dailyGoal = {
    current: 25,
    target: 30,
    streak: 7,
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center ">
            <div className="inline-flex items-center px-4 py-2 bg-[#E0E0E0]/10 backdrop-blur-md border border-[#E0E0E0]/20 rounded-full text-sm font-medium text-[#E0E0E0]/90 mb-2 shadow-2xl">
              <span
                className="w-2 h-2 rounded-full mr-2 animate-pulse shadow-lg"
                style={{
                  backgroundColor: "#ED6F4C",
                  boxShadow: "0 0 10px #ED6F4C50",
                }}
              ></span>
              Активное обучение
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              Изучение
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {" "}
                таджвида
              </span>
            </h1>
          </div>

          {/* Daily Goal Card - Glass morphism */}
          <div>
            <div className="bg-secondary rounded-3xl p-8 max-w-2xl mx-auto flex flex-col items-center">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#E0E0E0] mb-1">
                    {dailyGoal.current}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    минут сегодня
                  </div>
                </div>

                <div className="w-20 h-20 relative">
                  <svg
                    className="w-20 h-20 transform -rotate-90"
                    viewBox="0 0 80 80"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="3"
                      strokeDasharray={`${
                        (dailyGoal.current / dailyGoal.target) * 201.06
                      } 201.06`}
                      className="transition-all duration-700 ease-out drop-shadow-lg"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ED6F4C" />
                        <stop
                          offset="50%"
                          stopColor="#ED6F4C"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ED6F4C"
                          stopOpacity="0.6"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#E0E0E0]">
                      {Math.round((dailyGoal.current / dailyGoal.target) * 100)}
                      %
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-[#E0E0E0] mb-1">
                    {dailyGoal.streak}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    дней подряд
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div>
            <QuickAccessCards />
          </div>

          {/* Learning Progress */}
          <div>
            <LearningProgress {...progressData} />
          </div>
        </div>
      </div>
    </div>
  );
}
