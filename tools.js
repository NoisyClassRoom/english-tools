(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  // ---------- storage (safe) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  // ---------- theme (dark + orange by default) and name size ----------
  const applyTheme = light => {
    document.body.classList.toggle('light', light);
    $('#themeBtn').textContent = light ? '🌙' : '☀';
    store.set('ct_light', light);
  };
  applyTheme(store.get('ct_light', false));
  $('#themeBtn').onclick = () => applyTheme(!document.body.classList.contains('light'));

  let ns = store.get('ct_ns', 1);
  const applySize = () => { document.documentElement.style.setProperty('--ns', ns); store.set('ct_ns', ns); };
  const step = d => { ns = Math.min(2, Math.max(0.6, Math.round((ns + d) * 10) / 10)); applySize(); };
  $('#sizeUp').onclick = () => step(0.2);
  $('#sizeDown').onclick = () => step(-0.2);
  applySize();

  // ---------- tabs ----------
  const showTab = id => {
    $$('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
    $$('main section').forEach(s => s.classList.toggle('active', s.id === id));
    store.set('ct_tab', id);
    $('#sheetBar').classList.toggle('show', window.Track && Track.enabled && (id === 'picker' || id === 'groups'));
  };
  $$('#tabs button').forEach(b => b.onclick = () => showTab(b.dataset.tab));
  showTab(store.get('ct_tab', 'timer'));

  // ---------- full screen ----------
  $('#fsBtn').onclick = () => {
    document.body.classList.add('fullscreen');
    document.documentElement.requestFullscreen?.().catch(() => {});
  };
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) document.body.classList.remove('fullscreen');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.body.classList.remove('fullscreen');
  });

  // ---------- sound ----------
  let audioCtx;
  const actx = () => (audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)());
  const tone = (freq, at, dur, vol, type = 'sine') => {
    const c = actx(), o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(c.destination);
    o.start(at); o.stop(at + dur + 0.05);
  };
  const playEnd = kind => {
    try {
      if (kind === 'none') return;
      const t0 = actx().currentTime;
      if (kind === 'bell') for (let i = 0; i < 3; i++) tone(880, t0 + i * 0.45, 0.35, 0.4);
      else if (kind === 'chime') { tone(660, t0, 1.2, 0.25); tone(990, t0 + 0.35, 1.4, 0.2); tone(1320, t0 + 0.7, 1.6, 0.15); }
      else if (kind === 'buzzer') { tone(220, t0, 1.2, 0.3, 'square'); tone(226, t0, 1.2, 0.2, 'square'); }
    } catch {}
  };
  $('#soundType').value = store.get('ct_sound', 'bell');
  $('#soundType').onchange = () => store.set('ct_sound', $('#soundType').value);
  $('#soundTest').onclick = () => playEnd($('#soundType').value);

  // ---------- timer (+ lesson plan) ----------
  let total = 300, remaining = 300, running = false, endAt = 0, tick, pendingNext;
  let plan = [], planIdx = -1;
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const renderTimer = () => {
    $('#timerDisplay').textContent = fmt(Math.ceil(remaining));
    const pct = total ? (remaining / total) * 100 : 0;
    const fill = $('#timerFill');
    fill.style.width = pct + '%';
    fill.style.background = pct > 30 ? 'var(--accent)' : pct > 10 ? 'var(--warn)' : 'var(--bad)';
    $('#timerStart').textContent = running ? 'Pause' : (remaining < total && remaining > 0 ? 'Resume' : 'Start');
  };
  const renderStep = () => {
    $('#stepName').textContent = planIdx >= 0 ? `Step ${planIdx + 1} of ${plan.length}: ${plan[planIdx].name}` : '';
  };
  const setTimer = secs => {
    clearInterval(tick); running = false;
    total = remaining = Math.max(1, secs);
    $('#timerCard').classList.remove('flash');
    renderTimer();
  };
  const startRun = () => {
    if (remaining <= 0) setTimer(total);
    clearInterval(tick);
    running = true; endAt = Date.now() + remaining * 1000;
    tick = setInterval(() => {
      remaining = (endAt - Date.now()) / 1000;
      if (remaining <= 0) finish(); else renderTimer();
    }, 200);
    renderTimer();
  };
  const goStep = (i, autoStart) => {
    clearTimeout(pendingNext);
    if (i < 0 || i >= plan.length) return;
    planIdx = i;
    setTimer(plan[i].secs); renderStep();
    if (autoStart) startRun();
  };
  const finish = () => {
    clearInterval(tick); running = false; remaining = 0; renderTimer();
    playEnd($('#soundType').value);
    const c = $('#timerCard'); c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash');
    if (planIdx >= 0) {
      if (planIdx < plan.length - 1) {
        $('#timerDisplay').textContent = 'Next!';
        if ($('#planAuto').checked) pendingNext = setTimeout(() => { if (planIdx >= 0) goStep(planIdx + 1, true); }, 2500);
      } else {
        $('#timerDisplay').textContent = 'Plan done!';
        $('#stepName').textContent = 'All steps finished';
        planIdx = -1;
      }
    } else $('#timerDisplay').textContent = "Time's up!";
  };
  $('#timerStart').onclick = () => {
    if (running) { running = false; clearInterval(tick); remaining = Math.max(0, (endAt - Date.now()) / 1000); renderTimer(); }
    else startRun();
  };
  $('#timerReset').onclick = () => setTimer(total);
  const plainTimer = secs => { clearTimeout(pendingNext); planIdx = -1; renderStep(); setTimer(secs); };
  $$('[data-sec]').forEach(b => b.onclick = () => {
    const s = +b.dataset.sec; $('#tMin').value = Math.floor(s / 60); $('#tSec').value = s % 60; plainTimer(s);
  });
  $('#timerSet').onclick = () => plainTimer((+$('#tMin').value || 0) * 60 + (+$('#tSec').value || 0));

  const parsePlan = text => text.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const m = l.match(/^(.+?)\s*[,;:\t]\s*(\d+(?:[.,]\d+)?)\s*(?:min\w*|m|')?\s*$/i) || l.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*(?:min\w*|m)?\s*$/i);
    return m ? { name: m[1].trim(), secs: Math.max(1, Math.round(parseFloat(m[2].replace(',', '.')) * 60)) } : null;
  }).filter(Boolean);
  $('#planText').value = store.get('ct_plan', '');
  $('#planText').oninput = () => store.set('ct_plan', $('#planText').value);
  $('#planStart').onclick = () => {
    plan = parsePlan($('#planText').value);
    if (!plan.length) { alert('Write the steps first, one per line, for example:\nWarm-up, 5\nReading, 10'); return; }
    goStep(0, true);
  };
  $('#planNext').onclick = () => { if (planIdx >= 0) goStep(Math.min(planIdx + 1, plan.length - 1), running); };
  $('#planPrev').onclick = () => { if (planIdx >= 0) goStep(Math.max(planIdx - 1, 0), running); };
  $('#planStop').onclick = () => plainTimer(total);
  renderTimer();

  // ---------- classes ----------
  // Hand-typed classes: arrays of strings, saved in this browser.
  // Classes from the Sheet: arrays of [name, displayName], kept in memory only.
  const EXAMPLE = { 'Example class': ['Ana', 'Luka', 'Maja', 'Nik', 'Eva', 'Jan', 'Zala', 'Tim', 'Lara', 'Žiga', 'Nina', 'Miha'] };
  let classes = store.get('ct_classes', EXAMPLE);
  if (!Object.keys(classes).length) classes = { ...EXAMPLE };
  let current = store.get('ct_current', Object.keys(classes)[0]);
  let absent = new Set(), picked = new Set();
  let current2 = '';                 // optional second class, used together with the first (e.g. a joint lesson)
  const fromSheet = new Set();
  const manualKeys = () => Object.keys(classes).filter(c => !fromSheet.has(c));
  const saveClasses = () => {
    const mine = {}; manualKeys().forEach(k => mine[k] = classes[k]);
    store.set('ct_classes', mine); store.set('ct_current', fromSheet.has(current) ? '' : current);
  };

  // names: "Surname Firstname" as in eAsistent -> "Firstname Surname" (last word = first name, unless the Roster has a display name)
  let order = store.get('ct_order', 'first');
  const nameOf = e => (typeof e === 'string' ? e : e[0]);
  const show = e => {
    if (typeof e === 'string') return e;
    const [raw, disp] = e;
    if (order === 'raw') return raw;
    const last = (disp || raw).split(/\s+/);
    if (order === 'short') {
      if (disp) return last.length < 2 ? disp : last[0] + ' ' + last[last.length - 1].charAt(0) + '.';
      const t = raw.split(/\s+/); return t.length < 2 ? raw : t[t.length - 1] + ' ' + t[0].charAt(0) + '.';
    }
    if (disp) return disp;
    const t = raw.split(/\s+/); return t.length < 2 ? raw : t[t.length - 1] + ' ' + t.slice(0, -1).join(' ');
  };
  // every pupil of the chosen class(es): {c: class, e: entry, id: unique key}
  const items = () => [current, current2].filter(Boolean).flatMap(c => (classes[c] || []).map(e => ({ c, e, id: c + '|' + nameOf(e) })));
  const present = () => items().filter(it => !absent.has(it.id));
  const label = it => show(it.e) + (current2 ? ' (' + it.c + ')' : '');   // class tag only when two classes are used
  const clearOutput = () => { $('#pickName').textContent = '—'; $('#groupsOut').innerHTML = ''; $('#mixInfo').textContent = ''; };

  const renderChips = () => {
    ['#pickChips', '#groupChips'].forEach(sel => {
      const box = $(sel); box.innerHTML = '';
      items().forEach(it => {
        const c = document.createElement('span');
        c.className = 'chip' + (absent.has(it.id) ? ' absent' : '') + (picked.has(it.id) ? ' picked' : '');
        c.textContent = label(it);
        c.title = absent.has(it.id) ? 'Absent — click to mark present' : 'Click to mark absent';
        c.onclick = () => { absent.has(it.id) ? absent.delete(it.id) : absent.add(it.id); renderChips(); };
        box.appendChild(c);
      });
    });
  };
  const refreshSelects = () => {
    if (!classes[current]) current = Object.keys(classes)[0];
    if (current2 && (!classes[current2] || current2 === current)) current2 = '';
    $$('.classSelect').forEach(sel => {
      sel.innerHTML = '';
      Object.keys(classes).forEach(c => sel.add(new Option(c, c, false, c === current)));
    });
    $$('.class2Select').forEach(sel => {
      sel.innerHTML = '';
      sel.add(new Option('— none —', '', false, !current2));
      Object.keys(classes).filter(c => c !== current).forEach(c => sel.add(new Option(c, c, false, c === current2)));
    });
    $$('.orderSelect').forEach(sel => sel.value = order);
    renderChips();
  };
  $$('.classSelect').forEach(sel => sel.onchange = () => {
    current = sel.value; absent.clear(); picked.clear(); saveClasses(); refreshSelects(); clearOutput();
  });
  $$('.class2Select').forEach(sel => sel.onchange = () => {
    current2 = sel.value; picked.clear(); refreshSelects(); clearOutput();
  });
  $$('.orderSelect').forEach(sel => sel.onchange = () => { order = sel.value; store.set('ct_order', order); refreshSelects(); });

  // dialog
  const dlg = $('#classDialog');
  let dlgKey = null;
  const loadDlg = key => {
    dlgKey = key;
    $('#dlgClass').innerHTML = '';
    manualKeys().forEach(c => $('#dlgClass').add(new Option(c, c, false, c === key)));
    $('#dlgName').value = key || '';
    $('#dlgNames').value = key ? (classes[key] || []).join('\n') : '';
  };
  $$('.manageBtn').forEach(b => b.onclick = () => { loadDlg(fromSheet.has(current) ? manualKeys()[0] : current); dlg.showModal(); });
  $('#dlgClass').onchange = e => loadDlg(e.target.value);
  $('#dlgNew').onclick = () => { dlgKey = null; $('#dlgName').value = ''; $('#dlgNames').value = ''; $('#dlgName').focus(); };
  $('#dlgDelete').onclick = () => {
    if (!dlgKey || !confirm(`Delete class "${dlgKey}"?`)) return;
    delete classes[dlgKey];
    if (!Object.keys(classes).length) classes = { 'New class': [] };
    saveClasses(); loadDlg(manualKeys()[0]); refreshSelects();
  };
  $('#dlgCancel').onclick = () => dlg.close();
  $('#dlgSave').onclick = () => {
    const name = $('#dlgName').value.trim() || 'Unnamed class';
    if (fromSheet.has(name)) { alert('A class from the Sheet already has this name. Please use another name.'); return; }
    const names = $('#dlgNames').value.split('\n').map(s => s.trim()).filter(Boolean);
    if (dlgKey && dlgKey !== name) delete classes[dlgKey];
    classes[name] = names; current = name; absent.clear(); picked.clear();
    saveClasses(); refreshSelects(); dlg.close();
  };

  // ---------- picker ----------
  let rolling = false;
  $('#pickBtn').onclick = () => {
    if (rolling) return;
    let pool = present().filter(it => !picked.has(it.id));
    if (!pool.length) { picked.clear(); pool = present(); }
    if (!pool.length) { $('#pickName').textContent = 'Add pupils first'; return; }
    const winner = pool[Math.floor(Math.random() * pool.length)];
    const all = present(); const el = $('#pickName');
    rolling = true; el.classList.add('rolling');
    let i = 0, delay = 50;
    const spin = () => {
      el.textContent = label(all[Math.floor(Math.random() * all.length)]);
      i++; delay *= 1.12;
      if (i < 15) setTimeout(spin, delay);
      else { el.textContent = label(winner); el.classList.remove('rolling'); picked.add(winner.id); rolling = false; renderChips(); }
    };
    spin();
  };
  $('#pickReset').onclick = () => { picked.clear(); $('#pickName').textContent = '—'; renderChips(); };

  // ---------- groups ----------
  // history[class][pairKey] = how many times two pupils were in the same group; "mix" picks the grouping with the fewest repeats
  const history = {};
  const pairKey = (a, b) => (a < b ? a + '|' + b : b + '|' + a);
  const shuffled = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const deal = (list, count) => { const g = Array.from({ length: count }, () => []); list.forEach((e, i) => g[i % count].push(e)); return g; };
  const eachPair = (groups, fn) => groups.forEach(g => { for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) fn(pairKey(g[i].id, g[j].id)); });
  const histKey = () => current + '+' + current2;
  $('#mixForget').onclick = () => { history[histKey()] = {}; $('#mixInfo').textContent = 'History cleared.'; };
  $('#groupBtn').onclick = () => {
    const list = present();
    const out = $('#groupsOut'); out.innerHTML = '';
    if (!list.length) { out.textContent = 'Add pupils first.'; return; }
    const n = Math.max(1, +$('#groupN').value || 1);
    const count = $('#groupMode').value === 'count' ? Math.min(n, list.length) : Math.max(1, Math.round(list.length / n));
    const h = history[histKey()] = history[histKey()] || {};
    const mix = $('#mixNew').checked;
    let best = null, bestCost = Infinity;
    for (let t = 0; t < (mix ? 400 : 1); t++) {
      const g = deal(shuffled(list), count);
      let cost = 0; if (mix) eachPair(g, k => { cost += h[k] || 0; });
      if (cost < bestCost) { best = g; bestCost = cost; if (cost === 0) break; }
    }
    eachPair(best, k => { h[k] = (h[k] || 0) + 1; });
    $('#mixInfo').textContent = mix ? (bestCost === 0 ? 'All combinations are new.' : `${bestCost} pair(s) were together before.`) : '';
    best.forEach((g, i) => {
      const d = document.createElement('div'); d.className = 'group';
      const hh = document.createElement('h3'); hh.textContent = `Group ${i + 1}`;
      const ul = document.createElement('ul');
      g.map(label).sort((a, b) => a.localeCompare(b, 'sl')).forEach(nm => { const li = document.createElement('li'); li.textContent = nm; ul.appendChild(li); });
      d.append(hh, ul); out.appendChild(d);
    });
  };

  // ---------- noise meter ----------
  let stream, analyser, raf, smooth = 0, loudSince = 0;
  const limitEl = $('#noiseLimit');
  const placeLimit = () => $('#meterLimit').style.left = limitEl.value + '%';
  limitEl.oninput = () => { placeLimit(); store.set('ct_noise', +limitEl.value); };
  limitEl.value = store.get('ct_noise', 60); placeLimit();

  const stopNoise = () => {
    cancelAnimationFrame(raf); stream?.getTracks().forEach(t => t.stop()); stream = null;
    $('#noiseBtn').textContent = 'Start'; $('#noiseMsg').textContent = 'Press start to listen';
    $('#meterFill').style.width = '0'; $('#noiseFace').textContent = '😊';
  };
  $('#noiseBtn').onclick = async () => {
    if (stream) return stopNoise();
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      $('#noiseMsg').textContent = 'Microphone not available'; return;
    }
    analyser = actx().createAnalyser(); analyser.fftSize = 1024;
    actx().createMediaStreamSource(stream).connect(analyser);
    const data = new Float32Array(analyser.fftSize);
    $('#noiseBtn').textContent = 'Stop';
    const loop = () => {
      analyser.getFloatTimeDomainData(data);
      let sum = 0; for (const v of data) sum += v * v;
      const db = 20 * Math.log10(Math.sqrt(sum / data.length) || 1e-8); // about -90 .. 0
      const level = Math.min(100, Math.max(0, (db + 70) * 1.6));
      smooth = smooth * 0.85 + level * 0.15;
      const lim = +limitEl.value;
      const fill = $('#meterFill'); fill.style.width = smooth + '%';
      let face, msg, col;
      if (smooth < lim * 0.7) { face = '😊'; msg = 'Nice and calm'; col = 'var(--good)'; loudSince = 0; }
      else if (smooth < lim) { face = '😐'; msg = 'Getting louder…'; col = 'var(--warn)'; loudSince = 0; }
      else {
        col = 'var(--bad)'; loudSince = loudSince || Date.now();
        face = '🤫'; msg = 'Too loud!';
      }
      fill.style.background = col;
      $('#noiseFace').textContent = face; $('#noiseMsg').textContent = msg;
      raf = requestAnimationFrame(loop);
    };
    loop();
  };

  // ---------- classes from the Google Sheet (teacher only; names stay in memory) ----------
  const bar = $('#sheetBar'), sheetMsg = $('#sheetMsg'), sheetBtn = $('#sheetBtn');
  let loading = false;
  const setBar = (text, ok) => { sheetMsg.textContent = text; bar.classList.toggle('ok', !!ok); };
  const loadFromSheet = async () => {
    const token = Track.token(); if (!token || loading) return;
    loading = true; setBar('Loading your classes…');
    try {
      const r = await fetch(Track.config.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'roster', token }) });
      const j = await r.json();
      if (!j.ok) { setBar(j.error === 'token' ? 'This Google account is not allowed to load the class lists.' : 'Could not load the classes.'); return; }
      const names = Object.keys(j.classes);
      if (!names.length) { setBar('The Roster in the Sheet is empty.'); return; }
      const mine = {}; manualKeys().forEach(k => { if (!j.classes[k] && k !== 'Example class') mine[k] = classes[k]; });
      fromSheet.clear(); classes = {};
      names.forEach(c => { classes[c] = j.classes[c].map(x => (Array.isArray(x) ? x : [x, ''])); fromSheet.add(c); });
      Object.assign(classes, mine);
      if (!classes[current]) current = names[0];
      absent.clear(); picked.clear();
      refreshSelects(); $('#pickName').textContent = '—'; $('#groupsOut').innerHTML = '';
      $('#sheetSlot').innerHTML = '';
      setBar(`✓ ${names.length} classes loaded from the Sheet (${j.year}). The names stay in this window only.`, true);
      sheetBtn.textContent = 'Reload';
    } catch (e) { setBar('Could not reach the Sheet. Check your connection.'); }
    finally { loading = false; }
  };
  sheetBtn.onclick = () => {
    if (Track.token()) return loadFromSheet();
    setBar('Sign in with your school Google account:'); Track.button($('#sheetSlot'));
  };
  if (window.Track && Track.enabled) {
    Track.onChange(() => { if (Track.token()) loadFromSheet(); });
    Track.init(() => { if (Track.token()) loadFromSheet(); });
  }

  refreshSelects();
})();
