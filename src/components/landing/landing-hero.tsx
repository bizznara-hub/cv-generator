/* Hallmark · macrostructure: Workbench (M05) · theme: Cobalt · genre: modern-minimal
 * pre-emit critique: P5 H5 E5 S5 R5 V4
 * audience: job-seekers, technical users · use: drive to /platform · tone: utilitarian-confident
 */

"use client";

import { ArrowRight, FileText, Search } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LandingHero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-11/12 max-w-6xl pt-20 pb-16 md:pt-28 md:pb-24">
      {/* ── Workbench split: headline left · visual panel right ── */}
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
        className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
      >
        {/* ── Left column ── */}
        <div>
          {/* Cobalt monospaced kicker label */}
          <motion.p
            variants={reduceMotion ? undefined : itemVariants}
            className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-primary uppercase"
          >
            <FileText className="size-3.5 shrink-0" aria-hidden />
            {t("badge")}
          </motion.p>

          {/* Heading — solid ink, no gradient (Hallmark anti-pattern removed) */}
          <motion.h1
            variants={reduceMotion ? undefined : itemVariants}
            className="font-heading text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="sr-only">{t("srHeading")} </span>
            {t("headingLine1")}
            <br />
            {/* Accent on the word that matters most */}
            <span className="text-primary">{t("headingLine2")}</span>
          </motion.h1>

          <motion.p
            variants={reduceMotion ? undefined : itemVariants}
            className="mt-5 max-w-md text-base text-muted-foreground text-balance sm:text-lg"
          >
            {t("description")}
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              className="gap-2 group"
              nativeButton={false}
              render={<Link href="/platform" />}
            >
              {t("ctaPrimary")}
              <ArrowRight
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/platform/template" />}
            >
              <Search aria-hidden />
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          {/* Stat strip — factual values only */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            className="mt-10 flex items-center gap-6 text-sm sm:gap-8"
          >
            <HeroStat value={t("stat1Value")} label={t("stat1Label")} />
            <div aria-hidden className="h-7 w-px bg-border" />
            <HeroStat value={t("stat2Value")} label={t("stat2Label")} />
            <div aria-hidden className="h-7 w-px bg-border" />
            <HeroStat value={t("stat3Value")} label={t("stat3Label")} />
          </motion.div>
        </div>

        {/* ── Right column: ATS parse demo panel ── */}
        <motion.div
          variants={reduceMotion ? undefined : itemVariants}
          className="relative"
        >
          <WorkbenchPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroStat(props: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
        {props.value}
      </div>
      <div className="text-xs text-muted-foreground sm:text-sm">
        {props.label}
      </div>
    </div>
  );
}

/* Live parse-demo widget — shows the "ATS reads your resume" value prop visually */
const PARSE_LINES = [
  { delay: 0.3, color: "text-primary", content: "EXPERIENCE" },
  {
    delay: 0.45,
    color: "text-foreground",
    content: "Senior Frontend Engineer · Acme Corp",
  },
  { delay: 0.6, color: "text-muted-foreground", content: "Mar 2022 – Present" },
  {
    delay: 0.75,
    color: "text-foreground",
    content: "– Led migration to typed component library",
  },
  { delay: 0.9, color: "text-primary", content: "EDUCATION" },
  {
    delay: 1.05,
    color: "text-foreground",
    content: "B.Sc. Computer Science · UI University",
  },
  { delay: 1.2, color: "text-muted-foreground", content: "2018 – 2022" },
  { delay: 1.35, color: "text-primary", content: "SKILLS" },
  {
    delay: 1.5,
    color: "text-foreground",
    content: "TypeScript · React · Next.js · TailwindCSS",
  },
] as const;

function WorkbenchPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
      {/* Chrome bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">
          $ pdftotext resume.pdf -
        </span>
        <div className="flex gap-1.5">
          {[".pdf", ".docx", ".txt"].map((ext) => (
            <span
              key={ext}
              className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {ext}
            </span>
          ))}
        </div>
      </div>

      {/* Parse output */}
      <motion.div
        variants={
          reduceMotion
            ? undefined
            : {
                hidden: {},
                visible: { transition: { staggerChildren: 0.0 } },
              }
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="space-y-1.5 p-5 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {PARSE_LINES.map((line) => (
          <motion.p
            key={line.content}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0, x: -8 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: line.delay, duration: 0.3 },
                    },
                  }
            }
            className={line.color}
          >
            {line.content}
          </motion.p>
        ))}
        <motion.p
          variants={
            reduceMotion
              ? undefined
              : {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { delay: 1.7, duration: 0.4 },
                  },
                }
          }
          className="mt-3 border-t border-border pt-3 text-[10px] tracking-wide text-primary sm:text-xs"
        >
          ✓ Reading order preserved · ATS-safe
        </motion.p>
      </motion.div>
      <figcaption className="sr-only">
        ATS text extraction demo — shows resume parsed in linear reading order
      </figcaption>
    </figure>
  );
}
