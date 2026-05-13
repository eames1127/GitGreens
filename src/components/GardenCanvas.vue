<template>
  <div class="relative">
    <!-- Garden Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div class="bg-white/10 rounded-xl px-4 py-3 text-center text-white">
        <div class="text-2xl font-bold">{{ repos.length }}</div>
        <div class="text-xs opacity-70 mt-1">🌿 Repos</div>
      </div>
      <div class="bg-white/10 rounded-xl px-4 py-3 text-center text-white">
        <div class="text-2xl font-bold">{{ totalStars }}</div>
        <div class="text-xs opacity-70 mt-1">⭐ Total Stars</div>
      </div>
      <div class="bg-white/10 rounded-xl px-4 py-3 text-center text-white">
        <div class="text-2xl font-bold">{{ topLanguage }}</div>
        <div class="text-xs opacity-70 mt-1">🔧 Top Language</div>
      </div>
      <div class="bg-white/10 rounded-xl px-4 py-3 text-center text-white">
        <div class="text-2xl font-bold">{{ activeRepos }}</div>
        <div class="text-xs opacity-70 mt-1">🐝 Active This Week</div>
      </div>
    </div>

    <!-- Export Button -->
    <div class="text-center mb-4">
      <button 
        @click="$emit('export')"
        class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
      >
        📸 Export Garden
      </button>
    </div>

    <!-- Garden -->
    <div
      ref="gardenRef"
      :class="[
        'relative rounded-xl border-4 overflow-hidden transition-all duration-700',
        seasonConfig.borderClass
      ]"
      :style="{ height: gardenHeight }"
    >
      <!-- Sky background -->
      <div :class="['absolute inset-0 bg-gradient-to-b transition-all duration-700', seasonConfig.skyClass]" />

      <!-- Ground strip -->
      <div :class="['absolute bottom-0 left-0 right-0 h-20 transition-all duration-700 z-10', seasonConfig.groundClass]" />

      <!-- Seasonal particles -->
      <template v-if="seasonConfig.particleEmoji">
        <span
          v-for="n in seasonConfig.particleCount"
          :key="n"
          class="particle absolute pointer-events-none select-none z-20"
          :style="particleStyle(n)"
        >{{ seasonConfig.particleEmoji }}</span>
      </template>

      <!-- Loading animation -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-30">
        <div class="text-white text-center">
          <div class="text-4xl mb-2 animate-bounce">🌱</div>
          <p class="text-sm opacity-80">Growing your garden...</p>
        </div>
      </div>
      <div
        class="absolute left-0 right-0 z-20 px-2"
        style="bottom: 80px;"
      >
        <div class="flex flex-wrap-reverse items-end" style="gap: 2px;">
          <div
            v-for="(repo, index) in repos"
            :key="repo.id"
            class="plant-slot"
          >
            <Plant
              :repo="repo"
              :delay="index * 100"
              :season="season"
              :style="{ animationDelay: `${index * 100}ms` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Plant from './Plant.vue'
import { SEASONS } from '../config/seasons.js'

const COLS = 8
const ROW_HEIGHT = 120
const GROUND_H = 80
const SKY_MIN = 100

const props = defineProps({
  repos: Array,
  loading: Boolean,
  season: {
    type: String,
    default: 'summer'
  }
})

defineEmits(['export'])

const gardenRef = ref(null)

const seasonConfig = computed(() => SEASONS[props.season] ?? SEASONS.summer)

// Expand the garden height to fit all plant rows, always with sky above
const gardenHeight = computed(() => {
  const rows = Math.ceil((props.repos?.length || 0) / COLS)
  return `${Math.max(1, rows) * ROW_HEIGHT + GROUND_H + SKY_MIN}px`
})

function particleStyle(n) {
  const seed = n * 137
  return {
    left: `${(seed * 31) % 100}%`,
    fontSize: `${12 + (seed % 10)}px`,
    animationDelay: `${(seed % 60) / 10}s`,
    animationDuration: `${4 + (seed % 40) / 10}s`,
  }
}

const totalStars = computed(() =>
  props.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
)

const topLanguage = computed(() => {
  const counts = props.repos.reduce((acc, repo) => {
    if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
})

const activeRepos = computed(() => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return props.repos.filter(repo => new Date(repo.pushed_at) > weekAgo).length
})
</script>

<style scoped>
/* 8 plants per row, minus the 2px gap */
.plant-slot {
  flex: 0 0 calc(12.5% - 2px);
  min-width: 60px;
}

.particle {
  animation: fall linear infinite;
  opacity: 0;
}

@keyframes fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.85; }
  85%  { opacity: 0.8; }
  100% { transform: translateY(100%) rotate(360deg); opacity: 0; }
}
</style>