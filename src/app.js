'use strict';

const NS = "http://www.w3.org/2000/svg";
const scene = document.querySelector("#scene");
const networkSvg = document.querySelector("#network");
const artworkBackdrop = document.querySelector("#artwork-backdrop");
const artwork = document.querySelector("#network-artwork");
const paths = document.querySelector("#paths");
const signals = document.querySelector("#signals");
const nodes = document.querySelector("#nodes");
const core = document.querySelector("#core");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

const PORTRAIT_ARTWORK = { src: "/network-portrait.png", width: 941, height: 1672 };
const LANDSCAPE_ARTWORK = { src: "/network.png", width: 1672, height: 941 };
const PORTRAIT_CROP = { minimumWidth: 825, minimumHeight: 1380, focusX: 470, focusY: 836 };

// Canonical node mapping for Jeterson Ferrari Portfolio
const NODE_I18N_KEYS = {
  profile: "nodeProfile",
  "tech-stack": "nodeTechStack",
  languages: "nodeLanguages",
  "ai-workflow": "nodeAiWorkflow",
  contact: "nodeContact",
  architecture: "nodeArchitecture",
  "problem-solving": "nodeProblemSolving",
  pulsar: "nodePulsar",
  process: "nodeProcess",
  restaurantzero: "nodeRestaurantZero"
};

const LAYOUTS = {
  landscape: {
    viewBox: "0 0 1672 941",
    artwork: LANDSCAPE_ARTWORK,
    core: { x: 744, y: 370, width: 184, height: 190, rx: 70 },
    specs: [
      { id: "profile", name: "Profile", url: "/profile", x: 836, y: 145, r: 65, d: "M836 370 L836 220", lx: 836, ly: 34, anchor: "middle" },
      { id: "tech-stack", name: "Tech Stack", url: "/profile#tools", x: 1058, y: 219, r: 65, d: "M918 390 C954 358 948 313 978 279 C995 257 1014 247 1033 245", lx: 1132, ly: 168, anchor: "start" },
      { id: "languages", name: "Languages", url: "/profile#languages", x: 1187, y: 389, r: 65, d: "M940 441 L991 441 C1043 441 1039 389 1100 389 L1122 389", lx: 1262, ly: 394, anchor: "start" },
      { id: "ai-workflow", name: "AI Workflow", url: "/process#ai-workflow", x: 1187, y: 553, r: 64, d: "M940 489 L991 489 C1043 489 1038 553 1105 553 L1122 553", lx: 1262, ly: 558, anchor: "start" },
      { id: "contact", name: "Contact", url: "/contact", x: 1058, y: 707, r: 63, d: "M921 532 C967 532 950 585 974 615 C990 635 1006 652 1024 668", lx: 1124, ly: 787, anchor: "start" },
      { id: "architecture", name: "Architecture", url: "/process#architecture", x: 836, y: 780, r: 65, d: "M836 560 L836 710", lx: 836, ly: 866, anchor: "middle" },
      { id: "problem-solving", name: "Problem Solving", url: "/process#problem-solving", x: 619, y: 707, r: 64, d: "M751 532 C705 532 722 585 698 615 C682 635 666 652 648 668", lx: 548, ly: 787, anchor: "end" },
      { id: "pulsar", name: "Pulsar", url: "/projects/pulsar", x: 486, y: 553, r: 64, d: "M732 489 L683 489 C631 489 635 553 568 553 L551 553", lx: 410, ly: 558, anchor: "end" },
      { id: "process", name: "Process", url: "/process", x: 486, y: 389, r: 65, d: "M732 441 L681 441 C629 441 635 389 574 389 L551 389", lx: 410, ly: 394, anchor: "end" },
      { id: "restaurantzero", name: "RestaurantZero", url: "/projects/restaurantzero", x: 619, y: 219, r: 65, d: "M754 386 C718 358 724 313 694 279 C677 257 658 247 640 245", lx: 548, ly: 168, anchor: "end" }
    ]
  },
  portrait: {
    viewBox: "0 0 941 1672",
    artwork: PORTRAIT_ARTWORK,
    core: { x: 365, y: 685, width: 210, height: 210, rx: 70 },
    specs: [
      { id: "profile", name: "Profile", url: "/profile", x: 470, y: 280, r: 68, d: "M470 685 L470 350", lx: 470, ly: 175, anchor: "middle" },
      { id: "tech-stack", name: "Tech Stack", url: "/profile#tools", x: 694, y: 410, r: 68, d: "M550 742 C586 684 614 563 656 480", lx: 785, ly: 365, anchor: "start" },
      { id: "languages", name: "Languages", url: "/profile#languages", x: 785, y: 650, r: 68, d: "M552 750 C608 725 635 654 712 650", lx: 877, ly: 655, anchor: "start" },
      { id: "ai-workflow", name: "AI Workflow", url: "/process#ai-workflow", x: 785, y: 950, r: 68, d: "M552 830 C608 855 640 946 712 950", lx: 877, ly: 955, anchor: "start" },
      { id: "contact", name: "Contact", url: "/contact", x: 694, y: 1190, r: 68, d: "M550 840 C590 924 618 1050 656 1127", lx: 785, ly: 1235, anchor: "start" },
      { id: "architecture", name: "Architecture", url: "/process#architecture", x: 470, y: 1345, r: 68, d: "M470 895 L470 1275", lx: 470, ly: 1450, anchor: "middle" },
      { id: "problem-solving", name: "Problem Solving", url: "/process#problem-solving", x: 247, y: 1190, r: 68, d: "M390 840 C350 924 322 1050 284 1127", lx: 155, ly: 1235, anchor: "end" },
      { id: "pulsar", name: "Pulsar", url: "/projects/pulsar", x: 157, y: 950, r: 68, d: "M388 830 C330 855 285 950 225 950", lx: 65, ly: 955, anchor: "end" },
      { id: "process", name: "Process", url: "/process", x: 157, y: 650, r: 68, d: "M365 790 C306 790 280 650 225 650", lx: 65, ly: 655, anchor: "end" },
      { id: "restaurantzero", name: "RestaurantZero", url: "/projects/restaurantzero", x: 247, y: 410, r: 68, d: "M390 742 C354 684 326 563 284 480", lx: 155, ly: 365, anchor: "end" }
    ]
  }
};

