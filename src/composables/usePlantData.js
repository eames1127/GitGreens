import { computed } from 'vue'
import { PLANT_THRESHOLDS, PLANT_CONFIG, LANGUAGE_COLORS } from '../config/plantConfig.js'

export function usePlantData(repo) {
  const hasRecentActivity = computed(() => {
    const pushed = new Date(repo.pushed_at || repo.updated_at)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return pushed > weekAgo
  })

  const hasOpenIssues = computed(() => repo.open_issues_count > 0)
  const isPopular = computed(() => repo.stargazers_count >= 10)

  const plantType = computed(() => {
    const size = repo.size || 0
    if (size < PLANT_THRESHOLDS.GRASS) return 'grass'
    if (size < PLANT_THRESHOLDS.SHRUB) return 'shrub'
    if (size < PLANT_THRESHOLDS.TREE) return 'tree'
    return 'oak'
  })

  const config = computed(() => PLANT_CONFIG[plantType.value])

  const commitCount = computed(() => 
    Math.max(1, Math.min(50, repo.size || 1))
  )

  // Smaller sizes so plants fill their slot without looking comically huge
  const plantHeight = computed(() => {
    const heights = { grass: 70, shrub: 90, tree: 110, oak: 130 }
    return heights[plantType.value] ?? 90
  })

  const plantSize = computed(() => {
    const sizes = { grass: 60, shrub: 75, tree: 85, oak: 100 }
    return sizes[plantType.value] ?? 75
  })

  const stemHeight = computed(() => {
    const multiplier = config.value?.multiplier || 0.5
    return Math.max(15, commitCount.value * multiplier)
  })

  const bloomSize = computed(() => {
    const size = Math.max(0, Math.min(12, repo.stargazers_count * 0.5))
    const multiplier = config.value?.bloomMultiplier || 1
    return size * multiplier
  })

  const stemColor = computed(() => '#228B22')
  const leafColor = computed(() => '#32CD32')
  const bloomColor = computed(() => 
    LANGUAGE_COLORS[repo.language] || '#FF69B4'
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never'
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return {
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
  }
}