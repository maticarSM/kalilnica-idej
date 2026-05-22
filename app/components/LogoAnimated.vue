<template>
  <div class="al-wrap">
    <svg class="al" width="100%" viewBox="0 0 680 430" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="Kalilnica idej – animirani logo">

      <rect class="al-soil"     x="200" y="310" width="280" height="18" rx="9" fill="#8B6F47"/>

      <path class="al-stem"     d="M340 308 C340 270 340 240 340 200" stroke="#4CAF50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path class="al-branch-l" d="M340 250 C320 240 295 230 275 215" stroke="#4CAF50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path class="al-branch-r" d="M340 235 C360 222 385 215 405 205" stroke="#4CAF50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path class="al-branch-s" d="M340 275 C325 265 308 258 295 252" stroke="#4CAF50" stroke-width="2"   fill="none" stroke-linecap="round"/>

      <ellipse class="al-leaf-ll" cx="265" cy="210" rx="16" ry="8"  fill="#66BB6A" transform="rotate(-30 265 210)"/>
      <ellipse class="al-leaf-lr" cx="412" cy="200" rx="16" ry="8"  fill="#66BB6A" transform="rotate(25 412 200)"/>
      <ellipse class="al-leaf-ls" cx="288" cy="248" rx="12" ry="6"  fill="#66BB6A" transform="rotate(-20 288 248)"/>

      <g class="al-bulb-c">
        <ellipse cx="340" cy="178" rx="20" ry="24" fill="#FFF176"/>
        <path d="M328 196 Q334 204 340 206 Q346 204 352 196" fill="none" stroke="#F9A825" stroke-width="2" stroke-linecap="round"/>
        <rect x="333" y="205" width="14" height="5" rx="2" fill="#BDBDBD"/>
        <path d="M336 190 Q340 184 344 190" fill="none" stroke="#F9A825" stroke-width="1.5"/>
      </g>
      <g class="al-ray-c">
        <line x1="340" y1="152" x2="340" y2="144" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="355" y1="157" x2="360" y2="150" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="325" y1="157" x2="320" y2="150" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="362" y1="170" x2="370" y2="167" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="318" y1="170" x2="310" y2="167" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
      </g>

      <g class="al-bulb-l">
        <ellipse cx="272" cy="198" rx="14" ry="17" fill="#FFE082"/>
        <path d="M264 210 Q268 216 272 217 Q276 216 280 210" fill="none" stroke="#F9A825" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="266" y="216" width="12" height="4" rx="2" fill="#BDBDBD"/>
        <path d="M269 205 Q272 200 275 205" fill="none" stroke="#F9A825" stroke-width="1.2"/>
      </g>
      <g class="al-ray-l">
        <line x1="272" y1="179" x2="272" y2="173" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="283" y1="183" x2="287" y2="178" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="261" y1="183" x2="257" y2="178" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
      </g>

      <g class="al-bulb-r">
        <ellipse cx="408" cy="188" rx="14" ry="17" fill="#FFE082"/>
        <path d="M400 200 Q404 206 408 207 Q412 206 416 200" fill="none" stroke="#F9A825" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="402" y="206" width="12" height="4" rx="2" fill="#BDBDBD"/>
        <path d="M405 195 Q408 190 411 195" fill="none" stroke="#F9A825" stroke-width="1.2"/>
      </g>
      <g class="al-ray-r">
        <line x1="408" y1="169" x2="408" y2="163" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="419" y1="173" x2="423" y2="168" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="397" y1="173" x2="393" y2="168" stroke="#FFD740" stroke-width="1.2" stroke-linecap="round"/>
      </g>

      <g class="al-sprout-l">
        <path d="M280 310 C280 295 278 285 275 275" stroke="#81C784" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="270" cy="271" rx="9" ry="5" fill="#A5D6A7" opacity=".85" transform="rotate(-25 270 271)"/>
      </g>
      <g class="al-sprout-r">
        <path d="M400 310 C400 295 402 285 405 275" stroke="#81C784" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="410" cy="271" rx="9" ry="5" fill="#A5D6A7" opacity=".85" transform="rotate(25 410 271)"/>
      </g>

      <text v-if="showText" x="340" y="372" text-anchor="middle" class="al-title">Kalilnica idej</text>
      <text v-if="showText" x="340" y="400" text-anchor="middle" class="al-sub">kjer ideje kalijo</text>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  showText: { type: Boolean, default: true }
})
</script>

