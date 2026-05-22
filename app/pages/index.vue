<template>
  <div class="site">

    <!-- Fixed 3D canvas — sits behind all sections -->
    <canvas ref="heroCanvas" class="bg-canvas"></canvas>

    <!-- HEADER -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <a href="#" class="logo" @click.prevent="scrollTo('hero')">
          <LogoMark />
          <span class="logo__name">Kalilnica <em>idej</em></span>
        </a>
        <nav class="nav" :class="{ open: menuOpen }">
          <a class="nav__link" href="#" @click.prevent="scrollTo('hero'); menuOpen=false">Domov</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('blog'); menuOpen=false">Članki</a>
          <a class="nav__link" href="#" @click.prevent="scrollTo('about'); menuOpen=false">O blogu</a>
          <NuxtLink class="nav__cta" to="/admin">Admin</NuxtLink>
        </nav>
        <button class="burger" :class="{ active: menuOpen }" @click="menuOpen=!menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- HERO -->
    <section id="hero" class="hero">
      <div class="hero__glow hero__glow--a"></div>
      <div class="hero__glow hero__glow--b"></div>
      <div class="container hero__body">
        <div class="hero__copy">
          <div class="hero__badge">
            <span class="hero__dot"></span>Dobrodošli v kalilnici
          </div>
          <h1 class="hero__title">Ideje, ki<br><span class="grad-text">oblikujejo jutri</span></h1>
          <p class="hero__sub">
            Prostor za misli, ki ne dajo spati. Za ideje, ki čakajo, da jih nekdo izreče.
          </p>
          <div class="hero__actions">
            <a href="#" class="btn btn--primary" @click.prevent="scrollTo('blog')">
              Odkrijte ideje
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M8.5 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#" class="btn btn--ghost" @click.prevent="scrollTo('about')">O projektu</a>
          </div>
          <div class="hero__stats">
            <div class="hstat"><span class="hstat__n">{{ posts?.length ?? 0 }}+</span><span class="hstat__l">Objav</span></div>
            <div class="hstat__sep"></div>
            <div class="hstat"><span class="hstat__n">6</span><span class="hstat__l">Kategorij</span></div>
            <div class="hstat__sep"></div>
            <div class="hstat"><span class="hstat__n">2026</span><span class="hstat__l">Leto</span></div>
          </div>
        </div>

        <!-- Animated logo — right column -->
        <div class="hero__logo-col">
          <LogoAnimated :show-text="true" />
        </div>
      </div>
      <button class="hero__scroll" @click="scrollTo('blog')">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M4 10l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </section>

    <!-- SCROLL 3D INTERLUDE -->
    <section class="scroll3d">
      <div class="container scroll3d__inner">
        <p class="eyebrow reveal">Vstopite v kalilnico</p>
        <h2 class="scroll3d__title reveal">Ideje, ki <span class="grad-text">vzkalijo</span></h2>
        <p class="scroll3d__sub reveal">Vsak premik prinese novo perspektivo.</p>
      </div>
    </section>

    <!-- BLOG -->
    <section id="blog" class="blog">
      <div class="container">
        <div class="sec-head reveal">
          <p class="eyebrow">Zadnje objave</p>
          <h2 class="sec-title">Sveže iz <span class="grad-text">kalilnice</span></h2>
          <p class="sec-sub">Izbrane misli in ideje, ki so vredne vašega časa.</p>
        </div>

        <template v-if="posts && posts.length">
          <!-- Featured -->
          <NuxtLink :to="`/blog/${posts[0].slug}`" class="post post--feat reveal">
            <div class="post__vis" :style="{ background: posts[0].gradient }">
              <span class="post__glyph">{{ posts[0].emoji }}</span>
              <span class="post__tag">{{ posts[0].tag }}</span>
            </div>
            <div class="post__body">
              <div class="post__meta"><span>{{ posts[0].date }}</span><span>{{ posts[0].read }} min branja</span></div>
              <h3 class="post__title" style="font-size:1.4rem">{{ posts[0].title }}</h3>
              <p class="post__excerpt" style="font-size:.95rem">{{ posts[0].excerpt }}</p>
              <span class="post__link">
                Preberi celoten članek
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </NuxtLink>

          <!-- Grid -->
          <div class="posts-grid">
            <NuxtLink v-for="p in posts.slice(1)" :key="p.slug" :to="`/blog/${p.slug}`" class="post reveal">
              <div class="post__vis" :style="{ background: p.gradient }">
                <span class="post__glyph">{{ p.emoji }}</span>
                <span class="post__tag">{{ p.tag }}</span>
              </div>
              <div class="post__body">
                <div class="post__meta"><span>{{ p.date }}</span><span>{{ p.read }} min</span></div>
                <h3 class="post__title">{{ p.title }}</h3>
                <p class="post__excerpt">{{ p.excerpt }}</p>
                <span class="post__link">Preberi <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3 3.5L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </div>
            </NuxtLink>
          </div>
        </template>

        <div v-else class="blog-empty">
          <p>Še ni objav. <NuxtLink to="/admin">Dodaj prvo →</NuxtLink></p>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about">
      <div class="container about__grid">
        <div class="about__copy reveal">
          <p class="eyebrow">O Kalilnici</p>
          <h2 class="sec-title">Kje ideje<br><span class="grad-text">postanejo besede</span></h2>
          <p class="about__text">
            Kalilnica idej je prostor, kjer se misli ne bojijo biti nedokončane.
            Tukaj pišemo o tem, kar nas navdušuje, bega ali navdihuje.
          </p>
          <ul class="about__list">
            <li v-for="f in features" :key="f">
              <span class="about__check">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="url(#cg)" stroke-width="1.2"/>
                  <path d="M4.5 7.5l2 2 4-4" stroke="url(#cg)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  <defs><linearGradient id="cg" x1="1" y1="1" x2="14" y2="14"><stop stop-color="#4F46E5"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs>
                </svg>
              </span>
              {{ f }}
            </li>
          </ul>
        </div>
        <div class="about__visual reveal">
          <div class="quote-card">
            <div class="quote-card__mark">"</div>
            <p class="quote-card__text">Ideje so kot semena — potrebujejo pravo zemljo, da vzkalijo. Ta blog je tista zemlja.</p>
            <div class="quote-card__author">
              <div class="quote-card__avatar"></div>
              <div><strong>Avtor bloga</strong><span>Mislec, pisec, sanjač</span></div>
            </div>
          </div>
          <div class="about__orb about__orb--a"></div>
          <div class="about__orb about__orb--b"></div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="nl">
      <div class="nl__bg"></div>
      <div class="container nl__wrap">
        <p class="eyebrow">Ostanite v stiku</p>
        <h2 class="nl__title">Ne zamudite <span class="grad-text">nobene ideje</span></h2>
        <p class="nl__sub">Vsak teden ena misel, ki bo morda spremenila vaš dan.</p>
        <form class="nl__form" @submit.prevent="subscribe">
          <input v-model="email" type="email" placeholder="vas@email.com" class="nl__input" />
          <button type="submit" class="btn btn--primary" :disabled="subscribed">{{ subscribed ? '✓ Prijavljeni!' : 'Prijava' }}</button>
        </form>
        <p class="nl__note">Brez neželene pošte · Odjava kadarkoli</p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          <a href="#" class="logo" @click.prevent="scrollTo('hero')">
            <span class="logo__name">Kalilnica <em>idej</em></span>
          </a>
          <p>Prostor za misli, ki štejejo.</p>
          <div class="footer__social">
            <a href="https://www.instagram.com/kalilnica.idej/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
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
            <h4>Povežite se</h4>
            <a href="https://www.instagram.com/kalilnica.idej/" target="_blank" rel="noopener">Kontakt</a>
            <NuxtLink to="/zasebnost">Zasebnost</NuxtLink>
          </div>
        </div>
      </div>
      <div class="footer__bar"><div class="container footer__bottom"><span>© 2026 Kalilnica idej</span><span>Narejeno z <span class="heart">♥</span> in kavo</span></div></div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))

