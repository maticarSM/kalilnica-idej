<template>
  <div class="adm">

    <!-- LOGIN -->
    <div v-if="!authed" class="adm-login">
      <div class="adm-card" style="max-width:380px; margin:0 auto;">
        <div class="adm-logo">
          <LogoMark style="width:38px;height:35px" />
          <span>Admin panel</span>
        </div>
        <p style="color:var(--muted);font-size:.9rem;margin-bottom:24px;">Vnesite geslo za dostop do upravljanja vsebine.</p>
        <form @submit.prevent="login">
          <input v-model="pwd" type="password" placeholder="Geslo" class="adm-input" autofocus />
          <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;margin-top:12px;">Prijava</button>
          <p v-if="loginErr" class="adm-err">Napačno geslo.</p>
        </form>
        <NuxtLink to="/" class="adm-back">← Nazaj na stran</NuxtLink>
      </div>
    </div>

    <!-- PANEL -->
    <template v-else>
      <header class="adm-header">
        <NuxtLink to="/" class="logo">
          <LogoMark />
          <span class="logo__name">Kalilnica <em>idej</em></span>
        </NuxtLink>

        <!-- TABS -->
        <nav class="adm-tabs">
          <button v-for="t in tabs" :key="t.id" class="adm-tab" :class="{ active: activeTab === t.id }"
            @click="switchTab(t.id)">
            {{ t.icon }} {{ t.label }}
            <span class="adm-tab__count">{{ counts[t.id] }}</span>
          </button>
        </nav>

        <div class="adm-header__right">
          <button class="btn btn--ghost btn--sm" @click="openForm()">+ {{ newLabels[activeTab] }}</button>
          <button class="btn btn--ghost btn--sm" @click="logout">Odjava</button>
        </div>
      </header>

      <!-- ── OBJAVE ── -->
      <template v-if="activeTab === 'objave'">
        <div v-if="!formOpen" class="adm-body container">
          <div v-if="posts.length === 0" class="adm-empty">
            <p>Še ni objav.</p>
            <button class="btn btn--primary" @click="openForm()">Ustvari prvo objavo</button>
          </div>
          <div v-else class="adm-list">
            <div v-for="p in posts" :key="p.slug" class="adm-item">
              <div class="adm-item__vis" :style="{ background: p.gradient }"><span>{{ p.emoji }}</span></div>
              <div class="adm-item__info">
                <span class="adm-item__tag">{{ p.tag }}</span>
                <h3 class="adm-item__title">{{ p.title }}</h3>
                <p class="adm-item__meta">{{ p.date }} · {{ p.read }} min</p>
              </div>
              <div class="adm-item__actions">
                <NuxtLink :to="`/blog/${p.slug}`" class="btn btn--ghost btn--sm" target="_blank">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3 3.5L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Ogled
                </NuxtLink>
                <button class="btn btn--ghost btn--sm" @click="openForm(p)">✏️ Uredi</button>
                <button class="btn btn--ghost btn--sm" :disabled="notifying === p.slug" @click="notifySubscribers(p)">
                  {{ notifying === p.slug ? '📨 Pošiljam...' : notified === p.slug ? '✓ Poslano!' : '📬 Obvesti' }}
                </button>
                <button class="btn btn--danger btn--sm" @click="deleteItem('posts', p.slug, loadPosts)">🗑️ Izbriši</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="formOpen" class="adm-form-wrap container">
          <div class="adm-form-header">
            <h2>{{ editSlug ? 'Uredi objavo' : 'Nova objava' }}</h2>
            <button class="btn btn--ghost btn--sm" @click="closeForm">← Nazaj</button>
          </div>
          <form class="adm-form" @submit.prevent="savePost">
            <div class="adm-form__row adm-form__row--2">
              <div class="adm-field"><label>Naslov *</label><input v-model="postForm.title" type="text" placeholder="Naslov objave" class="adm-input" required @input="autoSlug(postForm)" /></div>
              <div class="adm-field"><label>Slug (URL)</label><input v-model="postForm.slug" type="text" class="adm-input" :disabled="!!editSlug" /></div>
            </div>
            <div class="adm-field"><label>Kratek povzetek *</label><input v-model="postForm.excerpt" type="text" placeholder="Kratka opisna misel..." class="adm-input" required /></div>
            <div class="adm-form__row adm-form__row--3">
              <div class="adm-field"><label>Kategorija</label><select v-model="postForm.tag" class="adm-input"><option v-for="t in postTags" :key="t">{{ t }}</option></select></div>
              <div class="adm-field"><label>Emoji</label><input v-model="postForm.emoji" type="text" placeholder="✨" class="adm-input" style="font-size:1.4rem" /></div>
              <div class="adm-field"><label>Čas branja (min)</label><input v-model.number="postForm.read" type="number" min="1" max="60" class="adm-input" /></div>
            </div>
            <div class="adm-form__row adm-form__row--2">
              <div class="adm-field"><label>Datum objave</label><input v-model="postForm.date" type="text" placeholder="24. maj 2026" class="adm-input" /></div>
              <div class="adm-field">
                <label>Barva kartice</label>
                <div class="adm-gradients">
                  <button v-for="g in gradients" :key="g.label" type="button" class="adm-grad-btn" :class="{ active: postForm.gradient === g.value }" :style="{ background: g.value }" :title="g.label" @click="postForm.gradient = g.value">
                    <span v-if="postForm.gradient === g.value">✓</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="adm-editor">
              <div class="adm-editor__pane"><label>Vsebina (Markdown)</label><textarea v-model="postForm.content" class="adm-textarea" placeholder="## Uvod..." @keydown.tab.prevent="insertTab($event, postForm)"></textarea></div>
              <div class="adm-editor__pane"><label>Predogled</label><div class="adm-preview article__body" v-html="preview"></div></div>
            </div>
            <div class="adm-form__actions">
              <button type="button" class="btn btn--ghost" @click="closeForm">Prekliči</button>
              <button type="submit" class="btn btn--primary" :disabled="saving">{{ saving ? 'Shranjujem...' : (editSlug ? 'Posodobi' : 'Objavi') }}</button>
            </div>
          </form>
        </div>
      </template>

      <!-- ── PROJEKTI ── -->
      <template v-if="activeTab === 'projekti'">
        <div v-if="!formOpen" class="adm-body container">
          <div v-if="projekti.length === 0" class="adm-empty">
            <p>Še ni projektov.</p>
            <button class="btn btn--primary" @click="openForm()">Dodaj prvi projekt</button>
          </div>
          <div v-else class="adm-list">
            <div v-for="p in projekti" :key="p.slug" class="adm-item">
              <div class="adm-item__vis adm-item__vis--num"><span class="adm-item__num">{{ p.num }}</span><span>{{ p.emoji }}</span></div>
              <div class="adm-item__info">
                <span class="adm-item__tag">Projekt</span>
                <h3 class="adm-item__title">{{ p.title }}</h3>
                <p class="adm-item__meta">{{ p.subtitle }}</p>
              </div>
              <div class="adm-item__actions">
                <button class="btn btn--ghost btn--sm" @click="openForm(p)">✏️ Uredi</button>
                <button class="btn btn--danger btn--sm" @click="deleteItem('projekti', p.slug, loadProjekti)">🗑️ Izbriši</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="formOpen" class="adm-form-wrap container">
          <div class="adm-form-header">
            <h2>{{ editSlug ? 'Uredi projekt' : 'Nov projekt' }}</h2>
            <button class="btn btn--ghost btn--sm" @click="closeForm">← Nazaj</button>
          </div>
          <form class="adm-form" @submit.prevent="saveProjekt">
            <div class="adm-form__row adm-form__row--2">
              <div class="adm-field"><label>Ime projekta *</label><input v-model="projektForm.title" type="text" placeholder="GO-SUP d.o.o." class="adm-input" required @input="autoSlug(projektForm)" /></div>
              <div class="adm-field"><label>Slug (URL)</label><input v-model="projektForm.slug" type="text" class="adm-input" :disabled="!!editSlug" /></div>
            </div>
            <div class="adm-form__row adm-form__row--3">
              <div class="adm-field"><label>Emoji</label><input v-model="projektForm.emoji" type="text" placeholder="🚀" class="adm-input" style="font-size:1.4rem" /></div>
              <div class="adm-field"><label>Številka (01, 02…)</label><input v-model="projektForm.num" type="text" placeholder="01" class="adm-input" /></div>
              <div class="adm-field"><label>Podnaslov</label><input v-model="projektForm.subtitle" type="text" placeholder="Kratek opis..." class="adm-input" /></div>
            </div>
            <div class="adm-field"><label>Spletna stran (neobvezno)</label><input v-model="projektForm.link" type="url" placeholder="https://..." class="adm-input" /></div>
            <div class="adm-editor">
              <div class="adm-editor__pane"><label>Opis (Markdown)</label><textarea v-model="projektForm.content" class="adm-textarea" placeholder="Opišite projekt..." @keydown.tab.prevent="insertTab($event, projektForm)"></textarea></div>
              <div class="adm-editor__pane"><label>Predogled</label><div class="adm-preview article__body" v-html="preview"></div></div>
            </div>
            <div class="adm-form__actions">
              <button type="button" class="btn btn--ghost" @click="closeForm">Prekliči</button>
              <button type="submit" class="btn btn--primary" :disabled="saving">{{ saving ? 'Shranjujem...' : (editSlug ? 'Posodobi' : 'Dodaj projekt') }}</button>
            </div>
          </form>
        </div>
      </template>

      <!-- ── ZGODBE O USPEHU ── -->
      <template v-if="activeTab === 'zgodbe'">
        <div v-if="!formOpen" class="adm-body container">
          <div v-if="zgodbe.length === 0" class="adm-empty">
            <p>Še ni zgodb o uspehu.</p>
            <button class="btn btn--primary" @click="openForm()">Dodaj prvo zgodbo</button>
          </div>
          <div v-else class="adm-list">
            <div v-for="z in zgodbe" :key="z.slug" class="adm-item">
              <div class="adm-item__vis"><span style="font-size:1.8rem">{{ z.emoji }}</span></div>
              <div class="adm-item__info">
                <span class="adm-item__tag">Zgodba o uspehu</span>
                <h3 class="adm-item__title">{{ z.title }}</h3>
                <p class="adm-item__meta">{{ z.person }} · {{ z.role }}</p>
              </div>
              <div class="adm-item__actions">
                <a v-if="z.link" :href="z.link" target="_blank" class="btn btn--ghost btn--sm">🔗 Spletna stran</a>
                <button class="btn btn--ghost btn--sm" @click="openForm(z)">✏️ Uredi</button>
                <button class="btn btn--danger btn--sm" @click="deleteItem('zgodbe', z.slug, loadZgodbe)">🗑️ Izbriši</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="formOpen" class="adm-form-wrap container">
          <div class="adm-form-header">
            <h2>{{ editSlug ? 'Uredi zgodbo' : 'Nova zgodba o uspehu' }}</h2>
            <button class="btn btn--ghost btn--sm" @click="closeForm">← Nazaj</button>
          </div>
          <form class="adm-form" @submit.prevent="saveZgodba">
            <div class="adm-form__row adm-form__row--2">
              <div class="adm-field"><label>Naziv / Podjetje *</label><input v-model="zgodbaForm.title" type="text" placeholder="Ollo Audio" class="adm-input" required @input="autoSlug(zgodbaForm)" /></div>
              <div class="adm-field"><label>Slug (URL)</label><input v-model="zgodbaForm.slug" type="text" class="adm-input" :disabled="!!editSlug" /></div>
            </div>
            <div class="adm-form__row adm-form__row--3">
              <div class="adm-field"><label>Emoji</label><input v-model="zgodbaForm.emoji" type="text" placeholder="⭐" class="adm-input" style="font-size:1.4rem" /></div>
              <div class="adm-field"><label>Ime osebe</label><input v-model="zgodbaForm.person" type="text" placeholder="Rok Gulič" class="adm-input" /></div>
              <div class="adm-field"><label>Vloga / Podjetje</label><input v-model="zgodbaForm.role" type="text" placeholder="Ustanovitelj, Ollo Audio" class="adm-input" /></div>
            </div>
            <div class="adm-field"><label>Spletna stran (neobvezno)</label><input v-model="zgodbaForm.link" type="url" placeholder="https://..." class="adm-input" /></div>
            <div class="adm-editor">
              <div class="adm-editor__pane"><label>Zgodba (Markdown)</label><textarea v-model="zgodbaForm.content" class="adm-textarea" placeholder="Opišite zgodbo o uspehu..." @keydown.tab.prevent="insertTab($event, zgodbaForm)"></textarea></div>
              <div class="adm-editor__pane"><label>Predogled</label><div class="adm-preview article__body" v-html="preview"></div></div>
            </div>
            <div class="adm-form__actions">
              <button type="button" class="btn btn--ghost" @click="closeForm">Prekliči</button>
              <button type="submit" class="btn btn--primary" :disabled="saving">{{ saving ? 'Shranjujem...' : (editSlug ? 'Posodobi' : 'Dodaj zgodbo') }}</button>
            </div>
          </form>
        </div>
      </template>

      <!-- ── DOGODKI ── -->
      <template v-if="activeTab === 'dogodki'">
        <div v-if="!formOpen" class="adm-body container">
          <div v-if="dogodki.length === 0" class="adm-empty">
            <p>Še ni dogodkov.</p>
            <button class="btn btn--primary" @click="openForm()">Dodaj prvi dogodek</button>
          </div>
          <div v-else class="adm-list">
            <div v-for="d in dogodki" :key="d.slug" class="adm-item">
              <div class="adm-item__vis"><span style="font-size:1.8rem">{{ d.emoji }}</span></div>
              <div class="adm-item__info">
                <span class="adm-item__tag">{{ d.date }}</span>
                <h3 class="adm-item__title">{{ d.title }}</h3>
                <p class="adm-item__meta">{{ d.location || 'Lokacija ni določena' }}</p>
              </div>
              <div class="adm-item__actions">
                <a v-if="d.link" :href="d.link" target="_blank" class="btn btn--ghost btn--sm">🔗 Več info</a>
                <button class="btn btn--ghost btn--sm" @click="openForm(d)">✏️ Uredi</button>
                <button class="btn btn--danger btn--sm" @click="deleteItem('dogodki', d.slug, loadDogodki)">🗑️ Izbriši</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="formOpen" class="adm-form-wrap container">
          <div class="adm-form-header">
            <h2>{{ editSlug ? 'Uredi dogodek' : 'Nov dogodek' }}</h2>
            <button class="btn btn--ghost btn--sm" @click="closeForm">← Nazaj</button>
          </div>
          <form class="adm-form" @submit.prevent="saveDogodek">
            <div class="adm-form__row adm-form__row--2">
              <div class="adm-field"><label>Naziv dogodka *</label><input v-model="dogodekForm.title" type="text" placeholder="Podjetniška kavarna" class="adm-input" required @input="autoSlug(dogodekForm)" /></div>
              <div class="adm-field"><label>Slug (URL)</label><input v-model="dogodekForm.slug" type="text" class="adm-input" :disabled="!!editSlug" /></div>
            </div>
            <div class="adm-form__row adm-form__row--3">
              <div class="adm-field"><label>Emoji</label><input v-model="dogodekForm.emoji" type="text" placeholder="📅" class="adm-input" style="font-size:1.4rem" /></div>
              <div class="adm-field"><label>Datum (prikaz)</label><input v-model="dogodekForm.date" type="text" placeholder="Junij 2026" class="adm-input" /></div>
              <div class="adm-field"><label>Lokacija (neobvezno)</label><input v-model="dogodekForm.location" type="text" placeholder="Bukovica 43" class="adm-input" /></div>
            </div>
            <div class="adm-field"><label>Spletna stran / Prijava (neobvezno)</label><input v-model="dogodekForm.link" type="url" placeholder="https://..." class="adm-input" /></div>
            <div class="adm-editor">
              <div class="adm-editor__pane"><label>Opis (Markdown)</label><textarea v-model="dogodekForm.content" class="adm-textarea" placeholder="Opišite dogodek..." @keydown.tab.prevent="insertTab($event, dogodekForm)"></textarea></div>
              <div class="adm-editor__pane"><label>Predogled</label><div class="adm-preview article__body" v-html="preview"></div></div>
            </div>
            <div class="adm-form__actions">
              <button type="button" class="btn btn--ghost" @click="closeForm">Prekliči</button>
              <button type="submit" class="btn btn--primary" :disabled="saving">{{ saving ? 'Shranjujem...' : (editSlug ? 'Posodobi' : 'Dodaj dogodek') }}</button>
            </div>
          </form>
        </div>
      </template>

    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'

