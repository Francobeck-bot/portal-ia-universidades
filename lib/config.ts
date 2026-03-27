// Google Sheets configuration
// Replace the IDs below after creating your Google Sheets
// See sheets-template.md for instructions

export const SHEETS_CONFIG = {
  // URL for the "ferramentas" sheet
  // Format: https://docs.google.com/spreadsheets/d/[ID]/export?format=csv&gid=[GID]
  toolsSheetUrl: process.env.TOOLS_SHEET_URL || "SEU_ID_AQUI",

  // URL for the "exemplos" sheet
  examplesSheetUrl: process.env.EXAMPLES_SHEET_URL || "SEU_ID_AQUI",
};
