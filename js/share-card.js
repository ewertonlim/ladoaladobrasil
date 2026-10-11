/* ============================================================
   Imagens para compartilhar a argumentação de cada área e polêmica
   Canvas de 1080 px de largura; a altura acompanha o conteúdo.
   ============================================================ */
(() => {
const CARD_W = 1080, CARD_MIN_H = 1350, PAD = 72, IN = 36;
const C = {
  bg: "#0b0d12", panel: "#12151d", panel2: "#171b26", line: "#2a3042", text: "#e9ecf3", muted: "#9aa3b5", dim: "#6f7890",
  l: "#e5484d", l2: "#ff7a7e", f: "#3b82f6", f2: "#7db0ff", e: "#c8a24d", acc: "#ef6c3f",
  procede: "#ff9a76", parcial: "#c8a24d", nao: "#5fd3b7", aberto: "#c3cad8"
};
const EMOJI = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji"';
const SERIF = `"Fraunces",Georgia,serif,${EMOJI}`;
const SANS = `"Inter",system-ui,sans-serif,${EMOJI}`;
const WIN = { l: { name: "Lula", color: C.l2 }, f: { name: "Lado Bolsonaro", color: C.f2 }, e: { name: "Empate", color: C.e } };

const font = (ctx, size, weight = 400, family = SANS) => (ctx.font = `${weight} ${size}px ${family}`);
const dec = (n) => n.toFixed(1).replace(".", ",");
const srcName = (s) => (SOURCES[s] ? SOURCES[s].name.split(" — ")[0] : "");

function box(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

/* Fundo de painel desenhado atrás do conteúdo já escrito */
function behind(ctx, draw) {
  ctx.save(); ctx.globalCompositeOperation = "destination-over"; draw(); ctx.restore();
}

function wrap(ctx, text, maxW) {
  const lines = [];
  let cur = "";
  String(text).split(/\s+/).forEach((word) => {
    const test = cur ? cur + " " + word : word;
    if (ctx.measureText(test).width <= maxW || !cur) cur = test;
    else { lines.push(cur); cur = word; }
  });
  if (cur) lines.push(cur);
  return lines;
}

/* Escreve o texto inteiro em linhas a partir da linha de base y; devolve o y da última linha */
function para(ctx, text, x, y, maxW, size, lh, color, weight = 400, family = SANS) {
  font(ctx, size, weight, family); ctx.fillStyle = color;
  const lines = wrap(ctx, text, maxW);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lh));
  return y + (lines.length - 1) * lh;
}

function pill(ctx, text, x, y, color, size = 26, align = "left") {
  font(ctx, size, 600);
  const w = ctx.measureText(text).width + size * 1.3, h = size * 1.75;
  const bx = align === "right" ? x - w : x;
  box(ctx, bx, y, w, h, h / 2, color + "2e");
  ctx.fillStyle = color; ctx.fillText(text, bx + size * 0.65, y + h * 0.68);
  return w;
}

function label(ctx, text, x, y, color) {
  font(ctx, 22, 600); ctx.fillStyle = color; ctx.fillText(text.toUpperCase(), x, y);
}

/* Item com marcador, texto e fonte; devolve o y da última linha */
function bullet(ctx, item, x, y, w, color, size, lh) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + 6, y - size * 0.34, 5, 0, 7); ctx.fill();
  y = para(ctx, item.t, x + 24, y, w - 24, size, lh, C.text);
  const s = srcName(item.s);
  if (s) { font(ctx, size - 6, 500); ctx.fillStyle = C.dim; ctx.fillText("Fonte: " + s, x + 24, y + lh - 2); y += lh - 2; }
  return y;
}

function header(ctx) {
  ctx.fillStyle = C.l; ctx.beginPath(); ctx.arc(PAD + 9, PAD + 18, 9, 0, 7); ctx.fill();
  ctx.fillStyle = C.f; ctx.beginPath(); ctx.arc(PAD + 35, PAD + 18, 9, 0, 7); ctx.fill();
  font(ctx, 32, 700, SERIF); ctx.fillStyle = C.text; ctx.fillText("Lado a Lado Brasil", PAD + 60, PAD + 29);
  font(ctx, 22, 600); ctx.fillStyle = C.e; ctx.textAlign = "right";
  ctx.fillText("ELEIÇÕES 2026 · 2º TURNO", CARD_W - PAD, PAD + 27); ctx.textAlign = "left";
}

