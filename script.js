const state = {
  effectsEnabled: true,
  dpr: Math.max(1, Math.min(2, window.devicePixelRatio || 1)),
};

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pad2(n) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}
function svgDataUri(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const SITE = {
  targetDateIso: "2026-05-31T00:00:00",
  timerFallbackSeconds: 12,
  couponCode: "forever",
  balloons: [
    {
      title: "A tiny promise",
      text: "I’ll always choose you — today and every day.",
      img: svgDataUri(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
          <defs>
            <linearGradient id='g' x1='0' x2='1'>
              <stop offset='0' stop-color='#ff5ac8' stop-opacity='.95'/>
              <stop offset='1' stop-color='#5ad2ff' stop-opacity='.95'/>
            </linearGradient>
          </defs>
          <rect width='800' height='500' fill='url(#g)'/>
          <g fill='rgba(255,255,255,.90)'>
            <path d='M400 350c-80-60-150-110-150-190 0-50 40-90 90-90 30 0 55 13 70 35 15-22 40-35 70-35 50 0 90 40 90 90 0 80-70 130-150 190z'/>
          </g>
        </svg>`
      ),
    },
    {
      title: "My favorite place",
      text: "Anywhere with you feels like home.",
      img: svgDataUri(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
          <rect width='800' height='500' fill='#10172f'/>
          <g fill='rgba(255,255,255,.9)'>
            <circle cx='150' cy='120' r='3'/><circle cx='210' cy='160' r='2'/><circle cx='250' cy='90' r='2'/>
            <circle cx='650' cy='120' r='3'/><circle cx='580' cy='200' r='2'/><circle cx='520' cy='110' r='2'/>
          </g>
          <path d='M0 380c120-80 220-80 340 0s220 80 460-20v140H0z' fill='rgba(90,210,255,.22)'/>
          <path d='M0 420c140-70 240-70 360 0s220 70 440-10v110H0z' fill='rgba(255,90,200,.20)'/>
          <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='34' fill='rgba(255,255,255,.92)'>You + Me</text>
        </svg>`
      ),
    },
    {
      title: "Your smile",
      text: "The kind of smile that fixes my whole day.",
      img: svgDataUri(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
          <defs>
            <radialGradient id='r' cx='30%' cy='20%' r='80%'>
              <stop offset='0' stop-color='#ffd66a' stop-opacity='.95'/>
              <stop offset='1' stop-color='#ff5ac8' stop-opacity='.85'/>
            </radialGradient>
          </defs>
          <rect width='800' height='500' fill='url(#r)'/>
          <g fill='rgba(255,255,255,.92)'>
            <circle cx='320' cy='220' r='22'/><circle cx='480' cy='220' r='22'/>
            <path d='M300 320c30 40 70 60 100 60s70-20 100-60' fill='none' stroke='rgba(255,255,255,.92)' stroke-width='18' stroke-linecap='round'/>
          </g>
        </svg>`
      ),
    },
    {
      title: "A wish",
      text: "May your year be soft, bright, and full of love.",
      img: svgDataUri(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
          <rect width='800' height='500' fill='#0b1226'/>
          <g fill='rgba(255,255,255,.9)'>
            <path d='M400 110l20 60h64l-52 38 20 60-52-38-52 38 20-60-52-38h64z'/>
          </g>
          <g fill='rgba(90,210,255,.25)'>
            <circle cx='140' cy='360' r='90'/><circle cx='620' cy='330' r='120'/>
          </g>
          <text x='50%' y='78%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='30' fill='rgba(255,255,255,.90)'>Make a wish ✨</text>
        </svg>`
      ),
    },
    {
      title: "The real gift",
      text: "It’s us. Always.",
      img: svgDataUri(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
          <defs>
            <linearGradient id='p' x1='0' x2='1' y1='0' y2='1'>
              <stop offset='0' stop-color='#5ad2ff' stop-opacity='.90'/>
              <stop offset='1' stop-color='#aaff78' stop-opacity='.90'/>
            </linearGradient>
          </defs>
          <rect width='800' height='500' fill='url(#p)'/>
          <g fill='rgba(0,0,0,.18)'>
            <circle cx='300' cy='250' r='90'/><circle cx='500' cy='250' r='90'/>
          </g>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='36' fill='rgba(0,0,0,.72)'>Forever</text>
        </svg>`
      ),
    },
  ],
  galleryPhotos: Array.from({ length: 9 }).map((_, i) =>
    svgDataUri(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='hsl(${(i * 42) % 360} 90% 70%)' stop-opacity='.95'/>
            <stop offset='1' stop-color='hsl(${(i * 42 + 120) % 360} 90% 60%)' stop-opacity='.95'/>
          </linearGradient>
        </defs>
        <rect width='800' height='800' fill='url(#g)'/>
        <circle cx='640' cy='160' r='90' fill='rgba(255,255,255,.18)'/>
        <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='42' fill='rgba(0,0,0,.55)'>Photo ${i + 1}</text>
      </svg>`
    )
  ),
  letterText:
    "Dear my love,\n\n" +
    "Happy birthday. I hope today feels warm, peaceful, and full of tiny joys.\n" +
    "Thank you for being you — for your patience, your laughter, and your heart.\n\n" +
    "I’m excited for everything we still haven’t lived yet.\n\n" +
    "Always yours,\n" +
    "— Your future husband",
  coupons: [
    { title: "Long Drive + Music Night", sub: "Good for one big smile!" },
    { title: "Unlimited Hugs & Kisses Coupon", sub: "Good for one big smile!" },
    { title: "Midnight Maggi Date", sub: "Good for one big smile!" },
  ],
  bouquet: {
    bubbles: [
      { text: "From here, with love.", top: "16px", left: "16px" },
      { text: "You make everything feel lighter.", top: "76px", right: "16px" },
      { text: "My favorite person. Always.", bottom: "88px", left: "16px" },
      { text: "Happy birthday, my love.", bottom: "22px", right: "16px" },
    ],
    artSvg: `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' preserveAspectRatio='xMidYMid meet'>
        <defs>
          <radialGradient id='bg' cx='30%' cy='20%' r='80%'>
            <stop offset='0' stop-color='#ff5ac8' stop-opacity='.20'/>
            <stop offset='1' stop-color='#5ad2ff' stop-opacity='.10'/>
          </radialGradient>
        </defs>
        <rect width='800' height='500' fill='url(#bg)'/>
        <g transform='translate(400 275)'>
          <g>
            <circle cx='-160' cy='-90' r='64' fill='rgba(255,90,200,.55)'/>
            <circle cx='-90' cy='-140' r='58' fill='rgba(255,214,106,.55)'/>
            <circle cx='-30' cy='-100' r='64' fill='rgba(90,210,255,.55)'/>
            <circle cx='40' cy='-160' r='58' fill='rgba(170,255,120,.50)'/>
            <circle cx='120' cy='-120' r='64' fill='rgba(255,90,200,.42)'/>
            <circle cx='170' cy='-60' r='58' fill='rgba(255,214,106,.42)'/>
          </g>
          <path d='M-220 30c80 50 150 70 220 70s140-20 220-70c-90 170-150 260-220 260S-130 200-220 30z' fill='rgba(0,0,0,.18)'/>
          <path d='M-210 40c70 40 140 60 210 60s140-20 210-60c-80 150-130 230-210 230S-130 190-210 40z' fill='rgba(255,255,255,.08)'/>
          <g stroke='rgba(170,255,120,.60)' stroke-width='10' stroke-linecap='round'>
            <path d='M-110 70c20 70 40 120 70 170'/>
            <path d='M0 70c0 90 0 140 0 200'/>
            <path d='M110 70c-20 70-40 120-70 170'/>
          </g>
        </g>
      </svg>
    `,
  },
};

// ---------- Canvas FX (confetti + fireworks) ----------
const canvas = $("#fx");
const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;
let particles = [];
let rafId = null;
let lastTs = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const { innerWidth: w, innerHeight: h } = window;
  canvas.width = Math.floor(w * state.dpr);
  canvas.height = Math.floor(h * state.dpr);
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function startLoop() {
  if (!state.effectsEnabled) return;
  if (!ctx || rafId != null) return;
  lastTs = performance.now();
  rafId = requestAnimationFrame(tick);
}

function addConfettiBurst(x, y, strength = 120) {
  if (!ctx) return;
  const colors = ["#ff5ac8", "#5ad2ff", "#aaff78", "#ffd66a", "#ffffff"];
  const count = Math.floor(strength);
  for (let i = 0; i < count; i++) {
    particles.push({
      kind: "confetti",
      x,
      y,
      vx: rand(-3.8, 3.8),
      vy: rand(-6.5, -2.5),
      g: rand(0.11, 0.18),
      r: rand(2.0, 4.5),
      a: 1,
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.15, 0.15),
      color: pick(colors),
      life: rand(48, 86),
    });
  }
  startLoop();
}

function addFirework(x, y) {
  if (!ctx) return;
  const colors = ["#ff5ac8", "#5ad2ff", "#aaff78", "#ffd66a"];
  const base = pick(colors);
  const spikes = Math.floor(rand(36, 56));
  for (let i = 0; i < spikes; i++) {
    const a = (i / spikes) * Math.PI * 2;
    const sp = rand(2.0, 5.6);
    particles.push({
      kind: "spark",
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      g: rand(0.03, 0.06),
      r: rand(1.0, 2.2),
      a: 1,
      color: base,
      life: rand(42, 68),
    });
  }
  startLoop();
}

function tick(ts) {
  if (!ctx || !canvas) return;
  const dt = Math.min(34, ts - lastTs);
  lastTs = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const next = [];
  for (const p of particles) {
    p.x += p.vx * (dt / 16.67);
    p.y += p.vy * (dt / 16.67);
    p.vy += p.g * (dt / 16.67);
    p.life -= dt / 16.67;

    if (p.kind === "confetti") {
      p.rot += p.vr * (dt / 16.67);
      p.a = Math.max(0, Math.min(1, p.life / 40));

      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r * 0.7, p.r * 2, p.r * 1.4);
      ctx.restore();
    } else {
      p.a = Math.max(0, Math.min(1, p.life / 30));
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    const inBounds = p.x > -40 && p.x < window.innerWidth + 40 && p.y < window.innerHeight + 80;
    if (p.life > 0 && inBounds) next.push(p);
  }

  ctx.globalAlpha = 1;
  particles = next;

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
}

function clearFx() {
  if (!ctx || !canvas) return;
  particles = [];
  if (rafId != null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEffectsToggle() {
  const toggleEffectsBtn = $("#toggleEffectsBtn");
  if (!toggleEffectsBtn) return;
  toggleEffectsBtn.addEventListener("click", () => {
    state.effectsEnabled = !state.effectsEnabled;
    toggleEffectsBtn.setAttribute("aria-pressed", String(state.effectsEnabled));
    toggleEffectsBtn.textContent = state.effectsEnabled ? "Effects: On" : "Effects: Off";
    if (!state.effectsEnabled) clearFx();
  });
}

// ---------- Home (timer + prompt) ----------
function resolveTargetTimeMs() {
  if (SITE.targetDateIso) {
    const t = Date.parse(SITE.targetDateIso);
    if (Number.isFinite(t)) return t;
  }
  const key = "birthdaySiteStartTs";
  const existing = Number(sessionStorage.getItem(key) || "0");
  const base = existing || Date.now();
  if (!existing) sessionStorage.setItem(key, String(base));
  return base + SITE.timerFallbackSeconds * 1000;
}

function setPromptVisible(visible) {
  const countdownCard = $("#countdownCard");
  const promptCard = $("#promptCard");
  if (!countdownCard || !promptCard) return;
  countdownCard.classList.toggle("hidden", visible);
  promptCard.classList.toggle("hidden", !visible);
}

function initHome() {
  const tDays = $("#tDays");
  const tHours = $("#tHours");
  const tMins = $("#tMins");
  const tSecs = $("#tSecs");
  const yesBtn = $("#yesBtn");
  const noBtn = $("#noBtn");
  const noMsg = $("#noMsg");
  const noThanksOverlay = $("#noThanksOverlay");
  if (!tDays || !tHours || !tMins || !tSecs) return;

  const target = resolveTargetTimeMs();

  function render(msLeft) {
    const s = Math.max(0, Math.floor(msLeft / 1000));
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = Math.floor(s % 60);

    tDays.textContent = pad2(days);
    tHours.textContent = pad2(hours);
    tMins.textContent = pad2(mins);
    tSecs.textContent = pad2(secs);
  }

  function tickTimer() {
    const left = target - Date.now();
    render(left);
    if (left <= 0) {
      setPromptVisible(true);
      const r = $("#promptCard")?.getBoundingClientRect();
      if (r) addConfettiBurst(r.left + r.width / 2, r.top + 30, 150);
      return;
    }
    setPromptVisible(false);
    requestAnimationFrame(tickTimer);
  }

  tickTimer();

  yesBtn?.addEventListener("click", () => {
    const r = yesBtn.getBoundingClientRect();
    addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 160);
    setTimeout(() => (window.location.href = "balloons.html"), 220);
  });

  let noGifTimer = null;
  let noGifHideTimer = null;

  function showNoThanksGif() {
    if (!noThanksOverlay) return;
    if (noGifTimer) {
      clearTimeout(noGifTimer);
      noGifTimer = null;
    }
    if (noGifHideTimer) {
      clearTimeout(noGifHideTimer);
      noGifHideTimer = null;
    }

    noThanksOverlay.classList.remove("hidden");
    // Ensure transition triggers.
    requestAnimationFrame(() => noThanksOverlay.classList.add("show"));

    noGifTimer = setTimeout(() => {
      noThanksOverlay.classList.remove("show");
      noGifHideTimer = setTimeout(() => {
        noThanksOverlay.classList.add("hidden");
      }, 220);
    }, 5000);
  }

  noBtn?.addEventListener("click", () => {
    if (noMsg) noMsg.textContent = "Okay… but I’ll be right here when you’re ready 💛";
    showNoThanksGif();
  });
}

// ---------- Balloons ----------
function initBalloons() {
  const sky = $("#balloonSky");
  const nextBtn = $("#nextBtn");
  const modal = $("#revealModal");
  const closeReveal = $("#closeReveal");
  const revealMedia = $("#revealMedia");
  const revealTitle = $("#revealTitle");
  const revealText = $("#revealText");
  if (!sky || !nextBtn || !modal || !closeReveal || !revealMedia || !revealTitle || !revealText) return;

  let popped = 0;
  let open = false;

  function showReveal(item) {
    open = true;
    revealTitle.textContent = item.title;
    revealText.textContent = item.text;
    revealMedia.innerHTML = "";
    const img = document.createElement("img");
    img.alt = item.title;
    img.src = item.img;
    revealMedia.appendChild(img);
    modal.classList.remove("hidden");
  }

  function close() {
    open = false;
    modal.classList.add("hidden");
  }

  closeReveal.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  function enableNextIfDone() {
    if (popped < SITE.balloons.length) return;
    nextBtn.disabled = false;
    nextBtn.classList.add("primary");
    const r = nextBtn.getBoundingClientRect();
    addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 180);
    for (let i = 0; i < 4; i++) {
      setTimeout(() => addFirework(r.left + r.width * rand(0.25, 0.75), r.top - 40), i * 180);
    }
  }

  nextBtn.addEventListener("click", () => {
    if (nextBtn.disabled) return;
    window.location.href = "hub.html";
  });

  function spawnBalloon(index) {
    const item = SITE.balloons[index];
    const b = document.createElement("div");
    b.className = "popBalloon";
    b.type = "button";
    const x = rand(14, 86);
    const h = rand(0, 360);
    const top = rand(12, 30);
    b.style.setProperty("--x", x + "%");
    b.style.setProperty("--h", String(h));
    b.style.setProperty("--top", top + "%");
    b.setAttribute("role", "button");
    b.setAttribute("tabindex", "0");
    b.setAttribute("aria-label", "Balloon");

    function pop() {
      if (open) return;
      b.classList.add("popped");
      popped++;
      const r = b.getBoundingClientRect();
      addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 110);
      showReveal(item);
      setTimeout(() => b.remove(), 240);
      enableNextIfDone();
    }

    b.addEventListener("click", pop);
    b.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pop();
      }
    });

    sky.appendChild(b);
  }

  SITE.balloons.forEach((_, i) => {
    setTimeout(() => spawnBalloon(i), i * 900);
  });
}

