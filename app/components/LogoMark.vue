<template>
  <svg class="logo-mark" width="38" height="35" viewBox="225 135 230 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Soil -->
    <rect x="200" y="310" width="280" height="18" rx="9" fill="#8B6F47" opacity=".75"/>

    <!-- Stem + branches -->
    <path d="M340 308 C340 270 340 240 340 200" stroke="#4CAF50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M340 250 C320 240 295 230 275 215" stroke="#4CAF50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M340 235 C360 222 385 215 405 205" stroke="#4CAF50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M340 275 C325 265 308 258 295 252" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Leaves -->
    <ellipse cx="265" cy="210" rx="16" ry="8" fill="#66BB6A" opacity=".75" transform="rotate(-30 265 210)"/>
    <ellipse cx="412" cy="200" rx="16" ry="8" fill="#66BB6A" opacity=".75" transform="rotate(25 412 200)"/>
    <ellipse cx="288" cy="248" rx="12" ry="6" fill="#66BB6A" opacity=".75" transform="rotate(-20 288 248)"/>

    <!-- Center bulb -->
    <ellipse cx="340" cy="178" rx="20" ry="24" fill="#FFF176"/>
    <path d="M328 196 Q334 204 340 206 Q346 204 352 196" fill="none" stroke="#F9A825" stroke-width="2" stroke-linecap="round"/>
    <rect x="333" y="205" width="14" height="5" rx="2" fill="#BDBDBD"/>
    <path d="M336 190 Q340 184 344 190" fill="none" stroke="#F9A825" stroke-width="1.5"/>

    <!-- Rays (animated) -->
    <g class="lm-rays">
      <line x1="340" y1="152" x2="340" y2="144" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="355" y1="157" x2="360" y2="150" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="325" y1="157" x2="320" y2="150" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="362" y1="170" x2="370" y2="167" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="318" y1="170" x2="310" y2="167" stroke="#FFD740" stroke-width="1.5" stroke-linecap="round"/>
    </g>

    <!-- Left bulb -->
    <ellipse cx="272" cy="198" rx="14" ry="17" fill="#FFE082"/>
    <path d="M264 210 Q268 216 272 217 Q276 216 280 210" fill="none" stroke="#F9A825" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="266" y="216" width="12" height="4" rx="2" fill="#BDBDBD"/>

    <!-- Right bulb -->
    <ellipse cx="408" cy="188" rx="14" ry="17" fill="#FFE082"/>
    <path d="M400 200 Q404 206 408 207 Q412 206 416 200" fill="none" stroke="#F9A825" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="402" y="206" width="12" height="4" rx="2" fill="#BDBDBD"/>

    <!-- Small sprouts -->
    <path d="M280 310 C280 295 278 285 275 275" stroke="#81C784" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="270" cy="271" rx="9" ry="5" fill="#A5D6A7" opacity=".85" transform="rotate(-25 270 271)"/>
    <path d="M400 310 C400 295 402 285 405 275" stroke="#81C784" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="410" cy="271" rx="9" ry="5" fill="#A5D6A7" opacity=".85" transform="rotate(25 410 271)"/>
  </svg>
</template>

<style scoped>
.lm-rays {
  animation: lm-glow 2s ease-in-out infinite;
}
@keyframes lm-glow {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 1; }
}
</style>
