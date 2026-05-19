<template>
  <div class="site">
    <!-- HEADER -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <a href="#" class="logo" @click.prevent="scrollTo('hero')">
          <span class="logo__icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2C9.373 2 4 7.373 4 14c0 4.418 2.239 8.309 5.636 10.6V26a2 2 0 002 2h8.728a2 2 0 002-2v-1.4C25.761 22.309 28 18.418 28 14c0-6.627-5.373-12-12-12z" fill="url(#grad)" opacity="0.9"/>
              <path d="M13 26v2h6v-2H13zm-1-4h8v2h-8v-2z" fill="#F59E0B" opacity="0.7"/>
              <circle cx="16" cy="13" r="4" fill="#FDE68A" opacity="0.8"/>
              <defs>
                <linearGradient id="grad" x1="4" y1="2" x2="28" y2="28">
                  <stop offset="0%" stop-color="#F59E0B"/>
                  <stop offset="100%" stop-color="#B45309"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="logo__text">Kalilnica <span class="logo__accent">idej</span></span>
        </a>

        <nav class="nav" :class="{ open: menuOpen }">
          <a class="nav__link" href="#" @click.prevent="scrollTo('hero'); menuOpen = false">Domov</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('blog'); menuOpen = false">Članki</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('about'); menuOpen = false">O blogu</a>
          <a class="nav__cta" href="#" @click.prevent="scrollTo('blog'); menuOpen = false">Beri zdaj</a>
        </nav>

        <button class="burger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }" aria-label="Meni">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- HERO -->
    <section id="hero" class="hero">
      <div class="hero__bg">
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__grid"></div>
      </div>
      <div class="container hero__content">
        <span class="hero__badge">✦ Dobrodošli v kalilnici</span>
        <h1 class="hero__title">
          Vsaka velika stvar<br>
          se začne kot <span class="hero__highlight">majhna ideja</span>
        </h1>
        <p class="hero__sub">
          Prostor za misli, ki ne dajo spati. Za ideje, ki čakajo, da jih nekdo izreče.
          Za vprašanja, na katera nimamo odgovorov — še ne.
        </p>
        <div class="hero__actions">
          <a href="#" class="btn btn--primary" @click.prevent="scrollTo('blog')">
            Odkrijte ideje
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#" class="btn btn--ghost" @click.prevent="scrollTo('about')">O projektu</a>
        </div>
        <div class="hero__stats">
          <div class="stat"><span class="stat__num">47</span><span class="stat__lbl">Objavljenih idej</span></div>
          <div class="stat__div"></div>
          <div class="stat"><span class="stat__num">12</span><span class="stat__lbl">Kategorij</span></div>
          <div class="stat__div"></div>
          <div class="stat"><span class="stat__num">3</span><span class="stat__lbl">Leta pisanja</span></div>
        </div>
      </div>
      <div class="hero__scroll" @click="scrollTo('blog')">
        <span>Scrolla dol</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>

    <!-- BLOG -->
    <section id="blog" class="blog">
      <div class="container">
        <div class="section-head">
          <span class="section-label">✦ Zadnje objave</span>
          <h2 class="section-title">Sveže iz kalilnice</h2>
          <p class="section-sub">Izbrane misli in ideje, ki so vredne vašega časa.</p>
        </div>

        <div class="articles">
          <article class="card card--featured" v-for="(post, i) in featuredPost" :key="'f'+i">
            <div class="card__img-wrap">
              <div class="card__img" :style="{ background: post.gradient }">
                <span class="card__emoji">{{ post.emoji }}</span>
              </div>
              <span class="card__tag">{{ post.tag }}</span>
            </div>
            <div class="card__body">
              <div class="card__meta">
                <span class="card__date">{{ post.date }}</span>
                <span class="card__read">{{ post.read }} min branja</span>
              </div>
              <h3 class="card__title">{{ post.title }}</h3>
              <p class="card__excerpt">{{ post.excerpt }}</p>
              <a href="#" class="card__link" @click.prevent>
                Preberi celoten članek
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </article>

          <div class="side-articles">
            <article class="card card--side" v-for="(post, i) in sidePosts" :key="'s'+i">
              <div class="card__img-wrap card__img-wrap--sm">
                <div class="card__img card__img--sm" :style="{ background: post.gradient }">
                  <span class="card__emoji card__emoji--sm">{{ post.emoji }}</span>
                </div>
                <span class="card__tag card__tag--sm">{{ post.tag }}</span>
              </div>
              <div class="card__body">
                <div class="card__meta">
                  <span class="card__date">{{ post.date }}</span>
                  <span class="card__read">{{ post.read }} min</span>
                </div>
                <h3 class="card__title card__title--sm">{{ post.title }}</h3>
                <p class="card__excerpt card__excerpt--sm">{{ post.excerpt }}</p>
                <a href="#" class="card__link" @click.prevent>
                  Preberi
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about">
      <div class="container about__inner">
        <div class="about__visual">
          <div class="about__quote-card">
            <svg class="about__quote-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 18c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6v2h6v10H8V18zm16 0c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6v2h6v10H24V18z" fill="#F59E0B" opacity="0.6"/>
            </svg>
            <p class="about__quote-text">
              "Ideje so kot semena — potrebujejo pravo zemljo, da vzkalijo. Ta blog je tista zemlja."
            </p>
            <div class="about__quote-author">
              <div class="about__avatar"></div>
              <div>
                <strong>Avtor bloga</strong>
                <span>Mislec, pisec, sanjač</span>
              </div>
            </div>
          </div>
          <div class="about__deco about__deco--1"></div>
          <div class="about__deco about__deco--2"></div>
        </div>

        <div class="about__text">
          <span class="section-label">✦ O Kalilnici</span>
          <h2 class="section-title">Kje se ideje<br>spremenijo v besede</h2>
          <p>
            Kalilnica idej je prostor, kjer se misli ne bojijo biti nedokončane. Tukaj pišemo o tem,
            kar nas navdušuje, bega ali navdihuje — brez filtrov in brez pretvarjanja.
          </p>
          <p>
            Verjamemo, da je vsaka ideja vredna pozornosti, vsako vprašanje vredno zastavljanja
            in vsaka izkušnja — dobra ali slaba — vredna deliti.
          </p>
          <ul class="about__list">
            <li v-for="item in aboutList" :key="item">
              <span class="about__check">✦</span>{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter">
      <div class="container newsletter__inner">
        <div class="newsletter__orb"></div>
        <span class="section-label">✦ Ostanite v stiku</span>
        <h2 class="newsletter__title">Ne zamudite nobene ideje</h2>
        <p class="newsletter__sub">Vsak teden ena misel, ki bo morda spremenila vaš dan.</p>
        <form class="newsletter__form" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="vas@email.com"
            class="newsletter__input"
            :class="{ success: subscribed }"
          />
          <button type="submit" class="btn btn--primary" :disabled="subscribed">
            {{ subscribed ? '✓ Prijavljeni!' : 'Prijava' }}
          </button>
        </form>
        <p class="newsletter__note">Brez neželene pošte. Odjava kadarkoli.</p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <a href="#" class="logo" @click.prevent="scrollTo('hero')">
            <span class="logo__icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C9.373 2 4 7.373 4 14c0 4.418 2.239 8.309 5.636 10.6V26a2 2 0 002 2h8.728a2 2 0 002-2v-1.4C25.761 22.309 28 18.418 28 14c0-6.627-5.373-12-12-12z" fill="url(#grad2)" opacity="0.9"/>
                <circle cx="16" cy="13" r="4" fill="#FDE68A" opacity="0.8"/>
                <defs>
                  <linearGradient id="grad2" x1="4" y1="2" x2="28" y2="28">
                    <stop offset="0%" stop-color="#F59E0B"/>
                    <stop offset="100%" stop-color="#B45309"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span class="logo__text">Kalilnica <span class="logo__accent">idej</span></span>
          </a>
          <p class="footer__tagline">Prostor za misli, ki štejejo.</p>
          <div class="footer__social">
            <a href="#" class="social-btn" @click.prevent aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="social-btn" @click.prevent aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" class="social-btn" @click.prevent aria-label="RSS">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11a9 9 0 019 9"/><path d="M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <div class="footer__links">
          <div class="footer__col">
            <h4>Navigacija</h4>
            <a href="#" @click.prevent="scrollTo('hero')">Domov</a>
            <a href="#" @click.prevent="scrollTo('blog')">Članki</a>
            <a href="#" @click.prevent="scrollTo('about')">O blogu</a>
          </div>
          <div class="footer__col">
            <h4>Kategorije</h4>
            <a href="#" @click.prevent>Filozofija</a>
            <a href="#" @click.prevent>Ustvarjalnost</a>
            <a href="#" @click.prevent>Psihologija</a>
            <a href="#" @click.prevent>Življenje</a>
          </div>
          <div class="footer__col">
            <h4>Več</h4>
            <a href="#" @click.prevent>Zasebnost</a>
            <a href="#" @click.prevent>Pogoji</a>
            <a href="#" @click.prevent>Kontakt</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="container">
          <span>© 2026 Kalilnica idej. Vse pravice pridržane.</span>
          <span>Narejeno z <span class="footer__heart">♥</span> in veliko kave.</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)
