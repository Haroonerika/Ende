/* ============================================================
   City Cut – Friseursalon Haren (Ems)
   Vanilla JS · scroll-driven motion · keine Abhängigkeiten
   ============================================================ */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------------------------------------------------------
     DATEN – hier kannst du alles bequem anpassen
     --------------------------------------------------------- */

  // Galerie. Tausche die URLs gegen eigene Bilder (z. B. "bilder/look1.jpg").
  const GALLERY = [
    { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80", alt: "Moderner Herrenschnitt", tall: true },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80", alt: "Barber bei der Arbeit" },
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80", alt: "Haarfarbe & Strähnen" },
    { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=700&q=80", alt: "Salon-Atmosphäre" },
    { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=700&q=80", alt: "Frische Damenfrisur", tall: true },
    { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=80", alt: "Styling & Föhnen" },
    { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80", alt: "Pflegeprodukte" },
    { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80", alt: "Zufriedener Kunde" },
  ];

  // Team. Ersetze Namen, Rollen und Fotos durch euer echtes Team.
  // "img" am besten durch eigene Fotos ersetzen (z. B. "bilder/juan.jpg").
  const TEAM = [
    { name: "Juan G.", role: "Inhaber", spec: "Schnitt & Farbe · Damen & Herren", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
    { name: "Carolin", role: "Color-Expertin", spec: "Coloration & Schnitt · Damen & Herren", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
    { name: "Noar S.", role: "Kosmetikerin", spec: "Fußpflege · Make-up · Gesichtsreinigung", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
    { name: "Aron M.", role: "Barber", spec: "Bart, Classic Cuts & Fade", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },
    { name: "Yahya M.", role: "Barber", spec: "Trend-Looks & Fade", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
    { name: "Mohamed", role: "Barber", spec: "Bart-Experte & Fade", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
    { name: "Dilovan", role: "Barber", spec: "Neueste Trends & Fade", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80" },
  ];

  // Bewertungen. Trage hier gerne echte Google-Rezensionen ein.
  const REVIEWS = [
    { name: "Lukas M.", date: "vor 2 Wochen", stars: 5, text: "Top Schnitt, super freundliches Team und faire Preise. Komme immer wieder gerne her!" },
    { name: "Sophie K.", date: "vor 1 Monat", stars: 5, text: "Endlich ein Friseur, der zuhört. Meine Balayage ist genau so geworden, wie ich es wollte." },
    { name: "Daniel R.", date: "vor 1 Monat", stars: 5, text: "Auch ohne Termin schnell drangekommen. Sauberer Fade, alles top. Klare Empfehlung in Haren." },
    { name: "Mara T.", date: "vor 2 Monaten", stars: 5, text: "Sehr angenehme Atmosphäre und kompetente Beratung. Man fühlt sich richtig gut aufgehoben." },
    { name: "Jonas B.", date: "vor 3 Monaten", stars: 5, text: "Bestes Preis-Leistungs-Verhältnis weit und breit. Bart und Schnitt sitzen perfekt." },
    { name: "Elena S.", date: "vor 3 Monaten", stars: 4, text: "Schöner Salon, tolles Ergebnis. Etwas Wartezeit, aber es hat sich definitiv gelohnt." },
  ];

  /* ---------------------------------------------------------
     RENDER
     --------------------------------------------------------- */
  function renderGallery() {
    const wrap = $("#gallery");
    if (!wrap) return;
    GALLERY.forEach((item, i) => {
      const fig = el("div", "gallery-item" + (item.tall ? " tall" : ""));
      fig.setAttribute("data-reveal", "");
      fig.style.transitionDelay = (i % 4) * 70 + "ms";
      const img = el("img");
      img.src = item.src; img.alt = item.alt || "Galeriebild"; img.loading = "lazy";
      fig.appendChild(img);
      fig.addEventListener("click", () => openLightbox(item.src, item.alt));
      wrap.appendChild(fig);
    });
  }

  function renderTeam() {
    const wrap = $("#teamGrid");
    if (!wrap) return;
    TEAM.forEach((m, i) => {
      const card = el("div", "team-card");
      card.setAttribute("data-reveal", "");
      card.style.transitionDelay = i * 90 + "ms";
      const img = el("img", "team-photo");
      img.src = m.img; img.alt = m.name; img.loading = "lazy";
      const h = el("h3"); h.textContent = m.name;
      const role = el("p", "role"); role.textContent = m.role;
      card.append(img, h, role);
      if (m.spec) { const spec = el("p", "spec"); spec.textContent = m.spec; card.append(spec); }
      wrap.appendChild(card);
    });
  }

  function renderReviews() {
    const wrap = $("#reviews");
    if (!wrap) return;
    REVIEWS.forEach((r, i) => {
      const card = el("div", "review-card");
      card.setAttribute("data-reveal", "");
      card.style.transitionDelay = (i % 3) * 90 + "ms";

      const top = el("div", "review-top");
      const avatar = el("div", "review-avatar");
      avatar.textContent = r.name.trim().charAt(0).toUpperCase();
      const meta = el("div");
      const name = el("div", "review-name"); name.textContent = r.name;
      const date = el("div", "review-date"); date.textContent = r.date;
      meta.append(name, date);
      top.append(avatar, meta);

      const stars = el("div", "review-stars");
      stars.textContent = "★★★★★☆☆☆☆☆".slice(5 - r.stars, 10 - r.stars);
      stars.setAttribute("aria-label", r.stars + " von 5 Sternen");

      const text = el("p", "review-text"); text.textContent = `„${r.text}"`;
      const g = el("div", "review-g"); g.innerHTML = "Bewertung auf <b>Google</b>";

      card.append(top, stars, text, g);
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     LIGHTBOX
     --------------------------------------------------------- */
  const lightbox = $("#lightbox");
  const stage = $("#lightboxStage");
  function openLightbox(src, alt) {
    if (!lightbox || !stage) return;
    stage.innerHTML = "";
    const img = el("img");
    img.src = src; img.alt = alt || "";
    stage.appendChild(img);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  $("#lightboxClose")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------------------------------------------------------
     NAV – Burger & Scroll-Effekt
     --------------------------------------------------------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const burger = $("#navBurger");
  burger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger?.classList.remove("open");
      burger?.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------- */
  function initReveal() {
    const items = $$("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const d = entry.target.getAttribute("data-reveal-delay");
          if (d) entry.target.style.transitionDelay = d + "ms";
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    items.forEach((i) => io.observe(i));
  }

  /* ---------------------------------------------------------
     COUNTER ANIMATION
     --------------------------------------------------------- */
  function animateCount(node) {
    const target = parseFloat(node.getAttribute("data-count")) || 0;
    const decimals = parseInt(node.getAttribute("data-decimals") || "0", 10);
    const suffix = node.getAttribute("data-suffix") || "";
    if (reduceMotion) { node.textContent = target.toFixed(decimals) + suffix; return; }
    const dur = 1500; const start = performance.now();
    const tick = (now) => {
      const p = clamp((now - start) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals).replace(".", ",");
      node.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function initCounters() {
    const nodes = $$("[data-count]");
    if (!("IntersectionObserver" in window)) { nodes.forEach(animateCount); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nodes.forEach((n) => io.observe(n));
  }

  /* ---------------------------------------------------------
     SCISSOR CUT – scroll-driven
     --------------------------------------------------------- */
  function initScissors() {
    const track = $("#cutTrack");
    const scissors = $("#scissors");
    const hairCut = $("#hairCut");
    const snips = $("#snips");
    if (!track || !scissors || !hairCut) return;

    let lastP = 0;
    let lastSnip = 0;

    const spawnSnip = (x) => {
      if (reduceMotion || !snips) return;
      const now = performance.now();
      if (now - lastSnip < 90) return;
      lastSnip = now;
      const s = el("div", "snip");
      s.style.left = x + "px";
      s.style.background = Math.random() > 0.5 ? "var(--gold)" : "var(--gold-2)";
      snips.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };

    const update = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when band enters bottom, 1 when it reaches upper third
      const p = clamp((vh - rect.top) / (vh * 0.9), 0, 1);
      const w = track.clientWidth;
      const x = p * w;
      scissors.style.transform = `translate(${x}px, -50%) translateX(-50%)`;
      hairCut.style.width = (p * 100) + "%";

      if (p > lastP + 0.012 && p < 0.99) {
        scissors.classList.add("snipping");
        spawnSnip(x);
        clearTimeout(scissors._t);
        scissors._t = setTimeout(() => scissors.classList.remove("snipping"), 260);
      }
      lastP = p;
    };
    return update;
  }

  /* ---------------------------------------------------------
     PARALLAX (background glows + floaties)
     --------------------------------------------------------- */
  function initParallax() {
    const nodes = $$("[data-parallax]");
    if (reduceMotion) return null;
    return () => {
      const y = window.scrollY;
      nodes.forEach((n) => {
        const speed = parseFloat(n.getAttribute("data-parallax")) || 0.2;
        n.style.transform = `translateY(${y * speed * -0.12}px)`;
      });
    };
  }

  /* ---------------------------------------------------------
     MAGNETIC BUTTONS (pointer only)
     --------------------------------------------------------- */
  function initMagnetic() {
    if (reduceMotion || !window.matchMedia("(pointer:fine)").matches) return;
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     SCROLL LOOP (progress bar, nav, scissors, parallax, CTA)
     --------------------------------------------------------- */
  function initScrollLoop() {
    const progress = $("#scrollProgress");
    const mobileCta = $("#mobileCta");
    const hero = $("#top");
    const updateScissors = initScissors();
    const updateParallax = initParallax();
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      nav?.classList.toggle("scrolled", y > 20);

      // mobile CTA appears after leaving the hero
      if (mobileCta && hero) {
        const past = y > hero.offsetHeight * 0.6;
        mobileCta.classList.toggle("show", past);
      }

      updateScissors && updateScissors();
      updateParallax && updateParallax();
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    renderTeam();
    renderReviews();
    initReveal();
    initCounters();
    initMagnetic();
    initScrollLoop();

    // trigger hero word reveal on load
    requestAnimationFrame(() => $(".hero-title")?.classList.add("in"));

    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
