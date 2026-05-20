<template>
  <div class="site">
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <a href="#" class="logo" @click.prevent="scrollTo('hero')">
          <span class="logo__text">Kalilnica <span class="logo__accent">idej</span></span>
        </a>
        <nav class="nav" :class="{ open: menuOpen }">
          <a class="nav__link" href="#" @click.prevent="scrollTo('hero'); menuOpen=false">Domov</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('blog'); menuOpen=false">Članki</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('about'); menuOpen=false">O blogu</a>
          <a class="nav__cta" href="#" @click.prevent="scrollTo('blog'); menuOpen=false">Beri zdaj</a>
        </nav>
        <button class="burger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="hero" id="hero">
      <div class="container hero__content">
        <div class="hero__badge">✦ DOBRODOŠLI V KALILNICI</div>
        <h1 class="hero__title">Vsaka velika stvar<br>se začne kot <span class="accent">majhna ideja</span></h1>
        <p class="hero__sub">Prostor za misli, ki ne dajo spati. Za ideje, ki čakajo, da jih nekdo izreče.</p>
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
    </section>

    <section class="blog" id="blog">
      <div class="container">
        <div class="section__header">
          <span class="section__tag">✦ NAJNOVEJŠE</span>
          <h2 class="section__title">Sveže <span class="accent">ideje</span></h2>
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

    <section class="about" id="about">
      <div class="container about__inner">
        <div class="about__text">
          <span class="section__tag">✦ O BLOGU</span>
          <h2 class="section__title">Zakaj <span class="accent">Kalilnica?</span></h2>
          <p>Kalilnica idej je prostor, kjer se misli kalijo — kot jeklo v ognju. Vsak zapis je poskus razumeti svet malo bolje.</p>
          <a href="#" class="btn btn--primary" @click.prevent="scrollTo('blog')">Beri članke →</a>
        </div>
        <div class="about__visual">
          <div class="about__orb"></div>
        </div>
      </div>
    </section>

    <section class="newsletter">
      <div class="container newsletter__inner">
        <h2 class="section__title">Ostani v <span class="accent">zanki</span></h2>
        <p>Nove ideje direktno v tvoj nabiralnik.</p>
        <div class="newsletter__form">
          <input type="email" placeholder="tvoj@email.com" class="newsletter__input"/>
          <button class="btn btn--primary">Naroči se →</button>
        </div>
      </div>
    </section>

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
      <div class="footer__copy">© 2025 Kalilnica idej</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
const menuOpen = ref(false)
const posts = [
  { id: 1, cat: 'Tehnologija', time: '5 min', title: 'Zakaj AI ne bo zamenjal ustvarjalnosti', excerpt: 'Umetna inteligenca je orodje, ne nadomestek. Prava ustvarjalnost izvira iz človeške izkušnje.' },
  { id: 2, cat: 'Filozofija', time: '7 min', title: 'Vrednost počasnega mišljenja', excerpt: 'V svetu hitrih odgovorov je počasno, globoko razmišljanje postalo redka in dragocena veščina.' },
  { id: 3, cat: 'Ustvarjalnost', time: '4 min', title: 'Ideje se rodijo v tišini', excerpt: 'Najboljše ideje ne pridejo med scrollanjem. Pridejo ko se ustavimo in pustimo umu, da tava.' },
]
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --red: #e63329;
  --red-dark: #c42a20;
  --bg: #ffffff;
  --bg2: #f8f8f8;
  --text: #1a1a2e;
  --muted: #666677;
}
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.accent { color: var(--red); }

.header { position: fixed; top: 0; width: 100%; z-index: 100; padding: 20px 0; transition: all .3s; background: rgba(255,255,255,0.9); }
.header.scrolled { backdrop-filter: blur(12px); box-shadow: 0 1px 20px rgba(0,0,0,.08); padding: 12px 0; }
.header__inner { display: flex; align-items: center; justify-content: space-between; }
.logo { text-decoration: none; }
.logo__text { font-size: 1.2rem; font-weight: 800; color: var(--text); }
.logo__accent { color: var(--red); }
.nav { display: flex; align-items: center; gap: 32px; }
.nav__link { color: var(--muted); text-decoration: none; font-size: .95rem; transition: color .2s; }
.nav__link:hover { color: var(--text); }
.nav__cta { background: var(--red); color: #fff; padding: 8px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: .9rem; transition: background .2s; }
.nav__cta:hover { background: var(--red-dark); }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.burger span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; }

