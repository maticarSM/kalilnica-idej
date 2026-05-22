<template>
  <div class="site">

    <!-- HEADER -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header__inner">
        <NuxtLink to="/" class="logo">
          <LogoMark />
          <span class="logo__name">Kalilnica <em>idej</em></span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink class="nav__link" to="/">Domov</NuxtLink>
          <NuxtLink class="nav__link" to="/#blog">Članki</NuxtLink>
          <NuxtLink class="nav__cta" to="/admin">Admin</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- POST -->
    <main v-if="post" class="article">
      <div class="article__hero" :style="{ background: post.gradient }">
        <span class="article__emoji">{{ post.emoji }}</span>
      </div>
      <div class="container article__wrap">
        <div class="article__tag">{{ post.tag }}</div>
        <h1 class="article__title">{{ post.title }}</h1>
        <div class="article__meta">
          <span>{{ post.date }}</span>
          <span>·</span>
          <span>{{ post.read }} min branja</span>
        </div>
        <p class="article__lead">{{ post.excerpt }}</p>
        <div class="article__body" v-html="renderedContent"></div>
      </div>

      <div class="container article__footer">
        <NuxtLink to="/" class="btn btn--ghost">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13 7.5H2M5.5 3.5l-4 4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Nazaj na objave
        </NuxtLink>
      </div>
    </main>

    <div v-else class="container" style="padding-top:160px; text-align:center; color:var(--muted)">
      <p>Objava ne obstaja. <NuxtLink to="/" style="color:var(--blue-lt)">Nazaj →</NuxtLink></p>
    </div>

    <!-- FOOTER -->
    <footer class="footer" style="margin-top:80px">
      <div class="container footer__grid">
        <div class="footer__brand">
          <NuxtLink to="/" class="logo"><span class="logo__name">Kalilnica <em>idej</em></span></NuxtLink>
          <p>Prostor za misli, ki štejejo.</p>
        </div>
        <div class="footer__links">
          <div class="footer__col">
            <h4>Navigacija</h4>
            <NuxtLink to="/">Domov</NuxtLink>
            <NuxtLink to="/#blog">Članki</NuxtLink>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'

const route = useRoute()
const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const { data: post } = await useAsyncData(
  `post-${route.params.slug}`,
  () => $fetch(`/api/posts/${route.params.slug}`)
)

const renderedContent = computed(() =>
  post.value?.content ? marked(post.value.content) : ''
)

useSeoMeta({
  title: () => post.value ? `${post.value.title} — Kalilnica idej` : 'Kalilnica idej',
  description: () => post.value?.excerpt ?? ''
})
</script>

<style>
.article { padding-top: 80px; }
.article__hero {
  height: 360px; display: flex; align-items: center; justify-content: center;
  margin-top: 60px;
}
.article__emoji { font-size: 6rem; filter: drop-shadow(0 8px 24px rgba(0,0,0,.5)); }
.article__wrap { max-width: 760px; margin: 0 auto; padding-top: 48px; padding-bottom: 80px; }
.article__tag {
  display: inline-block; background: rgba(79,70,229,.12); border: 1px solid var(--ba);
  color: var(--blue-lt); padding: 5px 14px; border-radius: 100px;
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 20px;
}
.article__title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800;
  letter-spacing: -.04em; color: #fff; line-height: 1.15; margin-bottom: 16px;
}
.article__meta { display: flex; gap: 10px; font-size: .82rem; color: var(--dim); margin-bottom: 24px; }
.article__lead {
  font-size: 1.1rem; color: var(--muted); line-height: 1.8;
  padding-bottom: 32px; margin-bottom: 32px; border-bottom: 1px solid var(--border);
}
.article__body { color: var(--muted); line-height: 1.85; font-size: 1rem; }
.article__body h2 { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; margin: 40px 0 16px; letter-spacing: -.02em; }
.article__body h3 { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; margin: 32px 0 12px; }
.article__body p { margin-bottom: 20px; }
.article__body ul, .article__body ol { padding-left: 24px; margin-bottom: 20px; }
.article__body li { margin-bottom: 8px; }
.article__body strong { color: var(--text); font-weight: 600; }
.article__body em { color: var(--blue-lt); font-style: italic; }
.article__body blockquote {
  border-left: 3px solid var(--blue); padding: 16px 20px; margin: 28px 0;
  background: rgba(79,70,229,.06); border-radius: 0 var(--r) var(--r) 0; color: var(--text); font-style: italic;
}
.article__body code {
  background: rgba(255,255,255,.06); padding: 2px 8px; border-radius: 4px;
  font-family: monospace; font-size: .9em; color: var(--cyan-lt);
}
.article__body a { color: var(--blue-lt); text-decoration: underline; }
.article__footer { padding-bottom: 60px; }
</style>
