import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  Paragraph,
  TabStopType,
  TextRun,
} from "docx";
import { buildResumeBlocks } from "../resume-blocks";
import type { ContactView, HeaderView, ResumePreview } from "../resume-preview";
import type { InlineRun, RichBlock } from "../rich-content";
import type { DocxTemplateStyle } from "./docx-template-styles";

const MUTED = "525252";
/** Right page edge in twips for A4 with default 1-inch margins (11906 − 2·1440). */
const RIGHT_TAB = 9026;

function dateRange(start: string, end: string): string {
  if (!start && !end) return "";
  return `${start} - ${end}`;
}

function align(
  value: "left" | "center",
): (typeof AlignmentType)[keyof typeof AlignmentType] {
  return value === "center" ? AlignmentType.CENTER : AlignmentType.LEFT;
}

function inlineRuns(
  runs: InlineRun[],
  font: string,
): (TextRun | ExternalHyperlink)[] {
  return runs.map((run) => {
    const child = new TextRun({
      text: run.text,
      bold: run.bold,
      italics: run.italic,
      font,
    });
    return run.href
      ? new ExternalHyperlink({ link: run.href, children: [child] })
      : child;
  });
}

function richParagraphs(blocks: RichBlock[], font: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  for (const block of blocks) {
    if (block.type === "paragraph") {
      paragraphs.push(
        new Paragraph({
          children: inlineRuns(block.runs, font),
          spacing: { after: 80 },
        }),
      );
      continue;
    }
    for (const item of block.items) {
      paragraphs.push(
        new Paragraph({
          children: inlineRuns(item, font),
          bullet: { level: 0 },
          spacing: { after: 40 },
        }),
      );
    }
  }
  return paragraphs;
}

function sectionHeading(title: string, style: DocxTemplateStyle): Paragraph {
  const text = style.headingUppercase ? title.toUpperCase() : title;
  const border = {
    style: style.headingBorderStyle,
    size: style.headingBorderSize,
    space: 2,
    color: "A3A3A3",
  };
  return new Paragraph({
    spacing: { before: 220, after: 100 },
    alignment: align(style.headingAlign),
    border: {
      ...(style.headingBorder === "top" ||
      style.headingBorder === "topAndBottom"
        ? { top: border }
        : {}),
      ...(style.headingBorder === "bottom" ||
      style.headingBorder === "topAndBottom"
        ? { bottom: border }
        : {}),
    },
    children: [
      new TextRun({
        text,
        bold: style.headingBold,
        font: style.headingFont,
        size: style.headingSize,
      }),
    ],
  });
}

/** A "Title …… Dates" row with the date right-aligned via a tab stop. */
function titleRow(
  title: string,
  date: string,
  style: DocxTemplateStyle,
): Paragraph {
  const text = style.entryTitleUppercase ? title.toUpperCase() : title;
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [
      new TextRun({ text, bold: true, size: 19, font: style.bodyFont }),
      ...(date
        ? [
            new TextRun({
              text: `\t${date}`,
              color: MUTED,
              italics: style.dateItalic,
              font: style.bodyFont,
            }),
          ]
        : []),
    ],
  });
}

function subtitle(text: string, font: string, href?: string): Paragraph {
  const child = new TextRun({ text, color: MUTED, font });
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      href ? new ExternalHyperlink({ link: href, children: [child] }) : child,
    ],
  });
}

function headerParagraphs(
  header: HeaderView,
  style: DocxTemplateStyle,
): Paragraph[] {
  const name = style.nameUppercase
    ? header.fullName.toUpperCase()
    : header.fullName;
  const paragraphs: Paragraph[] = [
    new Paragraph({
      alignment: align(style.headerAlign),
      children: [
        new TextRun({
          text: name,
          bold: style.nameBold,
          size: style.nameSize,
          font: style.nameFont,
        }),
      ],
    }),
  ];
  if (header.headline) {
    paragraphs.push(
      new Paragraph({
        alignment: align(style.headerAlign),
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: header.headline,
            size: 21,
            color: MUTED,
            italics: style.headlineItalic,
            font: style.nameFont,
          }),
        ],
      }),
    );
  }
  if (header.contacts.length > 0) {
    paragraphs.push(
      new Paragraph({
        alignment: align(style.headerAlign),
        spacing: { after: 80 },
        children: contactRuns(header.contacts, style.bodyFont),
      }),
    );
  }
  return paragraphs;
}

function contactRuns(
  contacts: ContactView[],
  font: string,
): (TextRun | ExternalHyperlink)[] {
  const runs: (TextRun | ExternalHyperlink)[] = [];
  contacts.forEach((contact, index) => {
    if (index > 0) {
      runs.push(new TextRun({ text: "   |   ", color: MUTED, font }));
    }
    const child = new TextRun({ text: contact.value, font });
    runs.push(
      contact.href
        ? new ExternalHyperlink({ link: contact.href, children: [child] })
        : child,
    );
  });
  return runs;
}

function gridParagraphs(
  items: { name: string; proficiency: string }[],
  font: string,
): Paragraph[] {
  return items.map(
    (item) =>
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: item.name, bold: true, font }),
          ...(item.proficiency
            ? [
                new TextRun({
                  text: ` - ${item.proficiency}`,
                  color: MUTED,
                  font,
                }),
              ]
            : []),
        ],
      }),
  );
}

/**
 * Builds the résumé as a .docx `Document` in linear reading order, reusing
 * `buildResumeBlocks` so content, ordering, sorting, and empty-section gating
 * match the preview and other exports. No tables or columns are used, so the
 * document stays ATS-parseable; marks (bold/italic/links) and bullets are kept.
 * `style` carries the per-template typography/rule tokens (see
 * `docx-template-styles.ts`) so the export matches the template chosen in the
 * editor instead of always looking like "Awal".
 */
export function buildTemplateDocx(
  preview: ResumePreview,
  style: DocxTemplateStyle,
): Document {
  const children: Paragraph[] = [];

  for (const block of buildResumeBlocks(preview)) {
    switch (block.kind) {
      case "header":
        children.push(...headerParagraphs(block.header, style));
        break;
      case "heading":
        children.push(sectionHeading(block.title, style));
        break;
      case "summary":
        children.push(...richParagraphs(block.body, style.bodyFont));
        break;
      case "experience": {
        const item = block.item;
        children.push(
          titleRow(item.role, dateRange(item.startDate, item.endDate), style),
        );
        if (item.company) {
          children.push(
            subtitle(item.company, style.bodyFont, item.companyHref),
          );
        }
        children.push(...richParagraphs(item.description, style.bodyFont));
        break;
      }
      case "education": {
        const item = block.item;
        children.push(
          titleRow(item.degree, dateRange(item.startDate, item.endDate), style),
        );
        if (item.institution) {
          children.push(subtitle(item.institution, style.bodyFont));
        }
        children.push(...richParagraphs(item.details, style.bodyFont));
        break;
      }
      case "certificate": {
        const item = block.item;
        children.push(
          titleRow(item.title, dateRange(item.startDate, item.endDate), style),
        );
        if (item.issuer) children.push(subtitle(item.issuer, style.bodyFont));
        break;
      }
      case "skills":
      case "languages":
        children.push(...gridParagraphs(block.items, style.bodyFont));
        break;
    }
  }

  return new Document({
    styles: {
      default: {
        document: {
          run: { font: style.bodyFont, size: 20, color: "0A0A0A" },
        },
      },
    },
    sections: [
      {
        properties: { page: { size: { width: 11906, height: 16838 } } },
        children,
      },
    ],
  });
}