definePageMeta({ layout: false })

// ── AUTH ──
const ADMIN_PWD = 'kalilnica2026'
const authed   = ref(false)
const pwd      = ref('')
const loginErr = ref(false)

const login = () => {
  if (pwd.value === ADMIN_PWD) { authed.value = true; localStorage.setItem('adm','1'); loginErr.value = false; loadAll() }
  else loginErr.value = true
}
const logout = () => { authed.value = false; localStorage.removeItem('adm') }

// ── TABS ──
const tabs = [
  { id: 'objave',   icon: '📝', label: 'Objave' },
  { id: 'projekti', icon: '🚀', label: 'Projekti' },
  { id: 'zgodbe',   icon: '⭐', label: 'Zgodbe o uspehu' },
  { id: 'dogodki',  icon: '📅', label: 'Dogodki' },
]
const newLabels = { objave: 'Nova objava', projekti: 'Nov projekt', zgodbe: 'Nova zgodba', dogodki: 'Nov dogodek' }
const activeTab = ref('objave')

const switchTab = (id) => { activeTab.value = id; closeForm() }

// ── DATA ──
const posts    = ref([])
const projekti = ref([])
const zgodbe   = ref([])
const dogodki  = ref([])

const counts = computed(() => ({
  objave:   posts.value.length,
  projekti: projekti.value.length,
  zgodbe:   zgodbe.value.length,
  dogodki:  dogodki.value.length,
}))

