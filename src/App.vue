<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors">
    <div class="bg-gradient-to-b from-garden-sky to-garden-grass dark:from-garden-dark-sky dark:to-garden-dark-grass min-h-screen">
      <Home />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import Home from './components/Home.vue'

const isDark = ref(false)

onMounted(() => {
  // Check for saved theme or system preference
  isDark.value = localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
})

// Provide theme toggle for child components
provide('theme', {
  isDark,
  toggleTheme: () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
})
</script>