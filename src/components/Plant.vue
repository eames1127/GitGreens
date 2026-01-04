<template>
  <div 
    class="relative group cursor-pointer plant-sway opacity-0 animate-grow"
    :style="{ animationDelay: `${delay}ms` }"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Plant SVG -->
    <svg 
      :width="plantSize" 
      :height="plantHeight" 
      viewBox="0 0 107 160" 
      class="mx-auto"
    >
      <!-- Reusable insect definitions -->
      <defs>
        <!-- Bee: Yellow and black striped body with wings -->
        <g id="bee">
          <!-- Body -->
          <ellipse cx="0" cy="0" rx="4" ry="2" fill="#FFD700"/>
          <rect x="-2.5" y="-0.7" width="1" height="1.4" fill="#000"/>
          <rect x="-0.5" y="-0.7" width="1" height="1.4" fill="#000"/>
          <rect x="1.5" y="-0.7" width="1" height="1.4" fill="#000"/>
          <!-- Wings -->
          <ellipse cx="-1.3" cy="-1.3" rx="2.5" ry="1" fill="#FFF" opacity="0.7"/>
          <ellipse cx="1.3" cy="-1.3" rx="2.5" ry="1" fill="#FFF" opacity="0.7"/>
        </g>
        
        <!-- Fly: Small dark body -->
        <g id="fly">
          <!-- Body -->
          <ellipse cx="0" cy="0" rx="2.5" ry="1.3" fill="#333"/>
          <!-- Wings -->
          <ellipse cx="-0.7" cy="-1" rx="2" ry="0.7" fill="#666" opacity="0.5"/>
          <ellipse cx="0.7" cy="-1" rx="2" ry="0.7" fill="#666" opacity="0.5"/>
        </g>
        
        <!-- Butterfly: Colorful wings -->
        <g id="butterfly">
          <!-- Body -->
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#8B4513" stroke-width="1"/>
          <!-- Upper wings -->
          <path d="M-1.3 -2.5 Q-5 -5 -2.5 -1.3 Q-1.3 -2.5 0 -1.3" fill="#FF6B6B"/>
          <path d="M1.3 -2.5 Q5 -5 2.5 -1.3 Q1.3 -2.5 0 -1.3" fill="#FF6B6B"/>
          <!-- Lower wings -->
          <path d="M-1.3 1.3 Q-4 4 -1.3 2.5 Q-1.3 1.3 0 1.3" fill="#FF8E8E"/>
          <path d="M1.3 1.3 Q4 4 1.3 2.5 Q1.3 1.3 0 1.3" fill="#FF8E8E"/>
          <!-- Wing spots -->
          <circle cx="-2.5" cy="-2.5" r="0.7" fill="#FFF" opacity="0.8"/>
          <circle cx="2.5" cy="-2.5" r="0.7" fill="#FFF" opacity="0.8"/>
        </g>
      </defs>
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

    <!-- Tooltip -->
    <div 
      v-if="showTooltip"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  repo: {
    type: Object,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
})

const showTooltip = ref(false)

// Constants
const PLANT_THRESHOLDS = {
  GRASS: 100000,    // < 100MB
  SHRUB: 500000,    // 100MB - 500MB  
  TREE: 1000000     // 500MB - 1GB, > 1GB = oak
}