<style scoped>
.al-wrap { display: flex; align-items: center; justify-content: center; }
.al { overflow: visible; }

/* ── KEYFRAMES ── */
@keyframes al-grow-stem     { from { stroke-dashoffset: 120 } to { stroke-dashoffset: 0 } }
@keyframes al-grow-branch-l { from { stroke-dashoffset: 80  } to { stroke-dashoffset: 0 } }
@keyframes al-grow-branch-r { from { stroke-dashoffset: 80  } to { stroke-dashoffset: 0 } }
@keyframes al-grow-branch-s { from { stroke-dashoffset: 60  } to { stroke-dashoffset: 0 } }
@keyframes al-leaf-in   { from { opacity:0; transform:scale(0) } to { opacity:.75; transform:scale(1) } }
@keyframes al-bulb-pop  { 0%{opacity:0;transform:scale(.2)} 70%{transform:scale(1.12)} 100%{opacity:1;transform:scale(1)} }
@keyframes al-glow-pulse { 0%,100%{opacity:.25} 50%{opacity:1} }
@keyframes al-sprout-up  { from{opacity:0;transform:scaleY(0);transform-origin:bottom center} to{opacity:1;transform:scaleY(1);transform-origin:bottom center} }
@keyframes al-title-fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes al-soil-in    { from{opacity:0;transform:scaleX(0)} to{opacity:.38;transform:scaleX(1)} }

/* ── ELEMENTS ── */
.al-soil     { opacity:0; transform-origin:340px 319px; animation: al-soil-in 0.5s ease-out 0.1s forwards; }
.al-stem     { stroke-dasharray:120; stroke-dashoffset:120; animation: al-grow-stem 0.7s ease-out 0.2s forwards; }
.al-branch-l { stroke-dasharray:80;  stroke-dashoffset:80;  animation: al-grow-branch-l 0.5s ease-out 0.85s forwards; }
.al-branch-r { stroke-dasharray:80;  stroke-dashoffset:80;  animation: al-grow-branch-r 0.5s ease-out 0.95s forwards; }
.al-branch-s { stroke-dasharray:60;  stroke-dashoffset:60;  animation: al-grow-branch-s 0.4s ease-out 1.0s  forwards; }

.al-leaf-ll  { opacity:0; transform-origin:265px 210px; animation: al-leaf-in 0.4s ease-out 1.35s forwards; }
.al-leaf-lr  { opacity:0; transform-origin:412px 200px; animation: al-leaf-in 0.4s ease-out 1.45s forwards; }
.al-leaf-ls  { opacity:0; transform-origin:288px 248px; animation: al-leaf-in 0.3s ease-out 1.40s forwards; }

.al-bulb-c   { opacity:0; transform-origin:340px 178px; animation: al-bulb-pop 0.5s cubic-bezier(.34,1.56,.64,1) 0.9s  forwards; }
.al-bulb-l   { opacity:0; transform-origin:272px 198px; animation: al-bulb-pop 0.5s cubic-bezier(.34,1.56,.64,1) 1.35s forwards; }
.al-bulb-r   { opacity:0; transform-origin:408px 188px; animation: al-bulb-pop 0.5s cubic-bezier(.34,1.56,.64,1) 1.50s forwards; }

.al-ray-c    { animation: al-glow-pulse 1.8s ease-in-out 1.40s infinite; opacity:0; }
.al-ray-l    { animation: al-glow-pulse 1.8s ease-in-out 1.85s infinite; opacity:0; }
.al-ray-r    { animation: al-glow-pulse 1.8s ease-in-out 2.00s infinite; opacity:0; }

.al-sprout-l { opacity:0; animation: al-sprout-up 0.5s ease-out 1.60s forwards; }
.al-sprout-r { opacity:0; animation: al-sprout-up 0.5s ease-out 1.75s forwards; }

.al-title { opacity:0; animation: al-title-fade 0.7s ease-out 2.1s forwards; font-family:'Space Grotesk',system-ui,sans-serif; font-size:38px; font-weight:700; fill:#EEF2FF; }
.al-sub   { opacity:0; animation: al-title-fade 0.6s ease-out 2.4s forwards; font-family:'Space Grotesk',system-ui,sans-serif; font-size:15px; font-weight:400; fill:rgba(238,242,255,0.5); letter-spacing:3.5px; text-transform:uppercase; }
</style>