function footer(ctx, h, url) {
  const y = h - PAD;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAD, y - 66); ctx.lineTo(CARD_W - PAD, y - 66); ctx.stroke();
  font(ctx, 24); ctx.fillStyle = C.muted; ctx.fillText("Todas as fontes e a metodologia em", PAD, y - 22);
  font(ctx, 26, 600); ctx.fillStyle = C.text;
  ctx.fillText(/^https?:/.test(url) ? new URL(url).host : "Lado a Lado Brasil", PAD, y + 12);
  font(ctx, 20); ctx.fillStyle = C.muted; ctx.textAlign = "right";
  ctx.fillText("Avaliação editorial, não decisão judicial", CARD_W - PAD, y + 12); ctx.textAlign = "left";
}

function titleBlock(ctx, icon, title, lead, y) {
  const tx = PAD + 112, tw = CARD_W - PAD - tx;
  font(ctx, 76); ctx.fillText(icon, PAD, y + 8);
  y = para(ctx, title, tx, y, tw, 56, 64, C.text, 700, SERIF);
  if (lead) y = para(ctx, lead, tx, y + 46, tw, 27, 36, C.muted);
  return y;
}

/* Um duelo (mandatos ou propostas): argumentos lado a lado, notas e a análise */
function duel(ctx, y, title, sub, sides, note, v) {
  const x0 = PAD, w = CARD_W - PAD * 2, top = y;
  y += 62;
  font(ctx, 38, 700, SERIF); ctx.fillStyle = C.text; ctx.fillText(title, x0 + IN, y);
  pill(ctx, v === "e" ? "Empate" : "Vence: " + (v === "l" ? sides[0].short : sides[1].short), CARD_W - PAD - IN, y - 36, WIN[v].color, 23, "right");
  font(ctx, 21); ctx.fillStyle = C.muted; ctx.fillText(sub, x0 + IN, y + 34);
  y += 88;
  const gap = 36, cw = (w - IN * 2 - gap) / 2;
  let bottom = y;
  sides.forEach((s, i) => {
    const cx = x0 + IN + i * (cw + gap);
    let cy = y;
    font(ctx, 27, 600); ctx.fillStyle = s.color; ctx.fillText(s.name, cx, cy);
    font(ctx, 30, 700, SERIF); ctx.textAlign = "right"; ctx.fillText(`${s.score}/5`, cx + cw, cy + 2); ctx.textAlign = "left";
    box(ctx, cx, cy + 16, cw, 8, 4, C.line); box(ctx, cx, cy + 16, (cw * s.score) / 5, 8, 4, s.bar);
    cy += 66;
    s.items.forEach((it) => { cy = bullet(ctx, it, cx, cy, cw, s.bar, 23, 32) + 46; });
    bottom = Math.max(bottom, cy - 46);
  });
  y = bottom + 34;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + IN, y); ctx.lineTo(CARD_W - PAD - IN, y); ctx.stroke();
  y += 44;
  label(ctx, "Análise", x0 + IN, y, C.e);
  const paragraphs = String(note).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  paragraphs.forEach((paragraph, index) => {
    y = para(ctx, paragraph, x0 + IN, y + (index === 0 ? 38 : 50), w - IN * 2, 24, 34, C.muted);
  });
  y += 36;
  behind(ctx, () => box(ctx, x0, top, w, y - top, 28, C.panel, C.line));
  return y;
}