// Plant configurations - centralized for easy maintenance
const PLANT_CONFIG = {
  grass: {
    height: 107,
    multiplier: 0.53,
    bloomMultiplier: 1.3,
    strokeWidth: 3,
    stemWidth: 3,
    paths: [
      { d: 'M43 147 Q47 120 43 93', stroke: '#32CD32' },
      { d: 'M53 147 Q57 113 53 87', stroke: '#228B22' },
      { d: 'M63 147 Q67 123 63 97', stroke: '#32CD32' }
    ],
    bloom: { cx: 53, cy: 87 },
    insects: {
      bee: { x: 63, y: 123 },
      fly: { x: 47, y: 130 },
      butterfly: { x: 43, y: 120 }
    }
  },
  shrub: {
    height: 160,
    multiplier: 0.8,
    bloomMultiplier: 1.3,
    stem: { x: 51, y: 113, width: 5 },
    leaves: [
      { cx: 37, cy: 120, rx: 11, ry: 5, rotate: -30 },
      { cx: 70, cy: 127, rx: 8, ry: 4, rotate: 30 }
    ],
    bloom: { cx: 53, cy: 100 },
    insects: {
      bee: 'translate(39,117)',
      fly: 'translate(68,123)',
      butterfly: 'translate(33,107)'
    }
  },
  tree: {
    height: 213,
    multiplier: 1.07,
    bloomMultiplier: 0.9,
    stem: { x: 49, y: 100, width: 8 },
    canopy: [
      { d: 'M37 83 Q53 70 70 83 Q63 77 53 77 Q43 77 37 83' },
      { d: 'M40 100 Q53 87 67 100 Q60 93 53 93 Q47 93 40 100' }
    ],
    blooms: [
      { cx: 43, cy: 77 },
      { cx: 63, cy: 83 }
    ],
    insects: {
      bee: 'translate(41,80)',
      fly: 'translate(65,87)',
      butterfly: 'translate(33,73)'
    }
  },
  oak: {
    height: 267,
    multiplier: 1.33,
    bloomMultiplier: 0.8,
    stem: { x: 47, y: 83, width: 13 },
    canopy: [
      { cx: 53, cy: 60, rx: 27, ry: 20, opacity: 1 },
      { cx: 47, cy: 77, rx: 20, ry: 13, opacity: 0.8 },
      { cx: 60, cy: 77, rx: 20, ry: 13, opacity: 0.8 }
    ],
    blooms: [
      { cx: 37, cy: 60 },
      { cx: 53, cy: 53 },
      { cx: 70, cy: 60 }
    ],
    insects: {
      bees: ['translate(35,63)', 'translate(72,57)'],
      fly: 'translate(52,70)',
      butterflies: ['translate(30,53)', 'translate(77,50)']
    }
  }
}

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  Vue: '#4FC08D',
  React: '#61DAFB',
  HTML: '#e34c26',
  CSS: '#1572B6'
}

// Ecosystem indicators
const hasRecentActivity = computed(() => {
  const pushed = new Date(props.repo.pushed_at || props.repo.updated_at)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return pushed > weekAgo
})

const hasOpenIssues = computed(() => props.repo.open_issues_count > 0)
const isPopular = computed(() => props.repo.stargazers_count >= 10)

// Plant type based on project size (KB)
const plantType = computed(() => {
  const size = props.repo.size || 0
  if (size < PLANT_THRESHOLDS.GRASS) return 'grass'
  if (size < PLANT_THRESHOLDS.SHRUB) return 'shrub'
  if (size < PLANT_THRESHOLDS.TREE) return 'tree'
  return 'oak'
})

// Computed plant configuration
const config = computed(() => PLANT_CONFIG[plantType.value])

// Plant dimensions based on repo stats and type
const commitCount = computed(() => 
  Math.max(1, Math.min(50, props.repo.size || 1))
)

const plantHeight = computed(() => config.value?.height || 160)
const plantSize = computed(() => 160)

const stemHeight = computed(() => {
  const multiplier = config.value?.multiplier || 0.5
  return Math.max(15, commitCount.value * multiplier)
})

const bloomSize = computed(() => {
  const size = Math.max(0, Math.min(12, props.repo.stargazers_count * 0.5))
  const multiplier = config.value?.bloomMultiplier || 1
  return size * multiplier
})

// Colors
const stemColor = computed(() => '#228B22')
const leafColor = computed(() => '#32CD32')
const bloomColor = computed(() => 
  LANGUAGE_COLORS[props.repo.language] || '#FF69B4'
)

// Utility functions
const formatDate = (dateStr) => {
  if (!dateStr) return 'Never'
  
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
@keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(1deg); }
}

@keyframes bee-hover {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 1px); }
  75% { transform: translate(1px, 1px); }
}

@keyframes fly-buzz {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(0.5px, 0.5px); }
  66% { transform: translate(-0.5px, -0.5px); }
}

@keyframes butterfly-flutter {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2px, -1px) rotate(2deg); }
  50% { transform: translate(-1px, -2px) rotate(-1deg); }
  75% { transform: translate(1px, 1px) rotate(1deg); }
}

.plant-sway {
  animation: sway 4s ease-in-out infinite;
}

.animate-grow {
  animation: grow 0.8s ease-out forwards;
}

.animate-bee {
  animation: bee-hover 2s ease-in-out infinite;
}

.animate-fly {
  animation: fly-buzz 0.8s linear infinite;
}

.animate-butterfly {
  animation: butterfly-flutter 3s ease-in-out infinite;
}
</style>