/* ============================================================
   Cartões em imagem para compartilhar (canvas 1080 × 1350)
   ============================================================ */
const CARD_W = 1080, CARD_H = 1350, PAD = 72;
const C = {
  bg: "#0b0d12", panel: "#12151d", panel2: "#171b26", line: "#2a3042", text: "#e9ecf3", muted: "#9aa3b5",
  l: "#e5484d", l2: "#ff7a7e", f: "#3b82f6", f2: "#7db0ff", e: "#c8a24d",
  procede: "#ff9a76", parcial: "#c8a24d", nao: "#5fd3b7", aberto: "#c3cad8"
};
const EMOJI = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji"';
const SERIF = `"Fraunces",Georgia,serif,${EMOJI}`;
const SANS = `"Inter",system-ui,sans-serif,${EMOJI}`;
const WIN = { l: { name: "Lula", color: C.l2 }, f: { name: "Lado Bolsonaro", color: C.f2 }, e: { name: "Empate", color: C.e } };

function cardCtx() {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W; canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, CARD_W, CARD_H);
  [[0.15, C.l], [0.85, C.f]].forEach(([x, color]) => {
    const g = ctx.createRadialGradient(CARD_W * x, -120, 0, CARD_W * x, -120, 760);
    g.addColorStop(0, color + "40"); g.addColorStop(1, color + "00");
    ctx.fillStyle = g; ctx.fillRect(0, 0, CARD_W, CARD_H);
  });
  ctx.textBaseline = "alphabetic";
  return { canvas, ctx };
}

const font = (ctx, size, weight = 400, family = SANS) => (ctx.font = `${weight} ${size}px ${family}`);

