<template>
  <div
    class="relative group cursor-pointer opacity-0 animate-grow flex items-end"
    :style="{ 
      animationDelay: `${delay}ms`,
      width: `${slotWidth}px`,
      height: `${slotHeight}px`
    }"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Each layer is absolutely positioned, bottom-aligned, back to front -->

    <!-- LAYER 1 (back): Oak — only for oak repos -->
    <img
      v-if="plantType === 'oak'"
      :src="oakSrc"
      class="absolute bottom-0 plant-sway-slow"
      style="left: 50%; transform: translateX(-50%); width: 100px; height: 210px; object-fit: contain;"
    />

    <!-- LAYER 2: Tree — for tree + oak repos -->
    <img
      v-if="plantType === 'tree' || plantType === 'oak'"
      :src="treeSrc"
      class="absolute bottom-0 plant-sway"
      :style="treeStyle"
    />

    <!-- LAYER 3: Shrub — for shrub, tree + oak repos -->
    <img
      v-if="plantType === 'shrub' || plantType === 'tree' || plantType === 'oak'"
      :src="shrubSrc"
      class="absolute bottom-0 plant-sway-fast"
      :style="shrubStyle"
    />

    <!-- LAYER 4 (front): Grass — always shown -->
    <img
      :src="grassSrc"
      class="absolute bottom-0 plant-sway"
      :style="grassStyle"
    />

    <!-- Insects float above the tallest plant -->
    <img
      v-if="hasRecentActivity"
      src="/src/assets/insects/bee.svg"
      class="absolute animate-bee pointer-events-none"
      :style="insectStyle('bee')"
    />
    <img
      v-if="hasOpenIssues"
      src="/src/assets/insects/fly.svg"
      class="absolute animate-fly pointer-events-none"
      :style="insectStyle('fly')"
    />
    <img
      v-if="isPopular"
      src="/src/assets/insects/butterfly.svg"
      class="absolute animate-butterfly pointer-events-none"
      :style="insectStyle('butterfly')"
    />

    <PlantTooltip
      :show="showTooltip"
      :repo="repo"
      :plant-type="plantType"
      :has-recent-activity="hasRecentActivity"
      :format-date="formatDate"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlantData } from '../composables/usePlantData.js'
import PlantTooltip from './plant/PlantTooltip.vue'
import { SEASONS } from '../config/seasons.js'

const props = defineProps({
  repo: { type: Object, required: true },
  delay: { type: Number, default: 0 },
  season: { type: String, default: 'summer' }
})

const showTooltip = ref(false)

const seasonConfig = computed(() => SEASONS[props.season] ?? SEASONS.summer)

const {
  hasRecentActivity,
  hasOpenIssues,
  isPopular,
  plantType,
  bloomColor,
  formatDate
} = usePlantData(props.repo)

// Slot grows with repo size: grass=1, shrub=2, tree=3, oak=4 units
const UNIT = 72
const slotUnits = computed(() => ({ grass: 1, shrub: 2, tree: 3, oak: 4 })[plantType.value] ?? 1)
const slotWidth = computed(() => slotUnits.value * UNIT)
const slotHeight = computed(() => ({ grass: 90, shrub: 150, tree: 190, oak: 210 })[plantType.value] ?? 90)

// Pick the right season variant for each plant image
const s = computed(() => props.season)
// Use flowerless plain grass when it's underplanting beneath shrub/tree/oak
const grassSrc = computed(() => {
  if (plantType.value === 'grass') return `/src/assets/plants/grass-${s.value}.svg`
  const plainSuffix = s.value === 'summer' ? '' : `-${s.value}`
  return `/src/assets/plants/grass-plain${plainSuffix}.svg`
})
const shrubSrc  = computed(() => `/src/assets/plants/shrub-${s.value}.svg`)
const treeSrc   = computed(() => `/src/assets/plants/tree-${s.value}.svg`)
const oakSrc    = computed(() => `/src/assets/plants/oak-${s.value}.svg`)

// Position each layer within the slot
const grassStyle = computed(() => {
  // Grass runs across the full bottom, split into 1-2 clumps depending on slot width
  return { width: '100%', height: '70px', objectFit: 'cover', bottom: '0' }
})

const shrubStyle = computed(() => {
  // Shrub sits centre-left, slightly above grass
  const offset = plantType.value === 'oak' ? '15%' : plantType.value === 'tree' ? '10%' : '25%'
  return { left: offset, width: '75px', height: '150px', bottom: '8px' }
})

const treeStyle = computed(() => {
  const offset = plantType.value === 'oak' ? '35%' : '50%'
  return { left: offset, transform: 'translateX(-50%)', width: '90px', height: '190px', bottom: '10px' }
})

// Insects hover above the tallest element in the slot
const insectStyle = (type) => {
  const topOffset = { grass: 10, shrub: 30, tree: 45, oak: 55 }[plantType.value] ?? 10
  const positions = {
    bee:       { right: '8px',  top: `${topOffset}px`,      width: '32px', height: '32px' },
    fly:       { left:  '6px',  top: `${topOffset + 15}px`, width: '20px', height: '20px' },
    butterfly: { right: '50%',  top: `${topOffset - 10}px`, width: '38px', height: '38px', transform: 'translateX(50%)' },
  }
  return positions[type]
}
</script>

<style scoped>

@keyframes grow {
  0%   {
    opacity: 0;
    transform: scaleY(0.2) translateY(20px);
    transform-origin: bottom;
  }
  100% {
    opacity: 1;
    transform: scaleY(1)   translateY(0);
    transform-origin: bottom;
  }
}

@keyframes sway {
  0%, 100% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(1deg);
  }
}

@keyframes sway-slow {
  0%, 100% {
    transform: rotate(-0.5deg);
  }
  50%{ 
    transform: rotate(0.5deg);
  }
}

@keyframes sway-fast {
  0%, 100% {
    transform: rotate(-1.5deg);
  }
  50% {
    transform: rotate(1.5deg);
  }
}

@keyframes bee-hover {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(2px, -2px);
  }
  75% {
    transform: translate(-2px, 1px);
  }
}

@keyframes fly-buzz {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(1px, 1px);
  }
  66%{
    transform: translate(-1px, -1px);
  }
}

@keyframes butterfly-flutter {
  0%, 100% {
    transform: translateX(50%) rotate(0deg);
  }
  25% {
    transform: translateX(50%) rotate(4deg) translate(3px, -2px);
  }
  75% {
    transform: translateX(50%) rotate(-3deg) translate(-2px, 1px);
  }
}

.animate-grow {
  animation: grow 0.8s ease-out forwards;
}

.plant-sway {
  animation: sway 4s ease-in-out infinite;
}

.plant-sway-slow {
  animation: sway-slow 6s ease-in-out infinite;
}

.plant-sway-fast {
  animation: sway-fast 3s ease-in-out infinite;
}

.animate-bee {
  animation: bee-hover 2s ease-in-out infinite;
}

.animate-fly {
  animation: fly-buzz 0.7s linear infinite;
}

.animate-butterfly {
   animation: butterfly-flutter 3s ease-in-out infinite;
}
</style>
