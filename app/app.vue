<template>
  <NuxtPage />
</template>

<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700;800&display=swap' }
  ]
})
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue:    #4F46E5;
  --blue-lt: #818CF8;
  --cyan:    #06B6D4;
  --cyan-lt: #67E8F9;
  --bg:      #07070f;
  --bg2:     #0b0b18;
  --glass:   rgba(255,255,255,0.028);
  --border:  rgba(255,255,255,0.07);
  --ba:      rgba(79,70,229,0.28);
  --text:    #EEF2FF;
  --muted:   rgba(238,242,255,0.48);
  --dim:     rgba(238,242,255,0.22);
  --grad:    linear-gradient(135deg, #4F46E5, #06B6D4);
  --r:       16px;
}

html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg); color: var(--text);
  line-height: 1.7; overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.site { min-height: 100vh; }
.container { max-width: 1180px; margin: 0 auto; padding: 0 28px; }

/* ── UTILITIES ── */
.grad-text {
  background: var(--grad);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity: 1; transform: none; }
.eyebrow {
  display: inline-block; font-size: .7rem; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase; color: var(--cyan); margin-bottom: 12px;
}
.sec-title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(2rem,4vw,3.2rem); font-weight: 800; letter-spacing: -.04em; color: #fff; line-height: 1.12;
}
.sec-sub { color: var(--muted); font-size: 1rem; margin-top: 12px; }

/* ── BUTTONS ── */
.btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 10px;
  font-family: 'Space Grotesk', system-ui, sans-serif; font-size: .92rem; font-weight: 700;
  text-decoration: none; cursor: pointer; border: none; transition: all .25s; white-space: nowrap;
}
.btn--primary { background: var(--grad); color: #fff; box-shadow: 0 4px 24px rgba(79,70,229,.4); }
.btn--primary:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(79,70,229,.55); }
.btn--primary:disabled { opacity: .7; cursor: default; transform: none; }
.btn--ghost { background: var(--glass); color: var(--text); border: 1px solid var(--border); backdrop-filter: blur(12px); }
.btn--ghost:hover { background: rgba(255,255,255,.055); border-color: var(--ba); }
.btn--sm { padding: 8px 16px; font-size: .82rem; border-radius: 8px; }
.btn--danger { background: rgba(239,68,68,.15); color: #fca5a5; border: 1px solid rgba(239,68,68,.3); }
.btn--danger:hover { background: rgba(239,68,68,.25); }

/* ── HEADER ── */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 22px 0; transition: padding .3s, background .3s, border-color .3s;
}
.header.scrolled {
  background: rgba(7,7,15,.88); backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid var(--border); padding: 14px 0;
}
.header__inner { display: flex; align-items: center; justify-content: space-between; }
.logo { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
.logo__mark { display: flex; filter: drop-shadow(0 0 10px rgba(79,70,229,.4)); }
.logo__name { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.18rem; font-weight: 700; color: var(--text); }
.logo__name em { font-style: normal; color: var(--blue-lt); }
.nav { display: flex; align-items: center; gap: 4px; }
.nav__link {
  color: var(--muted); text-decoration: none; padding: 8px 16px; border-radius: 8px;
  font-size: .88rem; font-weight: 500; transition: color .2s, background .2s;
}
.nav__link:hover { color: var(--text); background: rgba(255,255,255,.04); }
.nav__cta {
  margin-left: 8px; display: inline-flex; align-items: center; padding: 9px 20px; border-radius: 8px;
  font-size: .88rem; font-weight: 700; text-decoration: none;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  background: rgba(79,70,229,.12); border: 1px solid var(--ba); color: var(--blue-lt); transition: all .2s;
}
.nav__cta:hover { background: rgba(79,70,229,.22); border-color: var(--blue); }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.burger span { display: block; width: 22px; height: 1.5px; background: var(--text); border-radius: 2px; transition: all .3s; }
.burger.active span:nth-child(1) { transform: rotate(45deg) translate(4.8px,4.8px); }
.burger.active span:nth-child(2) { opacity: 0; }
.burger.active span:nth-child(3) { transform: rotate(-45deg) translate(4.8px,-4.8px); }

/* ── POST CARDS (shared) ── */
.post {
  background: var(--glass); border: 1px solid var(--border); border-radius: var(--r);
  overflow: hidden; backdrop-filter: blur(10px);
  transition: border-color .3s, transform .3s, box-shadow .3s;
  display: flex; flex-direction: column;
}
.post:hover { border-color: var(--ba); transform: translateY(-5px); box-shadow: 0 28px 60px rgba(79,70,229,.15); }
.post__vis { height: 180px; position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.post__glyph { font-size: 3.4rem; filter: drop-shadow(0 4px 14px rgba(0,0,0,.5)); }
.post__tag {
  position: absolute; top: 14px; left: 14px; background: rgba(255,255,255,.09);
  border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(8px); color: rgba(255,255,255,.9);
  padding: 4px 12px; border-radius: 100px; font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
}
.post__body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.post__meta { display: flex; gap: 14px; font-size: .73rem; color: var(--dim); }
.post__title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.02rem; font-weight: 700; color: #fff; line-height: 1.35; letter-spacing: -.01em; }
.post__excerpt { font-size: .86rem; color: var(--muted); line-height: 1.7; flex: 1; }
.post__link {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 6px;
  color: var(--blue-lt); text-decoration: none; font-size: .82rem; font-weight: 600; transition: gap .2s, color .2s;
}
.post__link:hover { gap: 10px; color: var(--cyan-lt); }

/* ── FOOTER ── */
.footer { padding: 64px 0 0; border-top: 1px solid var(--border); }
.footer__grid { display: grid; grid-template-columns: 1fr 2fr; gap: 60px; padding-bottom: 60px; }
.footer__brand { display: flex; flex-direction: column; gap: 14px; max-width: 260px; }
.footer__brand p { color: var(--dim); font-size: .87rem; }
.footer__social { display: flex; gap: 10px; margin-top: 4px; }
.footer__social a {
  display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px;
  background: var(--glass); border: 1px solid var(--border); color: var(--muted); text-decoration: none; transition: all .2s;
}
.footer__social a:hover { background: rgba(79,70,229,.1); border-color: var(--ba); color: var(--blue-lt); }
.footer__links { display: flex; gap: 56px; justify-content: flex-end; }
.footer__col { display: flex; flex-direction: column; gap: 10px; }
.footer__col h4 { font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--text); margin-bottom: 4px; }
.footer__col a { color: var(--dim); text-decoration: none; font-size: .87rem; transition: color .2s; }
.footer__col a:hover { color: var(--blue-lt); }
.footer__bar { border-top: 1px solid var(--border); padding: 20px 0; }
.footer__bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: .8rem; color: var(--dim); }
.heart { color: #f87171; }

/* ── ANIMATIONS ── */
@keyframes blink { 0%,100%{opacity:1;box-shadow:0 0 9px var(--cyan)}50%{opacity:.35;box-shadow:none} }
@keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-9px)} }

/* ── RESPONSIVE HEADER ── */
@media (max-width: 680px) {
  .nav {
    display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0;
    background: rgba(7,7,15,.97); border-bottom: 1px solid var(--border); padding: 16px 28px 22px; gap: 4px;
  }
  .nav.open { display: flex; }
  .nav__link, .nav__cta { width: 100%; text-align: center; }
  .burger { display: flex; }
  .header__inner { position: relative; }
  .footer__grid { grid-template-columns: 1fr; gap: 40px; }
  .footer__links { justify-content: flex-start; flex-wrap: wrap; gap: 28px; }
}
</style>
