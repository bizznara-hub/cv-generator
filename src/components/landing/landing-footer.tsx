/* Hallmark · macrostructure: Workbench (M05) · theme: Cobalt · section: footer
 * Slim 1-row utility footer: logo left, nav links right, copyright below border-top
 */

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "../shared/language-switcher";

const YEAR = new Date().getFullYear();

export function LandingFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-11/12 max-w-6xl py-8">
        {/* Main row */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/favicon.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-[4px]"
            />
            <span className="font-heading text-sm font-semibold">ScribeCV</span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              —
            </span>
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              {t("tagline")}
            </p>
          </div>

          {/* Nav */}
          <nav
            aria-label={t("ariaLabel")}
            className="flex flex-wrap items-center gap-5 font-mono text-xs text-muted-foreground"
          >
            <Link
              href="/platform"
              className="transition-colors hover:text-foreground"
            >
              {t("startBuilding")}
            </Link>
            <Link
              href="/platform/template"
              className="transition-colors hover:text-foreground"
            >
              {t("templates")}
            </Link>
            <a
              href="https://github.com/bizznara-hub/cv-generator"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {t("github")}
            </a>
            <LanguageSwitcher />
          </nav>
        </div>

        {/* Copyright row */}
        <p className="mt-6 font-mono text-xs text-muted-foreground/60">
          {t("rights", { year: YEAR })}
        </p>
      </div>
    </footer>
  );
}
