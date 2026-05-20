<template>
  <div class="site">
    <!-- HEADER -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <a href="#" class="logo" @click.prevent="scrollTo('hero')">
          <span class="logo__icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#22c55e" opacity="0.15"/>
              <circle cx="16" cy="16" r="8" fill="#22c55e" opacity="0.4"/>
              <circle cx="16" cy="16" r="4" fill="#22c55e"/>
            </svg>
          </span>
          <span class="logo__text">Kalilnica <span class="logo__accent">idej</span></span>
        </a>
        <nav class="nav" :class="{ open: menuOpen }">
          <a class="nav__link" href="#" @click.prevent="scrollTo('hero'); menuOpen=false">Domov</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('blog'); menuOpen=false">Članki</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('about'); menuOpen=false">O blogu</a>
          <a class="nav__cta" href="#" @click.prevent="scrollTo('blog'); menuOpen=false">Beri zdaj</a>
        </nav>
        <button class="burger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }">
          <span></span><span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero__bg"></div>
      <div class="container hero__content">
        <div class="hero__badge">✦ DOBRODOŠLI V KALILNICI</div>
        <h1 class="hero__title">
          Vsaka velika stvar<br>
          se začne kot <span class="accent">majhna ideja</span>
        </h1>
        <p class="hero__sub">Prostor za misli, ki ne dajo spati. Za ideje, ki čakajo, da jih nekdo izreče. Za vprašanja, na katera nimamo odgovorov — še ne.</p>
        <div class="hero__btns">
          <a href="#" class="btn btn--primary" @click.prevent="scrollTo('blog')">Odkrijte ideje →</a>
          <a href="#" class="btn btn--ghost" @click.prevent="scrollTo('about')">O projektu</a>
        </div>
        <div class="hero__stats">
          <div class="stat"><span class="stat__num">47</span><span class="stat__label">OBJAVLJENIH IDEJ</span></div>
          <div class="stat__divider"></div>
          <div class="stat"><span class="stat__num">12</span><span class="stat__label">KATEGORIJ</span></div>
          <div class="stat__divider"></div>
          <div class="stat"><span class="stat__num">3</span><span class="stat__label">LETA PISANJA</span></div>
        </div>
      </div>
      <div class="hero__scroll">SCROLLA DOL</div>
    </section>

    <!-- BLOG -->
    <section class="blog" id="blog">
      <div class="container">
        <div class="section__header">
          <span class="section__tag">✦ NAJNOVEJŠE</span>
          <h2 class="section__title">Sveže <span class="accent">ideje</span></h2>
          <p class="section__sub">Misli, zapisane z namenom.</p>
        </div>
        <div class="cards">
          <article class="card" v-for="post in posts" :key="post.id">
            <div class="card__top">
              <span class="card__cat">{{ post.cat }}</span>
              <span class="card__time">{{ post.time }}</span>
            </div>
            <h3 class="card__title">{{ post.title }}</h3>
            <p class="card__excerpt">{{ post.excerpt }}</p>
            <a href="#" class="card__link">Preberi več →</a>
          </article>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about" id="about">
      <div class="container about__inner">
        <div class="about__text">
          <span class="section__tag">✦ O BLOGU</span>
          <h2 class="section__title">Zakaj <span class="accent">Kalilnica?</span></h2>
          <p>Kalilnica idej je prostor, kjer se misli kalijo — kot jeklo v ognju. Tukaj ni prostora za površnost. Vsak zapis je poskus razumeti svet malo bolje.</p>
          <p>Pišemo o tehnologiji, ustvarjalnosti, filozofiji vsakdana in vsem vmes.</p>
          <a href="#" class="btn btn--primary" @click.prevent="scrollTo('blog')">Beri članke →</a>
        </div>
        <div class="about__visual">
          <div class="about__orb"></div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter">
      <div class="container newsletter__inner">
        <h2 class="section__title">Ostani v <span class="accent">zanki</span></h2>
        <p>Nove ideje direktno v tvoj nabiralnik. Brez spama.</p>
        <div class="newsletter__form">
          <input type="email" placeholder="tvoj@email.com" class="newsletter__input"/>
          <button class="btn btn--primary">Naroči se →</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="logo__text">Kalilnica <span class="logo__accent">idej</span></span>
          <p>Prostor za misli, ki štejejo.</p>
        </div>
        <div class="footer__links">
          <a href="#" @click.prevent="scrollTo('hero')">Domov</a>
          <a href="#" @click.prevent="scrollTo('blog')">Članki</a>
          <a href="#" @click.prevent="scrollTo('about')">O blogu</a>
        </div>
        <div class="footer__social">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </div>
      <div class="footer__copy">© 2025 Kalilnica idej · Vse pravice pridržane</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const posts = [
  { id: 1, cat: 'Tehnologija', time: '5 min', title: 'Zakaj AI ne bo zamenjal ustvarjalnosti', excerpt: 'Umetna inteligenca je orodje, ne nadomestek. Prava ustvarjalnost izvira iz človeške izkušnje in čustev.' },
  { id: 2, cat: 'Filozofija', time: '7 min', title: 'Vrednost počasnega mišljenja', excerpt: 'V svetu hitrih odgovorov je počasno, globoko razmišljanje postalo redka in dragocena veščina.' },
  { id: 3, cat: 'Ustvarjalnost', time: '4 min', title: 'Ideje se rodijo v tišini', excerpt: 'Najboljše ideje ne pridejo med scrollanjem. Pridejo ko se ustavimo in pustimo umu, da tava.' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green: #22c55e;
  --green-dark: #16a34a;
  --green-glow: rgba(34,197,94,0.15);
  --bg: #080810;
  --bg2: #0d0d1a;
  --text: #e8e8f0;
  --muted: #888899;
}

html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.accent { color: var(--green); }

/* HEADER */
.header { position: fixed; top: 0; width: 100%; z-index: 100; padding: 20px 0; transition: all .3s; }
.header.scrolled { background: rgba(8,8,16,.9); backdrop-filter: blur(12px); padding: 12px 0; border-bottom: 1px solid rgba(34,197,94,.1); }
.header__inner { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo__text { font-size: 1.2rem; font-weight: 700; color: #fff; }
.logo__accent { color: var(--green); }
.nav { display: flex; align-items: center; gap: 32px; }
.nav__link { color: var(--muted); text-decoration: none; font-size: .95rem; transition: color .2s; }
.nav__link:hover { color: #fff; }
.nav__cta { background: var(--green); color: #000; padding: 8px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: .9rem; transition: background .2s; }
.nav__cta:hover { background: var(--green-dark); }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.burger span { display: block; width: 24px; height: 2px; background: #fff; transition: .3s; border-radius: 2px; }

/* HERO */
.hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 120px 0 80px; }
.hero__bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 60% at 50% 40%, rgba(34,197,94,.08) 0%, transparent 70%); }
.hero__content { position: relative; z-index: 1; max-width: 800px; }
.hero__badge { display: inline-block; background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.3); color: var(--green); padding: 6px 16px; border-radius: 20px; font-size: .8rem; font-weight: 600; letter-spacing: .1em; margin-bottom: 32px; }
.hero__title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #fff; }
.hero__sub { font-size: 1.1rem; color: var(--muted); max-width: 560px; margin-bottom: 40px; line-height: 1.7; }
.hero__btns { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 64px; }
.hero__stats { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; }
.stat__num { font-size: 2rem; font-weight: 800; color: var(--green); }
.stat__label { font-size: .7rem; color: var(--muted); letter-spacing: .1em; }
.stat__divider { width: 1px; height: 40px; background: rgba(255,255,255,.1); }
.hero__scroll { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); font-size: .7rem; color: var(--muted); letter-spacing: .2em; }

/* BUTTONS */
.btn { padding: 12px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: .95rem; transition: all .2s; display: inline-block; border: none; cursor: pointer; }
.btn--primary { background: var(--green); color: #000; }
.btn--primary:hover { background: var(--green-dark); transform: translateY(-2px); }
.btn--ghost { background: rgba(255,255,255,.05); color: #fff; border: 1px solid rgba(255,255,255,.15); }
.btn--ghost:hover { background: rgba(255,255,255,.1); }

/* SECTIONS */
.section__header { text-align: center; margin-bottom: 64px; }
.section__tag { color: var(--green); font-size: .8rem; font-weight: 600; letter-spacing: .15em; display: block; margin-bottom: 12px; }
.section__title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: #fff; margin-bottom: 16px; }
.section__sub { color: var(--muted); font-size: 1.1rem; }

/* BLOG */
.blog { padding: 120px 0; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.card { background: var(--bg2); border: 1px solid rgba(34,197,94,.1); border-radius: 16px; padding: 32px; transition: all .3s; }
.card:hover { border-color: rgba(34,197,94,.3); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(34,197,94,.08); }
.card__top { display: flex; justify-content: space-between; margin-bottom: 16px; }
.card__cat { color: var(--green); font-size: .8rem; font-weight: 600; }
.card__time { color: var(--muted); font-size: .8rem; }
.card__title { font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 12px; line-height: 1.4; }
.card__excerpt { color: var(--muted); font-size: .9rem; line-height: 1.6; margin-bottom: 24px; }
.card__link { color: var(--green); font-size: .9rem; font-weight: 600; text-decoration: none; }
.card__link:hover { text-decoration: underline; }

/* ABOUT */
.about { padding: 120px 0; background: var(--bg2); }
.about__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.about__text p { color: var(--muted); margin-bottom: 16px; line-height: 1.7; }
.about__text .btn { margin-top: 16px; }
.about__visual { display: flex; justify-content: center; }
.about__orb { width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(34,197,94,.2) 0%, transparent 70%); border: 1px solid rgba(34,197,94,.2); }

/* NEWSLETTER */
.newsletter { padding: 120px 0; text-align: center; }
.newsletter__inner p { color: var(--muted); margin: 16px 0 40px; }
.newsletter__form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
.newsletter__input { flex: 1; min-width: 200px; background: var(--bg2); border: 1px solid rgba(34,197,94,.2); color: #fff; padding: 12px 20px; border-radius: 10px; font-size: .95rem; outline: none; }
.newsletter__input:focus { border-color: var(--green); }

/* FOOTER */
.footer { background: var(--bg2); border-top: 1px solid rgba(34,197,94,.1); padding: 64px 0 32px; }
.footer__inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 48px; }
.footer__brand p { color: var(--muted); font-size: .9rem; margin-top: 8px; }
.footer__links, .footer__social { display: flex; flex-direction: column; gap: 12px; }
.footer__links a, .footer__social a { color: var(--muted); text-decoration: none; font-size: .9rem; transition: color .2s; }
.footer__links a:hover, .footer__social a:hover { color: var(--green); }
.footer__copy { text-align: center; color: var(--muted); font-size: .8rem; border-top: 1px solid rgba(255,255,255,.05); padding-top: 32px; }

/* MOBILE */
@media (max-width: 768px) {
  .nav { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg); flex-direction: column; justify-content: center; align-items: center; gap: 40px; }
  .nav.open { display: flex; }
  .nav__link { font-size: 1.5rem; }
  .burger { display: flex; z-index: 200; }
  .about__inner { grid-template-columns: 1fr; }
  .about__visual { display: none; }
  .hero__stats { gap: 20px; }
  .stat__divider { display: none; }
}
</style>
