"use client";

import MoonIcon from "@/public/icons/Moon";
import SunIcon from "@/public/icons/Sun";

export default function Header({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-end">
      {/* <div className="flex items-center gap-2 text-[#0d121b] dark:text-white">
        <h2 className="text-lg font-bold">Smart Clock-Out</h2>
      </div> */}

      <button
        onClick={toggleTheme}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[#0d121b] dark:text-white backdrop-blur-sm transition-all"
      >
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