const loadPosts    = async () => { posts.value    = await $fetch('/api/posts') }
const loadProjekti = async () => { projekti.value = await $fetch('/api/projekti') }
const loadZgodbe   = async () => { zgodbe.value   = await $fetch('/api/zgodbe') }
const loadDogodki  = async () => { dogodki.value  = await $fetch('/api/dogodki') }
const loadAll      = () => Promise.all([loadPosts(), loadProjekti(), loadZgodbe(), loadDogodki()])

// ── FORM STATE ──
const formOpen = ref(false)
const editSlug = ref('')
const saving   = ref(false)

const postTags = ['Filozofija','Osebna rast','Ustvarjalnost','Psihologija','Življenje','Izobraževanje','Tehnologija','Kultura']
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
const todayMonth = () => {
  const d = new Date()
  const m = ['Januar','Februar','Marec','April','Maj','Junij','Julij','Avgust','September','Oktober','November','December']
  return `${m[d.getMonth()]} ${d.getFullYear()}`
}

const blankPost    = () => ({ title:'', slug:'', excerpt:'', tag:'Filozofija', emoji:'✨', read:5, date:today(), gradient:gradients[0].value, content:'' })
const blankProjekt = () => ({ title:'', slug:'', emoji:'🚀', num:'01', subtitle:'', link:'', content:'' })
const blankZgodba  = () => ({ title:'', slug:'', emoji:'⭐', person:'', role:'', link:'', content:'' })
const blankDogodek = () => ({ title:'', slug:'', emoji:'📅', date:todayMonth(), location:'', link:'', content:'' })

