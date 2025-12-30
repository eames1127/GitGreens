<template>
  <div class="relative">
    <!-- Garden Stats -->
    <div class="text-center mb-6 text-white">
      <p class="text-lg">🌿 {{ repos.length }} plants growing • ⭐ {{ totalStars }} stars collected</p>
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

    <!-- Garden Grid -->
    <div 
      ref="gardenRef"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 bg-garden-soil dark:bg-garden-dark-soil rounded-xl border-4 border-garden-grass dark:border-garden-dark-grass min-h-[200px] relative"
    >
      <!-- Loading animation -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <div class="text-white text-center">
          <div class="text-4xl mb-2 animate-bounce">🌱</div>
          <p class="text-sm opacity-80">Growing your garden...</p>
        </div>
      </div>
      
      <Plant
        v-for="(repo, index) in repos"
        :key="repo.id"
        :repo="repo"
        :delay="index * 100"
        class="plant-grow"
        :style="{ animationDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Plant from './Plant.vue'

const props = defineProps({
  repos: Array,
  loading: Boolean
})

defineEmits(['export'])

const gardenRef = ref(null)

const totalStars = computed(() => 
  props.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
)
</script>