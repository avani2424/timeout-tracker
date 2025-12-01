"use client";

import { useState } from "react";
import RightArrow from "@/public/icons/RightArrow";
import Image from "next/image";

export default function Main() {
  const [clockIn, setClockIn] = useState("09:00");
  const [workHours, setWorkHours] = useState(8);
  const [breakMinutes, setBreakMinutes] = useState(60);

  const [clockOut, setClockOut] = useState("—");
  const [progress, setProgress] = useState(0);

  // ⏱ CALCULATION LOGIC
  const handleCalculate = () => {
    const [h, m] = clockIn.split(":").map(Number);
    const totalStartMinutes = h * 60 + m;

    const totalEndMinutes =
      totalStartMinutes + workHours * 60 + Number(breakMinutes || 0);

    const endH = Math.floor(totalEndMinutes / 60) % 24;
    const endM = totalEndMinutes % 60;

    const formattedEnd = `${((endH + 11) % 12) + 1}:${String(endM).padStart(
      2,
      "0"
    )} ${endH >= 12 ? "PM" : "AM"}`;

    setClockOut(formattedEnd);

    // Progress
    const totalWork = workHours * 60 + Number(breakMinutes || 0);
    const elapsed =
      new Date().getHours() * 60 + new Date().getMinutes() - totalStartMinutes;
    console.log("elased time", elapsed, new Date().getHours() * 60 , new Date().getMinutes(), 'current time' );
    const progressPercent = Math.min(
      Math.max(Math.round((elapsed / totalWork) * 100), 0),
      100
    );

    setProgress(progressPercent);
  };

  return (
    <main className="w-full max-w-md mx-auto my-auto">
      <div className="flex flex-col gap-8 rounded-xl bg-white/70 dark:bg-background-dark/50 p-6 md:p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-lg">
        {/* Headline */}
        <div className="text-center">
          <h1 className="text-black text-3xl font-bold tracking-tight">
            🕒 Smart Clock-Out
          </h1>
          <p className="text-black mt-2">
            Calculate your workday end time effortlessly.
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-6">
          {/* Clock In Time */}
          <label className="flex flex-col">
            <p className="text-black text-sm font-medium pb-2">Clock In Time</p>
            <div className="relative flex w-full flex-1 items-stretch">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pr-12 text-base font-normal"
                type="time"
                value={clockIn}
                onChange={(e) => setClockIn(e.target.value)}
              />
              <div className="text-slate-400 absolute right-0 top-0 h-full flex items-center justify-center pr-4">
                <Image
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-two-tone/24/retro-alarm-clock.png"
                  alt="retro-alarm-clock"
                />
              </div>
            </div>
          </label>

          {/* Working Hours */}
          <label className="flex flex-col">
            <p className="text-black text-sm font-medium pb-2">
              Total Working Hours
            </p>
            <div className="relative flex w-full flex-1 items-stretch">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pr-12 text-base font-normal"
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
              />
              <div className="text-slate-400 absolute right-0 top-0 h-full flex items-center justify-center pr-4">
                <Image
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-two-tone/24/hourglass.png"
                  alt="hourglass"
                />
              </div>
            </div>
          </label>

          {/* Break Duration */}
          <label className="flex flex-col">
            <p className="text-black text-sm font-medium pb-2">
              Break Duration (minutes)
            </p>
            <div className="relative flex w-full flex-1 items-stretch">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pr-12 text-base font-normal"
                type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
              />
              <div className="text-slate-400 absolute right-0 top-0 h-full flex items-center justify-center pr-4">
                <Image
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-two-tone/24/espresso-cup--v1.png"
                  alt="espresso-cup--v1"
                />
              </div>
            </div>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleCalculate}
          className="flex w-full border border-slate-200 dark:border-slate-700 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-14 bg-primary text-black text-base font-bold leading-normal tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Calculate Clock Out
          <RightArrow />
        </button>

        {/* Result Section */}
        {clockOut !== "—" && (
          <div className="mt-2 flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-background-dark/60 p-5 text-center">
            <p className="text-sm font-medium text-black">
              ✅ You should clock out at:
            </p>
            <p className="text-black text-4xl font-extrabold tracking-tight">
              {clockOut}
            </p>

            <div className="mt-2">
              <p className="text-xs text-black mb-1">
                Workday Progress: {progress}%
              </p>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
