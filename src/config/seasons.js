export const SEASONS = {
  spring: {
    label: '🌸 Spring',
    skyClass: 'from-sky-200 to-green-100',
    groundClass: 'bg-green-500',
    borderClass: 'border-green-400',
    particleEmoji: '🌸',
    particleCount: 14,
    bloomTint: '#FFB7C5',
    leafTint: '#88d860',
    cssFilter: 'hue-rotate(10deg) saturate(1.3)',
    snowCaps: false,
  },
  summer: {
    label: '☀️ Summer',
    skyClass: 'from-blue-400 to-sky-300',
    groundClass: 'bg-green-700',
    borderClass: 'border-green-600',
    particleEmoji: null,
    particleCount: 0,
    bloomTint: null,
    leafTint: null,
    cssFilter: 'saturate(1.5)',
    snowCaps: false,
  },
  autumn: {
    label: '🍂 Autumn',
    skyClass: 'from-orange-300 to-amber-200',
    groundClass: 'bg-yellow-900',
    borderClass: 'border-yellow-800',
    particleEmoji: '🍂',
    particleCount: 18,
    bloomTint: '#e67e22',
    leafTint: '#c0392b',
    cssFilter: 'hue-rotate(30deg) saturate(1.4)',
    snowCaps: false,
  },
  winter: {
    label: '❄️ Winter',
    skyClass: 'from-blue-100 to-slate-100',
    groundClass: 'bg-slate-200',
    borderClass: 'border-slate-300',
    particleEmoji: '❄️',
    particleCount: 22,
    bloomTint: '#ffffff',
    leafTint: '#9ab8d0',
    cssFilter: 'saturate(0.3) brightness(1.1)',
    snowCaps: true,
  },
}

export const SEASON_KEYS = Object.keys(SEASONS)

export function detectSeason() {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}