const postForm    = reactive(blankPost())
const projektForm = reactive(blankProjekt())
const zgodbaForm  = reactive(blankZgodba())
const dogodekForm = reactive(blankDogodek())

const activeForm = computed(() => {
  if (activeTab.value === 'objave')   return postForm
  if (activeTab.value === 'projekti') return projektForm
  if (activeTab.value === 'zgodbe')   return zgodbaForm
  return dogodekForm
})

const autoSlug = (form) => {
  if (!editSlug.value) {
    form.slug = form.title.toLowerCase()
      .replace(/[čć]/g,'c').replace(/[šś]/g,'s').replace(/[žź]/g,'z').replace(/đ/g,'d')
      .replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,'')
  }
}

const openForm = (item = null) => {
  const blank = activeTab.value === 'objave' ? blankPost()
    : activeTab.value === 'projekti' ? blankProjekt()
    : activeTab.value === 'zgodbe'   ? blankZgodba()
    : blankDogodek()
  Object.assign(activeForm.value, blank)
  if (item) { Object.assign(activeForm.value, item); editSlug.value = item.slug }
  else editSlug.value = ''
  formOpen.value = true
}
const closeForm = () => { formOpen.value = false; editSlug.value = '' }

// ── SAVE / DELETE ──
const savePost = async () => {
  saving.value = true
  try {
    if (editSlug.value) await $fetch(`/api/posts/${editSlug.value}`, { method: 'PUT', body: { ...postForm } })
    else await $fetch('/api/posts', { method: 'POST', body: { ...postForm, order: Date.now() } })
    await loadPosts(); closeForm()
  } catch (e) { alert('Napaka: ' + e.message) }
  finally { saving.value = false }
}

