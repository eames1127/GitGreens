<template>
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
    <h3 class="text-lg font-semibold mb-3 text-center">🌿 Garden Key</h3>

    <!-- Plants -->
    <div class="mb-4">
      <h4 class="font-medium mb-2 text-sm opacity-80">Plant Types (by repo size)</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div
          v-for="plant in plants"
          :key="plant.type"
          class="flex items-center gap-2"
        >
          <!-- Fixed-size box so icons of different shapes line up with their labels -->
          <span class="w-10 h-10 shrink-0 flex items-end justify-center">
            <img :src="plantImage(`${plant.type}-${season}`)" :alt="plant.label" class="max-w-full max-h-full object-contain">
          </span>
          <span>{{ plant.label }}</span>
        </div>
      </div>
    </div>

    <!-- Insects -->
    <div>
      <h4 class="font-medium mb-2 text-sm opacity-80">Ecosystem</h4>
      <div class="space-y-1 text-xs">
        <div
          v-for="insect in insects"
          :key="insect.type"
          class="flex items-center gap-2"
        >
          <span class="w-10 h-8 shrink-0 flex items-center justify-center">
            <img :src="INSECT_IMAGES[insect.type]" :alt="insect.type" class="max-w-full max-h-full object-contain">
          </span>
          <span>{{ insect.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { plantImage, INSECT_IMAGES } from '../config/artwork.js'

// The key shows the same seasonal artwork the garden grows
defineProps({
  season: { type: String, default: 'summer' }
})

const plants = [
  { type: 'grass', label: 'Grass (< 100MB)' },
  { type: 'shrub', label: 'Shrub (100–500MB)' },
  { type: 'tree',  label: 'Tree (500MB–1GB)' },
  { type: 'oak',   label: 'Oak (> 1GB)' }
]

const insects = [
  { type: 'bee',       label: 'Bees = Recent activity (7 days)' },
  { type: 'fly',       label: 'Flies = Open issues' },
  { type: 'butterfly', label: 'Butterflies = Popular (10+ ⭐)' }
]
</script>