const email = ref('')
const subscribed = ref(false)

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const subscribe = () => {
  if (email.value) {
    subscribed.value = true
    setTimeout(() => { subscribed.value = false; email.value = '' }, 3000)
  }
}

const onScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const featuredPost = [{
  title: 'Zakaj je neuspeh najboljši učitelj, ki ga nikoli nismo prosili',
  excerpt: 'Vsak padec pusti brazgotino. Toda brazgotine niso le spomini na bolečino — so zemljevidi naše rasti. Kaj če bi začeli neuspeh gledati ne kot konec, ampak kot začetek novega poglavja?',
  tag: 'Osebna rast',
  date: '15. maj 2026',
  read: 7,
  emoji: '🔥',
  gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #1f0f00 100%)'
}]

const sidePosts = [
  {
    title: 'Umetnost počasnega razmišljanja v svetu hitrih odgovorov',
    excerpt: 'Živimo v dobi takojšnjih odgovorov. A kaj se zgodi, ko si vzamemo čas? Ko pustimo misli dozorevati kot vino v hladni kleti?',
    tag: 'Filozofija',
    date: '8. maj 2026',
    read: 5,
    emoji: '🌊',
    gradient: 'linear-gradient(135deg, #00111a 0%, #00253d 50%, #001020 100%)'
  },
  {
    title: 'Ko ideja postane resničnost: pet korakov od sanje do dejanja',
    excerpt: 'Ideje so poceni. Vsak jih ima. Toda le redki naredijo tisti ključni korak — od razmišljanja k delovanju. Kako prečkamo to vrzel?',
    tag: 'Ustvarjalnost',
    date: '1. maj 2026',
    read: 6,
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #0d0a1a 0%, #1a1040 50%, #0a0820 100%)'
  }
]

