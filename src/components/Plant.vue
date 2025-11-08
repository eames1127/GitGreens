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
      <!-- Stem -->
      <rect 
        x="28" 
        y="60" 
        width="4" 
        :height="stemHeight"
        :fill="stemColor"
      />
      
      <!-- Leaves -->
      <ellipse 
        cx="20" 
        cy="70" 
        rx="8" 
        ry="4" 
        :fill="leafColor"
        transform="rotate(-30 20 70)"
      />
      <ellipse 
        cx="40" 
        cy="75" 
        rx="6" 
        ry="3" 
        :fill="leafColor"
        transform="rotate(30 40 75)"
      />
      
      <!-- Flower/Bloom -->
      <circle 
        v-if="bloomSize > 0"
        cx="30" 
        cy="50" 
        :r="bloomSize"
        :fill="bloomColor"
      />
      <circle 
        v-if="bloomSize > 3"
        cx="30" 
        cy="50" 
        :r="bloomSize - 3"
        fill="white"
        opacity="0.7"
      />
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
        📝 {{ commitCount }} commits
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

// Plant dimensions based on repo stats
const commitCount = computed(() => Math.max(1, Math.min(50, props.repo.size || 1)))
const plantHeight = computed(() => Math.max(60, Math.min(100, 60 + commitCount.value)))
const plantSize = computed(() => 60)
const stemHeight = computed(() => Math.max(20, commitCount.value * 0.8))
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