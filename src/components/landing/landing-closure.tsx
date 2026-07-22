/* Hallmark · macrostructure: Workbench (M05) · theme: Cobalt · section: closure CTA bar
 * Full-width high-contrast CTA bar — dark bg, single action, no dotted pattern
 */

"use client";

import { ArrowRight, Search } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function LandingClosure() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("closure");

  return (
    <section className="mx-auto w-11/12 max-w-6xl pb-24 md:pb-32">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 md:py-20"
      >
        {/* Cobalt monospaced kicker */}
        <p className="mb-4 font-mono text-xs tracking-[0.18em] text-primary-foreground/50 uppercase">
          {t("kicker")}
        </p>

        <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-background sm:text-3xl md:text-4xl">
          {t("heading")}
        </h2>

        <p className="mt-4 max-w-xl text-sm text-background/60 text-balance sm:text-base">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="gap-2 bg-background text-foreground hover:bg-background/90"
            nativeButton={false}
            render={<Link href="/platform?create=true" />}
          >
            {t("ctaPrimary")}
            <ArrowRight aria-hidden />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="gap-2 text-background/80 hover:bg-background/10 hover:text-background"
            nativeButton={false}
            render={<Link href="/platform/template" />}
          >
            <Search aria-hidden />
            {t("ctaSecondary")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
