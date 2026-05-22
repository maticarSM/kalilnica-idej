<template>
  <div class="adm">

    <!-- LOGIN -->
    <div v-if="!authed" class="adm-login">
      <div class="adm-card" style="max-width:380px; margin:0 auto;">
        <div class="adm-logo">
          <LogoMark style="width:38px;height:35px" />
          <span>Admin panel</span>
        </div>
        <p style="color:var(--muted);font-size:.9rem;margin-bottom:24px;">Vnesite geslo za dostop do upravljanja objav.</p>
        <form @submit.prevent="login">
          <input v-model="pwd" type="password" placeholder="Geslo" class="adm-input" autofocus />
          <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;margin-top:12px;">Prijava</button>
          <p v-if="loginErr" class="adm-err">Napačno geslo.</p>
        </form>
        <NuxtLink to="/" class="adm-back">← Nazaj na blog</NuxtLink>
      </div>
    </div>

    <!-- PANEL -->
    <template v-else>
      <header class="adm-header">
        <NuxtLink to="/" class="logo">
          <LogoMark />
          <span class="logo__name">Kalilnica <em>idej</em></span>
        </NuxtLink>
        <span class="adm-header__title">Admin panel</span>
        <div class="adm-header__right">
          <button class="btn btn--ghost btn--sm" @click="openForm()">+ Nova objava</button>
          <button class="btn btn--ghost btn--sm" @click="logout">Odjava</button>
        </div>
      </header>

      <!-- POST LIST -->
      <div v-if="!formOpen" class="adm-body container">
        <div v-if="posts.length === 0" class="adm-empty">
          <p>Še ni objav.</p>
          <button class="btn btn--primary" @click="openForm()">Ustvari prvo objavo</button>
        </div>
        <div v-else class="adm-list">
          <div v-for="p in posts" :key="p.slug" class="adm-item">
            <div class="adm-item__vis" :style="{ background: p.gradient }">
              <span>{{ p.emoji }}</span>
            </div>
            <div class="adm-item__info">
              <span class="adm-item__tag">{{ p.tag }}</span>
              <h3 class="adm-item__title">{{ p.title }}</h3>
              <p class="adm-item__meta">{{ p.date }} · {{ p.read }} min</p>
            </div>
            <div class="adm-item__actions">
              <NuxtLink :to="`/blog/${p.slug}`" class="btn btn--ghost btn--sm" target="_blank">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3 3.5L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Ogled
              </NuxtLink>
              <button class="btn btn--ghost btn--sm" @click="openForm(p)">✏️ Uredi</button>
              <button class="btn btn--ghost btn--sm adm-notify-btn" :disabled="notifying === p.slug" @click="notifySubscribers(p)">
                {{ notifying === p.slug ? '📨 Pošiljam...' : notified === p.slug ? '✓ Poslano!' : '📬 Obvesti' }}
              </button>
              <button class="btn btn--danger btn--sm" @click="deletePost(p.slug)">🗑️ Izbriši</button>
            </div>
          </div>
        </div>
      </div>

      <!-- FORM -->
      <div v-if="formOpen" class="adm-form-wrap container">
        <div class="adm-form-header">
          <h2>{{ editSlug ? 'Uredi objavo' : 'Nova objava' }}</h2>
          <button class="btn btn--ghost btn--sm" @click="closeForm">← Nazaj na seznam</button>
        </div>

        <form class="adm-form" @submit.prevent="savePost">
          <div class="adm-form__row adm-form__row--2">
            <div class="adm-field">
              <label>Naslov *</label>
              <input v-model="form.title" type="text" placeholder="Naslov objave" class="adm-input" required @input="autoSlug" />
            </div>
            <div class="adm-field">
              <label>Slug (URL)</label>
              <input v-model="form.slug" type="text" placeholder="moj-blog" class="adm-input" :disabled="!!editSlug" />
            </div>
          </div>

          <div class="adm-field">
            <label>Kratek povzetek *</label>
            <input v-model="form.excerpt" type="text" placeholder="Kratka opisna misel..." class="adm-input" required />
          </div>

          <div class="adm-form__row adm-form__row--3">
            <div class="adm-field">
              <label>Kategorija</label>
              <select v-model="form.tag" class="adm-input">
                <option v-for="t in tags" :key="t">{{ t }}</option>
              </select>
            </div>
            <div class="adm-field">
              <label>Emoji</label>
              <input v-model="form.emoji" type="text" placeholder="✨" class="adm-input" style="font-size:1.4rem" />
            </div>
            <div class="adm-field">
              <label>Čas branja (min)</label>
              <input v-model.number="form.read" type="number" min="1" max="60" class="adm-input" />
            </div>
          </div>

          <div class="adm-form__row adm-form__row--2">
            <div class="adm-field">
              <label>Datum objave</label>
              <input v-model="form.date" type="text" placeholder="22. maj 2026" class="adm-input" />
            </div>
            <div class="adm-field">
              <label>Barva kartice</label>
              <div class="adm-gradients">
                <button
                  v-for="g in gradients" :key="g.label" type="button"
                  class="adm-grad-btn" :class="{ active: form.gradient === g.value }"
                  :style="{ background: g.value }" :title="g.label"
                  @click="form.gradient = g.value"
                >
                  <span v-if="form.gradient === g.value">✓</span>
                </button>
              </div>
            </div>
          </div>

          <div class="adm-editor">
            <div class="adm-editor__pane">
              <label>Vsebina (Markdown)</label>
              <textarea v-model="form.content" class="adm-textarea" placeholder="## Uvod&#10;&#10;Tukaj napišite besedilo..." @keydown.tab.prevent="insertTab"></textarea>
            </div>
            <div class="adm-editor__pane">
              <label>Predogled</label>
              <div class="adm-preview article__body" v-html="preview"></div>
            </div>
          </div>

          <div class="adm-form__actions">
            <button type="button" class="btn btn--ghost" @click="closeForm">Prekliči</button>
            <button type="submit" class="btn btn--primary" :disabled="saving">
              {{ saving ? 'Shranjujem...' : (editSlug ? 'Posodobi objavo' : 'Objavi') }}
            </button>
          </div>
        </form>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'

