"use client";

interface PageHeroProps {
  title: string;
  className?: string;
}

export function PageHero({ title, className = "" }: PageHeroProps) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
        <span
          className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
          style={{
            backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
          }}
        >
          {title}
        </span>
      </h1>
    </div>
  );
}