const isScrolled    = ref(false)
const menuOpen      = ref(false)
const email         = ref('')
const subscribed    = ref(false)
const heroCanvas    = ref(null)
const scrollProgress = ref(0)
let raf = null, renderer = null, resizeH = null
const mouse = { x: 0, y: 0 }

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const subscribe = () => {
  if (!email.value) return
  subscribed.value = true
  setTimeout(() => { subscribed.value = false; email.value = '' }, 3000)
}

const initThree = async () => {
  const canvas = heroCanvas.value
  if (!canvas) return
  const THREE = await import('three')
  const W = window.innerWidth, H = window.innerHeight
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
  camera.position.set(0, 0, 8)
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

  // The "planet" — sits at origin, camera flies toward it
  const sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 3),
    new THREE.MeshBasicMaterial({ color: 0x4F46E5, wireframe: true, transparent: true, opacity: 0.22 })
  )
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.7, 1),
    new THREE.MeshBasicMaterial({ color: 0x06B6D4, wireframe: true, transparent: true, opacity: 0.1 })
  )
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, 0.007, 8, 180),
    new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0.55 })
  )
  ring1.rotation.x = 1.1; ring1.rotation.z = 0.3
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.7, 0.004, 8, 180),
    new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.3 })
  )
  ring2.rotation.x = 0.5; ring2.rotation.y = 0.8

  const planet = new THREE.Group()
  planet.add(sphere, shell, ring1, ring2)
  scene.add(planet)

  // Stars scattered deep in space — wide and deep z range
  const N = 4500, pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - .5) * 60
    pos[i*3+1] = (Math.random() - .5) * 40
    pos[i*3+2] = (Math.random() - .5) * 80   // deep z spread for fly-through parallax
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.055, color: 0x818CF8, transparent: true, opacity: 0.5 })))

  // Smooth camera z — lags slightly behind scroll for cinematic feel
  let camZ = 8, camY = 0

  const animate = () => {
    raf = requestAnimationFrame(animate)
    const sp = scrollProgress.value

    // Target: fly from z=8 toward z=2 (just past the planet surface)
    const targetZ = 8 - sp * 5.8
    const targetY = sp * 0.6       // drift slightly upward as we approach
    camZ += (targetZ - camZ) * 0.06
    camY += (targetY - camY) * 0.06
    camera.position.z = camZ
    camera.position.y = camY + Math.sin(Date.now() * 0.0005) * 0.08  // gentle float
    camera.position.x = mouse.x * 0.3
    camera.lookAt(0, 0, 0)

    // Planet slow self-rotation — independent of camera
    sphere.rotation.y += .002; sphere.rotation.x += .0008
    shell.rotation.y  -= .001; shell.rotation.z  += .0008
    ring1.rotation.z  += .004; ring2.rotation.z  -= .0025

    // Subtle mouse tilt on planet itself
    planet.rotation.y += (mouse.x * .15 - planet.rotation.y) * .03
    planet.rotation.x += (-mouse.y * .1 - planet.rotation.x) * .03

    renderer.render(scene, camera)
  }
  animate()

  resizeH = () => { const W=window.innerWidth,H=window.innerHeight; camera.aspect=W/H; camera.updateProjectionMatrix(); renderer.setSize(W,H) }
  window.addEventListener('resize', resizeH)
}

