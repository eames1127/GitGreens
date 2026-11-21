import { describe, it, expect, afterEach, vi } from 'vitest'
import { usePlantData, isRecentlyActive } from './usePlantData.js'

const DAY = 24 * 60 * 60 * 1000

describe('plantType', () => {
  // GitHub reports repo size in KB
  it.each([
    [0, 'grass'], [99_999, 'grass'], [100_000, 'shrub'],
    [499_999, 'shrub'], [500_000, 'tree'], [999_999, 'tree'], [1_000_000, 'oak']
  ])('size %i KB is %s', (size, type) => {
    expect(usePlantData({ size }).plantType.value).toBe(type)
  })

  it('treats a missing size as grass', () => {
    expect(usePlantData({}).plantType.value).toBe('grass')
  })
})

describe('insects', () => {
  it('shows a fly only when there are open issues', () => {
    expect(usePlantData({ open_issues_count: 0 }).hasOpenIssues.value).toBe(false)
    expect(usePlantData({ open_issues_count: 2 }).hasOpenIssues.value).toBe(true)
  })

  it('shows a butterfly from 10 stars', () => {
    expect(usePlantData({ stargazers_count: 9 }).isPopular.value).toBe(false)
    expect(usePlantData({ stargazers_count: 10 }).isPopular.value).toBe(true)
  })
})

describe('isRecentlyActive', () => {
  afterEach(() => vi.useRealTimers())

  const at = (msAgo) => new Date(Date.now() - msAgo).toISOString()

  it('is true for a push within the last 7 days', () => {
    expect(isRecentlyActive({ pushed_at: at(6 * DAY) })).toBe(true)
  })

  it('is false for a push more than 7 days ago', () => {
    expect(isRecentlyActive({ pushed_at: at(8 * DAY) })).toBe(false)
  })

  it('falls back to updated_at when pushed_at is missing', () => {
    expect(isRecentlyActive({ updated_at: at(DAY) })).toBe(true)
  })
})

describe('formatDate', () => {
  afterEach(() => vi.useRealTimers())

  it('describes recent dates in words', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-21T12:00:00Z'))
    const { formatDate } = usePlantData({})
    expect(formatDate(null)).toBe('Never')
    expect(formatDate('2026-11-21T08:00:00Z')).toBe('Today')
    expect(formatDate('2026-11-20T08:00:00Z')).toBe('Yesterday')
    expect(formatDate('2026-11-18T08:00:00Z')).toBe('3 days ago')
  })
})
