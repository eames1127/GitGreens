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
      :style="{ minHeight: '280px' }"
    >
      <!-- Sky — slim strip at top -->
      <div :class="['absolute inset-0 bg-gradient-to-b transition-all duration-700', seasonConfig.skyClass]" />

      <!-- Ground — lower 60% so plants root into it -->
      <div
        :class="['absolute left-0 right-0 bottom-0 transition-all duration-700 z-10', seasonConfig.groundClass]"
        style="height: 62%;"
      />

      <!-- Seasonal particles -->
      <template v-if="seasonConfig.particleEmoji">
        <span
          v-for="n in seasonConfig.particleCount"
          :key="n"
          class="particle absolute pointer-events-none select-none z-20"
          :style="particleStyle(n)"
        >{{ seasonConfig.particleEmoji }}</span>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-30">
        <div class="text-white text-center">
          <div class="text-4xl mb-2 animate-bounce">🌱</div>
          <p class="text-sm opacity-80">Growing your garden...</p>
        </div>
      </div>

      <!-- Plants — flush to bottom, no gaps, wrap naturally -->
      <div
        class="absolute left-0 right-0 bottom-0 z-20"
        style="padding: 0 4px 0 4px;"
      >
        <div class="flex flex-wrap items-end" style="gap: 0;">
          <Plant
            v-for="(repo, index) in repos"
            :key="repo.id"
            :repo="repo"
            :delay="index * 60"
            :season="season"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Plant from './Plant.vue'
import { SEASONS } from '../config/seasons.js'

const props = defineProps({
  repos: Array,
  loading: Boolean,
  season: { type: String, default: 'summer' }
})

defineEmits(['export'])

const gardenRef = ref(null)
const seasonConfig = computed(() => SEASONS[props.season] ?? SEASONS.summer)

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
  props.repos.reduce((sum, r) => sum + r.stargazers_count, 0)
)
const topLanguage = computed(() => {
  const counts = props.repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
})
const activeRepos = computed(() => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return props.repos.filter(r => new Date(r.pushed_at) > weekAgo).length
})
</script>

<style scoped>
.particle {
  animation: fall linear infinite;
  opacity: 0;
}

@keyframes fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.85;
  }
  85% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100%) rotate(360deg);
    opacity: 0;
    }
}
</style>