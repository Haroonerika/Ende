/* ============================================================
   Kick-Off Roulette – Logik
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'kickoff-roulette-v1';

  var state = {
    mode: null,              // 'club' | 'nation'
    groups: { club: null, nation: null },  // Set-artige Objekte {key:true}
    minStars: 3,
    maxStars: 5,
    balance: true,
    sound: true,
    names: ['Spieler 1', 'Spieler 2'],
    picks: [null, null],
    history: []
  };

  var els = {};
  var rolling = [false, false];

  /* ---------- Helfer ---------- */
  function $(id) { return document.getElementById(id); }
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function teamsFor(mode) { return mode === 'nation' ? NATIONS : CLUBS; }
  function groupsFor(mode) {
    return mode === 'nation'
      ? NATION_GROUPS.map(function (g) { return { key: g.key, name: g.name, flag: g.flag, count: g.teams.length }; })
      : CLUB_LEAGUES.map(function (l) { return { key: l.key, name: l.name, flag: l.flag, count: l.teams.length }; });
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Speichern / Laden ---------- */
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        mode: state.mode, groups: state.groups, minStars: state.minStars,
        maxStars: state.maxStars, balance: state.balance, sound: state.sound,
        names: state.names, history: state.history.slice(0, 8)
      }));
    } catch (e) { /* Privatmodus o.ä. – egal */ }
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (d.mode === 'club' || d.mode === 'nation') state.mode = d.mode;
      if (d.groups) state.groups = d.groups;
      if (typeof d.minStars === 'number') state.minStars = d.minStars;
      if (typeof d.maxStars === 'number') state.maxStars = d.maxStars;
      if (typeof d.balance === 'boolean') state.balance = d.balance;
      if (typeof d.sound === 'boolean') state.sound = d.sound;
      if (Array.isArray(d.names) && d.names.length === 2) state.names = d.names;
      if (Array.isArray(d.history)) state.history = d.history;
    } catch (e) { /* kaputte Daten ignorieren */ }
  }

  /* ---------- Wappen (eigene, vereinfachte Grafik) ---------- */
  var SHIELD = 'M50 3 L95 17 V54 C95 80 74 101 50 113 C26 101 5 80 5 54 V17 Z';

  function crestSvg(team) {
    var uid = 'cr' + Math.random().toString(36).slice(2, 9);
    var p = team.primary, s = team.secondary;
    var body = '';

    switch (team.pattern) {
      case 'stripes':
        body = '<rect x="0" y="0" width="100" height="120" fill="' + p + '"/>';
        for (var i = 0; i < 5; i++) {
          body += '<rect x="' + (i * 20 + 10) + '" y="0" width="10" height="120" fill="' + s + '"/>';
        }
        break;
      case 'halves':
        body = '<rect x="0" y="0" width="50" height="120" fill="' + p + '"/>' +
               '<rect x="50" y="0" width="50" height="120" fill="' + s + '"/>';
        break;
      case 'hoops':
        body = '<rect x="0" y="0" width="100" height="120" fill="' + p + '"/>';
        for (var h = 0; h < 5; h++) {
          body += '<rect x="0" y="' + (h * 24 + 12) + '" width="100" height="12" fill="' + s + '"/>';
        }
        break;
      case 'sash':
        body = '<rect x="0" y="0" width="100" height="120" fill="' + p + '"/>' +
               '<polygon points="0,10 30,0 100,85 100,120 70,120 0,45" fill="' + s + '"/>';
        break;
      default:
        body = '<rect x="0" y="0" width="100" height="120" fill="' + p + '"/>' +
               '<rect x="0" y="72" width="100" height="14" fill="' + s + '"/>';
    }

    var lum = luminance(p);
    var textColor = lum > 0.55 ? '#10231a' : '#ffffff';
    var textStroke = lum > 0.55 ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.45)';

    return '<svg class="team-crest" viewBox="0 0 100 120" role="img" aria-label="Wappen ' + escapeHtml(team.name) + '">' +
      '<defs><clipPath id="' + uid + '"><path d="' + SHIELD + '"/></clipPath></defs>' +
      '<g clip-path="url(#' + uid + ')">' + body +
        '<rect x="0" y="0" width="100" height="120" fill="url(#' + uid + 'g)"/>' +
      '</g>' +
      '<defs><linearGradient id="' + uid + 'g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="rgba(255,255,255,.22)"/>' +
        '<stop offset="55%" stop-color="rgba(255,255,255,0)"/>' +
        '<stop offset="100%" stop-color="rgba(0,0,0,.28)"/>' +
      '</linearGradient></defs>' +
      '<path d="' + SHIELD + '" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"/>' +
      '<text x="50" y="66" text-anchor="middle" font-family="Sora, sans-serif" font-weight="800" ' +
        'font-size="30" fill="' + textColor + '" stroke="' + textStroke + '" stroke-width="1" ' +
        'paint-order="stroke">' + escapeHtml(team.abbr) + '</text>' +
    '</svg>';
  }

  function luminance(hex) {
    var c = hex.replace('#', '');
    var r = parseInt(c.substr(0, 2), 16) / 255;
    var g = parseInt(c.substr(2, 2), 16) / 255;
    var b = parseInt(c.substr(4, 2), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function starsHtml(n) {
    var out = '';
    for (var i = 1; i <= 5; i++) {
      if (n >= i) out += '★';
      else if (n >= i - 0.5) out += '<span style="opacity:.55">★</span>';
      else out += '<span class="off">★</span>';
    }
    return '<span class="team-stars" title="' + n + ' Sterne">' + out + '</span>';
  }

  /* ---------- Sound ---------- */
  var audioCtx = null;
  function beep(freq, dur, vol) {
    if (!state.sound) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.05, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + dur);
    } catch (e) { /* kein Audio verfügbar */ }
  }

  /* ---------- Pool ---------- */
  function activeGroupKeys() {
    var g = state.groups[state.mode];
    if (!g) return groupsFor(state.mode).map(function (x) { return x.key; });
    return Object.keys(g).filter(function (k) { return g[k]; });
  }

  function pool() {
    var keys = activeGroupKeys();
    return teamsFor(state.mode).filter(function (t) {
      return keys.indexOf(t.groupKey) !== -1 &&
             t.stars >= state.minStars && t.stars <= state.maxStars;
    });
  }

  function pick(exclude, opponent) {
    var list = pool().filter(function (t) { return !exclude || t.id !== exclude.id; });
    if (!list.length) return null;
    if (state.balance && opponent) {
      var fair = list.filter(function (t) { return Math.abs(t.stars - opponent.stars) <= 0.5; });
      if (fair.length) list = fair;
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  /* ---------- Rendering ---------- */
  function renderCounts() {
    $('countNations').textContent = NATIONS.length + ' Nationalteams';
    $('countClubs').textContent = CLUBS.length + ' Vereine aus ' + CLUB_LEAGUES.length + ' Ligen';
  }

  function renderModeCards() {
    all('.mode-card').forEach(function (c) {
      c.classList.toggle('is-active', c.dataset.mode === state.mode);
    });
  }

  function renderChips() {
    var bar = $('groupChips');
    var groups = groupsFor(state.mode);
    if (!state.groups[state.mode]) {
      var init = {};
      groups.forEach(function (g) { init[g.key] = true; });
      state.groups[state.mode] = init;
    }
    var sel = state.groups[state.mode];
    bar.innerHTML = groups.map(function (g) {
      return '<button type="button" class="chip' + (sel[g.key] ? ' is-on' : '') + '" data-group="' + g.key + '" ' +
        'aria-pressed="' + (!!sel[g.key]) + '">' + g.flag + ' ' + escapeHtml(g.name) +
        ' <span class="chip-n">' + g.count + '</span></button>';
    }).join('');

    $('filterTitle').textContent = state.mode === 'nation'
      ? 'Welche Verbände sollen in den Topf?'
      : 'Welche Ligen sollen in den Topf?';
    $('filterSub').textContent = state.mode === 'nation'
      ? 'Standard: alle Kontinente. Abwählen, was ihr nicht spielen wollt.'
      : 'Standard: alle Ligen. Klick eine weg, wenn ihr sie nicht wollt.';
  }

  function renderPool() {
    var n = pool().length;
    var line = $('pool-line') || document.querySelector('.pool-line');
    $('poolInfo').innerHTML = n === 0
      ? 'Kein Team im Topf – bitte Filter lockern.'
      : '<strong>' + n + '</strong> Teams im Topf.';
    line.classList.toggle('is-warn', n < 2);
    $('toDuelBtn').disabled = n < 2;
    all('.draw-btn').forEach(function (b) { b.disabled = n < 2; });
    $('drawBothBtn').disabled = n < 2;
  }

  function renderSlot(i) {
    var slot = $('slot-' + i);
    var t = state.picks[i];
    var card = $('card-' + i);
    if (!t) {
      slot.innerHTML = '<div class="slot-empty"><span class="qmark">?</span><p>Noch kein Team</p></div>';
      card.classList.remove('has-team');
      return;
    }
    card.classList.add('has-team');
    var visual = t.kind === 'nation'
      ? '<div class="team-flag">' + t.flag + '</div>'
      : crestSvg(t);
    slot.innerHTML = '<div class="team">' + visual +
      '<div class="team-name">' + escapeHtml(t.name) + '</div>' +
      starsHtml(t.stars) +
      '<div class="team-meta">' + (t.kind === 'club' ? t.flag + ' ' + escapeHtml(t.groupName) : escapeHtml(t.groupName)) + '</div>' +
    '</div>';
  }

  function renderHistory() {
    var wrap = $('historyWrap');
    if (!state.history.length) { wrap.hidden = true; return; }
    wrap.hidden = false;
    $('history').innerHTML = state.history.slice(0, 8).map(function (h) {
      return '<li><span class="h-team">' + escapeHtml(h.a) + '</span>' +
        '<span class="h-vs">vs</span>' +
        '<span class="h-team">' + escapeHtml(h.b) + '</span>' +
        '<span class="h-time">' + escapeHtml(h.t) + '</span></li>';
    }).join('');
  }

  /* ---------- Auslosung mit Roll-Animation ---------- */
  function draw(i, done) {
    if (rolling[i]) return;
    var opponent = state.picks[1 - i];
    var result = pick(opponent, opponent);
    if (!result) return;

    rolling[i] = true;
    var slot = $('slot-' + i);
    var btn = document.querySelector('.draw-btn[data-player="' + i + '"]');
    var list = pool();
    slot.classList.add('is-rolling');
    btn.disabled = true;

    var ticks = 16, k = 0;
    (function step() {
      var rnd = list[Math.floor(Math.random() * list.length)];
      var visual = rnd.kind === 'nation' ? '<div class="team-flag">' + rnd.flag + '</div>' : crestSvg(rnd);
      slot.innerHTML = '<div class="team">' + visual + '<div class="roll-name">' + escapeHtml(rnd.name) + '</div></div>';
      beep(360 + k * 14, 0.035, 0.03);
      k++;
      if (k < ticks) {
        setTimeout(step, 45 + k * 7);   // wird langsamer -> Roulette-Gefühl
      } else {
        state.picks[i] = result;
        rolling[i] = false;
        slot.classList.remove('is-rolling');
        btn.disabled = false;
        renderSlot(i);
        beep(880, 0.16, 0.07);
        maybeLogDuel();
        save();
        if (done) done();
      }
    })();
  }

  function maybeLogDuel() {
    if (!state.picks[0] || !state.picks[1]) return;
    var entry = {
      a: state.picks[0].name, b: state.picks[1].name,
      t: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };
    var last = state.history[0];
    if (last && last.a === entry.a && last.b === entry.b) return;
    state.history.unshift(entry);
    state.history = state.history.slice(0, 8);
    renderHistory();
  }

  /* ---------- Navigation ---------- */
  function show(stepName) {
    ['mode', 'filter', 'duel'].forEach(function (s) {
      $('step-' + s).classList.toggle('is-hidden', s !== stepName);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Events ---------- */
  function bind() {
    all('.mode-card').forEach(function (card) {
      card.addEventListener('click', function () {
        state.mode = card.dataset.mode;
        state.picks = [null, null];
        renderModeCards();
        renderChips();
        renderPool();
        renderSlot(0); renderSlot(1);
        beep(660, 0.08, 0.05);
        save();
        show('filter');
      });
    });

    $('groupChips').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      var key = chip.dataset.group;
      var sel = state.groups[state.mode];
      sel[key] = !sel[key];
      chip.classList.toggle('is-on', sel[key]);
      chip.setAttribute('aria-pressed', String(!!sel[key]));
      renderPool();
      save();
    });

    $('selectAllBtn').addEventListener('click', function () {
      groupsFor(state.mode).forEach(function (g) { state.groups[state.mode][g.key] = true; });
      renderChips(); renderPool(); save();
    });
    $('clearAllBtn').addEventListener('click', function () {
      groupsFor(state.mode).forEach(function (g) { state.groups[state.mode][g.key] = false; });
      renderChips(); renderPool(); save();
    });

    function syncStars() {
      var mn = parseFloat($('minStars').value), mx = parseFloat($('maxStars').value);
      if (mn > mx) { mx = mn; $('maxStars').value = mx; }
      state.minStars = mn; state.maxStars = mx;
      $('minStarsOut').textContent = mn + ' ★';
      $('maxStarsOut').textContent = mx + ' ★';
      renderPool(); save();
    }
    $('minStars').addEventListener('input', syncStars);
    $('maxStars').addEventListener('input', syncStars);

    $('balanceToggle').addEventListener('change', function () {
      state.balance = this.checked; save();
    });

    $('toDuelBtn').addEventListener('click', function () { show('duel'); });

    all('.step-back').forEach(function (b) {
      b.addEventListener('click', function () { show(b.dataset.back); });
    });

    all('.draw-btn').forEach(function (b) {
      b.addEventListener('click', function () { draw(parseInt(b.dataset.player, 10)); });
    });

    $('drawBothBtn').addEventListener('click', function () {
      if (rolling[0] || rolling[1]) return;
      state.picks = [null, null];
      renderSlot(0); renderSlot(1);
      draw(0, function () { draw(1); });
    });

    $('swapBtn').addEventListener('click', function () {
      if (rolling[0] || rolling[1]) return;
      var tmp = state.picks[0]; state.picks[0] = state.picks[1]; state.picks[1] = tmp;
      renderSlot(0); renderSlot(1);
      beep(520, 0.08, 0.05); save();
    });

    $('resetBtn').addEventListener('click', function () {
      state.picks = [null, null];
      renderSlot(0); renderSlot(1);
      save();
    });

    $('clearHistoryBtn').addEventListener('click', function () {
      state.history = []; renderHistory(); save();
    });

    [0, 1].forEach(function (i) {
      $('name-' + i).addEventListener('input', function () {
        state.names[i] = this.value; save();
      });
    });

    $('soundBtn').addEventListener('click', function () {
      state.sound = !state.sound;
      this.setAttribute('aria-pressed', String(state.sound));
      $('soundIcon').textContent = state.sound ? '🔊' : '🔇';
      if (state.sound) beep(700, 0.1, 0.05);
      save();
    });

    // Leertaste = beide auslosen (wenn kein Textfeld aktiv ist)
    document.addEventListener('keydown', function (e) {
      if (e.code !== 'Space' || e.target.tagName === 'INPUT') return;
      if ($('step-duel').classList.contains('is-hidden')) return;
      e.preventDefault();
      $('drawBothBtn').click();
    });
  }

  /* ---------- Start ---------- */
  function init() {
    els = {};
    load();
    renderCounts();

    $('minStars').value = state.minStars;
    $('maxStars').value = state.maxStars;
    $('minStarsOut').textContent = state.minStars + ' ★';
    $('maxStarsOut').textContent = state.maxStars + ' ★';
    $('balanceToggle').checked = state.balance;
    $('soundBtn').setAttribute('aria-pressed', String(state.sound));
    $('soundIcon').textContent = state.sound ? '🔊' : '🔇';
    $('name-0').value = state.names[0];
    $('name-1').value = state.names[1];

    bind();
    renderHistory();

    if (state.mode) {
      renderModeCards();
      renderChips();
      renderPool();
      show('filter');
    } else {
      state.mode = 'club';      // Pool-Anzeige braucht einen Modus
      renderChips();
      renderPool();
      state.mode = null;
      show('mode');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