function getActiveMode() {
  const isPortrait = typeof window !== "undefined" && window.matchMedia("(orientation: portrait)").matches;
  return isPortrait ? "portrait" : "landscape";
}

function formatViewBox(values) {
  return values.map(value => Number(value.toFixed(3))).join(" ");
}

function getPortraitViewBox() {
  const bounds = scene ? scene.getBoundingClientRect() : null;
  const width = bounds?.width || window.innerWidth || PORTRAIT_ARTWORK.width;
  const height = bounds?.height || window.innerHeight || PORTRAIT_ARTWORK.height;
  const aspect = width / height;

  // Keep the entire clickable network in view while letting narrow phones crop
  // only the empty outer edge of the portrait artwork. A small virtual margin
  // is allowed beyond the raster when needed to preserve the source composition.
  const cropWidth = Math.max(PORTRAIT_CROP.minimumWidth, aspect * PORTRAIT_CROP.minimumHeight);
  const cropHeight = cropWidth / aspect;
  const x = PORTRAIT_CROP.focusX - cropWidth / 2;
  const y = PORTRAIT_CROP.focusY - cropHeight / 2;
  return [x, y, cropWidth, cropHeight];
}

let activeArtworkSrc = "";

function syncArtworkFrame(mode, layout) {
  const viewBox = mode === "portrait" ? getPortraitViewBox() : [0, 0, layout.artwork.width, layout.artwork.height];
  if (networkSvg) networkSvg.setAttribute("viewBox", formatViewBox(viewBox));
  if (artworkBackdrop) {
    artworkBackdrop.setAttribute("x", viewBox[0]);
    artworkBackdrop.setAttribute("y", viewBox[1]);
    artworkBackdrop.setAttribute("width", viewBox[2]);
    artworkBackdrop.setAttribute("height", viewBox[3]);
  }
  if (artwork) {
    artwork.setAttribute("x", "0");
    artwork.setAttribute("y", "0");
    artwork.setAttribute("width", layout.artwork.width);
    artwork.setAttribute("height", layout.artwork.height);
    if (activeArtworkSrc !== layout.artwork.src) {
      artwork.setAttribute("href", layout.artwork.src);
      activeArtworkSrc = layout.artwork.src;
    }
  }
}

const artworkLoadPromises = new Map();

function prepareArtwork(src) {
  if (!artworkLoadPromises.has(src)) {
    const image = new Image();
    image.src = src;
    const load = (typeof image.decode === "function"
      ? image.decode()
      : new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        }))
      .catch(error => {
        artworkLoadPromises.delete(src);
        throw error;
      });
    artworkLoadPromises.set(src, load);
  }
  return artworkLoadPromises.get(src);
}

function getNodeTranslation(id, fallback) {
  if (typeof window !== "undefined" && window.i18n) {
    const key = NODE_I18N_KEYS[id];
    if (key) {
      const translated = window.i18n.t(key);
      if (translated) return translated;
    }
  }
  return fallback;
}

