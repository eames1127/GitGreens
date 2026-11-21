import { describe, it, expect, afterEach, vi } from 'vitest'
import { detectSeason, SEASON_KEYS } from './seasons.js'

describe('detectSeason', () => {
  afterEach(() => vi.useRealTimers())

  it.each([
    [0, 'winter'], [1, 'winter'], [2, 'spring'], [4, 'spring'],
    [5, 'summer'], [7, 'summer'], [8, 'autumn'], [10, 'autumn'], [11, 'winter']
  ])('month index %i is %s', (month, season) => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, month, 15))
    expect(detectSeason()).toBe(season)
  })

  it('only returns seasons that have a config', () => {
    expect(SEASON_KEYS).toEqual(['spring', 'summer', 'autumn', 'winter'])
  })
})