const saveProjekt = async () => {
  saving.value = true
  try {
    if (editSlug.value) await $fetch(`/api/projekti/${editSlug.value}`, { method: 'PUT', body: { ...projektForm } })
    else await $fetch('/api/projekti', { method: 'POST', body: { ...projektForm, order: Date.now() } })
    await loadProjekti(); closeForm()
  } catch (e) { alert('Napaka: ' + e.message) }
  finally { saving.value = false }
}

const saveZgodba = async () => {
  saving.value = true
  try {
    if (editSlug.value) await $fetch(`/api/zgodbe/${editSlug.value}`, { method: 'PUT', body: { ...zgodbaForm } })
    else await $fetch('/api/zgodbe', { method: 'POST', body: { ...zgodbaForm, order: Date.now() } })
    await loadZgodbe(); closeForm()
  } catch (e) { alert('Napaka: ' + e.message) }
  finally { saving.value = false }
}

const saveDogodek = async () => {
  saving.value = true
  try {
    if (editSlug.value) await $fetch(`/api/dogodki/${editSlug.value}`, { method: 'PUT', body: { ...dogodekForm } })
    else await $fetch('/api/dogodki', { method: 'POST', body: { ...dogodekForm, order: Date.now() } })
    await loadDogodki(); closeForm()
  } catch (e) { alert('Napaka: ' + e.message) }
  finally { saving.value = false }
}

