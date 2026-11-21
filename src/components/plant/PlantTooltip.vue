<template>
  <div 
    v-if="show"
    ref="tooltipRef"
    class="absolute bottom-full left-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10"
    :style="{ transform: `translateX(calc(-50% + ${shift}px))` }"
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
    <!-- Arrow moves back by the same shift so it still points at the plant -->
    <div
      class="absolute top-full left-1/2 border-4 border-transparent border-t-black/80"
      :style="{ transform: `translateX(calc(-50% - ${shift}px))` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  show: Boolean,
  repo: Object,
  plantType: String,
  hasRecentActivity: Boolean,
  formatDate: Function
})

// Gap kept between the tooltip and the garden's edge
const EDGE_MARGIN = 8

const tooltipRef = ref(null)
const shift = ref(0)

// The garden clips its contents, so a tooltip centred on a plant near either edge
// would be cut off; nudge it back inside the garden instead.
watch(() => props.show, async (visible) => {
  shift.value = 0
  if (!visible) return

  await nextTick()
  const tooltip = tooltipRef.value
  const garden = tooltip?.closest('[data-garden-bounds]')
  if (!garden) return

  const box = tooltip.getBoundingClientRect()
  const bounds = garden.getBoundingClientRect()
  const overflowLeft = bounds.left + EDGE_MARGIN - box.left
  const overflowRight = box.right - (bounds.right - EDGE_MARGIN)

  if (overflowLeft > 0) shift.value = overflowLeft
  else if (overflowRight > 0) shift.value = -overflowRight
})
</script>
