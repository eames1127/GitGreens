<template>
  <svg 
    :width="plantSize" 
    :height="plantHeight" 
    viewBox="0 0 107 160" 
    class="mx-auto"
  >
    <InsectDefinitions />
    
    <!-- Grass (tiny projects) -->
    <template v-if="plantType === 'grass'">
      <path 
        v-for="(path, i) in config.paths" 
        :key="i"
        :d="path.d" 
        :stroke="path.stroke" 
        :stroke-width="config.strokeWidth" 
        fill="none"
      />
      <circle 
        v-if="bloomSize > 0" 
        :cx="config.bloom.cx" 
        :cy="config.bloom.cy" 
        :r="bloomSize" 
        :fill="bloomColor"
      />
      
      <!-- Insects for grass -->
      <use v-if="hasRecentActivity" href="#bee" :x="config.insects.bee.x" :y="config.insects.bee.y" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :x="config.insects.fly.x" :y="config.insects.fly.y" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :x="config.insects.butterfly.x" :y="config.insects.butterfly.y" class="animate-butterfly"/>
    </template>

    <!-- Shrub (small projects) -->
    <template v-else-if="plantType === 'shrub'">
      <rect 
        :x="config.stem.x" 
        :y="config.stem.y" 
        :width="config.stem.width" 
        :height="stemHeight" 
        :fill="stemColor"
      />
      <ellipse 
        v-for="(leaf, i) in config.leaves" 
        :key="i"
        :cx="leaf.cx" 
        :cy="leaf.cy" 
        :rx="leaf.rx" 
        :ry="leaf.ry" 
        :fill="leafColor" 
        :transform="`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`"
      />
      <circle 
        v-if="bloomSize > 0" 
        :cx="config.bloom.cx" 
        :cy="config.bloom.cy" 
        :r="bloomSize" 
        :fill="bloomColor"
      />
      
      <!-- Insects for shrubs -->
      <use v-if="hasRecentActivity" href="#bee" :transform="config.insects.bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :transform="config.insects.butterfly" class="animate-butterfly"/>
    </template>

    <!-- Tree (medium projects) -->
    <template v-else-if="plantType === 'tree'">
      <rect 
        :x="config.stem.x" 
        :y="config.stem.y" 
        :width="config.stem.width" 
        :height="stemHeight" 
        :fill="stemColor"
      />
      <path 
        v-for="(canopy, i) in config.canopy" 
        :key="i"
        :d="canopy.d" 
        :fill="leafColor"
      />
      <circle 
        v-for="(bloom, i) in config.blooms" 
        :key="i"
        v-if="bloomSize > 0" 
        :cx="bloom.cx" 
        :cy="bloom.cy" 
        :r="bloomSize" 
        :fill="bloomColor"
      />
      
      <!-- Insects for trees -->
      <use v-if="hasRecentActivity" href="#bee" :transform="config.insects.bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-if="isPopular" href="#butterfly" :transform="config.insects.butterfly" class="animate-butterfly"/>
    </template>

    <!-- Oak Tree (large projects) -->
    <template v-else>
      <rect 
        :x="config.stem.x" 
        :y="config.stem.y" 
        :width="config.stem.width" 
        :height="stemHeight" 
        :fill="stemColor"
      />
      <ellipse 
        v-for="(canopy, i) in config.canopy" 
        :key="i"
        :cx="canopy.cx" 
        :cy="canopy.cy" 
        :rx="canopy.rx" 
        :ry="canopy.ry" 
        :fill="leafColor" 
        :opacity="canopy.opacity"
      />
      <circle 
        v-for="(bloom, i) in config.blooms" 
        :key="i"
        v-if="bloomSize > 0" 
        :cx="bloom.cx" 
        :cy="bloom.cy" 
        :r="bloomSize" 
        :fill="bloomColor"
      />
      
      <!-- Ecosystem for oak trees -->
      <use v-for="(bee, i) in config.insects.bees" :key="`bee-${i}`" v-if="hasRecentActivity" href="#bee" :transform="bee" class="animate-bee"/>
      <use v-if="hasOpenIssues" href="#fly" :transform="config.insects.fly" class="animate-fly"/>
      <use v-for="(butterfly, i) in config.insects.butterflies" :key="`butterfly-${i}`" v-if="isPopular" href="#butterfly" :transform="butterfly" class="animate-butterfly"/>
    </template>
  </svg>
</template>

<script setup>
import InsectDefinitions from './InsectDefinitions.vue'

defineProps({
  plantType: String,
  config: Object,
  plantSize: Number,
  plantHeight: Number,
  stemHeight: Number,
  bloomSize: Number,
  stemColor: String,
  leafColor: String,
  bloomColor: String,
  hasRecentActivity: Boolean,
  hasOpenIssues: Boolean,
  isPopular: Boolean
})
</script>