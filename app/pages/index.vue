<template>
  <div class="site">

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
      <canvas ref="heroCanvas" class="hero__canvas"></canvas>
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
            <a href="#" @click.prevent aria-label="Twitter"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" @click.prevent aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
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
          </div>
          <div class="footer__col">
            <h4>Podjetje</h4>
            <a href="#" @click.prevent>Kontakt</a>
            <a href="#" @click.prevent>Zasebnost</a>
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

const isScrolled = ref(false)
const menuOpen   = ref(false)
const email      = ref('')
const subscribed = ref(false)
const heroCanvas = ref(null)
let raf = null, renderer = null, resizeH = null, composer = null
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
  const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js')
  const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js')
  const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js')

  const W = window.innerWidth, H = window.innerHeight
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
  camera.position.set(0, 0, 6)
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  // Organic noise-deformed sphere — custom ShaderMaterial
  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal;
    vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
      vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
      i=mod289v3(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
      float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
      vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }
    void main(){
      vNormal=normal;
      vec3 pos=position;
      float n=snoise(pos*.9+uTime*.22)*.38;
      pos+=normal*n;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
    }
  `
  const fragmentShader = `
    uniform float uTime;
    varying vec3 vNormal;
    void main(){
      vec3 cA=vec3(.31,.275,.898);
      vec3 cB=vec3(.024,.714,.831);
      float t=dot(normalize(vNormal),vec3(0.,1.,0.))*.5+.5+sin(uTime*.35)*.08;
      vec3 col=mix(cA,cB,clamp(t,0.,1.));
      float rim=1.-abs(dot(normalize(vNormal),vec3(0.,0.,1.)));
      col+=cB*rim*rim*.5;
      gl_FragColor=vec4(col,.88);
    }
  `
  const sphereMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader, fragmentShader, transparent: true, side: THREE.DoubleSide
  })
  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 5), sphereMat)

  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, 0.007, 8, 200),
    new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0.65 })
  )
  ring1.rotation.x = 1.1; ring1.rotation.z = 0.3
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.7, 0.005, 8, 200),
    new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.4 })
  )
  ring2.rotation.x = 0.5; ring2.rotation.y = 0.8

  // Floating wireframe octahedra
  const octMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.5 })
  const octs = []
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.12 + Math.random() * 0.18, 0), octMat)
    const a = (i / 7) * Math.PI * 2
    const r = 2.6 + Math.random() * 1.4
    m.position.set(Math.cos(a) * r, (Math.random() - .5) * 2.5, Math.sin(a) * r * .5)
    octs.push({ m, spd: .3 + Math.random() * .5, off: Math.random() * Math.PI * 2 })
    scene.add(m)
  }

  const group = new THREE.Group()
  group.add(sphere, ring1, ring2)
  scene.add(group)

  // Particle field with mouse repulsion & spring-back
  const N = 4000
  const pPos = new Float32Array(N * 3)
  const pVel = new Float32Array(N * 3)
  const pHome = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const x=(Math.random()-.5)*24, y=(Math.random()-.5)*20, z=(Math.random()-.5)*14
    pPos[i*3]=pHome[i*3]=x; pPos[i*3+1]=pHome[i*3+1]=y; pPos[i*3+2]=pHome[i*3+2]=z
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.025, color: 0x818CF8, transparent: true, opacity: 0.45 })))

  // Bloom post-processing
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.35, 0.82)
  composer.addPass(bloom)

  let camAngle = 0
  const animate = () => {
    raf = requestAnimationFrame(animate)
    const t = performance.now() * 0.001
    sphereMat.uniforms.uTime.value = t
    sphere.rotation.y += .003
    ring1.rotation.z += .005; ring2.rotation.z -= .003
    octs.forEach(({ m, spd, off }) => {
      m.rotation.x += spd * .012; m.rotation.y += spd * .018
      m.position.y += Math.sin(t * spd + off) * .004
    })
    group.rotation.y += (mouse.x * .38 - group.rotation.y) * .04
    group.rotation.x += (-mouse.y * .2 - group.rotation.x) * .04
    camAngle += .003
    camera.position.y = Math.sin(camAngle * .4) * 0.25
    camera.lookAt(0, 0, 0)

    const pa = pGeo.attributes.position.array
    const mx = mouse.x * 7, my = mouse.y * 4.5
    for (let i = 0; i < N; i++) {
      const ix=i*3, iy=ix+1, iz=ix+2
      const dx=pa[ix]-mx, dy=pa[iy]-my
      const d=Math.sqrt(dx*dx+dy*dy)
      if (d < 3.5) { const f=(3.5-d)/3.5; pVel[ix]+=dx*f*.004; pVel[iy]+=dy*f*.004 }
      pVel[ix]+=(pHome[ix]-pa[ix])*.018; pVel[iy]+=(pHome[iy]-pa[iy])*.018; pVel[iz]+=(pHome[iz]-pa[iz])*.018
      pVel[ix]*=.9; pVel[iy]*=.9; pVel[iz]*=.9
      pa[ix]+=pVel[ix]; pa[iy]+=pVel[iy]; pa[iz]+=pVel[iz]
    }
    pGeo.attributes.position.needsUpdate = true
    composer.render()
  }
  animate()

  resizeH = () => {
    const W=window.innerWidth, H=window.innerHeight
    camera.aspect=W/H; camera.updateProjectionMatrix()
    renderer.setSize(W,H); composer.setSize(W,H)
  }
  window.addEventListener('resize', resizeH)
}

const onScroll = () => { isScrolled.value = window.scrollY > 40 }
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
/* HERO */
.hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; padding:110px 0 90px; }
.hero__canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
.hero__glow { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
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

/* BLOG */
.blog { padding:120px 0; background:var(--bg2); }
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
.about { padding:120px 0; }
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
.nl { padding:120px 0; background:var(--bg2); position:relative; overflow:hidden; }
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
