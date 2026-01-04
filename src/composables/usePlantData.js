import { computed } from 'vue'
import { PLANT_THRESHOLDS, PLANT_CONFIG, LANGUAGE_COLORS } from '../config/plantConfig.js'

export function usePlantData(repo) {
  // Ecosystem indicators
  const hasRecentActivity = computed(() => {
    const pushed = new Date(repo.pushed_at || repo.updated_at)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return pushed > weekAgo
  })

  const hasOpenIssues = computed(() => repo.open_issues_count > 0)
  const isPopular = computed(() => repo.stargazers_count >= 10)

  // Plant type based on project size (KB)
  const plantType = computed(() => {
    const size = repo.size || 0
    if (size < PLANT_THRESHOLDS.GRASS) return 'grass'
    if (size < PLANT_THRESHOLDS.SHRUB) return 'shrub'
    if (size < PLANT_THRESHOLDS.TREE) return 'tree'
    return 'oak'
  })

  // Plant configuration
  const config = computed(() => PLANT_CONFIG[plantType.value])

  // Plant dimensions
  const commitCount = computed(() => 
    Math.max(1, Math.min(50, repo.size || 1))
  )

  const plantHeight = computed(() => config.value?.height || 160)
  const plantSize = computed(() => 160)

  const stemHeight = computed(() => {
    const multiplier = config.value?.multiplier || 0.5
    return Math.max(15, commitCount.value * multiplier)
  })

  const bloomSize = computed(() => {
    const size = Math.max(0, Math.min(12, repo.stargazers_count * 0.5))
    const multiplier = config.value?.bloomMultiplier || 1
    return size * multiplier
  })

  // Colors
  const stemColor = computed(() => '#228B22')
  const leafColor = computed(() => '#32CD32')
  const bloomColor = computed(() => 
    LANGUAGE_COLORS[repo.language] || '#FF69B4'
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