// ---------- Hub icons ----------
function iconSvg(kind) {
  const base = (inner) =>
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0' stop-color='#ff5ac8' stop-opacity='.9'/>
          <stop offset='1' stop-color='#5ad2ff' stop-opacity='.9'/>
        </linearGradient>
      </defs>
      <rect x='6' y='6' width='84' height='84' rx='20' fill='rgba(255,255,255,.08)' stroke='rgba(255,255,255,.18)'/>
      ${inner}
    </svg>`;

  if (kind === "camera") {
    return base(
      `<rect x='22' y='34' width='52' height='34' rx='10' fill='url(#g)'/>
       <circle cx='48' cy='51' r='11' fill='rgba(0,0,0,.25)'/>
       <circle cx='48' cy='51' r='6' fill='rgba(255,255,255,.55)'/>
       <rect x='30' y='28' width='14' height='10' rx='4' fill='rgba(255,255,255,.20)'/>`
    );
  }
  if (kind === "letter") {
    return base(
      `<path d='M22 34h52v34H22z' fill='url(#g)'/>
       <path d='M22 34l26 20 26-20' fill='none' stroke='rgba(0,0,0,.25)' stroke-width='6' stroke-linejoin='round'/>`
    );
  }
  if (kind === "coupon") {
    return base(
      `<path d='M30 26h36a6 6 0 0 1 6 6v6a8 8 0 0 0 0 16v6a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6v-6a8 8 0 0 0 0-16v-6a6 6 0 0 1 6-6z' fill='url(#g)'/>
       <path d='M48 30v36' stroke='rgba(0,0,0,.22)' stroke-width='4' stroke-dasharray='4 4'/>`
    );
  }
  if (kind === "bouquet") {
    return base(
      `<rect x='26' y='48' width='44' height='24' rx='10' fill='url(#g)'/>
       <rect x='24' y='40' width='48' height='14' rx='10' fill='rgba(255,255,255,.16)'/>
       <path d='M30 44c4 6 10 6 14 0 4 6 10 6 14 0 4 6 10 6 14 0' fill='none' stroke='rgba(255,255,255,.28)' stroke-width='4' stroke-linecap='round'/>
       <rect x='34' y='30' width='4' height='12' rx='2' fill='rgba(255,255,255,.30)'/>
       <rect x='46' y='28' width='4' height='14' rx='2' fill='rgba(255,255,255,.30)'/>
       <rect x='58' y='30' width='4' height='12' rx='2' fill='rgba(255,255,255,.30)'/>
       <path d='M36 28c2-4 6-4 6 0-2 2-4 4-6 0z' fill='rgba(255,214,106,.92)'/>
       <path d='M48 26c2-4 6-4 6 0-2 2-4 4-6 0z' fill='rgba(255,214,106,.92)'/>
       <path d='M60 28c2-4 6-4 6 0-2 2-4 4-6 0z' fill='rgba(255,214,106,.92)'/>`
    );
  }
  return base("<circle cx='48' cy='48' r='18' fill='url(#g)'/>");
}

function initHubIcons() {
  $all("img[data-icon]").forEach((img) => {
    const kind = img.getAttribute("data-icon") || "";
    img.src = svgDataUri(iconSvg(kind));
  });
}

// ---------- Gallery ----------
function initGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";
  SITE.galleryPhotos.forEach((src, i) => {
    const tile = document.createElement("div");
    tile.className = "photoTile";
    tile.style.animationDelay = `${i * 60}ms`;
    const img = document.createElement("img");
    img.alt = `Photo ${i + 1}`;
    img.src = src;
    tile.appendChild(img);
    grid.appendChild(tile);
  });
}

// ---------- Letter ----------
function initLetter() {
  const out = $("#loveLetter");
  if (!out) return;
  out.textContent = SITE.letterText;
  const r = out.getBoundingClientRect();
  addConfettiBurst(r.left + r.width / 2, r.top + 20, 90);
}

// ---------- Unlock + Coupons ----------
function normalizeSecret(s) {
  return (s || "").trim().toLowerCase();
}

function initUnlock() {
  const input = $("#couponInput");
  const btn = $("#unlockBtn");
  const msg = $("#unlockMsg");
  if (!input || !btn || !msg) return;

  function attempt() {
    const ok = normalizeSecret(input.value) === normalizeSecret(SITE.couponCode);
    if (!ok) {
      msg.textContent = "Not quite… try again.";
      const r = btn.getBoundingClientRect();
      addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 45);
      return;
    }
    sessionStorage.setItem("couponUnlocked", "1");
    msg.textContent = "Unlocked ✨";
    const r = btn.getBoundingClientRect();
    addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 140);
    setTimeout(() => (window.location.href = "coupons.html"), 260);
  }

  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") attempt();
  });
}

function initCoupons() {
  if (sessionStorage.getItem("couponUnlocked") !== "1") {
    window.location.replace("unlock.html");
    return;
  }
  const list = $("#couponList");
  if (!list) return;

  const addBtn = $("#addCouponBtn");
  const modal = $("#couponModal");
  const closeModalBtn = $("#closeCouponModal");
  const submitBtn = $("#submitCouponBtn");
  const titleInput = $("#newCouponTitle");
  const subInput = $("#newCouponSub");
  const modalMsg = $("#couponModalMsg");

  const API_BASE = "/api/coupons";

  function setModalOpen(open) {
    if (!modal) return;
    modal.classList.toggle("hidden", !open);
    if (open) {
      requestAnimationFrame(() => titleInput?.focus());
    }
  }

  addBtn?.addEventListener("click", () => {
    if (modalMsg) modalMsg.textContent = "";
    if (titleInput) titleInput.value = "";
    if (subInput) subInput.value = "";
    setModalOpen(true);
  });

  closeModalBtn?.addEventListener("click", () => setModalOpen(false));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) setModalOpen(false);
  });

  function iconSvgTrash() {
    return `<svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M9 3h6l1 2h4v2H4V5h4l1-2zm1 7h2v9h-2v-9zm4 0h2v9h-2v-9zM7 10h2v9H7v-9z'/>
    </svg>`;
  }
  function iconSvgX() {
    return `<svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4z'/>
    </svg>`;
  }

  let coupons = [];

  const STORAGE_KEY = "birthday_coupons";
  const REMOTE_URL = "https://jsonhosting.com/api/json/6f568f49";
  const EDIT_KEY = "ebe83042b758626aa225589d36d9831c25dee84ee85310ec218319c249ece9ea";

  async function syncToRemote(list) {
    try {
      await fetch(REMOTE_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Edit-Key": EDIT_KEY
        },
        body: JSON.stringify(list)
      });
    } catch {
      // ignore network errors
    }
  }

  async function apiGet() {
    try {
      const res = await fetch(REMOTE_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // ignore
    }
    let saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const defaultCoupons = [
      { id: "c1", title: "Long Drive + Music Night", sub: "Good for one big smile!", redeemed: false },
      { id: "c2", title: "Unlimited Hugs & Kisses Coupon", sub: "Good for one big smile!", redeemed: false },
      { id: "c3", title: "Midnight Maggi Date", sub: "Good for one big smile!", redeemed: false }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCoupons));
    return defaultCoupons;
  }

  async function apiAdd(title, sub) {
    const list = await apiGet();
    const item = {
      id: "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8),
      title,
      sub: sub || "Good for one big smile!",
      redeemed: false
    };
    list.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    await syncToRemote(list);
    return item;
  }

  async function apiPatch(id, redeemed) {
    const list = await apiGet();
    const item = list.find(c => c.id === id);
    if (item) {
      item.redeemed = redeemed;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      await syncToRemote(list);
      return item;
    }
    throw new Error("not_found");
  }

  async function apiDelete(id) {
    const list = await apiGet();
    const filtered = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    await syncToRemote(filtered);
  }

  function render() {
    list.innerHTML = "";

    coupons.forEach((c) => {
      const card = document.createElement("div");
      card.className = "ticket";
      card.dataset.redeemed = c.redeemed ? "1" : "0";

      const glyph = document.createElement("div");
      glyph.className = "ticketGlyph";
      glyph.setAttribute("aria-hidden", "true");

      const textWrap = document.createElement("div");
      textWrap.className = "ticketText";

      const t = document.createElement("div");
      t.className = "ticketTitle";
      t.textContent = c.title;

      const s = document.createElement("p");
      s.className = "ticketSub";
      s.textContent = c.sub || "";

      textWrap.appendChild(t);
      textWrap.appendChild(s);

      const actions = document.createElement("div");
      actions.className = "ticketActions";

      const redeemBtn = document.createElement("button");
      redeemBtn.type = "button";
      redeemBtn.className = "redeemBtn";
      redeemBtn.textContent = c.redeemed ? "Redeemed" : "Redeem";
      redeemBtn.disabled = !!c.redeemed;

      const unredeemBtn = document.createElement("button");
      unredeemBtn.type = "button";
      unredeemBtn.className = "iconBtn unredeemBtn";
      unredeemBtn.setAttribute("aria-label", "Unredeem");
      unredeemBtn.innerHTML = iconSvgX();

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "iconBtn danger";
      delBtn.setAttribute("aria-label", "Delete coupon");
      delBtn.innerHTML = iconSvgTrash();

      const stamp = document.createElement("div");
      stamp.className = "redeemedStamp";
      stamp.setAttribute("aria-hidden", "true");
      stamp.textContent = "Redeemed";

      const redeemLocal = async (on) => {
        await apiPatch(c.id, on);
        await refresh();

        if (on) {
          const r = card.getBoundingClientRect();
          addConfettiBurst(r.left + r.width / 2, r.top + Math.min(40, r.height / 2), 80);
        }
      };

      redeemBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (c.redeemed) return;
        try {
          await redeemLocal(true);
        } catch {
          // ignore
        }
      });

      unredeemBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!c.redeemed) return;
        try {
          await redeemLocal(false);
        } catch {
          // ignore
        }
      });

      delBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await apiDelete(c.id);
          await refresh();
        } catch {
          // ignore
        }
      });

      // Tap-to-redeem like the reference
      card.addEventListener("click", async (e) => {
        if (e.target && e.target.closest && e.target.closest("button")) return;
        if (c.redeemed) return;
        try {
          await redeemLocal(true);
        } catch {
          // ignore
        }
      });

      actions.appendChild(redeemBtn);
      actions.appendChild(unredeemBtn);
      actions.appendChild(delBtn);

      card.appendChild(glyph);
      card.appendChild(textWrap);
      card.appendChild(actions);
      card.appendChild(stamp);
      list.appendChild(card);
    });
  }

  async function refresh() {
    coupons = await apiGet();
    render();
  }

  async function submitNewCoupon() {
    if (!titleInput || !modalMsg) return;
    const title = String(titleInput.value || "").trim();
    const sub = String(subInput?.value || "").trim();
    if (!title) {
      modalMsg.textContent = "Please enter a title.";
      return;
    }
    modalMsg.textContent = "Saving…";
    try {
      await apiAdd(title, sub);
      modalMsg.textContent = "Added ✨";
      setModalOpen(false);
      await refresh();
    } catch {
      modalMsg.textContent = "Error saving coupon.";
    }
  }

  submitBtn?.addEventListener("click", submitNewCoupon);
  titleInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitNewCoupon();
  });
  subInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitNewCoupon();
  });

  refresh().catch(() => {
    list.innerHTML =
      "<div class='card' style='text-align:center'>Could not load coupons.</div>";
  });
}

// ---------- Cake ----------
function initCake() {
  const candlesWrap = $("#candlesWrap");
  const candlesStatus = $("#candlesStatus");
  const cakeWrap = $("#cakeWrap");
  if (!candlesWrap || !candlesStatus || !cakeWrap) return;

  let fireworksOnce = false;

  function update() {
    const candles = $all(".candle", candlesWrap);
    const out = candles.filter((c) => c.classList.contains("out")).length;
    candlesStatus.textContent = `${out}/${candles.length} candles out`;

    if (out === candles.length && !fireworksOnce) {
      fireworksOnce = true;
      const r = cakeWrap.getBoundingClientRect();
      addConfettiBurst(r.left + r.width / 2, r.top + 30, 190);
      for (let i = 0; i < 7; i++) {
        setTimeout(
          () => addFirework(r.left + r.width * rand(0.18, 0.82), r.top + r.height * rand(0.12, 0.55)),
          i * 180
        );
      }
    }
  }

  candlesWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".candle");
    if (!btn) return;
    if (btn.classList.contains("out")) return; // only turn off
    btn.classList.add("out");
    const r = btn.getBoundingClientRect();
    addConfettiBurst(r.left + r.width / 2, r.top + r.height / 2, 45);
    update();
  });

  update();
}

// ---------- Boot ----------
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

initEffectsToggle();
initHubIcons();

const page = document.body?.getAttribute("data-page") || "";
if (page === "home") initHome();
if (page === "balloons") initBalloons();
if (page === "gallery") initGallery();
if (page === "letter") initLetter();
if (page === "unlock") initUnlock();
if (page === "coupons") initCoupons();
if (page === "cake") initCake();
