import Link from "next/link";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <FiCompass size={28} />
      </div>

      {/* 404 */}
      <p className="font-display text-6xl font-black uppercase leading-none text-accent sm:text-7xl">
        404
      </p>

      {/* Message */}
      <h1 className="mt-4 font-display text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
        This page skipped leg day
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved
        to the squat rack.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
      >
        <FiArrowLeft size={14} />
        Back to Library
      </Link>
    </div>
  );
}