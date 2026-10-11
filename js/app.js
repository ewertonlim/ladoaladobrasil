const MARGIN = 0.15;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ORIGINAL_TITLE = document.title;

/* ---------- Compartilhar ---------- */
const pageUrl = (hash) => location.origin === "null"
  ? location.href.split("#")[0] + (hash || "")
  : location.origin + location.pathname + (hash || "");

function shareBar(hash, text, label = "Compartilhar") {
  const url = pageUrl(hash);
  const enc = encodeURIComponent;
  const links = [
    ["whatsapp", "WhatsApp", `https://wa.me/?text=${enc(text + " " + url)}`],
    ["x", "X", `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`],
    ["facebook", "Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ["telegram", "Telegram", `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`],
    ["linkedin", "LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`]
  ];
  return `<div class="share" data-url="${esc(url)}" data-text="${esc(text)}"><span class="share-label">${esc(label)}</span>`
    + links.map(([net, name, href]) => `<a class="sh sh-${net}" target="_blank" rel="noopener" href="${esc(href)}" aria-label="Compartilhar no ${name}">${name}</a>`).join("")
    + `<button type="button" class="sh sh-copy">Copiar link</button><button type="button" class="sh sh-native" hidden>Mais opções</button></div>`;
}

let shareListenerReady = false;
function initShare(root = document) {
  root.querySelectorAll(".share .sh-native").forEach((button) => {
    if (navigator.share) button.hidden = false;
  });
  if (shareListenerReady) return;
  shareListenerReady = true;
  document.addEventListener("click", async (event) => {
    const share = event.target.closest(".share");
    if (!share) return;
    if (share.closest("details")) event.stopPropagation();
    const button = event.target.closest(".sh-copy, .sh-native");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const url = share.dataset.url;
    if (button.classList.contains("sh-native")) {
      try {
        await navigator.share({ title: document.title, text: share.dataset.text, url });
      } catch (error) {
        if (error.name !== "AbortError") console.error(error);
      }
      return;
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error("Clipboard API indisponível");
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    button.textContent = "Link copiado!";
    button.classList.add("ok");
    window.setTimeout(() => {
      button.textContent = "Copiar link";
      button.classList.remove("ok");
    }, 2000);
  });
}

/* ---------- Cálculo dos vencedores ---------- */
let W = 0.5; // peso dos mandatos
function verdictOf(a, l, o) {
  if (Math.abs(l - o) < MARGIN) return "e";
  return l > o ? "l" : "f";
}
function areaResult(a) {
  const m = verdictOf(a, a.mandate.rating.l, a.mandate.rating.j);
  const p = verdictOf(a, a.proposals.rating.l, a.proposals.rating.f);
  const sl = W * a.mandate.rating.l + (1 - W) * a.proposals.rating.l;
  const so = W * a.mandate.rating.j + (1 - W) * a.proposals.rating.f;
  return { m, p, sl, so, o: verdictOf(a, sl, so) };
}
const NAME = { l: "Lula", f: "Lado Bolsonaro", e: "Empate" };

/* ---------- Cabeçalho ---------- */
$("pctL").textContent = ELECTION.lula.pct.toFixed(2).replace(".", ",");
$("pctF").textContent = ELECTION.flavio.pct.toFixed(2).replace(".", ",");
const days = Math.ceil((new Date(ELECTION.date) - new Date()) / 864e5);
$("countdown").textContent = days > 0 ? `25/10 (faltam ${days} ${days === 1 ? "dia" : "dias"})` : "25/10";

/* ---------- Fontes usadas ---------- */
const pts = (a) => [...a.mandate.lula, ...a.mandate.jair, ...a.proposals.lula, ...a.proposals.flavio];
const used = [...new Set(AREAS.flatMap((a) => pts(a).map((p) => p.s)).concat(POLEMICAS.flatMap((p) => p.facts.map((f) => f.s))).concat(ELECTION.src))];
$("sourceList").innerHTML = used.map((k) => `<li><a href="${SOURCES[k].url}" target="_blank" rel="noopener">${esc(SOURCES[k].name)}</a></li>`).join("");

/* ---------- Página inicial ---------- */
function renderHome() {
  let L = 0, F = 0, E = 0;
  $("grid").innerHTML = AREAS.map((a) => {
    const r = areaResult(a);
    r.o === "l" ? L++ : r.o === "f" ? F++ : E++;
    return `<button class="card ${r.o}" data-id="${a.id}">
      <span class="icon">${a.icon}</span>
      <h3>${a.title}</h3><p>${a.lead}</p>
      <span class="chip ${r.o}">${r.o === "e" ? "Empate" : "Vence: " + NAME[r.o]}</span>
    </button>`;
  }).join("");
  $("sL").textContent = L; $("sF").textContent = F; $("sE").textContent = E;
  const n = AREAS.length;
  $("barL").style.width = (L / n) * 100 + "%";
  $("barE").style.width = (E / n) * 100 + "%";
  $("barF").style.width = (F / n) * 100 + "%";
  $("homeShare").innerHTML = shareBar("", "Lula x Flávio Bolsonaro: compare mandatos e propostas área por área, com fontes, no Lado a Lado Brasil.", "Compartilhe o comparativo");
  initShare($("homeShare"));
  $("grid").querySelectorAll(".card").forEach((c) => c.addEventListener("click", () => (location.hash = "#/" + c.dataset.id)));
}
$("w").addEventListener("input", (e) => {
  W = +e.target.value / 100;
  $("wOut").textContent = Math.round(W * 100) + "%";
  $("pOut").textContent = Math.round((1 - W) * 100) + "%";
  renderHome();
});

/* ---------- Página da área ---------- */
const pointHtml = (p) => {
  const s = SOURCES[p.s];
  return `<div class="pt"><span class="tag ${p.kind}">${p.kind}</span><p>${esc(p.t)}</p>
    <a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></div>`;
};
const duel = (title, sub, left, right, v, score, note) => `
  <section class="duel">
    <div class="duel-head"><h3>${title}</h3><p>${sub}</p></div>
    <div class="cols">
      <div class="col l"><h4><span class="dot l"></span> ${left.name}</h4>${left.pts.map(pointHtml).join("")}</div>
      <div class="col f"><h4><span class="dot f"></span> ${right.name}</h4>${right.pts.map(pointHtml).join("")}</div>
    </div>
    <div class="verdict ${v}">
      <div><div class="v-label">Vencedor</div><div class="v-name">${v === "e" ? "Empate" : v === "l" ? "Lula" : right.short}</div></div>
      <div class="v-body"><p>${esc(note)}</p>
        <div class="scores"><span></span><span>${left.short}</span><span>${right.short}</span>
          <span>Nota</span><b>${score[0]}/5</b><b>${score[1]}/5</b></div></div>
    </div>
  </section>`;

function renderArea(a) {
  const r = areaResult(a);
  $("areaView").innerHTML = `
    <button class="back" id="back">← Todas as áreas</button>
    <div class="area-head"><div class="icon big">${a.icon}</div><div><h2>${a.title}</h2><p class="lead">${a.lead}</p></div></div>
    ${duel("Mandatos", "Resultados verificáveis: Lula (2023–2026) × Jair Bolsonaro (2019–2022)",
      { name: "Lula · 2023–2026", short: "Lula", pts: a.mandate.lula },
      { name: "Jair Bolsonaro · 2019–2022", short: "Jair", pts: a.mandate.jair },
      r.m === "f" ? "f" : r.m, [a.mandate.rating.l, a.mandate.rating.j], a.mandate.note).replace("Vencedor</div>", "Vencedor do mandato</div>")}
    ${duel("Propostas", "O que cada candidato promete para 2027–2030",
      { name: "Lula · proposta", short: "Lula", pts: a.proposals.lula },
      { name: "Flávio Bolsonaro · proposta", short: "Flávio", pts: a.proposals.flavio },
      r.p, [a.proposals.rating.l, a.proposals.rating.f], a.proposals.note).replace("Vencedor</div>", "Vencedor das propostas</div>")}
    <section class="final ${r.o}">
      <div class="v-label">Resultado final da área (mandatos ${Math.round(W * 100)}% · propostas ${Math.round((1 - W) * 100)}%)</div>
      <div class="v-name big">${r.o === "e" ? "Empate" : r.o === "l" ? "Lula" : "Lado Bolsonaro (Jair + Flávio)"}</div>
      <p>Nota combinada: Lula <b>${r.sl.toFixed(1)}</b> · Lado Bolsonaro <b>${r.so.toFixed(1)}</b></p>
    </section>
    ${shareBar("#/" + a.id, `${a.icon} ${a.title}: ${r.o === "e" ? "empate" : "vence " + (r.o === "l" ? "Lula" : "o lado Bolsonaro")} (nota ${r.sl.toFixed(1)} x ${r.so.toFixed(1)}). Veja os dados e as fontes no Lado a Lado Brasil:`, "Compartilhe esta área")}
    <section class="comments" id="comments">
      <h3>💬 Comentários sobre ${a.title}</h3>
      <form id="cform">
        <input id="cname" maxlength="40" placeholder="Seu nome (opcional)">
        <textarea id="ctext" maxlength="600" required placeholder="Deixe sua opinião ou contribuição. Respeite os outros e cite fontes quando puder."></textarea>
        <button type="submit">Publicar comentário</button>
      </form>
      <p class="hint">Os comentários ficam salvos apenas neste navegador. Para comentários compartilhados entre visitantes é preciso um servidor.</p>
      <div id="clist"></div>
    </section>`;

  initShare($("areaView"));
  $("back").onclick = () => (location.hash = "");

  /* Giscus configurado: comentários compartilhados via GitHub Discussions */
  if (GISCUS.repo && GISCUS.repoId && GISCUS.categoryId) {
    $("comments").querySelectorAll("#cform,.hint,#clist").forEach((el) => el.remove());
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    Object.entries({
      repo: GISCUS.repo, "repo-id": GISCUS.repoId, category: GISCUS.category, "category-id": GISCUS.categoryId,
      mapping: "specific", term: "area-" + a.id, strict: "1", "reactions-enabled": "1",
      "input-position": "top", theme: "dark_dimmed", lang: "pt", loading: "lazy"
    }).forEach(([k, v]) => s.setAttribute("data-" + k, v));
    $("comments").appendChild(s);
    return;
  }

  const key = "comments:" + a.id;
  const load = () => JSON.parse(localStorage.getItem(key) || "[]");
  const draw = () => {
    const list = load();
    $("clist").innerHTML = list.length
      ? list.map((c) => `<article class="comment"><b>${esc(c.n || "Anônimo")}</b> <time>${new Date(c.d).toLocaleString("pt-BR")}</time><p>${esc(c.t)}</p></article>`).join("")
      : `<p class="empty">Ainda não há comentários. Seja o primeiro.</p>`;
  };
  $("cform").addEventListener("submit", (e) => {
    e.preventDefault();
    const t = $("ctext").value.trim();
    if (!t) return;
    const list = load();
    list.unshift({ n: $("cname").value.trim(), t, d: Date.now() });
    localStorage.setItem(key, JSON.stringify(list.slice(0, 200)));
    $("ctext").value = "";
    draw();
  });
  draw();
}

/* ---------- Área de Polêmicas ---------- */
let polTab = "lula";
const COUNT_LABEL = { procede: "Procede", parcial: "Em parte", nao: "Não procede", aberto: "Em aberto" };

function renderPol() {
  const list = POLEMICAS.filter((p) => p.group === polTab);
  const tally = ["procede", "parcial", "nao", "aberto"].map((t) => {
    const n = list.filter((p) => p.verdict.type === t).length;
    return `<span class="chip v-${t}">${n} ${COUNT_LABEL[t]}</span>`;
  }).join("");

  $("polView").innerHTML = `
    <button class="back" id="polBack">← Início</button>
    <div class="area-head"><div class="icon big">⚖️</div><div><h2>Área de Polêmicas</h2>
      <p class="lead">Cada polêmica traz a acusação, o contraponto, os fatos com fontes e um veredito sobre o que os fatos sustentam.</p></div></div>
    <div class="pol-note"><b>Como ler os vereditos:</b> <span class="chip v-procede">Procede</span> os fatos sustentam a acusação ·
      <span class="chip v-parcial">Procede em parte</span> parte é confirmada e parte é exagerada ou contestada ·
      <span class="chip v-nao">Não procede</span> a acusação central não se sustenta ·
      <span class="chip v-aberto">Em aberto</span> não há decisão ou prova conclusiva. São avaliações editoriais, não decisões judiciais, e vale a presunção de inocência.</div>
    ${shareBar("#/polemicas", "Polêmicas de Lula e da família Bolsonaro: acusação, contraponto, fatos com fontes e veredito. No Lado a Lado Brasil:", "Compartilhe as polêmicas")}
    <div class="tabs">
      <button class="tab ${polTab === "lula" ? "on" : ""}" data-t="lula">Críticas ao governo Lula</button>
      <button class="tab ${polTab === "bolsonaro" ? "on" : ""}" data-t="bolsonaro">Críticas à família Bolsonaro</button>
    </div>
    <div class="tally">${tally}</div>
    ${list.map((p, i) => `
      <details class="pol" id="pol-${p.id}" ${i === 0 ? "open" : ""}>
        <summary>
          <span class="pi">${p.icon}</span>
          <span class="pt-wrap"><b>${p.title}</b><small>Alvo: ${p.target}</small></span>
          <span class="chip v-${p.verdict.type}">${VERDICT_LABEL[p.verdict.type]}</span>
        </summary>
        <div class="pol-body">
          <div class="cols">
            <div class="col acc"><h4>🔴 A acusação</h4><p>${esc(p.accusation)}</p></div>
            <div class="col def"><h4>🔵 O contraponto</h4><p>${esc(p.defense)}</p></div>
          </div>
          <div class="facts"><h4>📎 O que os fatos mostram</h4>${p.facts.map((f) => pointHtml({ kind: "resultado", t: f.t, s: f.s }).replace('<span class="tag resultado">resultado</span>', "")).join("")}</div>
          <div class="verdict v-${p.verdict.type}">
            <div><div class="v-label">Veredito</div><div class="v-name">${VERDICT_LABEL[p.verdict.type]}</div></div>
            <div class="v-body"><p>${esc(p.verdict.text)}</p></div>
          </div>
          ${shareBar("#/polemicas/" + p.id, `${p.icon} ${p.title} — veredito: ${VERDICT_LABEL[p.verdict.type]}. Veja os fatos e as fontes no Lado a Lado Brasil:`, "Compartilhe esta polêmica")}
        </div>
      </details>`).join("")}`;

  initShare($("polView"));
  $("polBack").onclick = () => (location.hash = "");
  $("polView").querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => { polTab = b.dataset.t; renderPol(); }));
}

/* ---------- Menu superior ---------- */
$("navlinks").innerHTML = AREAS.map((a) => `<a href="#/${a.id}" data-id="${a.id}" title="${a.title}">${a.icon} ${a.title.split(" e ")[0]}</a>`).join("")
  + `<a href="#/polemicas" data-id="polemicas" class="pol-link">⚖️ Polêmicas</a>`;

/* ---------- Roteamento por hash (sem rolagem entre áreas) ---------- */
function route() {
  const [id, sub] = location.hash.replace("#/", "").split("/");
  const a = AREAS.find((x) => x.id === id);
  const p = id === "polemicas" ? POLEMICAS.find((x) => x.id === sub) : null;
  const isPol = id === "polemicas";
  if (p) polTab = p.group;
  $("home").hidden = !!a || isPol;
  $("areaView").hidden = !a;
  $("polView").hidden = !isPol;
  document.querySelectorAll("#navlinks a").forEach((l) => l.classList.toggle("active", l.dataset.id === id));
  const act = document.querySelector("#navlinks a.active");
  if (act) act.scrollIntoView({ inline: "center", block: "nearest" });
  document.title = a ? `${a.title} · Lado a Lado Brasil` : p ? `${p.title} · Lado a Lado Brasil` : isPol ? "Polêmicas · Lado a Lado Brasil" : ORIGINAL_TITLE;
  if (a) renderArea(a);
  if (isPol) {
    renderPol();
    if (p) {
      const detail = $("pol-" + p.id);
      $("polView").querySelectorAll("details.pol").forEach((item) => { item.open = item === detail; });
      if (detail) detail.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  } else {
    window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", route);
renderHome();
route();