function getNodeAriaLabel(id, fallback) {
  const label = getNodeTranslation(id, fallback);
  const lang = (typeof window !== "undefined" && window.i18n) ? window.i18n.getLanguage() : "pt";
  if (lang === "en") return `Go to ${label}`;
  if (lang === "es") return `Ir a ${label}`;
  return `Ir para ${label}`;
}

function svg(tag, attrs, parent) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

const random = (a, b) => a + Math.random() * (b - a);

// Initialize SVG elements using initial layout
const initialMode = getActiveMode();
const initialLayout = LAYOUTS[initialMode];
syncArtworkFrame(initialMode, initialLayout);
if (core) {
  core.setAttribute("x", initialLayout.core.x);
  core.setAttribute("y", initialLayout.core.y);
  core.setAttribute("width", initialLayout.core.width);
  core.setAttribute("height", initialLayout.core.height);
  core.setAttribute("rx", initialLayout.core.rx);
}

const tracks = initialLayout.specs.map((spec, i) => {
  const { id, name, url, x, y, r, d, lx, ly, anchor } = spec;
  const path = svg("path", { d, class: "path", id: `path-${id}` }, paths);
  const group = svg("g", { class: "node", id: `node-${id}` }, nodes);

  svg("circle", { cx: x, cy: y, r: r + 5, class: "halo" }, group);
  svg("circle", { cx: x, cy: y, r: r + 2, class: "node-ring" }, group);
  svg("circle", { cx: x, cy: y, r: r + 1, class: "ambient-ring", style: `--period:${17 + i * 1.73}s;--phase:-${i * 3.19}s` }, group);

  // Discovery label
  const labelGroup = svg("g", { class: "node-label", "aria-hidden": "true" }, group);
  const textEl = svg("text", {
    x: lx,
    y: ly,
    "text-anchor": anchor,
    class: "node-label-text",
    "data-node-id": id
  }, labelGroup);
  textEl.textContent = getNodeTranslation(id, name);

  // Accessible interactive hit target
  const hit = svg("circle", {
    cx: x,
    cy: y,
    r: r + 9,
    class: "hit",
    tabindex: "0",
    role: "button",
    "aria-label": getNodeAriaLabel(id, name),
    "data-target": id
  }, group);

  const length = path.getTotalLength();
  const points = Array.from({ length: 181 }, (_, n) => path.getPointAtLength(length * n / 180));
  const track = { id, name, url, path, group, x, y, r, length, points, weight: random(0.65, 1.4), last: -20000, hover: false, focus: false };

  function highlight() {
    const on = track.hover || track.focus;
    group.classList.toggle("active", on);
    path.classList.toggle("active", on);
  }

  function requestReturn() {
    if (!reduced.matches) {
      pendingReturn = { track, at: performance.now() + random(350, 750), expires: performance.now() + 4500 };
    }
  }

  function activate(e) {
    if (e) e.preventDefault();
    requestReturn();
    respond(track, performance.now());
    path.classList.add("pulse");
    group.classList.add("pulse");
    setTimeout(() => {
      path.classList.remove("pulse");
      group.classList.remove("pulse");
      window.location.href = url;
    }, reduced.matches ? 0 : 220);
  }

  hit.addEventListener("pointerenter", () => {
    track.hover = true;
    highlight();
    requestReturn();
  });

  hit.addEventListener("pointerleave", () => {
    track.hover = false;
    highlight();
  });

  hit.addEventListener("focus", () => {
    track.focus = true;
    highlight();
    requestReturn();
  });

  hit.addEventListener("blur", () => {
    track.focus = false;
    highlight();
  });

  hit.addEventListener("click", activate);

  hit.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      activate(e);
    }
  });

  return track;
});

let currentLayoutMode = initialMode;
let layoutRevision = 0;

