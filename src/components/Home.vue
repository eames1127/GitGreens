<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">🌱 GitGreens</h1>
      <p class="text-white/80">Watch your GitHub repos bloom into a beautiful garden</p>
      <button 
        @click="toggleTheme" 
        class="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
      >
        {{ isDark ? '☀️' : '🌙' }} {{ isDark ? 'Light' : 'Dark' }} Garden
      </button>
    </header>

    <!-- Input Section -->
    <div class="max-w-md mx-auto mb-8">
      <div class="flex gap-2">
        <input
          v-model="username"
          @keyup.enter="growGarden"
          type="text"
          placeholder="Enter GitHub username..."
          class="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
        />
        <button
          @click="growGarden"
          :disabled="loading || !username.trim()"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
        >
          {{ loading ? '🌱' : '🌿' }} {{ loading ? 'Growing...' : 'Grow Garden' }}
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="max-w-md mx-auto mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-center">
      {{ error }}
    </div>

    <!-- Garden Canvas -->
    <GardenCanvas 
      v-if="repos.length > 0"
      ref="gardenCanvasRef"
      :repos="repos" 
      :loading="loading"
      @export="exportGarden"
    />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { toPng } from 'html-to-image'
import GardenCanvas from './GardenCanvas.vue'
import { useGitHub } from '../composables/useGitHub'

const { isDark, toggleTheme } = inject('theme')
const { fetchUserRepos, loading, error } = useGitHub()

const username = ref('')
const repos = ref([])
const gardenCanvasRef = ref(null)

const growGarden = async () => {
  if (!username.value.trim()) return
  
  repos.value = []
  const data = await fetchUserRepos(username.value.trim())
  if (data) {
    repos.value = data
  }
}

const exportGarden = async () => {
  if (!gardenCanvasRef.value) return
  
  try {
    const dataUrl = await toPng(gardenCanvasRef.value.$refs.gardenRef, {
      quality: 1.0,
      pixelRatio: 2
    })
    
    const link = document.createElement('a')
    link.download = `${username.value}-garden.png`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('Failed to export garden:', err)
  }
}
</script>