const aboutList = [
  'Iskreno pisanje brez korporativnega žargona',
  'Ideje, ki spodbujajo razmišljanje',
  'Skupnost radovednih mislecev',
  'Novi članki vsak teden'
]
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #F59E0B;
  --amber-light: #FDE68A;
  --amber-dark: #B45309;
  --amber-dim: rgba(245, 158, 11, 0.12);
  --bg: #080810;
  --bg-2: #0e0e1a;
  --bg-card: #111120;
  --bg-card-2: #13131f;
  --border: rgba(245, 158, 11, 0.15);
  --border-2: rgba(255,255,255,0.06);
  --text: #E8E8F0;
  --text-muted: #8888a8;
  --text-dim: #5a5a78;
  --radius: 16px;
  --radius-sm: 10px;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
}

.site { min-height: 100vh; }
.container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }

/* HEADER */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 20px 0;
  transition: all 0.3s ease;
}
.header.scrolled {
  background: rgba(8, 8, 16, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
}
.header__inner { display: flex; align-items: center; justify-content: space-between; }

.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo__icon { display: flex; align-items: center; filter: drop-shadow(0 0 8px rgba(245,158,11,0.4)); }
.logo__text { font-size: 1.25rem; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
.logo__accent { color: var(--amber); }

.nav { display: flex; align-items: center; gap: 8px; }
.nav__link {
  color: var(--text-muted); text-decoration: none; padding: 8px 16px;
  border-radius: 8px; font-size: 0.9rem; transition: all 0.2s;
}
.nav__link:hover { color: var(--text); background: var(--border-2); }
.nav__cta {
  color: var(--bg); background: var(--amber); text-decoration: none;
  padding: 8px 20px; border-radius: 8px; font-size: 0.9rem; font-weight: 600;
  transition: all 0.2s; margin-left: 8px;
}
.nav__cta:hover { background: var(--amber-light); transform: translateY(-1px); }

.burger {
  display: none; flex-direction: column; gap: 5px; background: none; border: none;
  cursor: pointer; padding: 4px;
}
.burger span {
  display: block; width: 24px; height: 2px; background: var(--text);
  border-radius: 2px; transition: all 0.3s;
}
.burger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.burger.active span:nth-child(2) { opacity: 0; }
.burger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* HERO */
.hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; overflow: hidden;
  padding: 120px 0 80px;
}
.hero__bg { position: absolute; inset: 0; pointer-events: none; }
.hero__orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.15;
  animation: pulse 8s ease-in-out infinite;
}
.hero__orb--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #F59E0B, transparent);
  top: -200px; left: -100px;
}
.hero__orb--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #B45309, transparent);
  bottom: -100px; right: -50px;
  animation-delay: -4s;
}
.hero__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
}