definePageMeta({ layout: false })

// ── AUTH ──
const ADMIN_PWD = 'kalilnica2026'
const authed  = ref(false)
const pwd     = ref('')
const loginErr = ref(false)

const login = () => {
  if (pwd.value === ADMIN_PWD) { authed.value = true; localStorage.setItem('adm','1'); loginErr.value = false; loadPosts() }
  else { loginErr.value = true }
}
const logout = () => { authed.value = false; localStorage.removeItem('adm') }

// ── POSTS ──
const posts   = ref([])
const loadPosts = async () => { posts.value = await $fetch('/api/posts') }

// ── FORM ──
const formOpen  = ref(false)
const editSlug  = ref('')
const saving    = ref(false)
const tags = ['Filozofija','Osebna rast','Ustvarjalnost','Psihologija','Življenje','Izobraževanje','Tehnologija','Kultura']
const gradients = [
  { label: 'Indigo',  value: 'linear-gradient(135deg, #120340 0%, #2e1065 55%, #0d0026 100%)' },
  { label: 'Ocean',   value: 'linear-gradient(135deg, #021220 0%, #04304a 55%, #010c18 100%)' },
  { label: 'Teal',    value: 'linear-gradient(135deg, #021a1a 0%, #053e3e 55%, #010e0e 100%)' },
  { label: 'Purple',  value: 'linear-gradient(135deg, #1a0228 0%, #3b0a5c 55%, #0d0014 100%)' },
  { label: 'Forest',  value: 'linear-gradient(135deg, #0a1a0a 0%, #183a10 55%, #050f05 100%)' },
  { label: 'Amber',   value: 'linear-gradient(135deg, #1a0800 0%, #3d1800 55%, #0f0500 100%)' },
]

