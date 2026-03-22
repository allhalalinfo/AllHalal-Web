/**
 * Build a shareable PNG summarising Zakat results (canvas, no external libs).
 */

export type ZakatSharePayload = {
  netWealth: number;
  zakatDue: number;
  standard: "gold" | "silver";
  hawl: boolean;
  calculationDate: Date;
};

function fmtMoney(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function renderZakatShareCanvas(payload: ZakatSharePayload): HTMLCanvasElement {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, "#243d47");
  grd.addColorStop(1, "#2e4b59");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "600 28px system-ui, sans-serif";
  ctx.fillText("My Zakat on allhalal.info", 80, 110);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 22px system-ui, sans-serif";
  const dateStr = payload.calculationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  ctx.fillText(`Calculation date: ${dateStr}`, 80, 150);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 24px system-ui, sans-serif";
  ctx.fillText("Net wealth (after debts)", 80, 230);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 52px system-ui, sans-serif";
  ctx.fillText(`$${fmtMoney(payload.netWealth)}`, 80, 295);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 24px system-ui, sans-serif";
  ctx.fillText("Zakat due (2.5%)", 80, 380);
  ctx.fillStyle = "#f4d58d";
  ctx.font = "800 64px system-ui, sans-serif";
  ctx.fillText(`$${fmtMoney(payload.zakatDue)}`, 80, 460);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "400 20px system-ui, sans-serif";
  const std =
    payload.standard === "gold" ? "Nisab: Gold standard" : "Nisab: Silver standard";
  const hawl = payload.hawl ? "Hawl: Yes (1 lunar year)" : "Hawl: Not confirmed";
  ctx.fillText(`${std} · ${hawl}`, 80, 540);

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "400 16px system-ui, sans-serif";
  ctx.fillText("allhalal.info — estimate only; consult a scholar for complex cases.", 80, 585);

  return canvas;
}

export async function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png", 0.92);
  });
}