function box(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

function wrap(ctx, text, maxW, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  for (let i = 0; i < words.length; i++) {
    const test = cur ? cur + " " + words[i] : words[i];
    if (ctx.measureText(test).width <= maxW || !cur) { cur = test; continue; }
    lines.push(cur); cur = words[i];
    if (lines.length === maxLines) { cur = null; break; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines || (cur === null)) {
    lines.length = maxLines;
    let last = lines[maxLines - 1];
    while (last && ctx.measureText(last + "…").width > maxW) last = last.replace(/\s*\S+$/, "");
    lines[maxLines - 1] = last + "…";
  }
  return lines;
}

/* Escreve texto quebrado em linhas e devolve o y depois do bloco */
function para(ctx, text, x, y, maxW, size, lh, color, maxLines, weight = 400, family = SANS) {
  font(ctx, size, weight, family); ctx.fillStyle = color;
  const lines = wrap(ctx, text, maxW, maxLines);
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

function header(ctx) {
  ctx.fillStyle = C.l; ctx.beginPath(); ctx.arc(PAD + 9, PAD + 18, 9, 0, 7); ctx.fill();
  ctx.fillStyle = C.f; ctx.beginPath(); ctx.arc(PAD + 35, PAD + 18, 9, 0, 7); ctx.fill();
  font(ctx, 32, 700, SERIF); ctx.fillStyle = C.text; ctx.fillText("Lado a Lado Brasil", PAD + 60, PAD + 29);
  font(ctx, 22, 600); ctx.fillStyle = C.e; ctx.textAlign = "right";
  ctx.fillText("ELEIÇÕES 2026 · 2º TURNO", CARD_W - PAD, PAD + 27); ctx.textAlign = "left";
}

function footer(ctx, url) {
  const y = CARD_H - PAD;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAD, y - 66); ctx.lineTo(CARD_W - PAD, y - 66); ctx.stroke();
  font(ctx, 24); ctx.fillStyle = C.muted; ctx.fillText("Fatos, fontes e metodologia em", PAD, y - 22);
  font(ctx, 26, 600); ctx.fillStyle = C.text;
  ctx.fillText(/^https?:/.test(url) ? new URL(url).host : "Lado a Lado Brasil", PAD, y + 12);
  font(ctx, 20); ctx.fillStyle = C.muted; ctx.textAlign = "right";
  ctx.fillText("Avaliação editorial, não decisão judicial", CARD_W - PAD, y + 12); ctx.textAlign = "left";
}

function scoreBars(ctx, x, y, w, left, right) {
  [[left, C.l, C.l2], [right, C.f, C.f2]].forEach(([s, c, c2], i) => {
    const yy = y + i * 64;
    font(ctx, 28, 600); ctx.fillStyle = c2; ctx.fillText(s.name, x, yy + 24);
    font(ctx, 30, 700, SERIF); ctx.textAlign = "right"; ctx.fillText(`${s.score}/5`, x + w, yy + 26); ctx.textAlign = "left";
    box(ctx, x, yy + 38, w, 10, 5, C.line);
    box(ctx, x, yy + 38, (w * s.score) / 5, 10, 5, c);
  });
}

function duelPanel(ctx, y, title, sub, left, right, v, winLabel) {
  const h = 250, w = CARD_W - PAD * 2;
  box(ctx, PAD, y, w, h, 28, C.panel, C.line);
  font(ctx, 36, 700, SERIF); ctx.fillStyle = C.text; ctx.fillText(title, PAD + 36, y + 62);
  font(ctx, 22); ctx.fillStyle = C.muted; ctx.fillText(sub, PAD + 36, y + 96);
  const winner = v === "e" ? "Empate" : v === "l" ? "Lula" : winLabel;
  pill(ctx, v === "e" ? "Empate" : "Vence: " + winner, CARD_W - PAD - 36, y + 34, WIN[v].color, 24, "right");
  scoreBars(ctx, PAD + 36, y + 128, w - 72, left, right);
  return y + h;
}

function drawAreaCard(a) {
  const { canvas, ctx } = cardCtx();
  const r = areaResult(a);
  header(ctx);
  let y = PAD + 150;
  font(ctx, 84, 400, SANS); ctx.fillText(a.icon, PAD, y + 6);
  y = para(ctx, a.title, PAD + 120, y - 6, CARD_W - PAD * 2 - 120, 60, 66, C.text, 2, 700, SERIF);
  y = para(ctx, a.lead, PAD + 120, y + 50, CARD_W - PAD * 2 - 120, 28, 36, C.muted, 1) + 50;
  y = duelPanel(ctx, y, "Mandatos", "Lula (2023–2026) × Jair Bolsonaro (2019–2022)",
    { name: "Lula", score: a.mandate.rating.l }, { name: "Jair Bolsonaro", score: a.mandate.rating.j }, r.m, "Jair") + 28;
  y = duelPanel(ctx, y, "Propostas", "Promessas para 2027–2030",
    { name: "Lula", score: a.proposals.rating.l }, { name: "Flávio Bolsonaro", score: a.proposals.rating.f }, r.p, "Flávio") + 28;
  const win = WIN[r.o], fh = CARD_H - PAD - 96 - y;
  const g = ctx.createLinearGradient(PAD, y, CARD_W - PAD, y + fh);
  g.addColorStop(0, win.color + "40"); g.addColorStop(0.7, C.panel2);
  box(ctx, PAD, y, CARD_W - PAD * 2, fh, 28, g, win.color + "88");
  ctx.textAlign = "center";
  font(ctx, 22, 600); ctx.fillStyle = C.muted;
  ctx.fillText(`RESULTADO DA ÁREA · MANDATOS ${Math.round(W * 100)}% · PROPOSTAS ${Math.round((1 - W) * 100)}%`, CARD_W / 2, y + 50);
  font(ctx, 70, 700, SERIF); ctx.fillStyle = win.color;
  ctx.fillText(r.o === "e" ? "Empate" : r.o === "l" ? "Lula" : "Lado Bolsonaro", CARD_W / 2, y + fh / 2 + 34);
  font(ctx, 26); ctx.fillStyle = C.muted;
  ctx.fillText(`Nota combinada: Lula ${r.sl.toFixed(1).replace(".", ",")} · Lado Bolsonaro ${r.so.toFixed(1).replace(".", ",")}`, CARD_W / 2, y + fh - 34);
  ctx.textAlign = "left";
  return canvas;
}

function drawPolCard(p) {
  const { canvas, ctx } = cardCtx();
  const vc = C[p.verdict.type], w = CARD_W - PAD * 2;
  header(ctx);
  let y = PAD + 130;
  pill(ctx, "Polêmica · Alvo: " + p.target, PAD, y, C.e, 24);
  y += 120;
  font(ctx, 72); ctx.fillText(p.icon, PAD, y);
  y = para(ctx, p.title, PAD + 108, y - 8, w - 108, 52, 60, C.text, 3, 700, SERIF) + 84;

  font(ctx, 24, 600); ctx.fillStyle = "#ef6c3f"; ctx.fillText("A ACUSAÇÃO", PAD, y);
  y = para(ctx, p.accusation, PAD, y + 42, w, 27, 38, C.muted, 3) + 56;

  font(ctx, 24, 600); ctx.fillStyle = C.e; ctx.fillText("O QUE OS FATOS MOSTRAM", PAD, y);
  y += 44;
  p.facts.slice(0, 2).forEach((f) => {
    ctx.fillStyle = C.e; ctx.beginPath(); ctx.arc(PAD + 7, y - 9, 6, 0, 7); ctx.fill();
    y = para(ctx, f.t, PAD + 28, y, w - 28, 27, 38, C.text, 3) + 54;
  });

  const vy = y + 6, vh = CARD_H - PAD - 96 - vy;
  const g = ctx.createLinearGradient(PAD, vy, CARD_W - PAD, vy + vh);
  g.addColorStop(0, vc + "38"); g.addColorStop(0.65, C.panel2);
  box(ctx, PAD, vy, w, vh, 28, g, vc + "88");
  font(ctx, 22, 600); ctx.fillStyle = C.muted; ctx.fillText("VEREDITO", PAD + 36, vy + 52);
  font(ctx, 58, 700, SERIF); ctx.fillStyle = vc; ctx.fillText(VERDICT_LABEL[p.verdict.type], PAD + 36, vy + 120);
  para(ctx, p.verdict.text, PAD + 36, vy + 168, w - 72, 25, 35, C.muted, Math.max(1, Math.floor((vh - 190) / 35)));
  return canvas;
}

function drawHomeCard() {
  const { canvas, ctx } = cardCtx();
  const res = AREAS.map((a) => ({ a, r: areaResult(a) }));
  const n = { l: 0, e: 0, f: 0 };
  res.forEach(({ r }) => n[r.o]++);
  const w = CARD_W - PAD * 2;
  header(ctx);
  let y = PAD + 170;
  font(ctx, 76, 700, SERIF);
  const parts = [["Lula", C.l2], [" × ", C.muted], ["Flávio Bolsonaro", C.f2]];
  let x = PAD; parts.forEach(([t, c]) => { ctx.fillStyle = c; ctx.fillText(t, x, y); x += ctx.measureText(t).width; });
  font(ctx, 30); ctx.fillStyle = C.muted; ctx.fillText("Quem vence em cada área, com dados e fontes", PAD, y + 54);
  y += 100;

  box(ctx, PAD, y, w, 170, 28, C.panel, C.line);
  [["l", "áreas para Lula", C.l2], ["e", "empates", C.e], ["f", "para o lado Bolsonaro", C.f2]].forEach(([k, label, c], i) => {
    const cx = PAD + w / 6 + (i * w) / 3;
    ctx.textAlign = "center";
    font(ctx, 68, 700, SERIF); ctx.fillStyle = c; ctx.fillText(String(n[k]), cx, y + 82);
    font(ctx, 22); ctx.fillStyle = C.muted; ctx.fillText(label, cx, y + 118);
    ctx.textAlign = "left";
  });
  let bx = PAD + 36; const bw = w - 72;
  [["l", C.l], ["e", C.e], ["f", C.f]].forEach(([k, c]) => {
    const seg = (bw * n[k]) / AREAS.length;
    if (seg) { ctx.fillStyle = c; ctx.fillRect(bx, y + 140, seg, 10); bx += seg; }
  });
  y += 210;

  const rowH = Math.min(78, (CARD_H - PAD - 110 - y) / res.length);
  res.forEach(({ a, r }, i) => {
    const ry = y + i * rowH;
    if (i) { ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(PAD, ry); ctx.lineTo(CARD_W - PAD, ry); ctx.stroke(); }
    font(ctx, 34); ctx.fillText(a.icon, PAD + 4, ry + rowH / 2 + 12);
    font(ctx, 30, 600); ctx.fillStyle = C.text; ctx.fillText(a.title, PAD + 64, ry + rowH / 2 + 11);
    pill(ctx, r.o === "e" ? "Empate" : WIN[r.o].name, CARD_W - PAD, ry + rowH / 2 - 21, WIN[r.o].color, 24, "right");
  });
  font(ctx, 20); ctx.fillStyle = C.muted;
  ctx.fillText(`1º turno: Lula ${ELECTION.lula.pct.toFixed(2).replace(".", ",")}% · Flávio ${ELECTION.flavio.pct.toFixed(2).replace(".", ",")}% (TSE) · peso dos mandatos ${Math.round(W * 100)}%`, PAD, CARD_H - PAD - 84);
  return canvas;
}

function drawPolListCard(group) {
  const { canvas, ctx } = cardCtx();
  const list = POLEMICAS.filter((p) => p.group === group);
  header(ctx);
  let y = PAD + 170;
  y = para(ctx, group === "lula" ? "Críticas ao governo Lula" : "Críticas à família Bolsonaro", PAD, y, CARD_W - PAD * 2, 64, 70, group === "lula" ? C.l2 : C.f2, 1, 700, SERIF);
  font(ctx, 28); ctx.fillStyle = C.muted; ctx.fillText("Polêmicas: o que os fatos sustentam", PAD, y + 50);
  y += 100;
  let cx = PAD;
  ["procede", "parcial", "nao", "aberto"].forEach((t) => {
    const n = list.filter((p) => p.verdict.type === t).length;
    cx += pill(ctx, `${n} ${COUNT_LABEL[t]}`, cx, y, C[t], 24) + 12;
  });
  y += 76;
  const rowH = Math.min(100, (CARD_H - PAD - 110 - y) / list.length);
  list.forEach((p, i) => {
    const ry = y + i * rowH;
    if (i) { ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(PAD, ry); ctx.lineTo(CARD_W - PAD, ry); ctx.stroke(); }
    font(ctx, 36); ctx.fillText(p.icon, PAD + 2, ry + rowH / 2 + 4);
    const pw = pill(ctx, VERDICT_LABEL[p.verdict.type], CARD_W - PAD, ry + rowH / 2 - 21, C[p.verdict.type], 23, "right");
    font(ctx, 29, 700, SERIF); ctx.fillStyle = C.text;
    ctx.fillText(wrap(ctx, p.title, CARD_W - PAD * 2 - 66 - pw - 24, 1)[0], PAD + 66, ry + rowH / 2 - 2);
    font(ctx, 21); ctx.fillStyle = C.muted; ctx.fillText("Alvo: " + p.target, PAD + 66, ry + rowH / 2 + 30);
  });
  return canvas;
}

async function buildCard(spec, url) {
  try {
    await Promise.all(["700 60px Fraunces", "400 28px Inter", "600 28px Inter"].map((f) => document.fonts.load(f)));
  } catch { /* usa fontes de reserva */ }
  const [kind, id] = spec.split(":");
  let canvas, name;
  if (kind === "area") { const a = AREAS.find((x) => x.id === id); canvas = drawAreaCard(a); name = a.id; }
  else if (kind === "pol") { const p = POLEMICAS.find((x) => x.id === id); canvas = drawPolCard(p); name = "polemica-" + p.id; }
  else if (kind === "pols") { canvas = drawPolListCard(id); name = "polemicas-" + id; }
  else { canvas = drawHomeCard(); name = "comparativo"; }
  footer(canvas.getContext("2d"), url);
  const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  return { blob, file: new File([blob], `ladoaladobrasil-${name}.png`, { type: "image/png" }) };
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

  const { blob, file } = await buildCard(spec, url);
  if (!modal.isConnected) return;
  const src = URL.createObjectURL(blob);
  modal.dataset.src = src;
  modal.querySelector(".card-preview").innerHTML = `<img src="${src}" alt="Prévia da imagem para compartilhar" width="1080" height="1350">`;
  const canFiles = navigator.canShare && navigator.canShare({ files: [file] });
  const actions = modal.querySelector(".card-actions");
  actions.innerHTML = (canFiles ? `<button type="button" class="btn-main card-share">Compartilhar imagem</button>` : "")
    + `<a class="${canFiles ? "btn-sec" : "btn-main"}" href="${src}" download="${file.name}">Baixar imagem</a>`;
  modal.querySelector(".card-hint").textContent = canFiles
    ? "Escolha o WhatsApp, Instagram ou outro app. O link do site vai junto com a imagem."
    : "Baixe a imagem e anexe na sua publicação. Para enviar só o link, use os botões de redes sociais.";
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