const onScroll = () => {
  isScrolled.value = window.scrollY > 40
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
}
const onMouse  = (e) => { mouse.x=(e.clientX/innerWidth-.5)*2; mouse.y=-(e.clientY/innerHeight-.5)*2 }

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('mousemove', onMouse)
  await initThree()
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouse)
  if (resizeH) window.removeEventListener('resize', resizeH)
  if (raf) cancelAnimationFrame(raf)
  if (renderer) renderer.dispose()
})

const features = [
  'Iskreno pisanje brez korporativnega žargona',
  'Ideje, ki spodbujajo globoko razmišljanje',
  'Skupnost radovednih mislecev',
  'Novi članki vsak teden'
]
</script>

<style>
/* Fixed 3D canvas */
.bg-canvas { position:fixed; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; }

/* HERO */
.hero { position:relative; z-index:1; min-height:100vh; display:flex; align-items:center; overflow:hidden; padding:110px 0 90px; background:transparent; }
.hero__glow { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; }
.hero__glow--a { width:55vw; height:55vw; top:-18%; left:-12%; background:radial-gradient(circle,rgba(79,70,229,.16),transparent 65%); }
.hero__glow--b { width:35vw; height:35vw; bottom:-5%; right:8%; background:radial-gradient(circle,rgba(6,182,212,.11),transparent 65%); }
.hero__body { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:48px; width:100%; }
.hero__copy { display:flex; flex-direction:column; gap:28px; }
.hero__logo-col { display:flex; align-items:center; justify-content:center; }
.hero__badge { display:inline-flex; align-items:center; gap:9px; background:rgba(79,70,229,.1); border:1px solid rgba(79,70,229,.3); color:var(--blue-lt); padding:7px 16px; border-radius:100px; font-size:.77rem; font-weight:600; letter-spacing:.05em; width:fit-content; }
.hero__dot { width:6px; height:6px; border-radius:50%; background:var(--cyan); box-shadow:0 0 9px var(--cyan); animation:blink 2s ease-in-out infinite; }
.hero__title { font-family:'Space Grotesk',system-ui,sans-serif; font-size:clamp(2.8rem,6.5vw,5rem); font-weight:800; line-height:1.04; letter-spacing:-.045em; color:#fff; }
.hero__sub { font-size:1.06rem; color:var(--muted); max-width:500px; line-height:1.8; }
.hero__actions { display:flex; gap:12px; flex-wrap:wrap; }
.hero__stats { display:flex; align-items:center; gap:22px; padding-top:24px; border-top:1px solid var(--border); width:100%; }
.hstat { display:flex; flex-direction:column; gap:2px; }
.hstat__n { font-family:'Space Grotesk',system-ui,sans-serif; font-size:1.55rem; font-weight:700; color:#fff; letter-spacing:-.025em; }
.hstat__l { font-size:.7rem; color:var(--dim); text-transform:uppercase; letter-spacing:.1em; }
.hstat__sep { width:1px; height:36px; background:var(--border); }
.hero__scroll { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); width:44px; height:44px; border-radius:50%; background:var(--glass); border:1px solid var(--border); backdrop-filter:blur(12px); cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--muted); transition:all .3s; animation:bob 3s ease-in-out infinite; }
.hero__scroll:hover { border-color:var(--ba); color:var(--blue-lt); }