function drawAreaCard(ctx, a) {
  const r = areaResult(a);
  header(ctx);
  let y = titleBlock(ctx, a.icon, a.title, a.lead, PAD + 170) + 56;
  const L = { name: "Lula", short: "Lula", color: C.l2, bar: C.l };
  y = duel(ctx, y, "Mandatos", "Lula (2023–2026) × Jair Bolsonaro (2019–2022) · resultados", [
    { ...L, score: a.mandate.rating.l, items: a.mandate.lula },
    { name: "Jair Bolsonaro", short: "Jair", color: C.f2, bar: C.f, score: a.mandate.rating.j, items: a.mandate.jair }
  ], a.mandate.note, r.m) + 28;
  y = duel(ctx, y, "Propostas", "Planos de governo para 2027–2030", [
    { ...L, score: a.proposals.rating.l, items: a.proposals.lula },
    { name: "Flávio Bolsonaro", short: "Flávio", color: C.f2, bar: C.f, score: a.proposals.rating.f, items: a.proposals.flavio }
  ], a.proposals.note, r.p) + 28;

  const win = WIN[r.o], w = CARD_W - PAD * 2, top = y;
  ctx.textAlign = "center";
  font(ctx, 21, 600); ctx.fillStyle = C.muted;
  ctx.fillText(`RESULTADO DA ÁREA · MANDATOS ${Math.round(W * 100)}% · PROPOSTAS ${Math.round((1 - W) * 100)}%`, CARD_W / 2, y + 50);
  font(ctx, 62, 700, SERIF); ctx.fillStyle = win.color;
  ctx.fillText(r.o === "e" ? "Empate" : r.o === "l" ? "Lula" : "Lado Bolsonaro", CARD_W / 2, y + 126);
  font(ctx, 25); ctx.fillStyle = C.muted;
  ctx.fillText(`Nota combinada: Lula ${dec(r.sl)} · Lado Bolsonaro ${dec(r.so)}`, CARD_W / 2, y + 176);
  ctx.textAlign = "left";
  y += 214;
  behind(ctx, () => {
    const g = ctx.createLinearGradient(PAD, top, CARD_W - PAD, y);
    g.addColorStop(0, win.color + "40"); g.addColorStop(0.7, C.panel2);
    box(ctx, PAD, top, w, y - top, 28, g, win.color + "88");
  });
  return y;
}

/* Bloco de argumento com barra colorida à esquerda */
function argument(ctx, y, title, text, color) {
  const w = CARD_W - PAD * 2, top = y;
  label(ctx, title, PAD + 32, y + 44, color);
  y = para(ctx, text, PAD + 32, y + 84, w - 64, 25, 36, C.text) + 32;
  behind(ctx, () => { box(ctx, PAD + 14, top + 18, 5, y - top - 36, 2.5, color); box(ctx, PAD, top, w, y - top, 20, C.panel); });
  return y;
}

function drawPolCard(ctx, p) {
  const vc = C[p.verdict.type], w = CARD_W - PAD * 2;
  header(ctx);
  let y = PAD + 120;
  pill(ctx, "Polêmica · Alvo: " + p.target, PAD, y, C.e, 23);
  y = titleBlock(ctx, p.icon, p.title, "", y + 124) + 48;

  y = argument(ctx, y, "A acusação", p.accusation, C.acc) + 20;
  y = argument(ctx, y, "O contraponto", p.defense, C.f2) + 50;

  label(ctx, "O que os fatos mostram", PAD, y, C.e);
  y += 46;
  p.facts.forEach((f) => { y = bullet(ctx, f, PAD, y, w, C.e, 25, 36) + 48; });

  const top = y - 10;
  y = top + 56;
  label(ctx, "Veredito", PAD + IN, y, C.muted);
  font(ctx, 58, 700, SERIF); ctx.fillStyle = vc; ctx.fillText(VERDICT_LABEL[p.verdict.type], PAD + IN, y + 68);
  y = para(ctx, p.verdict.text, PAD + IN, y + 120, w - IN * 2, 25, 36, C.text) + 40;
  behind(ctx, () => {
    const g = ctx.createLinearGradient(PAD, top, CARD_W - PAD, y);
    g.addColorStop(0, vc + "38"); g.addColorStop(0.65, C.panel2);
    box(ctx, PAD, top, w, y - top, 28, g, vc + "88");
  });
  return y;
}

