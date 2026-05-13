<template>
  <div 
    class="relative group cursor-pointer plant-sway opacity-0 animate-grow"
    :style="{ animationDelay: `${delay}ms` }"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <PlantSVG 
      :plant-type="plantType"
      :config="config"
      :plant-size="plantSize"
      :plant-height="plantHeight"
      :stem-height="stemHeight"
      :bloom-size="bloomSize"
      :stem-color="stemColor"
      :leaf-color="leafColor"
      :bloom-color="bloomColor"
      :has-recent-activity="hasRecentActivity"
      :has-open-issues="hasOpenIssues"
      :is-popular="isPopular"
    />
    
    <PlantTooltip 
      :show="showTooltip"
      :repo="repo"
      :plant-type="plantType"
      :has-recent-activity="hasRecentActivity"
      :format-date="formatDate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlantData } from '../composables/usePlantData.js'
import PlantSVG from './plant/PlantSVG.vue'
import PlantTooltip from './plant/PlantTooltip.vue'
import { SEASONS } from '../seasons.js';

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

// Use the plant data composable
const {
  hasRecentActivity,
  hasOpenIssues,
  isPopular,
  plantType,
  config,
  plantHeight,
  plantSize,
  stemHeight,
  bloomSize,
  stemColor,
  leafColor,
  bloomColor,
  formatDate
} = usePlantData(props.repo)
</script>,


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