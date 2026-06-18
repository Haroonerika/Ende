/* ============ AutoFlow · Logic ============ */

/* ---------- Car data (sample listings) ---------- */
const CARS = [
  { id: 1,  brand: "Volkswagen", model: "Golf 2.0 TDI Style",      year: 2021, price: 24990, km: 38500,  fuel: "Diesel",   gear: "Automatik", body: "Kompakt", power: 150, color: "#4f7cff", rating: 4.8, deal: false, desc: "Sparsamer und zuverlässiger Allrounder mit kompletter Ausstattung, digitalem Cockpit und adaptivem Tempomat." },
  { id: 2,  brand: "BMW",        model: "320d Touring M Sport",     year: 2020, price: 31900, km: 64200,  fuel: "Diesel",   gear: "Automatik", body: "Kombi",   power: 190, color: "#1f6feb", rating: 4.7, deal: true,  desc: "Sportlicher Business-Kombi mit M-Sport-Paket, Leder, Navi Professional und LED-Scheinwerfern." },
  { id: 3,  brand: "Tesla",      model: "Model 3 Long Range",       year: 2022, price: 38500, km: 29800,  fuel: "Elektro",  gear: "Automatik", body: "Limousine", power: 366, color: "#e23b3b", rating: 4.9, deal: false, desc: "Vollelektrische Limousine mit großer Reichweite, Autopilot und kostenlosen Software-Updates." },
  { id: 4,  brand: "Audi",       model: "A4 Avant 40 TFSI",         year: 2021, price: 33490, km: 41000,  fuel: "Benzin",   gear: "Automatik", body: "Kombi",   power: 204, color: "#2b2f36", rating: 4.6, deal: false, desc: "Eleganter Premium-Kombi mit virtual cockpit, Matrix-LED und feinster Verarbeitung." },
  { id: 5,  brand: "Mercedes-Benz", model: "A 200 Progressive",     year: 2020, price: 26900, km: 47300,  fuel: "Benzin",   gear: "Automatik", body: "Kompakt", power: 163, color: "#5a6470", rating: 4.5, deal: false, desc: "Moderner Kompakter mit MBUX Sprachsteuerung, ambientem Licht und hochwertigem Interieur." },
  { id: 6,  brand: "Porsche",    model: "718 Cayman",                year: 2019, price: 58900, km: 32000,  fuel: "Benzin",   gear: "Automatik", body: "Coupé",   power: 300, color: "#d4a017", rating: 5.0, deal: false, desc: "Mittelmotor-Sportwagen mit perfekter Balance, PDK-Getriebe und unverkennbarem Sound." },
  { id: 7,  brand: "Opel",       model: "Corsa-e Edition",           year: 2022, price: 18990, km: 21500,  fuel: "Elektro",  gear: "Automatik", body: "Kleinwagen", power: 136, color: "#ffb300", rating: 4.4, deal: true,  desc: "Kompakter Stromer für die Stadt – wendig, sparsam und ideal als Erstwagen." },
  { id: 8,  brand: "Ford",       model: "Focus ST-Line 1.5 EcoBoost", year: 2020, price: 19990, km: 55800, fuel: "Benzin", gear: "Manuell",   body: "Kompakt", power: 150, color: "#3a7bd5", rating: 4.3, deal: false, desc: "Dynamischer Kompaktwagen mit sportlichem ST-Line-Paket und agilem Fahrwerk." },
  { id: 9,  brand: "Volkswagen", model: "Passat Variant 2.0 TDI",   year: 2019, price: 21500, km: 89000,  fuel: "Diesel",   gear: "Automatik", body: "Kombi",   power: 150, color: "#6b7280", rating: 4.2, deal: false, desc: "Geräumiger Familien- und Langstreckenkombi mit viel Platz und niedrigem Verbrauch." },
  { id: 10, brand: "BMW",        model: "i3 120Ah",                  year: 2021, price: 25900, km: 18700,  fuel: "Elektro",  gear: "Automatik", body: "Kleinwagen", power: 170, color: "#00b4d8", rating: 4.6, deal: true,  desc: "Innovativer City-Stromer mit Carbon-Karosserie und nachhaltigem Interieur." },
  { id: 11, brand: "Audi",       model: "Q5 45 TFSI quattro",        year: 2020, price: 42900, km: 51200,  fuel: "Benzin",   gear: "Automatik", body: "SUV",     power: 265, color: "#1b1f24", rating: 4.7, deal: false, desc: "Souveränes Premium-SUV mit Allradantrieb, Luftfederung und großzügigem Platzangebot." },
  { id: 12, brand: "Mercedes-Benz", model: "GLC 300 d 4MATIC",      year: 2021, price: 49900, km: 39500,  fuel: "Diesel",   gear: "Automatik", body: "SUV",     power: 245, color: "#3f4853", rating: 4.8, deal: false, desc: "Komfortables Premium-SUV mit Allrad, Burmester-Sound und umfangreichen Assistenzsystemen." },
  { id: 13, brand: "Tesla",      model: "Model Y Performance",       year: 2023, price: 52900, km: 14200,  fuel: "Elektro",  gear: "Automatik", body: "SUV",     power: 460, color: "#c0392b", rating: 4.9, deal: false, desc: "Sportliches Elektro-SUV mit enormer Beschleunigung, viel Platz und Top-Reichweite." },
  { id: 14, brand: "Volkswagen", model: "Polo 1.0 TSI Life",        year: 2022, price: 17490, km: 23400,  fuel: "Benzin",   gear: "Manuell",   body: "Kleinwagen", power: 95, color: "#4f7cff", rating: 4.4, deal: true,  desc: "Beliebter Kleinwagen mit modernen Assistenten – perfekt für Stadt und Pendeln." },
  { id: 15, brand: "Porsche",    model: "Macan S",                   year: 2020, price: 56900, km: 44000,  fuel: "Benzin",   gear: "Automatik", body: "SUV",     power: 354, color: "#2c3e50", rating: 4.8, deal: false, desc: "Sportliches Premium-SUV mit Porsche-typischer Fahrdynamik und edlem Interieur." },
  { id: 16, brand: "Ford",       model: "Puma 1.0 EcoBoost Hybrid",  year: 2022, price: 22490, km: 19800,  fuel: "Hybrid",   gear: "Manuell",   body: "SUV",     power: 125, color: "#e67e22", rating: 4.5, deal: false, desc: "Stylisches Kompakt-SUV mit Mild-Hybrid, cleverem Stauraum und frischem Design." },
  { id: 17, brand: "Audi",       model: "e-tron 55 quattro",         year: 2021, price: 54900, km: 36000,  fuel: "Elektro",  gear: "Automatik", body: "SUV",     power: 408, color: "#34495e", rating: 4.7, deal: false, desc: "Großes Elektro-SUV mit Allrad, schnellem Laden und luxuriösem Reisekomfort." },
  { id: 18, brand: "Opel",       model: "Astra Sports Tourer",       year: 2021, price: 20990, km: 42700,  fuel: "Diesel",   gear: "Automatik", body: "Kombi",   power: 130, color: "#f1c40f", rating: 4.2, deal: false, desc: "Praktischer Kombi mit niedrigem Verbrauch, viel Laderaum und moderner Technik." },
];

