import logo from "@/assets/logo.png"
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={24} height={24} className="rotate-135"></Image>
          <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
            FitLog
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-[12px] text-gray-500 sm:text-right sm:text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;