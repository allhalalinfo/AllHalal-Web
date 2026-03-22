/** localStorage persistence for Zakat calculator (client-only). */

export const ZAKAT_STORAGE_KEY = "allhalal.zakat.v1";

export type ZakatSavedPayload = {
  v: 1;
  savedAt: string;
  standard: "silver" | "gold";
  hawl: boolean;
  cash: string;
  gold: string;
  silver: string;
  investments: string;
  otherAssets: string;
  debts: string;
};

export function parseZakatSaved(raw: string | null): ZakatSavedPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as ZakatSavedPayload;
    if (data?.v !== 1 || typeof data.savedAt !== "string") return null;
    if (data.standard !== "gold" && data.standard !== "silver") return null;
    return data;
  } catch {
    return null;
  }
}