/* ---------- State ---------- */
const state = {
  brand: "", maxPrice: "", text: "",
  fuel: new Set(), gear: new Set(), body: new Set(),
  maxKm: 250000, minYear: 2005, sort: "rel", onlyFav: false,
};
const favs = new Set(JSON.parse(localStorage.getItem("af_favs") || "[]"));

/* ---------- Helpers ---------- */
const $ = (s) => document.querySelector(s);
const fmt = (n) => n.toLocaleString("de-DE");
const fmtPrice = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const uniq = (key) => [...new Set(CARS.map((c) => c[key]))];

function saveFavs() { localStorage.setItem("af_favs", JSON.stringify([...favs])); }
function updateFavCount() { $("#favCount").textContent = favs.size; }

/* ---------- Car illustration (offline SVG) ---------- */
function carSVG(color, big = false) {
  return `
  <svg class="car-illu" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg${color.replace('#','')}${big?'b':''}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity="0.95"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0.55"/>
      </linearGradient>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#bg${color.replace('#','')}${big?'b':''})"/>
    <rect width="400" height="130" fill="url(#sky)"/>
    <circle cx="320" cy="55" r="120" fill="#ffffff" opacity="0.08"/>
    <!-- car body -->
    <g transform="translate(40,70)">
      <path d="M10 95 L30 55 Q40 40 60 38 L130 35 Q150 34 168 50 L210 80 L300 88 Q318 90 318 108 L318 125 Q318 132 310 132 L18 132 Q10 132 10 124 Z" fill="#0d1320" opacity="0.92"/>
      <path d="M48 56 Q56 44 70 43 L126 41 Q142 40 156 52 L186 75 L70 73 Q52 72 48 60 Z" fill="#ffffff" opacity="0.28"/>
      <rect x="10" y="118" width="308" height="14" rx="5" fill="#000" opacity="0.25"/>
      <circle cx="80" cy="132" r="26" fill="#0a0f18"/><circle cx="80" cy="132" r="12" fill="#2a3344"/>
      <circle cx="250" cy="132" r="26" fill="#0a0f18"/><circle cx="250" cy="132" r="12" fill="#2a3344"/>
      <rect x="300" y="92" width="18" height="12" rx="3" fill="#ffd36b"/>
    </g>
  </svg>`;
}

