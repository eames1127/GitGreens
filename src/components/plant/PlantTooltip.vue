<template>
  <div 
    v-if="show"
    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10"
  >
    <div class="font-semibold">{{ repo.name }}</div>
    <div class="text-xs opacity-80">
      ⭐ {{ repo.stargazers_count }} • 
      🔧 {{ repo.language || 'Unknown' }} • 
      📏 {{ repo.size }}KB ({{ plantType }})
    </div>
    <div class="text-xs opacity-60">
      📅 Last push: {{ formatDate(repo.pushed_at) }}
    </div>
    <div class="text-xs opacity-60">
      🐝 Active: {{ hasRecentActivity ? 'Yes' : 'No' }} • 
      🪰 Issues: {{ repo.open_issues_count }}
    </div>
    <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  repo: Object,
  plantType: String,
  hasRecentActivity: Boolean,
  formatDate: Function
})
</script>