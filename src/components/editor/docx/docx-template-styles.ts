import { BorderStyle } from "docx";
import type { TemplateId } from "@/lib/templates";

type DocxBorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

/**
 * Typography and rule tokens that differentiate each template's .docx output,
 * mirroring the visual language of its react-pdf counterpart (font choice,
 * name weight/case, heading rule) within docx's plain single-column
 * constraints. Structure (paragraph order, what's bold/italic per field)
 * stays identical across templates; only these tokens vary, so every export
 * stays a linear, ATS-safe document regardless of template.
 */
export interface DocxTemplateStyle {
  /** Body text, entry titles, subtitles, and dates. */
  bodyFont: string;
  /** Section headings. */
  headingFont: string;
  /** The header name line; distinct from bodyFont so "Ketik" can go mono there too. */
  nameFont: string;
  nameSize: number;
  nameBold: boolean;
  nameUppercase: boolean;
  headerAlign: "left" | "center";
  headlineItalic: boolean;
  headingSize: number;
  headingBold: boolean;
  headingUppercase: boolean;
  headingAlign: "left" | "center";
  headingBorder: "top" | "bottom" | "topAndBottom" | "none";
  headingBorderStyle: DocxBorderStyle;
  headingBorderSize: number;
  entryTitleUppercase: boolean;
  dateItalic: boolean;
}

const SANS = "Calibri";
const SERIF = "Cambria";
const MONO = "Consolas";

export const DOCX_TEMPLATE_STYLES: Record<TemplateId, DocxTemplateStyle> = {
  awal: {
    bodyFont: SANS,
    headingFont: SANS,
    nameFont: SANS,
    nameSize: 36,
    nameBold: true,
    nameUppercase: false,
    headerAlign: "left",
    headlineItalic: false,
    headingSize: 20,
    headingBold: true,
    headingUppercase: true,
    headingAlign: "left",
    headingBorder: "bottom",
    headingBorderStyle: BorderStyle.DOTTED,
    headingBorderSize: 4,
    entryTitleUppercase: false,
    dateItalic: false,
  },
  ketat: {
    bodyFont: SERIF,
    headingFont: SERIF,
    nameFont: SERIF,
    nameSize: 38,
    nameBold: false,
    nameUppercase: true,
    headerAlign: "left",
    headlineItalic: false,
    headingSize: 23,
    headingBold: false,
    headingUppercase: false,
    headingAlign: "center",
    headingBorder: "topAndBottom",
    headingBorderStyle: BorderStyle.SINGLE,
    headingBorderSize: 4,
    entryTitleUppercase: false,
    dateItalic: true,
  },
  luasa: {
    bodyFont: SERIF,
    headingFont: SERIF,
    nameFont: SERIF,
    nameSize: 36,
    nameBold: false,
    nameUppercase: true,
    headerAlign: "left",
    headlineItalic: false,
    headingSize: 19,
    headingBold: true,
    headingUppercase: true,
    headingAlign: "left",
    headingBorder: "none",
    headingBorderStyle: BorderStyle.SINGLE,
    headingBorderSize: 4,
    entryTitleUppercase: true,
    dateItalic: true,
  },
  tebal: {
    bodyFont: SANS,
    headingFont: SANS,
    nameFont: SANS,
    nameSize: 44,
    nameBold: true,
    nameUppercase: false,
    headerAlign: "left",
    headlineItalic: false,
    headingSize: 20,
    headingBold: true,
    headingUppercase: true,
    headingAlign: "left",
    headingBorder: "top",
    headingBorderStyle: BorderStyle.SINGLE,
    headingBorderSize: 12,
    entryTitleUppercase: false,
    dateItalic: false,
  },
  klasik: {
    bodyFont: SERIF,
    headingFont: SERIF,
    nameFont: SERIF,
    nameSize: 40,
    nameBold: false,
    nameUppercase: false,
    headerAlign: "center",
    headlineItalic: true,
    headingSize: 21,
    headingBold: false,
    headingUppercase: true,
    headingAlign: "center",
    headingBorder: "bottom",
    headingBorderStyle: BorderStyle.SINGLE,
    headingBorderSize: 4,
    entryTitleUppercase: false,
    dateItalic: true,
  },
  ketik: {
    bodyFont: SANS,
    headingFont: MONO,
    nameFont: MONO,
    nameSize: 32,
    nameBold: true,
    nameUppercase: false,
    headerAlign: "left",
    headlineItalic: false,
    headingSize: 19,
    headingBold: true,
    headingUppercase: true,
    headingAlign: "left",
    headingBorder: "bottom",
    headingBorderStyle: BorderStyle.DASHED,
    headingBorderSize: 4,
    entryTitleUppercase: false,
    dateItalic: false,
  },
};
