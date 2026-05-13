<!-- src/components/SeasonParticles.vue -->
<template>
  <div class="particles-overlay pointer-events-none absolute inset-0 overflow-hidden">
    <span
      v-for="n in 20" :key="n"
      class="particle absolute animate-drift"
      :style="{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
        fontSize: `${12 + Math.random() * 10}px`,
      }"
    >{{ emoji }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ season: String });
const emojiMap = { spring: '🌸', summer: '✨', autumn: '🍂', winter: '❄️' };
const emoji = computed(() => emojiMap[props.season]);
</script>