/* ---------- Render filters (chips) ---------- */
function buildChips(containerId, key, values) {
  const wrap = $(containerId);
  wrap.innerHTML = values.map((v) => `<button class="chip" data-key="${key}" data-val="${v}">${v}</button>`).join("");
  wrap.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const set = state[key];
      const val = chip.dataset.val;
      if (set.has(val)) { set.delete(val); chip.classList.remove("active"); }
      else { set.add(val); chip.classList.add("active"); }
      render();
    });
  });
}

/* ---------- Populate brand select ---------- */
function buildBrandSelect() {
  const sel = $("#qBrand");
  uniq("brand").sort().forEach((b) => {
    const o = document.createElement("option");
    o.value = b; o.textContent = b; sel.appendChild(o);
  });
}

/* ---------- Filtering + sorting ---------- */
function getFiltered() {
  let list = CARS.filter((c) => {
    if (state.brand && c.brand !== state.brand) return false;
    if (state.maxPrice && c.price > +state.maxPrice) return false;
    if (state.fuel.size && !state.fuel.has(c.fuel)) return false;
    if (state.gear.size && !state.gear.has(c.gear)) return false;
    if (state.body.size && !state.body.has(c.body)) return false;
    if (c.km > state.maxKm) return false;
    if (c.year < state.minYear) return false;
    if (state.onlyFav && !favs.has(c.id)) return false;
    if (state.text) {
      const t = state.text.toLowerCase();
      const hay = `${c.brand} ${c.model} ${c.fuel} ${c.body} ${c.gear}`.toLowerCase();
      if (!hay.includes(t)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "km-asc":     list.sort((a, b) => a.km - b.km); break;
    case "year-desc":  list.sort((a, b) => b.year - a.year); break;
    default:           list.sort((a, b) => b.rating - a.rating);
  }
  return list;
}

/* ---------- Render cards ---------- */
function render() {
  const list = getFiltered();
  const grid = $("#carGrid");
  $("#resultCount").textContent = list.length;
  $("#emptyState").hidden = list.length !== 0;

  grid.innerHTML = list.map((c) => `
    <article class="card" data-id="${c.id}">
      <div class="card-media">
        ${carSVG(c.color)}
        ${c.deal ? '<span class="badge deal">★ Top-Deal</span>' : `<span class="badge">${c.body}</span>`}
        <button class="fav-toggle ${favs.has(c.id) ? "on" : ""}" data-fav="${c.id}" aria-label="Zu Favoriten">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7.5-4.6-10-9.2C.6 9 2 5.5 5.2 5.1 7 4.9 8.7 5.9 12 9c3.3-3.1 5-4.1 6.8-3.9C22 5.5 23.4 9 22 11.8 19.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>
      <div class="card-body">
        <div class="card-top">
          <div>
            <div class="card-title">${c.brand}</div>
            <div class="card-sub">${c.model}</div>
          </div>
          <div class="card-price">${fmtPrice(c.price)}<small>inkl. MwSt.</small></div>
        </div>
        <div class="specs">
          <span class="spec">📅 ${c.year}</span>
          <span class="spec">🛣️ ${fmt(c.km)} km</span>
          <span class="spec">⚡ ${c.power} PS</span>
          <span class="spec">⛽ ${c.fuel}</span>
        </div>
        <div class="rating"><span class="stars">${"★".repeat(Math.round(c.rating))}</span> ${c.rating.toFixed(1)} · ${c.gear}</div>
      </div>
    </article>`).join("");

  // entrance animation
  requestAnimationFrame(() => {
    grid.querySelectorAll(".card").forEach((card, i) => {
      setTimeout(() => card.classList.add("in"), i * 45);
    });
  });

  // wire up
  grid.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-fav]")) return;
      openModal(+card.dataset.id);
    });
  });
  grid.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggleFav(+btn.dataset.fav); });
  });
}

/* ---------- Favorites ---------- */
function toggleFav(id) {
  if (favs.has(id)) { favs.delete(id); toast("Aus Favoriten entfernt"); }
  else { favs.add(id); toast("Zu Favoriten hinzugefügt ❤"); }
  saveFavs(); updateFavCount(); render();
}

