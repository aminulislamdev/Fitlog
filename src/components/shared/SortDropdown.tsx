"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import type { SortOption } from "@/types/plan";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { id: SortOption; label: string }[] = [
  { id: "duration", label: "Duration" },
  { id: "calories", label: "Calories" },
  { id: "rating", label: "Rating" },
];

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    OPTIONS.find((opt) => opt.id === value)?.label ?? "Duration";

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (id: SortOption) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition hover:border-accent/40 hover:text-white"
      >
        <span className="text-gray-500">Sort by</span>
        <span>{currentLabel}</span>
        <FiChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-semibold text-gray-300 transition hover:bg-border"
            >
              {opt.label}
              {value === opt.id && (
                <FiCheck size={14} className="text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;