const today = () => {
  const d = new Date()
  const m = ['jan','feb','mar','apr','maj','jun','jul','avg','sep','okt','nov','dec']
  return `${d.getDate()}. ${m[d.getMonth()]} ${d.getFullYear()}`
}

const blankForm = () => ({
  title:'', slug:'', excerpt:'', tag:'Filozofija', emoji:'✨',
  read: 5, date: today(), gradient: gradients[0].value, content:''
})
const form = reactive(blankForm())

const autoSlug = () => {
  if (!editSlug.value) {
    form.slug = form.title.toLowerCase()
      .replace(/[čć]/g,'c').replace(/[šś]/g,'s').replace(/[žź]/g,'z').replace(/đ/g,'d')
      .replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,'')
  }
}

const openForm = (post = null) => {
  if (post) {
    Object.assign(form, { ...blankForm(), ...post })
    editSlug.value = post.slug
  } else {
    Object.assign(form, blankForm())
    editSlug.value = ''
  }
  formOpen.value = true
}
const closeForm = () => { formOpen.value = false; editSlug.value = '' }

const savePost = async () => {
  saving.value = true
  try {
    if (editSlug.value) {
      await $fetch(`/api/posts/${editSlug.value}`, { method: 'PUT', body: { ...form } })
    } else {
      await $fetch('/api/posts', { method: 'POST', body: { ...form, order: Date.now() } })
    }
    await loadPosts()
    closeForm()
  } catch (e) {
    alert('Napaka pri shranjevanju: ' + e.message)
  } finally {
    saving.value = false
  }
}

const deletePost = async (slug) => {
  if (!confirm(`Izbriši "${slug}"? Tega ni mogoče razveljaviti.`)) return
  await $fetch(`/api/posts/${slug}`, { method: 'DELETE' })
  await loadPosts()
}

// ── NOTIFY ──
const notifying = ref('')
const notified  = ref('')

const notifySubscribers = async (post) => {
  if (!confirm(`Pošlji obvestilo o "${post.title}" vsem naročnikom?`)) return
  notifying.value = post.slug
  try {
    const res = await $fetch('/api/notify', { method: 'POST', body: { password: ADMIN_PWD, slug: post.slug } })
    notified.value = post.slug
    alert(`✓ Obvestilo poslano ${res.sent} naročnikom.`)
    setTimeout(() => { if (notified.value === post.slug) notified.value = '' }, 4000)
  } catch (e) {
    alert('Napaka: ' + (e?.data?.message || e.message))
  } finally {
    notifying.value = ''
  }
}

const insertTab = (e) => {
  const el = e.target
  const s = el.selectionStart, end = el.selectionEnd
  form.content = form.content.substring(0, s) + '  ' + form.content.substring(end)
  nextTick(() => { el.selectionStart = el.selectionEnd = s + 2 })
}

// Live markdown preview
const preview = ref('')
watch(() => form.content, async (val) => {
  if (import.meta.client) {
    const { marked } = await import('marked')
    preview.value = marked(val || '')
  }
}, { immediate: true })

onMounted(() => {
  if (localStorage.getItem('adm') === '1') { authed.value = true; loadPosts() }
})
</script>

<style>
.adm { min-height: 100vh; background: var(--bg); }

/* LOGIN */
.adm-login { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 28px; }
.adm-card { background: var(--glass); border: 1px solid var(--border); border-radius: var(--r); padding: 44px; backdrop-filter: blur(16px); }
.adm-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--text); }
.adm-back { display: block; text-align: center; margin-top: 20px; color: var(--dim); text-decoration: none; font-size: .85rem; transition: color .2s; }
.adm-back:hover { color: var(--blue-lt); }
.adm-err { color: #fca5a5; font-size: .82rem; margin-top: 10px; text-align: center; }

/* HEADER */
.adm-header { display: flex; align-items: center; gap: 20px; padding: 16px 28px; background: rgba(7,7,15,.88); border-bottom: 1px solid var(--border); backdrop-filter: blur(24px); position: sticky; top: 0; z-index: 100; }
.adm-header__title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: .85rem; font-weight: 600; color: var(--dim); flex: 1; }
.adm-header__right { display: flex; gap: 10px; }

