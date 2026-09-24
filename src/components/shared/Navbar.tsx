"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logo from "@/assets/logo.png"
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, saved } = usePlan();

  const isWorkouts = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src={logo} alt="logo" width={24} height={24}></Image>
          <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
            FitLog
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={
              isWorkouts
                ? "rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-black"
                : "rounded-full px-4 py-1.5 text-xs font-semibold uppercase text-gray-400 transition hover:text-white"
            }
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={
              isMyPlan
                ? "rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-black"
                : "rounded-full px-4 py-1.5 text-xs font-semibold uppercase text-gray-400 transition hover:text-white"
            }
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 transition hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 transition hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-[10px] font-bold text-gray-300">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Nav (below) */}
      <nav className="flex items-center justify-center gap-2 border-t border-border py-2 md:hidden">
        <Link
          href="/"
          className={
            isWorkouts
              ? "rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-black"
              : "rounded-full px-4 py-1.5 text-xs font-semibold uppercase text-gray-400"
          }
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={
            isMyPlan
              ? "rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-black"
              : "rounded-full px-4 py-1.5 text-xs font-semibold uppercase text-gray-400"
          }
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;