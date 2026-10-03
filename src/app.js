'use strict';

const NS = "http://www.w3.org/2000/svg";
const scene = document.querySelector("#scene");
const paths = document.querySelector("#paths");
const signals = document.querySelector("#signals");
const nodes = document.querySelector("#nodes");
const core = document.querySelector("#core");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

// Canonical node mapping for Jeterson Ferrari Portfolio
// Positions, radii, and SVG paths remain 100% identical to the authoritative baseline
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

const specs = [
  { id: "profile", name: "Profile", url: "/profile", x: 836, y: 111, r: 65, d: "M836 345 L836 181", lx: 836, ly: 34, anchor: "middle" },
  { id: "tech-stack", name: "Tech Stack", url: "/profile#tools", x: 1077, y: 191, r: 65, d: "M915 352 C941 333 915 284 936 250 C951 226 979 214 1006 209", lx: 1148, ly: 142, anchor: "start" },
  { id: "languages", name: "Languages", url: "/profile#languages", x: 1186, y: 371, r: 65, d: "M943 437 L993 437 C1046 437 1040 371 1091 372 L1117 372", lx: 1262, ly: 376, anchor: "start" },
  { id: "ai-workflow", name: "AI Workflow", url: "/process#ai-workflow", x: 1178, y: 560, r: 64, d: "M941 493 L986 493 C1040 493 1041 560 1088 560 L1109 560", lx: 1254, ly: 565, anchor: "start" },
  { id: "contact", name: "Contact", url: "/contact", x: 1052, y: 725, r: 63, d: "M932 531 C981 531 951 581 969 613 C980 635 1001 653 1014 666", lx: 1118, ly: 805, anchor: "start" },
  { id: "architecture", name: "Architecture", url: "/process#architecture", x: 836, y: 789, r: 65, d: "M836 560 L836 718", lx: 836, ly: 875, anchor: "middle" },
  { id: "problem-solving", name: "Problem Solving", url: "/process#problem-solving", x: 620, y: 725, r: 64, d: "M740 531 C693 531 720 578 704 610 C695 629 672 650 658 666", lx: 550, ly: 805, anchor: "end" },
  { id: "pulsar", name: "Pulsar", url: "/projects/pulsar", x: 495, y: 560, r: 64, d: "M731 493 L692 493 C637 493 638 560 589 560 L563 560", lx: 420, ly: 565, anchor: "end" },
  { id: "process", name: "Process", url: "/process", x: 487, y: 371, r: 65, d: "M729 437 L685 437 C630 437 635 372 578 372 L556 372", lx: 412, ly: 376, anchor: "end" },
  { id: "restaurantzero", name: "RestaurantZero", url: "/projects/restaurantzero", x: 595, y: 190, r: 65, d: "M757 352 C731 337 755 287 739 254 C724 225 692 213 666 209", lx: 525, ly: 142, anchor: "end" }
];

function svg(tag, attrs, parent) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

const random = (a, b) => a + Math.random() * (b - a);

const tracks = specs.map((spec, i) => {
  const { id, name, url, x, y, r, d, lx, ly, anchor } = spec;
  const path = svg("path", { d, class: "path", id: `path-${id}` }, paths);
  const group = svg("g", { class: "node", id: `node-${id}` }, nodes);

  svg("circle", { cx: x, cy: y, r: r + 5, class: "halo" }, group);
  svg("circle", { cx: x, cy: y, r: r + 2, class: "node-ring" }, group);
  svg("circle", { cx: x, cy: y, r: r + 1, class: "ambient-ring", style: `--period:${17 + i * 1.73}s;--phase:-${i * 3.19}s` }, group);

  // Discovery label: positioned outside the circular artwork icon to prevent obstruction
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
  // Cache geometry once: no SVG path measurement in the animation loop
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
  scene.style.setProperty("--activity", activity.toFixed(3));

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
  scene.style.setProperty("--activity", "0");
}

function returnHome() {
  touchUntil = performance.now() + 5000;
  window.scrollTo({ top: 0, behavior: reduced.matches ? "auto" : "smooth" });
}

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

window.addEventListener("pointermove", e => {
  if (reduced.matches || e.pointerType === "touch") return;
  scene.style.setProperty("--x", `${(e.clientX / innerWidth - 0.5) * 3}px`);
  scene.style.setProperty("--y", `${(e.clientY / innerHeight - 0.5) * 2}px`);
});

document.addEventListener("pointerleave", () => {
  coreHover = false;
  scene.style.setProperty("--x", "0px");
  scene.style.setProperty("--y", "0px");
});

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
  document.querySelectorAll(".node-label-text[data-node-id]").forEach(el => {
    const id = el.getAttribute("data-node-id");
    const spec = specs.find(s => s.id === id);
    if (spec) {
      el.textContent = getNodeTranslation(id, spec.name);
    }
  });
  document.querySelectorAll(".hit[data-target]").forEach(el => {
    const id = el.getAttribute("data-target");
    const spec = specs.find(s => s.id === id);
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
