import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <span className="text-xl">🎯</span>
      </div>

      <div>
        <h3 className="font-display text-lg font-black uppercase tracking-wide text-white">
          Nothing here yet
        </h3>
        <p className="mt-1 max-w-sm text-xs text-gray-500">
          Browse the library and add a lift to get today moving.
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
      >
        Go to workouts
        <FiArrowRight size={13} />
      </Link>
    </div>
  );
};

export default EmptyState;