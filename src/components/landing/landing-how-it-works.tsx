/* Hallmark · macrostructure: Workbench (M05) · theme: Cobalt · section: how-it-works
 * 3-column horizontal feature strip on desktop, stacked on mobile
 */

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ReactNode, useId } from "react";

const terminalVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const terminalLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export function LandingHowItWorks() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("howItWorks");

  return (
    <section
      id="how-it-works"
      className="mx-auto w-11/12 max-w-6xl pb-24 md:pb-32"
    >
      {/* ── Section header ── */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-14 border-b border-border pb-6 md:mb-20"
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground text-balance sm:text-base">
          {t("subheading")}
        </p>
      </motion.div>

      {/* ── Steps: alternating layout rows ── */}
      <div className="space-y-14 md:space-y-0">
        <HowItWorksRow
          kicker={t("step1Kicker")}
          title={t("step1Title")}
          description={t("step1Description")}
          reduceMotion={reduceMotion}
        >
          <HowItWorksScreenshot
            src="/scribecv-templates.png"
            alt={t("screenshotTemplatesAlt")}
            width={2880}
            height={1800}
          />
        </HowItWorksRow>

        <HowItWorksArrow flip={false} />

        <HowItWorksRow
          kicker={t("step2Kicker")}
          title={t("step2Title")}
          description={t("step2Description")}
          flip
          reduceMotion={reduceMotion}
        >
          <HowItWorksScreenshot
            src="/scribecv-editor.png"
            alt={t("screenshotEditorAlt")}
            width={1437}
            height={871}
          />
        </HowItWorksRow>

        <HowItWorksArrow flip />

        <HowItWorksRow
          kicker={t("step3Kicker")}
          title={t("step3Title")}
          description={t("step3Description")}
          reduceMotion={reduceMotion}
        >
          <ArtifactParserOutput />
        </HowItWorksRow>
      </div>
    </section>
  );
}

function HowItWorksRow(props: {
  kicker: string;
  title: string;
  description: string;
  flip?: boolean;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={props.reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid items-center gap-6 md:grid-cols-12 md:gap-12"
    >
      <div
        className={props.flip ? "md:order-2 md:col-span-5" : "md:col-span-5"}
      >
        <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
          {props.kicker}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          {props.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {props.description}
        </p>
      </div>
      <div
        className={props.flip ? "md:order-1 md:col-span-7" : "md:col-span-7"}
      >
        {props.children}
      </div>
    </motion.div>
  );
}

function HowItWorksScreenshot(props: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-2 shadow-lg shadow-primary/5">
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        className="w-full rounded-xl border border-border object-cover object-top"
      />
      <figcaption className="sr-only">{props.alt}</figcaption>
    </figure>
  );
}

function HowItWorksArrow(props: { flip: boolean }) {
  const markerId = useId();

  return (
    <div
      aria-hidden
      className="my-4 hidden justify-center text-muted-foreground/40 md:flex"
    >
      <svg
        aria-hidden="true"
        width="240"
        height="88"
        viewBox="0 0 240 88"
        fill="none"
        className={props.flip ? "-scale-x-100" : undefined}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M1 1 L9 5 L1 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          d="M228 6 C 176 66, 74 14, 14 76"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
        />
      </svg>
    </div>
  );
}

function ArtifactParserOutput() {
  const t = useTranslations("howItWorks");

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">
          {t("terminalCaption")}
        </span>
        <div className="flex gap-1.5 font-mono text-[10px] text-muted-foreground">
          {[".pdf", ".docx", ".txt"].map((ext) => (
            <span
              key={ext}
              className="rounded border border-border px-1.5 py-0.5"
            >
              {ext}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        variants={terminalVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm"
      >
        <motion.p
          variants={terminalLineVariants}
          className="text-muted-foreground"
        >
          $ pdftotext resume.pdf -
        </motion.p>
        <motion.p variants={terminalLineVariants} className="mt-3 text-primary">
          EXPERIENCE
        </motion.p>
        <motion.p variants={terminalLineVariants} className="text-foreground">
          Senior Frontend Engineer, Acme Corp
        </motion.p>
        <motion.p
          variants={terminalLineVariants}
          className="text-muted-foreground"
        >
          Mar 2022 – Present
        </motion.p>
        <motion.p variants={terminalLineVariants} className="text-foreground">
          - Led migration of a 200k-line codebase to a typed component library,
          cutting UI defects by 40%
        </motion.p>
        <motion.p variants={terminalLineVariants} className="mt-3 text-primary">
          {t("terminalReadingOrder")}
        </motion.p>
      </motion.div>
    </div>
  );
}
