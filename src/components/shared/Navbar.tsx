"use client";

import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isWorkouts = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Left — Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="logo" width={24} height={24} />
          <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
            FitLog
          </span>
        </Link>

        {/* Desktop Nav — Center */}
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

        {/* Right — Desktop badges + Mobile hamburger */}
        <div className="relative flex items-center gap-3" ref={menuRef}>
          {/* Desktop Badges — hidden on mobile */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Plan Badge */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 transition hover:text-white"
            >
              <span>Plan</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
                {todayPlan.length}
              </span>
            </Link>

            {/* Saved Badge */}
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

          {/* Hamburger — Mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-gray-300 transition hover:border-accent hover:text-accent md:hidden"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg md:hidden">
              {/* Workouts */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={
                  isWorkouts
                    ? "block border-b border-border bg-accent/10 px-4 py-3 text-sm font-bold uppercase tracking-wide text-accent"
                    : "block border-b border-border px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-border/40 hover:text-white"
                }
              >
                Workouts
              </Link>

              {/* My Plan */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className={
                  isMyPlan
                    ? "block border-b border-border bg-accent/10 px-4 py-3 text-sm font-bold uppercase tracking-wide text-accent"
                    : "block border-b border-border px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-border/40 hover:text-white"
                }
              >
                My Plan
              </Link>

              {/* Plan Badge row */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-border px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-border/40 hover:text-white"
              >
                <span>Plan</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
                  {todayPlan.length}
                </span>
              </Link>

              {/* Saved Badge row */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-border/40 hover:text-white"
              >
                <span>Saved</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-[10px] font-bold text-gray-300">
                  {saved.length}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;