.hero__content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: flex-start; gap: 28px;
  max-width: 820px;
}
.hero__badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--amber-dim); border: 1px solid var(--border);
  color: var(--amber); padding: 6px 16px; border-radius: 40px;
  font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
}
.hero__title {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 800; line-height: 1.1;
  letter-spacing: -0.03em; color: #fff;
}
.hero__highlight {
  background: linear-gradient(135deg, var(--amber), var(--amber-light));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero__sub {
  font-size: 1.1rem; color: var(--text-muted); max-width: 560px; line-height: 1.8;
}
.hero__actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 26px; border-radius: 10px; font-size: 0.95rem;
  font-weight: 600; text-decoration: none; cursor: pointer;
  border: none; transition: all 0.25s; white-space: nowrap;
}
.btn--primary { background: var(--amber); color: var(--bg); }
.btn--primary:hover { background: var(--amber-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.3); }
.btn--primary:disabled { opacity: 0.7; cursor: default; transform: none; }
.btn--ghost { background: var(--border-2); color: var(--text); border: 1px solid var(--border-2); }
.btn--ghost:hover { background: rgba(255,255,255,0.08); border-color: var(--border); }

.hero__stats {
  display: flex; align-items: center; gap: 24px; margin-top: 12px;
  padding-top: 24px; border-top: 1px solid var(--border-2); width: 100%;
}
.stat { display: flex; flex-direction: column; }
.stat__num { font-size: 1.6rem; font-weight: 800; color: var(--amber); letter-spacing: -0.02em; }
.stat__lbl { font-size: 0.78rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.06em; }
.stat__div { width: 1px; height: 40px; background: var(--border-2); }

.hero__scroll {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  cursor: pointer; color: var(--text-dim); font-size: 0.78rem;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.hero__scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--amber), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

/* BLOG */
.blog { padding: 100px 0; background: var(--bg-2); }
.section-head { text-align: center; margin-bottom: 60px; }
.section-label {
  display: inline-block; color: var(--amber);
  font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px;
}
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1.2;
  margin-bottom: 14px;
}
.section-sub { color: var(--text-muted); font-size: 1rem; }

.articles { display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start; }
.side-articles { display: flex; flex-direction: column; gap: 20px; }

.card {
  background: var(--bg-card); border: 1px solid var(--border-2);
  border-radius: var(--radius); overflow: hidden; transition: all 0.3s ease;
}
.card:hover { border-color: var(--border); transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }

.card__img-wrap { position: relative; }
.card__img { height: 240px; display: flex; align-items: center; justify-content: center; }
.card__img--sm { height: 120px; }
.card__emoji { font-size: 4rem; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5)); }
.card__emoji--sm { font-size: 2.4rem; }
.card__tag {
  position: absolute; top: 14px; left: 14px;
  background: var(--amber-dim); border: 1px solid var(--border);
  color: var(--amber); padding: 4px 12px; border-radius: 40px;
  font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
}
.card__tag--sm { font-size: 0.68rem; padding: 3px 10px; }

.card__body { padding: 24px; }
.card--side .card__body { padding: 18px; }
.card__meta { display: flex; gap: 12px; margin-bottom: 12px; }
.card__date, .card__read { font-size: 0.78rem; color: var(--text-dim); }
.card__read::before { content: '·'; margin-right: 12px; }
.card__title { font-size: 1.2rem; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 12px; letter-spacing: -0.01em; }
.card__title--sm { font-size: 0.97rem; }
.card__excerpt { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 20px; }
.card__excerpt--sm { font-size: 0.85rem; margin-bottom: 14px; -webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
.card__link {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--amber); text-decoration: none; font-size: 0.85rem;
  font-weight: 600; transition: gap 0.2s;
}
.card__link:hover { gap: 10px; }