.hero { min-height: 100vh; display: flex; align-items: center; padding: 120px 0 80px; background: linear-gradient(135deg, #fff 0%, #fff5f5 100%); }
.hero__badge { display: inline-block; background: rgba(230,51,41,.08); border: 1px solid rgba(230,51,41,.2); color: var(--red); padding: 6px 16px; border-radius: 20px; font-size: .8rem; font-weight: 600; letter-spacing: .1em; margin-bottom: 32px; }
.hero__title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.hero__sub { font-size: 1.1rem; color: var(--muted); max-width: 560px; margin-bottom: 40px; line-height: 1.7; }
.hero__btns { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 64px; }
.hero__stats { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; }
.stat__num { font-size: 2rem; font-weight: 800; color: var(--red); }
.stat__label { font-size: .7rem; color: var(--muted); letter-spacing: .1em; }
.stat__divider { width: 1px; height: 40px; background: rgba(0,0,0,.1); }

.btn { padding: 12px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: .95rem; transition: all .2s; display: inline-block; border: none; cursor: pointer; }
.btn--primary { background: var(--red); color: #fff; }
.btn--primary:hover { background: var(--red-dark); transform: translateY(-2px); }
.btn--ghost { background: transparent; color: var(--text); border: 2px solid rgba(0,0,0,.15); }
.btn--ghost:hover { border-color: var(--red); color: var(--red); }

.section__header { text-align: center; margin-bottom: 64px; }
.section__tag { color: var(--red); font-size: .8rem; font-weight: 600; letter-spacing: .15em; display: block; margin-bottom: 12px; }
.section__title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 16px; }

.blog { padding: 120px 0; background: var(--bg); }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.card { background: var(--bg2); border: 1px solid rgba(0,0,0,.06); border-radius: 16px; padding: 32px; transition: all .3s; }
.card:hover { border-color: rgba(230,51,41,.2); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(230,51,41,.08); }
.card__top { display: flex; justify-content: space-between; margin-bottom: 16px; }
.card__cat { color: var(--red); font-size: .8rem; font-weight: 600; }
.card__time { color: var(--muted); font-size: .8rem; }
.card__title { font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; line-height: 1.4; }
.card__excerpt { color: var(--muted); font-size: .9rem; line-height: 1.6; margin-bottom: 24px; }
.card__link { color: var(--red); font-size: .9rem; font-weight: 600; text-decoration: none; }

.about { padding: 120px 0; background: var(--bg2); }
.about__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.about__text p { color: var(--muted); margin-bottom: 16px; line-height: 1.7; }
.about__text .btn { margin-top: 16px; }
.about__visual { display: flex; justify-content: center; }
.about__orb { width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(230,51,41,.15) 0%, transparent 70%); border: 2px solid rgba(230,51,41,.15); }

.newsletter { padding: 120px 0; text-align: center; background: var(--red); }
.newsletter .section__title { color: #fff; }
.newsletter .accent { color: #fff; text-decoration: underline; }
.newsletter__inner p { color: rgba(255,255,255,.8); margin: 16px 0 40px; }
.newsletter__form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
.newsletter__input { flex: 1; min-width: 200px; background: #fff; border: none; color: var(--text); padding: 12px 20px; border-radius: 10px; font-size: .95rem; outline: none; }
.newsletter .btn--primary { background: var(--text); color: #fff; }

.footer { background: var(--text); padding: 64px 0 32px; }
.footer__inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 48px; }
.footer .logo__text { color: #fff; }
.footer__brand p { color: rgba(255,255,255,.5); font-size: .9rem; margin-top: 8px; }
.footer__links, .footer__social { display: flex; flex-direction: column; gap: 12px; }
.footer__links a, .footer__social a { color: rgba(255,255,255,.5); text-decoration: none; font-size: .9rem; transition: color .2s; }
.footer__links a:hover, .footer__social a:hover { color: #fff; }
.footer__copy { text-align: center; color: rgba(255,255,255,.3); font-size: .8rem; border-top: 1px solid rgba(255,255,255,.1); padding-top: 32px; }

@media (max-width: 768px) {
  .nav { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #fff; flex-direction: column; justify-content: center; align-items: center; gap: 40px; }
  .nav.open { display: flex; }
  .nav__link { font-size: 1.5rem; color: var(--text); }
  .burger { display: flex; z-index: 200; }
  .about__inner { grid-template-columns: 1fr; }
  .about__visual { display: none; }
}
</style>
