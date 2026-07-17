import { Packer } from "docx";
import type { TemplateId } from "@/lib/templates";
import { safeFileName, triggerDownload } from "../download-file";
import type { ResumePreview } from "../resume-preview";
import { DOCX_TEMPLATE_STYLES } from "./docx-template-styles";
import { buildTemplateDocx } from "./resume-to-docx";

/**
 * Builds the .docx entirely in the browser and downloads it as `<fileName>.docx`.
 * No résumé content leaves the device. Loaded lazily by the download button so
 * the docx library stays out of the main bundle. `template` picks the typography
 * tokens so the export matches the résumé's chosen template, same as the PDF path.
 */
export async function downloadResumeDocx(
  preview: ResumePreview,
  fileName: string,
  template: TemplateId,
): Promise<void> {
  const style = DOCX_TEMPLATE_STYLES[template];
  const blob = await Packer.toBlob(buildTemplateDocx(preview, style));
  triggerDownload(blob, `${safeFileName(fileName)}.docx`);
}
