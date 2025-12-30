<template>
  <div 
    class="relative group cursor-pointer plant-sway"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Plant SVG -->
    <svg 
      :width="plantSize" 
      :height="plantHeight" 
      viewBox="0 0 60 100" 
      class="mx-auto"
    >
      <!-- Grass (tiny projects) -->
      <template v-if="plantType === 'grass'">
        <path d="M25 90 Q27 80 25 70" stroke="#32CD32" stroke-width="2" fill="none"/>
        <path d="M30 90 Q32 75 30 65" stroke="#228B22" stroke-width="2" fill="none"/>
        <path d="M35 90 Q37 82 35 72" stroke="#32CD32" stroke-width="2" fill="none"/>
        <circle v-if="bloomSize > 0" cx="30" cy="65" :r="bloomSize" :fill="bloomColor"/>
      </template>

      <!-- Shrub (small projects) -->
      <template v-else-if="plantType === 'shrub'">
        <rect x="28" y="70" width="4" :height="stemHeight" :fill="stemColor"/>
        <ellipse cx="20" cy="75" rx="8" ry="4" :fill="leafColor" transform="rotate(-30 20 75)"/>
        <ellipse cx="40" cy="80" rx="6" ry="3" :fill="leafColor" transform="rotate(30 40 80)"/>
        <circle v-if="bloomSize > 0" cx="30" cy="60" :r="bloomSize" :fill="bloomColor"/>
      </template>

      <!-- Tree (medium projects) -->
      <template v-else-if="plantType === 'tree'">
        <rect x="27" y="60" width="6" :height="stemHeight" :fill="stemColor"/>
        <path d="M20 50 Q30 40 40 50 Q35 45 30 45 Q25 45 20 50" :fill="leafColor"/>
        <path d="M22 60 Q30 50 38 60 Q33 55 30 55 Q27 55 22 60" :fill="leafColor"/>
        <circle v-if="bloomSize > 0" cx="25" cy="45" :r="bloomSize * 0.7" :fill="bloomColor"/>
        <circle v-if="bloomSize > 0" cx="35" cy="50" :r="bloomSize * 0.7" :fill="bloomColor"/>
      </template>

      <!-- Oak Tree (large projects) -->
      <template v-else>
        <rect x="25" y="50" width="10" :height="stemHeight" :fill="stemColor"/>
        <ellipse cx="30" cy="35" rx="20" ry="15" :fill="leafColor"/>
        <ellipse cx="25" cy="45" rx="15" ry="10" :fill="leafColor" opacity="0.8"/>
        <ellipse cx="35" cy="45" rx="15" ry="10" :fill="leafColor" opacity="0.8"/>
        <circle v-if="bloomSize > 0" cx="20" cy="35" :r="bloomSize * 0.6" :fill="bloomColor"/>
        <circle v-if="bloomSize > 0" cx="30" cy="30" :r="bloomSize * 0.6" :fill="bloomColor"/>
        <circle v-if="bloomSize > 0" cx="40" cy="35" :r="bloomSize * 0.6" :fill="bloomColor"/>
      </template>
    </svg>

    <!-- Tooltip -->
    <div 
      v-if="showTooltip"
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10"
    >
      <div class="font-semibold">{{ repo.name }}</div>
      <div class="text-xs opacity-80">
        ⭐ {{ repo.stargazers_count }} • 
        🔧 {{ repo.language || 'Unknown' }} • 
        📏 {{ repo.size }}KB ({{ plantType }})
      </div>
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  repo: Object,
  delay: Number
})

const showTooltip = ref(false)

// Plant type based on project size (KB)
const plantType = computed(() => {
  const size = props.repo.size || 0
  if (size < 100000) return 'grass'    // < 100MB
  if (size < 500000) return 'shrub'    // 100MB - 500MB  
  if (size < 1000000) return 'tree'    // 500MB - 1GB
  return 'oak'                         // > 1GB
})

// Plant dimensions based on repo stats and type
const commitCount = computed(() => Math.max(1, Math.min(50, props.repo.size || 1)))
const plantHeight = computed(() => {
  const base = { grass: 40, shrub: 60, tree: 80, oak: 100 }
  return base[plantType.value] || 60
})
const plantSize = computed(() => 60)
const stemHeight = computed(() => {
  const multiplier = { grass: 0.3, shrub: 0.5, tree: 0.7, oak: 0.9 }
  return Math.max(15, commitCount.value * (multiplier[plantType.value] || 0.5))
})
const bloomSize = computed(() => Math.max(0, Math.min(12, props.repo.stargazers_count * 0.5)))

// Colors based on programming language
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  Vue: '#4FC08D',
  React: '#61DAFB',
  HTML: '#e34c26',
  CSS: '#1572B6'
}

const stemColor = computed(() => '#228B22')
const leafColor = computed(() => '#32CD32')
const bloomColor = computed(() => 
  languageColors[props.repo.language] || '#FF69B4'
)
</script>