/* BODY */
.adm-body { padding: 40px 28px; max-width: 960px; margin: 0 auto; }
.adm-empty { text-align: center; padding: 80px 20px; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 20px; }

/* LIST */
.adm-list { display: flex; flex-direction: column; gap: 14px; }
.adm-item { display: grid; grid-template-columns: 72px 1fr auto; gap: 20px; align-items: center; background: var(--glass); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; backdrop-filter: blur(8px); transition: border-color .2s; }
.adm-item:hover { border-color: var(--ba); }
.adm-item__vis { width: 72px; height: 56px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; }
.adm-item__info { min-width: 0; }
.adm-item__tag { font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--cyan); }
.adm-item__title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: .97rem; font-weight: 700; color: #fff; margin: 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.adm-item__meta { font-size: .75rem; color: var(--dim); }
.adm-item__actions { display: flex; gap: 8px; flex-shrink: 0; }

/* FORM */
.adm-form-wrap { max-width: 1100px; margin: 0 auto; padding: 40px 28px 80px; }
.adm-form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.adm-form-header h2 { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; }

.adm-form { display: flex; flex-direction: column; gap: 22px; }
.adm-form__row { display: grid; gap: 16px; }
.adm-form__row--2 { grid-template-columns: 1fr 1fr; }
.adm-form__row--3 { grid-template-columns: 1fr 1fr 1fr; }

.adm-field { display: flex; flex-direction: column; gap: 8px; }
.adm-field label { font-size: .78rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--dim); }

.adm-input {
  background: var(--glass); border: 1px solid var(--border); color: var(--text);
  padding: 11px 16px; border-radius: 10px; font-size: .93rem; outline: none;
  font-family: inherit; backdrop-filter: blur(10px); transition: border-color .2s; width: 100%;
}
.adm-input:focus { border-color: var(--blue); }
.adm-input::placeholder { color: var(--dim); }
.adm-input:disabled { opacity: .5; cursor: not-allowed; }
.adm-input option { background: #1a1a2e; }

.adm-gradients { display: flex; gap: 10px; flex-wrap: wrap; }
.adm-grad-btn {
  width: 40px; height: 40px; border-radius: 8px; border: 2px solid transparent;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: .9rem; transition: all .2s;
}
.adm-grad-btn.active { border-color: #fff; transform: scale(1.1); }
.adm-grad-btn:hover { transform: scale(1.08); }

.adm-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.adm-editor__pane { display: flex; flex-direction: column; gap: 8px; }
.adm-editor__pane label { font-size: .78rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--dim); }

.adm-textarea {
  flex: 1; min-height: 380px; background: var(--glass); border: 1px solid var(--border);
  color: var(--text); padding: 16px; border-radius: 10px; font-size: .9rem;
  font-family: 'Consolas', 'Monaco', monospace; line-height: 1.6; outline: none;
  resize: vertical; transition: border-color .2s;
}
.adm-textarea:focus { border-color: var(--blue); }

.adm-preview {
  min-height: 380px; background: var(--glass); border: 1px solid var(--border);
  border-radius: 10px; padding: 16px; overflow-y: auto; font-size: .9rem; color: var(--muted);
}

.adm-form__actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .adm-form__row--2, .adm-form__row--3, .adm-editor { grid-template-columns: 1fr; }
  .adm-item { grid-template-columns: 56px 1fr; }
  .adm-item__actions { grid-column: 1/-1; justify-content: flex-end; }
}
</style>
