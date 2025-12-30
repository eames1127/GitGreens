<template>
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
    <h3 class="text-lg font-semibold mb-3 text-center">🌿 Garden Key</h3>
    
    <!-- Plants -->
    <div class="mb-4">
      <h4 class="font-medium mb-2 text-sm opacity-80">Plant Types (by size)</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="flex items-center gap-2">
          <span class="text-green-400">🌱</span>
          <span>Grass (&lt; 100MB)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-500">🌿</span>
          <span>Shrub (100MB-500MB)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">🌳</span>
          <span>Tree (500MB-1GB)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-700">🌲</span>
          <span>Oak (&gt; 1GB)</span>
        </div>
      </div>
    </div>

    <!-- Insects -->
    <div>
      <h4 class="font-medium mb-2 text-sm opacity-80">Ecosystem</h4>
      <div class="space-y-1 text-xs">
        <div class="flex items-center gap-2">
          <span class="text-yellow-400">🐝</span>
          <span>Bees = Recent activity (7 days)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-400">🪰</span>
          <span>Flies = Open issues</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-red-400">🦋</span>
          <span>Butterflies = Popular (10+ stars)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for this static component
</script>