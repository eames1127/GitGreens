import { computed } from 'vue'
import { PLANT_THRESHOLDS, LANGUAGE_COLORS } from '../config/plantConfig.js'

const ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

// Shared so the bee on each plant and the garden's "active this week" count always agree
export function isRecentlyActive(repo) {
  const pushed = new Date(repo.pushed_at || repo.updated_at)
  return pushed > new Date(Date.now() - ACTIVE_WINDOW_MS)
}

export function usePlantData(repo) {
  const hasRecentActivity = computed(() => isRecentlyActive(repo))

  const hasOpenIssues = computed(() => repo.open_issues_count > 0)
  const isPopular = computed(() => repo.stargazers_count >= 10)

  const plantType = computed(() => {
    const size = repo.size || 0
    if (size < PLANT_THRESHOLDS.GRASS) return 'grass'
    if (size < PLANT_THRESHOLDS.SHRUB) return 'shrub'
    if (size < PLANT_THRESHOLDS.TREE) return 'tree'
    return 'oak'
  })

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
    bloomColor,
    formatDate
  }
}
