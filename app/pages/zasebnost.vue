<template>
  <div class="site">

    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <NuxtLink to="/" class="logo">
          <LogoMark />
          <span class="logo__name">Kalilnica <em>idej</em></span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink class="nav__link" to="/">Domov</NuxtLink>
          <NuxtLink class="nav__link" to="/#blog">Članki</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="priv">
      <div class="container priv__wrap">
        <div class="priv__tag">Pravni dokument</div>
        <h1 class="priv__title">Zasebnostna politika</h1>
        <p class="priv__date">Veljavno od: 1. januarja 2026</p>

        <div class="priv__body">
          <section>
            <h2>1. Zbiranje podatkov</h2>
            <p>Kalilnica idej je osebni blog. Na tej spletni strani <strong>ne zbiramo osebnih podatkov</strong> obiskovalcev. Ni registracije, ni prijave, ni obrazcev za vnos osebnih podatkov.</p>
            <p>Edina izjema je nabirnik e-pošte — če se naročite, vaš e-naslov shranimo izključno za namene pošiljanja obvestil o novih objavah. Podatkov ne delimo s tretjimi stranmi.</p>
          </section>

          <section>
            <h2>2. Piškotki</h2>
            <p>Spletna stran ne uporablja analitičnih ali oglaševalskih piškotkov. Vaš brskalnik morda shrani tehnične piškotke, ki so nujni za delovanje strani (npr. seja), brez katerih stran ne bi delovala pravilno.</p>
          </section>

          <section>
            <h2>3. Zunanje povezave</h2>
            <p>Nekatere objave vsebujejo povezave do zunanjih spletnih strani. Ko zapustite Kalilnico idej, ne moremo prevzeti odgovornosti za zasebnostne prakse teh strani. Priporočamo, da preberete zasebnostno politiko vsake spletne strani, ki jo obiščete.</p>
          </section>

          <section>
            <h2>4. Gostovanje</h2>
            <p>Spletna stran je gostovana na platformi <strong>Vercel</strong>. Vercel zbira standardne strežniške dnevnike (IP naslov, časovni žig, zahtevana stran), ki se hranijo v skladu z njihovo zasebnostno politiko.</p>
          </section>

          <section>
            <h2>5. Kontakt</h2>
            <p>Za vprašanja v zvezi z zasebnostjo nas kontaktirajte prek Instagrama:</p>
            <a class="priv__ig" href="https://www.instagram.com/kalilnica.idej/" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              @kalilnica.idej
            </a>
          </section>

          <section>
            <h2>6. Spremembe politike</h2>
            <p>Pridržujemo si pravico do sprememb te zasebnostne politike. Morebitne spremembe bodo objavljene na tej strani z novim datumom veljavnosti.</p>
          </section>
        </div>

        <div class="priv__back">
          <NuxtLink to="/" class="btn btn--ghost">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13 7.5H2M5.5 3.5l-4 4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Nazaj domov
          </NuxtLink>
        </div>
      </div>
    </main>

    <footer class="footer" style="margin-top:0">
      <div class="footer__bar"><div class="container footer__bottom"><span>© 2026 Kalilnica idej</span><span>Narejeno z <span class="heart">♥</span> in kavo</span></div></div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

useSeoMeta({
  title: 'Zasebnostna politika — Kalilnica idej',
  description: 'Informacije o tem, kako Kalilnica idej ravna z vašimi podatki.'
})
</script>

<style>
.priv { padding-top: 120px; padding-bottom: 100px; min-height: 80vh; }
.priv__wrap { max-width: 720px; margin: 0 auto; }
.priv__tag {
  display: inline-block; background: rgba(79,70,229,.12); border: 1px solid var(--ba);
  color: var(--blue-lt); padding: 5px 14px; border-radius: 100px;
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 20px;
}
.priv__title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;
  letter-spacing: -.04em; color: #fff; line-height: 1.15; margin-bottom: 10px;
}
.priv__date { font-size: .82rem; color: var(--dim); margin-bottom: 48px; }
.priv__body { display: flex; flex-direction: column; gap: 40px; }
.priv__body section h2 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.15rem; font-weight: 700; color: #fff;
  margin-bottom: 14px; letter-spacing: -.02em;
}
.priv__body p { color: var(--muted); line-height: 1.85; margin-bottom: 10px; }
.priv__body strong { color: var(--text); }
.priv__ig {
  display: inline-flex; align-items: center; gap: 9px;
  color: var(--blue-lt); text-decoration: none; font-weight: 500;
  border: 1px solid var(--ba); padding: 10px 18px; border-radius: 10px;
  background: rgba(79,70,229,.07); transition: border-color .2s, background .2s;
  margin-top: 6px;
}
.priv__ig:hover { border-color: var(--blue); background: rgba(79,70,229,.14); }
.priv__back { margin-top: 60px; padding-top: 32px; border-top: 1px solid var(--border); }
</style>
