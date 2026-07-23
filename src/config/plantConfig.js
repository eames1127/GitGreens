export const PLANT_THRESHOLDS = {
  GRASS: 100000,    // < 100MB
  SHRUB: 500000,    // 100MB - 500MB  
  TREE: 1000000     // 500MB - 1GB, > 1GB = oak
}

export const PLANT_CONFIG = {
  grass: {
    height: 107,
    multiplier: 0.53,
    bloomMultiplier: 1.3,
    strokeWidth: 3,
    stemWidth: 3,
    // paths/bloom kept for compat but PlantSVG uses inline paths now
    paths: [],
    bloom: { cx: 54, cy: 98 },
    insects: {
      bee:       { x: 72, y: 82 },
      fly:       { x: 22, y: 90 },
      butterfly: { x: 53, y: 62 }
    }
  },
  shrub: {
    height: 160,
    multiplier: 0.8,
    bloomMultiplier: 1.3,
    stem: { x: 50, y: 130, width: 7 },
    leaves: [],
    bloom: { cx: 53, cy: 105 },
    insects: {
      bee:       'translate(80,95)',
      fly:       'translate(16,108)',
      butterfly: 'translate(53,78)'
    }
  },
  tree: {
    height: 213,
    multiplier: 1.07,
    bloomMultiplier: 0.9,
    stem: { x: 47, y: 100, width: 13 },
    canopy: [],
    blooms: [],
    insects: {
      bee:       'translate(82,60)',
      fly:       'translate(14,82)',
      butterfly: 'translate(53,28)'
    }
  },
  oak: {
    height: 267,
    multiplier: 1.33,
    bloomMultiplier: 0.8,
    stem: { x: 44, y: 85, width: 19 },
    canopy: [],
    blooms: [],
    insects: {
      bees:        ['translate(18,55)', 'translate(85,42)'],
      fly:         'translate(53,65)',
      butterflies: ['translate(12,40)', 'translate(92,32)']
    }
  }
}

export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python:     '#3572A5',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  'C#':       '#239120',
  PHP:        '#4F5D95',
  Ruby:       '#701516',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Swift:      '#ffac45',
  Kotlin:     '#F18E33',
  Dart:       '#00B4AB',
  Vue:        '#4FC08D',
  React:      '#61DAFB',
  HTML:       '#e34c26',
  CSS:        '#1572B6'
}