/* ---------- Modal ---------- */
function openModal(id) {
  const c = CARS.find((x) => x.id === id);
  if (!c) return;
  $("#modalBody").innerHTML = `
    <div class="modal-media">${carSVG(c.color, true)}</div>
    <div class="modal-content">
      <h2>${c.brand} ${c.model}</h2>
      <div class="modal-price">${fmtPrice(c.price)}</div>
      <div class="spec-grid">
        <div class="spec-box"><span>Baujahr</span><strong>${c.year}</strong></div>
        <div class="spec-box"><span>Kilometer</span><strong>${fmt(c.km)} km</strong></div>
        <div class="spec-box"><span>Leistung</span><strong>${c.power} PS</strong></div>
        <div class="spec-box"><span>Kraftstoff</span><strong>${c.fuel}</strong></div>
        <div class="spec-box"><span>Getriebe</span><strong>${c.gear}</strong></div>
        <div class="spec-box"><span>Karosserie</span><strong>${c.body}</strong></div>
      </div>
      <p class="modal-desc">${c.desc}</p>
      <div class="modal-actions">
        <button class="btn btn-primary" id="contactBtn">📞 Händler kontaktieren</button>
        <button class="btn btn-ghost" id="modalFav">${favs.has(c.id) ? "❤ In Favoriten" : "♡ Merken"}</button>
      </div>
    </div>`;
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  $("#contactBtn").addEventListener("click", () => toast("Anfrage gesendet – der Händler meldet sich! ✅"));
  $("#modalFav").addEventListener("click", () => { toggleFav(c.id); closeModal(); });
}
function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; }

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 300); }, 2200);
}

/* ---------- Theme ---------- */
function initTheme() {
  const saved = localStorage.getItem("af_theme");
  if (saved) document.documentElement.dataset.theme = saved;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("af_theme", next);
  });
}

/* ---------- Count-up stat ---------- */
function countUp(el, target, dur = 1200) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = fmt(Math.floor(p * target));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Scroll reveal + nav shadow ---------- */
function initScrollFX() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  window.addEventListener("scroll", () => {
    $("#nav").classList.toggle("scrolled", window.scrollY > 10);
  });
}

/* ---------- Wire controls ---------- */
function initControls() {
  $("#qBrand").addEventListener("change", (e) => { state.brand = e.target.value; render(); });
  $("#qPrice").addEventListener("change", (e) => { state.maxPrice = e.target.value; render(); });
  $("#qText").addEventListener("input", (e) => { state.text = e.target.value; render(); });
  $("#searchGo").addEventListener("click", () => { document.getElementById("angebote").scrollIntoView({ behavior: "smooth" }); render(); });
  $("#sortBy").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

  $("#kmRange").addEventListener("input", (e) => {
    state.maxKm = +e.target.value;
    $("#kmVal").textContent = state.maxKm >= 250000 ? "250.000+ km" : fmt(state.maxKm) + " km";
    render();
  });
  $("#yearRange").addEventListener("input", (e) => {
    state.minYear = +e.target.value;
    $("#yearVal").textContent = "ab " + state.minYear;
    render();
  });
  $("#onlyFav").addEventListener("change", (e) => { state.onlyFav = e.target.checked; render(); });
  $("#favBtn").addEventListener("click", (e) => {
    e.preventDefault();
    $("#onlyFav").checked = !$("#onlyFav").checked;
    state.onlyFav = $("#onlyFav").checked;
    document.getElementById("angebote").scrollIntoView({ behavior: "smooth" });
    render();
  });

  $("#resetFilters").addEventListener("click", resetAll);
  $("#emptyReset").addEventListener("click", resetAll);

  // mobile filters
  $("#filtersMobileToggle").addEventListener("click", () => $("#filters").classList.toggle("open"));

  // modal close
  $("#modal").querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  $(".btn-sell").addEventListener("click", () => toast("Verkaufs-Formular folgt bald – Demo 🙂"));
}

function resetAll() {
  state.brand = ""; state.maxPrice = ""; state.text = "";
  state.fuel.clear(); state.gear.clear(); state.body.clear();
  state.maxKm = 250000; state.minYear = 2005; state.onlyFav = false;
  $("#qBrand").value = ""; $("#qPrice").value = ""; $("#qText").value = "";
  $("#kmRange").value = 250000; $("#kmVal").textContent = "250.000+ km";
  $("#yearRange").value = 2005; $("#yearVal").textContent = "ab 2005";
  $("#onlyFav").checked = false;
  document.querySelectorAll(".chip.active").forEach((c) => c.classList.remove("active"));
  render();
}

/* ---------- Init ---------- */
function init() {
  $("#year").textContent = new Date().getFullYear();
  buildBrandSelect();
  buildChips("#fuelChips", "fuel", uniq("fuel"));
  buildChips("#gearChips", "gear", uniq("gear"));
  buildChips("#bodyChips", "body", uniq("body"));
  $("#kmVal").textContent = "250.000+ km";
  initTheme();
  initControls();
  initScrollFX();
  updateFavCount();
  countUp($("#statCars"), CARS.length * 2847);
  render();
}
document.addEventListener("DOMContentLoaded", init);
