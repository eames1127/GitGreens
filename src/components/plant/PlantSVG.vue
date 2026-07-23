<template>
  <svg 
    :width="plantSize" 
    :height="plantHeight" 
    viewBox="0 0 107 160" 
    class="mx-auto"
    :style="cssFilter ? { filter: cssFilter } : {}"
  >
    <InsectDefinitions />

    <!-- ── GRASS (tiny projects) ── -->
    <template v-if="plantType === 'grass'">
      <!-- Three grass blades, each a filled tapered shape -->
      <!-- Left blade -->
      <path d="M42 155 L40 155 Q38 135 36 110 Q40 120 44 110 Q46 135 44 155 Z" :fill="leafColor"/>
      <!-- Centre blade (tallest) -->
      <path d="M55 155 L53 155 Q51 128 50 100 Q54 112 58 100 Q57 128 57 155 Z" :fill="stemColor"/>
      <!-- Right blade -->
      <path d="M68 155 L66 155 Q65 138 63 115 Q67 126 71 115 Q71 138 70 155 Z" :fill="leafColor"/>
      <!-- Small side blades -->
      <path d="M48 155 L47 155 Q46 142 45 128 Q48 135 51 128 Q51 142 50 155 Z" :fill="leafColor" opacity="0.7"/>
      <path d="M62 155 L61 155 Q60 140 59 122 Q62 130 65 122 Q65 140 64 155 Z" :fill="leafColor" opacity="0.7"/>

      <!-- Flower on tallest blade: petals + centre -->
      <g v-if="bloomSize > 0">
        <circle v-for="a in 6" :key="a"
          :cx="54 + Math.cos((a-1)*60*Math.PI/180) * (bloomSize * 0.9)"
          :cy="98 + Math.sin((a-1)*60*Math.PI/180) * (bloomSize * 0.9)"
          :r="bloomSize * 0.55"
          :fill="bloomColor" opacity="0.9"
        />
        <circle cx="54" cy="98" :r="bloomSize * 0.45" fill="#FFE566"/>
      </g>

      <!-- Snow caps -->
      <g v-if="snowCaps">
        <ellipse cx="54" cy="100" rx="5" ry="2" fill="white" opacity="0.85"/>
        <ellipse cx="40" cy="112" rx="4" ry="1.5" fill="white" opacity="0.75"/>
        <ellipse cx="67" cy="116" rx="4" ry="1.5" fill="white" opacity="0.75"/>
      </g>

      <!-- Insects -->
      <use v-if="hasRecentActivity" href="#bee" :x="config.insects.bee.x" :y="config.insects.bee.y" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :x="config.insects.fly.x" :y="config.insects.fly.y" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :x="config.insects.butterfly.x" :y="config.insects.butterfly.y" class="animate-butterfly"/>
    </template>

    <!-- ── SHRUB (small projects) ── -->
    <template v-else-if="plantType === 'shrub'">
      <!-- Short woody stem -->
      <rect x="50" y="130" width="7" :height="stemHeight * 0.4 + 10" :fill="stemColor" rx="2"/>

      <!-- Bushy rounded mound — layered ellipses for depth -->
      <ellipse cx="53" cy="122" rx="28" ry="18" :fill="leafColor" opacity="0.6"/>
      <ellipse cx="40" cy="118" rx="18" ry="13" :fill="leafColor" opacity="0.85"/>
      <ellipse cx="66" cy="120" rx="16" ry="12" :fill="leafColor" opacity="0.85"/>
      <ellipse cx="53" cy="112" rx="20" ry="14" :fill="leafColor"/>
      <!-- Highlight -->
      <ellipse cx="47" cy="108" rx="10" ry="7" :fill="leafColor" opacity="0.5" style="filter:brightness(1.2)"/>

      <!-- Scattered small flowers -->
      <g v-if="bloomSize > 0">
        <circle cx="38" cy="113" :r="bloomSize * 0.7" :fill="bloomColor" opacity="0.9"/>
        <circle cx="53" cy="105" :r="bloomSize * 0.8" :fill="bloomColor"/>
        <circle cx="67" cy="112" :r="bloomSize * 0.65" :fill="bloomColor" opacity="0.9"/>
        <!-- centres -->
        <circle cx="38" cy="113" :r="bloomSize * 0.25" fill="#FFE566"/>
        <circle cx="53" cy="105" :r="bloomSize * 0.28" fill="#FFE566"/>
        <circle cx="67" cy="112" :r="bloomSize * 0.25" fill="#FFE566"/>
      </g>

      <!-- Snow caps -->
      <g v-if="snowCaps">
        <ellipse cx="53" cy="107" rx="18" ry="5" fill="white" opacity="0.8"/>
        <ellipse cx="38" cy="112" rx="10" ry="3" fill="white" opacity="0.7"/>
        <ellipse cx="68" cy="113" rx="9" ry="3" fill="white" opacity="0.7"/>
      </g>

      <!-- Insects -->
      <use v-if="hasRecentActivity" href="#bee" :transform="config.insects.bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :transform="config.insects.butterfly" class="animate-butterfly"/>
    </template>

    <!-- ── TREE (medium projects) ── -->
    <template v-else-if="plantType === 'tree'">
      <!-- Trunk with bark texture -->
      <rect x="47" y="100" width="13" :height="stemHeight + 20" :fill="stemColor" rx="3"/>
      <!-- Bark lines -->
      <line x1="51" y1="105" x2="50" y2="130" stroke="#1a5e1a" stroke-width="1" opacity="0.4"/>
      <line x1="56" y1="108" x2="57" y2="128" stroke="#1a5e1a" stroke-width="1" opacity="0.3"/>

      <!-- Layered triangular canopy (pine/deciduous hybrid) -->
      <!-- Bottom layer (widest) -->
      <polygon points="53,68 15,118 91,118" :fill="leafColor" opacity="0.7"/>
      <!-- Middle layer -->
      <polygon points="53,52 23,95 83,95" :fill="leafColor" opacity="0.85"/>
      <!-- Top layer -->
      <polygon points="53,35 30,75 76,75" :fill="leafColor"/>
      <!-- Highlight on top layer -->
      <polygon points="53,35 38,62 53,62" :fill="leafColor" opacity="0.4" style="filter:brightness(1.3)"/>

      <!-- Blooms dotted across canopy -->
      <g v-if="bloomSize > 0">
        <circle cx="35" cy="88" :r="bloomSize * 0.7" :fill="bloomColor" opacity="0.9"/>
        <circle cx="53" cy="72" :r="bloomSize * 0.8" :fill="bloomColor"/>
        <circle cx="71" cy="85" :r="bloomSize * 0.7" :fill="bloomColor" opacity="0.9"/>
        <circle cx="44" cy="58" :r="bloomSize * 0.6" :fill="bloomColor" opacity="0.8"/>
        <circle cx="63" cy="60" :r="bloomSize * 0.6" :fill="bloomColor" opacity="0.8"/>
      </g>

      <!-- Snow caps -->
      <g v-if="snowCaps">
        <polygon points="53,35 42,55 64,55" fill="white" opacity="0.85"/>
        <ellipse cx="53" cy="72" rx="18" ry="5" fill="white" opacity="0.75"/>
        <ellipse cx="53" cy="92" rx="26" ry="6" fill="white" opacity="0.6"/>
      </g>

      <!-- Insects -->
      <use v-if="hasRecentActivity" href="#bee" :transform="config.insects.bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :transform="config.insects.butterfly" class="animate-butterfly"/>
    </template>

    <!-- ── OAK (large projects) ── -->
    <template v-else>
      <!-- Stout gnarled trunk -->
      <rect x="44" y="85" width="19" :height="stemHeight + 15" :fill="stemColor" rx="4"/>
      <!-- Roots flare -->
      <path d="M44 148 Q38 152 33 155" stroke="#5D4037" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M63 148 Q69 152 74 155" stroke="#5D4037" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Bark texture -->
      <line x1="49" y1="90" x2="47" y2="128" stroke="#1a5e1a" stroke-width="1.5" opacity="0.35"/>
      <line x1="57" y1="92" x2="59" y2="126" stroke="#1a5e1a" stroke-width="1.5" opacity="0.25"/>

      <!-- Big rounded oak canopy — multiple overlapping blobs -->
      <ellipse cx="53" cy="70" rx="38" ry="28" :fill="leafColor" opacity="0.6"/>
      <ellipse cx="30" cy="78" rx="24" ry="18" :fill="leafColor" opacity="0.8"/>
      <ellipse cx="76" cy="75" rx="24" ry="18" :fill="leafColor" opacity="0.8"/>
      <ellipse cx="53" cy="58" rx="28" ry="22" :fill="leafColor" opacity="0.9"/>
      <ellipse cx="40" cy="65" rx="18" ry="15" :fill="leafColor"/>
      <ellipse cx="67" cy="62" rx="18" ry="15" :fill="leafColor"/>
      <ellipse cx="53" cy="50" rx="20" ry="16" :fill="leafColor"/>
      <!-- Highlight -->
      <ellipse cx="46" cy="48" rx="12" ry="9" :fill="leafColor" opacity="0.45" style="filter:brightness(1.25)"/>

      <!-- Blooms across canopy -->
      <g v-if="bloomSize > 0">
        <circle cx="28" cy="75" :r="bloomSize * 0.7" :fill="bloomColor" opacity="0.9"/>
        <circle cx="42" cy="55" :r="bloomSize * 0.8" :fill="bloomColor"/>
        <circle cx="53" cy="45" :r="bloomSize * 0.85" :fill="bloomColor"/>
        <circle cx="65" cy="52" :r="bloomSize * 0.8" :fill="bloomColor"/>
        <circle cx="78" cy="68" :r="bloomSize * 0.7" :fill="bloomColor" opacity="0.9"/>
      </g>

      <!-- Snow caps -->
      <g v-if="snowCaps">
        <ellipse cx="53" cy="47" rx="20" ry="6" fill="white" opacity="0.85"/>
        <ellipse cx="38" cy="60" rx="15" ry="5" fill="white" opacity="0.75"/>
        <ellipse cx="68" cy="57" rx="15" ry="5" fill="white" opacity="0.75"/>
        <ellipse cx="53" cy="68" rx="30" ry="7" fill="white" opacity="0.6"/>
      </g>

      <!-- Insects (two bees + two butterflies for big oak) -->
      <use v-for="(bee, i) in config.insects.bees" :key="`bee-${i}`" v-if="hasRecentActivity" href="#bee" :transform="bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-for="(butterfly, i) in config.insects.butterflies" :key="`butterfly-${i}`" v-if="isPopular" href="#butterfly" :transform="butterfly" class="animate-butterfly"/>
    </template>
  </svg>
</template>

<script setup>
import InsectDefinitions from './InsectDefinitions.vue'

defineProps({
  plantType: String,
  config: Object,
  plantSize: Number,
  plantHeight: Number,
  stemHeight: Number,
  bloomSize: Number,
  stemColor: String,
  leafColor: String,
  bloomColor: String,
  hasRecentActivity: Boolean,
  hasOpenIssues: Boolean,
  isPopular: Boolean,
  cssFilter: String,
  snowCaps: Boolean
})
</script>