/* Desenha num canvas alto e recorta na altura do conteúdo, com fundo e rodapé */
function renderCard(draw, url) {
  const work = document.createElement("canvas");
  work.width = CARD_W; work.height = 12000;
  const wctx = work.getContext("2d");
  const end = draw(wctx);
  const h = Math.max(CARD_MIN_H, Math.ceil(end + 56 + 140));
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, CARD_W, h);
  [[0.15, C.l], [0.85, C.f]].forEach(([x, color]) => {
    const g = ctx.createRadialGradient(CARD_W * x, -120, 0, CARD_W * x, -120, 760);
    g.addColorStop(0, color + "40"); g.addColorStop(1, color + "00");
    ctx.fillStyle = g; ctx.fillRect(0, 0, CARD_W, h);
  });
  ctx.drawImage(work, 0, 0, CARD_W, h - 140, 0, 0, CARD_W, h - 140);
  footer(ctx, h, url);
  return canvas;
}

async function buildCard(spec, url) {
  try {
    await Promise.all(["700 60px Fraunces", "400 28px Inter", "600 28px Inter", "500 28px Inter"].map((f) => document.fonts.load(f)));
  } catch { /* usa fontes de reserva */ }
  const [kind, id] = spec.split(":");
  let canvas, name;
  if (kind === "pol") {
    const p = POLEMICAS.find((x) => x.id === id);
    canvas = renderCard((ctx) => drawPolCard(ctx, p), url); name = "polemica-" + p.id;
  } else {
    const a = AREAS.find((x) => x.id === id);
    canvas = renderCard((ctx) => drawAreaCard(ctx, a), url); name = a.id;
  }
  const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  return { blob, width: canvas.width, height: canvas.height, file: new File([blob], `ladoaladobrasil-${name}.png`, { type: "image/png" }) };
}

/* ---------- Janela de prévia ---------- */
async function openCardModal(spec, text, url) {
  closeCardModal();
  const modal = document.createElement("div");
  modal.className = "card-modal";
  modal.innerHTML = `<div class="card-box" role="dialog" aria-modal="true" aria-label="Imagem para compartilhar">
      <button type="button" class="card-close" aria-label="Fechar">×</button>
      <h3>Imagem para compartilhar</h3>
      <div class="card-preview"><p class="empty">Gerando imagem…</p></div>
      <div class="card-actions"></div>
      <p class="hint card-hint"></p>
    </div>`;
  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".card-close")) closeCardModal(); });

  const { blob, file, width, height } = await buildCard(spec, url);
  if (!modal.isConnected) return;
  const src = URL.createObjectURL(blob);
  modal.dataset.src = src;
  modal.querySelector(".card-preview").innerHTML = `<img src="${src}" alt="Prévia da imagem para compartilhar" width="${width}" height="${height}">`;
  const canFiles = navigator.canShare && navigator.canShare({ files: [file] });
  const actions = modal.querySelector(".card-actions");
  actions.innerHTML = (canFiles ? `<button type="button" class="btn-main card-share">Compartilhar imagem</button>` : "")
    + `<a class="${canFiles ? "btn-sec" : "btn-main"}" href="${src}" download="${file.name}">Baixar imagem</a>`;
  modal.querySelector(".card-hint").textContent = canFiles
    ? "Escolha o WhatsApp, Instagram ou outro app para enviar a imagem."
    : "Baixe a imagem e anexe na sua publicação ou conversa.";
  const shareBtn = modal.querySelector(".card-share");
  if (shareBtn) shareBtn.addEventListener("click", async () => {
    try { await navigator.share({ files: [file], title: document.title, text: text + " " + url }); }
    catch (error) { if (error.name !== "AbortError") console.error(error); }
  });
}

function closeCardModal() {
  const modal = document.querySelector(".card-modal");
  if (!modal) return;
  if (modal.dataset.src) URL.revokeObjectURL(modal.dataset.src);
  modal.remove();
  document.body.classList.remove("modal-open");
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCardModal(); });

window.buildCard = buildCard;
window.openCardModal = openCardModal;
})();
