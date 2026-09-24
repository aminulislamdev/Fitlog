import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="border-b border-border">
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        {/* Left — Text */}
        <div className="order-2 lg:order-1">
          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>

          {/* Heading */}
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-lg text-sm text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA Button */}
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
          >
            Browse Workouts
            <FiArrowRight size={16} />
          </a>
        </div>

        {/* Right — Image */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <Image
            src={banner}
            alt="Workout illustration"
            width={400}
            height={400}
            className="h-auto w-full max-w-xs rounded-xl object-contain sm:max-w-sm lg:max-w-md"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;