async function applyLayout() {
  const mode = getActiveMode();
  const layout = LAYOUTS[mode];
  const changed = mode !== currentLayoutMode;
  if (changed) {
    const revision = ++layoutRevision;
    await prepareArtwork(layout.artwork.src);
    if (revision !== layoutRevision || getActiveMode() !== mode) return;
    currentLayoutMode = mode;
  }
  syncArtworkFrame(mode, layout);
  if (!changed) return;

  if (core) {
    core.setAttribute("x", layout.core.x);
    core.setAttribute("y", layout.core.y);
    core.setAttribute("width", layout.core.width);
    core.setAttribute("height", layout.core.height);
    core.setAttribute("rx", layout.core.rx);
  }

  tracks.forEach(track => {
    const spec = layout.specs.find(s => s.id === track.id);
    if (!spec) return;

    track.x = spec.x;
    track.y = spec.y;
    track.r = spec.r;
    track.path.setAttribute("d", spec.d);

    const halo = track.group.querySelector(".halo");
    if (halo) {
      halo.setAttribute("cx", spec.x);
      halo.setAttribute("cy", spec.y);
      halo.setAttribute("r", spec.r + 5);
    }

    const ring = track.group.querySelector(".node-ring");
    if (ring) {
      ring.setAttribute("cx", spec.x);
      ring.setAttribute("cy", spec.y);
      ring.setAttribute("r", spec.r + 2);
    }

    const amb = track.group.querySelector(".ambient-ring");
    if (amb) {
      amb.setAttribute("cx", spec.x);
      amb.setAttribute("cy", spec.y);
      amb.setAttribute("r", spec.r + 1);
    }

    const text = track.group.querySelector(".node-label-text");
    if (text) {
      text.setAttribute("x", spec.lx);
      text.setAttribute("y", spec.ly);
      text.setAttribute("text-anchor", spec.anchor);
    }

    const hit = track.group.querySelector(".hit");
    if (hit) {
      hit.setAttribute("cx", spec.x);
      hit.setAttribute("cy", spec.y);
      hit.setAttribute("r", spec.r + 9);
      hit.setAttribute("aria-label", getNodeAriaLabel(track.id, spec.name));
    }

    track.length = track.path.getTotalLength();
    track.points = Array.from({ length: 181 }, (_, n) => track.path.getPointAtLength(track.length * n / 180));
  });

  packets.forEach(p => p.g.remove());
  responses.forEach(p => p.el.remove());
  packets = [];
  responses = [];
}

let layoutFrame = 0;
function scheduleLayout() {
  if (layoutFrame) return;
  layoutFrame = requestAnimationFrame(() => {
    layoutFrame = 0;
    applyLayout().catch(error => console.error("Unable to load the selected Synaptic artwork.", error));
  });
}

const portraitMedia = window.matchMedia("(orientation: portrait)");
if (typeof portraitMedia.addEventListener === "function") portraitMedia.addEventListener("change", scheduleLayout);
else portraitMedia.addListener(scheduleLayout);
window.addEventListener("orientationchange", scheduleLayout, { passive: true });
window.addEventListener("resize", scheduleLayout, { passive: true });

let packets = [];
let responses = [];
let pendingReturn = null;
let activity = 0;
let coreHover = false;
let coreFocus = false;
let touchUntil = 0;
let lastFrame = performance.now();
let nextSignal = lastFrame + random(1000, 1900);
let raf = 0;

