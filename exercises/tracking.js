// ============================================================
//  PROGRESS TRACKING  -  "Sign in with Google" + save results
// ============================================================
//  Fill in the two values below after the setup in apps-script/SETUP.md.
//  While either is empty, tracking is switched off and the exercises
//  behave exactly as before (nothing is asked, nothing is sent).
//
//  clientId  OAuth "Web application" client ID from Google Cloud
//            (it is public by design - safe to keep in this repo)
//  endpoint  the Apps Script web app URL (ends in /exec)
//
//  What is sent for each finished activity: the student's Google ID
//  token (the server checks it and reads the e-mail from it), the class
//  id, the topic, the activity and the score. Nothing else.
// ============================================================

window.TRACK_CONFIG = {
  clientId: "723989491910-q0hi1qdpm23kag6fs11rir3o8gqkb0q5.apps.googleusercontent.com",
  endpoint: "https://script.google.com/macros/s/AKfycbwf96OMib0tzJDJ7tjKwihOEilm-4JXiN5i7pHxThuxf9B4Wid1tRqNo24M-fiYGFnJ/exec"
};

(() => {
  const cfg = window.TRACK_CONFIG;
  const enabled = !!(cfg.clientId && cfg.endpoint);
  const KEY = 'ec_credential';
  let credential = null, email = '', pending = [], onChange = () => {};

  const parse = tok => {
    try { return JSON.parse(atob(tok.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); }
    catch (e) { return null; }
  };
  const valid = tok => { const p = tok && parse(tok); return !!p && p.exp * 1000 > Date.now() + 60000; };

  const setCredential = tok => {
    credential = tok; const p = tok && parse(tok); email = p ? p.email : '';
    try { tok ? sessionStorage.setItem(KEY, tok) : sessionStorage.removeItem(KEY); } catch (e) {}
    onChange();
    if (valid(tok)) flush();
  };

  const send = async item => {
    try {
      // text/plain keeps this a "simple" request, so Apps Script needs no CORS preflight
      const r = await fetch(cfg.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(Object.assign({ token: credential }, item.data))
      });
      const j = await r.json();
      if (j.ok) return 'saved';
      return j.error === 'token' ? 'expired' : 'error';
    } catch (e) { return 'error'; }
  };

  let flushing = false;
  const flush = async () => {
    if (flushing) return;
    flushing = true;
    try {
      while (pending.length && valid(credential)) {
        const item = pending[0];
        const res = await send(item);
        if (res === 'expired') { setCredential(null); return; }
        if (res === 'error' && ++item.tries < 3) {   // tell the pupil, try again in a few seconds (the result id makes a repeat harmless)
          item.done('retry'); setTimeout(flush, 4000 * item.tries); return;
        }
        pending.shift(); item.done(res);
      }
    } finally { flushing = false; }
  };

  window.Track = {
    enabled,
    config: cfg,
    get email() { return email; },
    token() { return valid(credential) ? credential : null; },   // current Google ID token, or null
    onChange: fn => { onChange = fn; },
    // save one result; cb(status) with 'saved' | 'error' | 'signin' (not signed in / session ran out)
    save(data, cb) {
      if (!enabled) return cb('off');
      if (!valid(credential)) { pending.push({ data, tries: 0, done: cb }); cb('signin'); return; }
      pending.push({ data, tries: 0, done: cb }); flush();
    },
    signOut() {
      if (window.google && email) google.accounts.id.disableAutoSelect();
      setCredential(null);
    },
    // draw the Google button into `box`
    button(box) {
      if (!enabled || !window.google) return;
      box.innerHTML = '';
      google.accounts.id.renderButton(box, { theme: 'outline', size: 'medium', text: 'signin_with', shape: 'pill' });
    },
    init(done) {
      if (!enabled) return done && done();
      try { const t = sessionStorage.getItem(KEY); if (valid(t)) { credential = t; email = parse(t).email; } } catch (e) {}
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
      s.onload = () => {
        google.accounts.id.initialize({
          client_id: cfg.clientId, callback: r => setCredential(r.credential),
          auto_select: true, use_fedcm_for_prompt: true
        });
        if (!valid(credential)) google.accounts.id.prompt();
        done && done();
      };
      s.onerror = () => done && done();
      document.head.append(s);
    }
  };
})();