/* ABOUT */
.about { padding: 100px 0; }
.about__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.about__visual { position: relative; }
.about__quote-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 36px; position: relative; z-index: 1;
}
.about__quote-icon { margin-bottom: 16px; }
.about__quote-text { font-size: 1.1rem; line-height: 1.7; color: var(--text); font-style: italic; margin-bottom: 24px; }
.about__quote-author { display: flex; align-items: center; gap: 14px; }
.about__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--amber-dark), var(--amber));
  border: 2px solid var(--amber-dim); flex-shrink: 0;
}
.about__quote-author strong { display: block; color: #fff; font-size: 0.9rem; }
.about__quote-author span { color: var(--text-dim); font-size: 0.8rem; }
.about__deco {
  position: absolute; border-radius: 50%;
  filter: blur(40px); opacity: 0.08; pointer-events: none;
}
.about__deco--1 { width: 300px; height: 300px; background: var(--amber); top: -80px; right: -60px; }
.about__deco--2 { width: 200px; height: 200px; background: var(--amber); bottom: -60px; left: -40px; }

.about__text { display: flex; flex-direction: column; gap: 20px; }
.about__text .section-title { text-align: left; margin-bottom: 0; }
.about__text p { color: var(--text-muted); line-height: 1.8; }
.about__list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.about__list li { display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 0.95rem; }
.about__check { color: var(--amber); font-size: 0.7rem; flex-shrink: 0; }

/* NEWSLETTER */
.newsletter { padding: 100px 0; background: var(--bg-2); position: relative; overflow: hidden; }
.newsletter__orb {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(245,158,11,0.06), transparent);
  pointer-events: none;
}
.newsletter__inner {
  position: relative; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  max-width: 560px; margin: 0 auto;
}
.newsletter__title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; }
.newsletter__sub { color: var(--text-muted); }
.newsletter__form { display: flex; gap: 10px; width: 100%; }
.newsletter__input {
  flex: 1; background: var(--bg-card); border: 1px solid var(--border-2);
  color: var(--text); padding: 12px 18px; border-radius: 10px;
  font-size: 0.95rem; outline: none; transition: border-color 0.2s;
}
.newsletter__input:focus { border-color: var(--amber); }
.newsletter__input.success { border-color: #22c55e; }
.newsletter__input::placeholder { color: var(--text-dim); }
.newsletter__note { font-size: 0.8rem; color: var(--text-dim); }

/* FOOTER */
.footer { padding: 60px 0 0; border-top: 1px solid var(--border-2); }
.footer__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; padding-bottom: 60px; }
.footer__brand { display: flex; flex-direction: column; gap: 16px; max-width: 280px; }
.footer__tagline { color: var(--text-dim); font-size: 0.88rem; }
.footer__social { display: flex; gap: 10px; margin-top: 4px; }
.social-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  background: var(--border-2); border: 1px solid var(--border-2);
  color: var(--text-muted); text-decoration: none; transition: all 0.2s;
}
.social-btn:hover { background: var(--amber-dim); border-color: var(--border); color: var(--amber); }

.footer__links { display: flex; gap: 60px; }
.footer__col { display: flex; flex-direction: column; gap: 12px; }
.footer__col h4 { color: #fff; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px; }
.footer__col a { color: var(--text-dim); text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
.footer__col a:hover { color: var(--amber); }
.footer__bottom { border-top: 1px solid var(--border-2); padding: 20px 0; font-size: 0.82rem; color: var(--text-dim); }
.footer__bottom .container { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.footer__heart { color: #ef4444; }

/* ANIMATIONS */
@keyframes pulse {
  0%, 100% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.1) translate(20px, -20px); }
}
@keyframes scrollLine {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .articles { grid-template-columns: 1fr; }
  .side-articles { flex-direction: row; }
  .about__inner { grid-template-columns: 1fr; gap: 48px; }
  .footer__inner { grid-template-columns: 1fr; gap: 40px; }
  .footer__links { gap: 40px; }
}

@media (max-width: 680px) {
  .nav {
    display: none; flex-direction: column;
    position: absolute; top: 100%; left: 0; right: 0;
    background: rgba(8,8,16,0.97); border-bottom: 1px solid var(--border);
    padding: 16px 24px 20px; gap: 4px;
  }
  .nav.open { display: flex; }
  .nav__link, .nav__cta { width: 100%; text-align: center; }
  .burger { display: flex; }
  .header__inner { position: relative; }
  .side-articles { flex-direction: column; }
  .hero__stats { flex-wrap: wrap; gap: 20px; }
  .newsletter__form { flex-direction: column; }
  .footer__links { flex-wrap: wrap; gap: 32px; }
  .hero__scroll { display: none; }
}
</style>