const deleteItem = async (type, slug, reload) => {
  if (!confirm(`Izbriši "${slug}"? Tega ni mogoče razveljaviti.`)) return
  await $fetch(`/api/${type}/${slug}`, { method: 'DELETE' })
  await reload()
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
  } catch (e) { alert('Napaka: ' + (e?.data?.message || e.message)) }
  finally { notifying.value = '' }
}

// ── MARKDOWN PREVIEW ──
const preview = ref('')
watch(() => activeForm.value.content, async (val) => {
  if (import.meta.client) {
    const { marked } = await import('marked')
    preview.value = marked(val || '')
  }
}, { immediate: true })

const insertTab = (e, form) => {
  const el = e.target
  const s = el.selectionStart, end = el.selectionEnd
  form.content = form.content.substring(0, s) + '  ' + form.content.substring(end)
  nextTick(() => { el.selectionStart = el.selectionEnd = s + 2 })
}

onMounted(() => {
  if (localStorage.getItem('adm') === '1') { authed.value = true; loadAll() }
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
.adm-header { display: flex; align-items: center; gap: 16px; padding: 12px 24px; background: rgba(7,7,15,.92); border-bottom: 1px solid var(--border); backdrop-filter: blur(24px); position: sticky; top: 0; z-index: 100; flex-wrap: wrap; }
.adm-header__right { display: flex; gap: 10px; margin-left: auto; }

/* TABS */
.adm-tabs { display: flex; gap: 4px; flex: 1; flex-wrap: wrap; }
.adm-tab { display: flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: var(--dim); font-size: .82rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: inherit; }
.adm-tab:hover { color: var(--text); background: var(--glass); }
.adm-tab.active { color: var(--blue-lt); background: rgba(79,70,229,.1); border-color: rgba(79,70,229,.25); }
.adm-tab__count { background: rgba(255,255,255,.08); color: var(--dim); font-size: .68rem; font-weight: 700; padding: 1px 7px; border-radius: 100px; }
.adm-tab.active .adm-tab__count { background: rgba(79,70,229,.2); color: var(--blue-lt); }

/* BODY */
.adm-body { padding: 40px 28px; max-width: 960px; margin: 0 auto; }
.adm-empty { text-align: center; padding: 80px 20px; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 20px; }

/* LIST */
.adm-list { display: flex; flex-direction: column; gap: 14px; }
.adm-item { display: grid; grid-template-columns: 72px 1fr auto; gap: 20px; align-items: center; background: var(--glass); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; backdrop-filter: blur(8px); transition: border-color .2s; }
.adm-item:hover { border-color: var(--ba); }
.adm-item__vis { width: 72px; height: 56px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; background: var(--glass); border: 1px solid var(--border); }
.adm-item__vis--num { flex-direction: column; gap: 2px; }
.adm-item__num { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: .7rem; font-weight: 800; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.adm-item__info { min-width: 0; }
.adm-item__tag { font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--cyan); }
.adm-item__title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: .97rem; font-weight: 700; color: #fff; margin: 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.adm-item__meta { font-size: .75rem; color: var(--dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.adm-item__actions { display: flex; gap: 8px; flex-shrink: 0; flex-wrap: wrap; justify-content: flex-end; }

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
.adm-input { background: var(--glass); border: 1px solid var(--border); color: var(--text); padding: 11px 16px; border-radius: 10px; font-size: .93rem; outline: none; font-family: inherit; backdrop-filter: blur(10px); transition: border-color .2s; width: 100%; }
.adm-input:focus { border-color: var(--blue); }
.adm-input::placeholder { color: var(--dim); }
.adm-input:disabled { opacity: .5; cursor: not-allowed; }
.adm-input option { background: #1a1a2e; }
.adm-gradients { display: flex; gap: 10px; flex-wrap: wrap; }
.adm-grad-btn { width: 40px; height: 40px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; font-size: .9rem; transition: all .2s; }
.adm-grad-btn.active { border-color: #fff; transform: scale(1.1); }
.adm-grad-btn:hover { transform: scale(1.08); }
.adm-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.adm-editor__pane { display: flex; flex-direction: column; gap: 8px; }
.adm-editor__pane label { font-size: .78rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--dim); }
.adm-textarea { flex: 1; min-height: 320px; background: var(--glass); border: 1px solid var(--border); color: var(--text); padding: 16px; border-radius: 10px; font-size: .9rem; font-family: 'Consolas', 'Monaco', monospace; line-height: 1.6; outline: none; resize: vertical; transition: border-color .2s; }
.adm-textarea:focus { border-color: var(--blue); }
.adm-preview { min-height: 320px; background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 16px; overflow-y: auto; font-size: .9rem; color: var(--muted); }
.adm-form__actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .adm-header { gap: 10px; }
  .adm-tabs { order: 3; width: 100%; }
}
@media (max-width: 768px) {
  .adm-form__row--2, .adm-form__row--3, .adm-editor { grid-template-columns: 1fr; }
  .adm-item { grid-template-columns: 56px 1fr; }
  .adm-item__actions { grid-column: 1/-1; justify-content: flex-end; }
}
</style>
