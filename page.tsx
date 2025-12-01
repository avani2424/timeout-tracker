"use client";

import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";

export default function Home() {
  // ✅ Lazy init — no setState in useEffect
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  // Prevent hydration mismatch flash
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Sync theme to DOM + localStorage
  useEffect(() => {
    if (!isMounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!isMounted) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 p-4 sm:p-6 md:p-8" />
    );
  }

  return (
    <div
      className={
        theme === "dark"
          ? "relative flex min-h-screen w-full flex-col items-center justify-between bg-radial-[at_50%_75%] from-white to-zinc-900 to-90% overflow-x-hidden p-4 sm:p-6 md:p-8"
          : "relative flex min-h-screen w-full flex-col items-center justify-between bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% overflow-x-hidden p-4 sm:p-6 md:p-8"
      }
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Main />
      <Footer />
    </div>
  );
}