function point(t, f) {
  const n = Math.max(0, Math.min(180, f * 180));
  const i = Math.min(179, Math.floor(n));
  const a = t.points[i];
  const b = t.points[i + 1];
  const k = n - i;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

function launch(t, reverse, now) {
  if (reduced.matches || packets.length >= 3 || packets.some(p => p.track === t) || now - t.last < 4500) {
    return false;
  }
  const g = svg("g", { opacity: 0 }, signals);
  // A compact tapered packet, only 8 source pixels long
  const dots = [0, 2, 4, 6, 8].map((offset, i) =>
    svg("circle", {
      r: i === 0 ? 1.7 : 1.05,
      fill: "#d0f9e9",
      opacity: [0.82, 0.36, 0.22, 0.12, 0.045][i]
    }, g)
  );
  const pause = !reverse && Math.random() < 0.28 ? random(260, 680) : 0;
  packets.push({
    track: t,
    reverse,
    g,
    dots,
    start: now,
    duration: random(1450, 4200),
    pause,
    pauseAt: random(0.73, 0.86),
    brightness: random(0.55, 0.8)
  });
  t.last = now;
  return true;
}

function respond(t, now) {
  const el = svg("circle", {
    cx: t.x,
    cy: t.y,
    r: t.r,
    fill: "none",
    stroke: "#c8f5e3",
    "stroke-width": random(0.7, 1.2),
    opacity: 0
  }, signals);
  responses.push({
    el,
    track: t,
    start: now,
    duration: random(1400, 3000),
    radius: random(3, 8),
    strength: random(0.085, 0.19),
    fade: random(1.3, 2.4)
  });
}

function choose(now) {
  const eligible = tracks.filter(t => now - t.last > 6500 && !packets.some(p => p.track === t));
  let n = Math.random() * eligible.reduce((s, t) => s + t.weight, 0);
  return eligible.find(t => (n -= t.weight) <= 0);
}

function progress(p, now) {
  const elapsed = now - p.start;
  const stop = p.duration * p.pauseAt;
  const travel = elapsed <= stop ? elapsed : elapsed <= stop + p.pause ? stop : elapsed - p.pause;
  return Math.min(1, travel / p.duration);
}

function frame(now) {
  raf = 0;
  const dt = Math.min(64, now - lastFrame);
  lastFrame = now;
  const target = coreHover || coreFocus || now < touchUntil ? 1 : 0;
  activity += (target - activity) * (1 - Math.exp(-dt / (target ? 3200 : 5500)));
  if (scene) scene.style.setProperty("--activity", activity.toFixed(3));

  if (pendingReturn && now > pendingReturn.expires) pendingReturn = null;
  if (pendingReturn && now >= pendingReturn.at && launch(pendingReturn.track, true, now)) {
    pendingReturn = null;
    nextSignal = Math.max(nextSignal, now + 1000);
  }

  if (now >= nextSignal) {
    const limit = activity > 0.55 ? 3 : 2;
    if (packets.length < limit) {
      const t = choose(now);
      if (t) launch(t, Math.random() < 0.16, now);
    }
    nextSignal = now + random(2400, 4400) * (1 - 0.55 * activity);
  }

  packets = packets.filter(p => {
    const f = progress(p, now);
    if (f >= 1) {
      p.g.remove();
      if (!p.reverse) respond(p.track, now);
      return false;
    }
    const v = p.reverse ? 1 - f : f;
    const envelope = Math.min(1, f / 0.14, (1 - f) / 0.12);
    p.g.setAttribute("opacity", Math.max(0, envelope) * p.brightness);
    p.dots.forEach((dot, i) => {
      const sample = v + (p.reverse ? 1 : -1) * i * 2 / p.track.length;
      const xy = point(p.track, sample);
      dot.setAttribute("cx", xy.x);
      dot.setAttribute("cy", xy.y);
    });
    return true;
  });

  responses = responses.filter(p => {
    const f = (now - p.start) / p.duration;
    if (f >= 1) {
      p.el.remove();
      return false;
    }
    const rise = Math.min(1, f / 0.24);
    const envelope = Math.sin(rise * Math.PI / 2) * Math.pow(1 - f, p.fade);
    p.el.setAttribute("r", p.track.r + p.radius * (1 - Math.pow(1 - f, 2)));
    p.el.setAttribute("opacity", envelope * p.strength);
    return true;
  });

  raf = requestAnimationFrame(frame);
}

function start() {
  if (!document.hidden && !reduced.matches && !raf) {
    lastFrame = performance.now();
    nextSignal = lastFrame + random(900, 1900);
    raf = requestAnimationFrame(frame);
  }
}

function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
  packets.forEach(p => p.g.remove());
  responses.forEach(p => p.el.remove());
  packets = [];
  responses = [];
  pendingReturn = null;
  activity = 0;
  if (scene) scene.style.setProperty("--activity", "0");
}

function returnHome() {
  touchUntil = performance.now() + 5000;
  window.scrollTo({ top: 0, behavior: reduced.matches ? "auto" : "smooth" });
}

if (core) {
  core.addEventListener("pointerenter", () => {
    coreHover = true;
  });
  core.addEventListener("pointerleave", () => {
    coreHover = false;
  });
  core.addEventListener("focus", () => {
    coreFocus = true;
  });
  core.addEventListener("blur", () => {
    coreFocus = false;
  });
  core.addEventListener("click", () => {
    returnHome();
  });
  core.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      returnHome();
    }
  });
}

document.addEventListener("pointerleave", () => { coreHover = false; });

reduced.addEventListener("change", () => {
  stop();
  start();
});

document.addEventListener("visibilitychange", () => {
  stop();
  start();
});

start();

function updateSynapticLanguage() {
  const activeLayout = LAYOUTS[getActiveMode()];
  document.querySelectorAll(".node-label-text[data-node-id]").forEach(el => {
    const id = el.getAttribute("data-node-id");
    const spec = activeLayout.specs.find(s => s.id === id);
    if (spec) {
      el.textContent = getNodeTranslation(id, spec.name);
    }
  });
  document.querySelectorAll(".hit[data-target]").forEach(el => {
    const id = el.getAttribute("data-target");
    const spec = activeLayout.specs.find(s => s.id === id);
    if (spec) {
      el.setAttribute("aria-label", getNodeAriaLabel(id, spec.name));
    }
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("languageChanged", () => {
    updateSynapticLanguage();
  });
  updateSynapticLanguage();
}
