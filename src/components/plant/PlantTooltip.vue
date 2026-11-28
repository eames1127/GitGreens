<template>
  <div 
    v-if="show"
    ref="tooltipRef"
    :class="[
      'absolute left-1/2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10',
      placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
      { invisible: placing }
    ]"
    :style="{ transform: `translate(calc(-50% + ${shift}px), ${drop}px)` }"
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
      :class="[
        'absolute left-1/2 border-4 border-transparent',
        placement === 'above' ? 'top-full border-t-black/80' : 'bottom-full border-b-black/80'
      ]"
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
// Matches the mb-2 / mt-2 gap between the tooltip and its plant
const PLANT_GAP = 8

const tooltipRef = ref(null)
const shift = ref(0)
const drop = ref(0)
const placement = ref('above')
// Hidden until placed, so it never flashes up in the wrong spot first
const placing = ref(false)

// The plant grows in with a scaleY transform that also squashes this tooltip, so measuring
// mid-grow sees a shorter, lower box and misses overflow that appears once the plant is grown.
// Only the plant's own animations matter; its layers' endless sway never finishes.
async function plantGrown(plant) {
  try {
    await Promise.all(plant.getAnimations().map(animation => animation.finished))
    return true
  } catch (err) {
    // A cancelled animation means the plant left the garden, so there is nothing to place
    if (err.name === 'AbortError') return false
    throw err
  }
}

// The garden clips its contents, so a tooltip centred above a plant near any edge
// would be cut off; move it back inside the garden instead.
watch(() => props.show, async (visible) => {
  shift.value = 0
  drop.value = 0
  placement.value = 'above'
  placing.value = visible
  if (!visible) return

  await nextTick()
  const tooltip = tooltipRef.value
  const garden = tooltip?.closest('[data-garden-bounds]')
  if (!garden) {
    placing.value = false
    return
  }

  const grown = await plantGrown(tooltip.parentElement)
  // The pointer may have left, or come back and started a newer placement, while we waited
  if (!grown || tooltipRef.value !== tooltip || !props.show) return

  const box = tooltip.getBoundingClientRect()
  const bounds = garden.getBoundingClientRect()
  const overflowLeft = bounds.left + EDGE_MARGIN - box.left
  const overflowRight = box.right - (bounds.right - EDGE_MARGIN)

  if (overflowLeft > 0) shift.value = overflowLeft
  else if (overflowRight > 0) shift.value = -overflowRight

  const overflowTop = bounds.top + EDGE_MARGIN - box.top
  if (overflowTop > 0) {
    // Prefer flipping below the plant; a plant on the bottom row has no room there,
    // so slide the tooltip down just far enough to stay inside the garden instead
    const plant = tooltip.parentElement.getBoundingClientRect()
    const fitsBelow = plant.bottom + PLANT_GAP + box.height <= bounds.bottom - EDGE_MARGIN
    if (fitsBelow) placement.value = 'below'
    else drop.value = overflowTop
  }
  placing.value = false
})
</script>