/* SCROLL 3D INTERLUDE */
.scroll3d { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; z-index:1; background:transparent; }
.scroll3d__inner { text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px; }
.scroll3d__title { font-family:'Space Grotesk',system-ui,sans-serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:800; letter-spacing:-.045em; color:#fff; line-height:1.1; }
.scroll3d__sub { font-size:1.06rem; color:var(--muted); max-width:420px; line-height:1.8; }

/* BLOG */
.blog { padding:120px 0; background:var(--bg2); position:relative; z-index:1; }
.sec-head { text-align:center; margin-bottom:60px; }
.post--feat { display:grid; grid-template-columns:1.15fr 1fr; background:var(--glass); border:1px solid var(--border); border-radius:var(--r); overflow:hidden; backdrop-filter:blur(10px); margin-bottom:24px; transition:border-color .3s,box-shadow .3s; text-decoration:none; color:inherit; }
.post--feat:hover { border-color:var(--ba); box-shadow:0 28px 70px rgba(79,70,229,.14); }
.post--feat .post__vis { height:100%; min-height:320px; border-radius:0; }
.post--feat .post__body { padding:44px; display:flex; flex-direction:column; justify-content:center; gap:16px; }
.posts-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.post { text-decoration:none; color:inherit; }
.blog-empty { text-align:center; padding:60px 0; color:var(--muted); }
.blog-empty a { color:var(--blue-lt); text-decoration:none; }

/* ABOUT */
.about { padding:120px 0; position:relative; z-index:1; background:var(--bg); }
.about__grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.about__text { color:var(--muted); line-height:1.8; margin-top:16px; }
.about__list { list-style:none; display:flex; flex-direction:column; gap:14px; margin-top:20px; }
.about__list li { display:flex; align-items:center; gap:12px; color:var(--muted); font-size:.93rem; }
.about__check { display:flex; flex-shrink:0; }
.about__visual { position:relative; }
.quote-card { background:var(--glass); border:1px solid var(--ba); border-radius:var(--r); padding:38px; backdrop-filter:blur(16px); position:relative; z-index:1; }
.quote-card__mark { font-family:'Space Grotesk',system-ui,sans-serif; font-size:5.5rem; line-height:.75; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:14px; }
.quote-card__text { font-size:1.06rem; line-height:1.78; color:var(--text); font-style:italic; margin-bottom:26px; }
.quote-card__author { display:flex; align-items:center; gap:14px; }
.quote-card__avatar { width:44px; height:44px; border-radius:50%; background:var(--grad); border:2px solid rgba(79,70,229,.35); flex-shrink:0; }
.quote-card__author strong { display:block; color:#fff; font-size:.9rem; }
.quote-card__author span { color:var(--dim); font-size:.78rem; }
.about__orb { position:absolute; border-radius:50%; filter:blur(55px); pointer-events:none; }
.about__orb--a { width:280px; height:280px; background:rgba(79,70,229,.12); top:-80px; right:-60px; }
.about__orb--b { width:200px; height:200px; background:rgba(6,182,212,.08); bottom:-60px; left:-40px; }

/* NEWSLETTER */
.nl { padding:120px 0; background:var(--bg2); position:relative; z-index:1; overflow:hidden; }
.nl__bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:700px; height:350px; background:radial-gradient(ellipse,rgba(79,70,229,.1),transparent); pointer-events:none; }
.nl__wrap { position:relative; text-align:center; display:flex; flex-direction:column; align-items:center; gap:18px; max-width:580px; margin:0 auto; }
.nl__title { font-family:'Space Grotesk',system-ui,sans-serif; font-size:clamp(1.9rem,3.5vw,2.8rem); font-weight:800; letter-spacing:-.04em; color:#fff; }
.nl__sub { color:var(--muted); }
.nl__form { display:flex; gap:10px; width:100%; }
.nl__input { flex:1; background:var(--glass); border:1px solid var(--border); color:var(--text); padding:13px 18px; border-radius:10px; font-size:.93rem; outline:none; backdrop-filter:blur(12px); transition:border-color .2s; }
.nl__input:focus { border-color:var(--blue); }
.nl__input::placeholder { color:var(--dim); }
.nl__note { font-size:.77rem; color:var(--dim); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .posts-grid { grid-template-columns:repeat(2,1fr); }
  .about__grid { grid-template-columns:1fr; gap:52px; }
  .hero__body { grid-template-columns:1fr; }
  .hero__logo-col { max-width:400px; margin:0 auto; }
}
@media (max-width: 768px) {
  .post--feat { grid-template-columns:1fr; }
  .post--feat .post__vis { min-height:220px; }
  .post--feat .post__body { padding:28px; }
}
@media (max-width: 680px) {
  .posts-grid { grid-template-columns:1fr; }
  .hero__stats { flex-wrap:wrap; gap:16px; }
  .nl__form { flex-direction:column; }
  .hero__scroll { display:none; }
  .hero__logo-col { max-width:300px; }
}
</style>
