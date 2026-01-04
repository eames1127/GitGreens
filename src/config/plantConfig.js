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

export const LANGUAGE_COLORS = {
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