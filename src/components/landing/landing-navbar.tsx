import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "../shared/language-switcher";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex w-11/12 max-w-6xl items-center justify-between py-3">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 rounded-[5px]"
          />
          <span className="font-heading text-sm font-semibold">ScribeCV</span>
        </Link>

        {/* Right side */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
