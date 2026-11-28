import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useGitHub } from './useGitHub.js'

const repo = (id, extra = {}) => ({ id, fork: false, ...extra })
const ok = (body) => ({ ok: true, status: 200, json: async () => body, headers: new Headers() })
const fail = (status, headers = {}) => ({ ok: false, status, json: async () => ({}), headers: new Headers(headers) })

describe('useGitHub().fetchUserRepos', () => {
  let fetchMock

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => vi.unstubAllGlobals())

  it.each(['', '-abc', 'abc-', 'a--b', '../etc', 'a'.repeat(40), 'name?x=1'])(
    'rejects invalid username %j without calling the API',
    async (username) => {
      const { fetchUserRepos, error } = useGitHub()
      expect(await fetchUserRepos(username)).toBeNull()
      expect(error.value).toBe('That is not a valid GitHub username')
      expect(fetchMock).not.toHaveBeenCalled()
    }
  )

  it('drops forks', async () => {
    fetchMock.mockResolvedValueOnce(ok([repo(1), repo(2, { fork: true })]))
    const { fetchUserRepos } = useGitHub()
    expect((await fetchUserRepos('octocat')).map(r => r.id)).toEqual([1])
  })

  it('keeps fetching while pages are full', async () => {
    const full = Array.from({ length: 100 }, (_, i) => repo(i))
    fetchMock.mockResolvedValueOnce(ok(full)).mockResolvedValueOnce(ok([repo(100)]))
    const { fetchUserRepos } = useGitHub()
    expect(await fetchUserRepos('octocat')).toHaveLength(101)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[1][0]).toContain('page=2')
  })

  it('stops after the page cap to protect the rate limit', async () => {
    const full = Array.from({ length: 100 }, (_, i) => repo(i))
    fetchMock.mockResolvedValue(ok(full))
    const { fetchUserRepos } = useGitHub()
    await fetchUserRepos('octocat')
    expect(fetchMock).toHaveBeenCalledTimes(5)
  })

  it('reports an unknown user', async () => {
    fetchMock.mockResolvedValueOnce(fail(404))
    const { fetchUserRepos, error } = useGitHub()
    expect(await fetchUserRepos('octocat')).toBeNull()
    expect(error.value).toBe('User not found')
  })

  it('explains when the rate limit is reached', async () => {
    fetchMock.mockResolvedValueOnce(fail(403, { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': '1800000000' }))
    const { fetchUserRepos, error } = useGitHub()
    await fetchUserRepos('octocat')
    expect(error.value).toMatch(/^GitHub rate limit reached, please try again after /)
  })

  it('reports other failures generically and clears loading', async () => {
    fetchMock.mockResolvedValueOnce(fail(500))
    const { fetchUserRepos, error, loading } = useGitHub()
    await fetchUserRepos('octocat')
    expect(error.value).toBe('Failed to fetch repositories')
    expect(loading.value).toBe(false)
  })
})

describe('overlapping searches', () => {
  let fetchMock

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => vi.unstubAllGlobals())

  // Resolve fetches by hand so a slow first search can finish after a fast second one
  const deferred = () => {
    let resolve
    const promise = new Promise(r => { resolve = r })
    return { promise, resolve }
  }

  it('ignores an earlier search that finishes after a later one', async () => {
    const slow = deferred()
    fetchMock
      .mockImplementationOnce(() => slow.promise)
      .mockResolvedValueOnce(ok([repo(2)]))
    const { fetchUserRepos, loading } = useGitHub()

    const first = fetchUserRepos('alice')
    const second = await fetchUserRepos('bob')
    slow.resolve(ok([repo(1)]))

    expect(second.map(r => r.id)).toEqual([2])
    expect(await first).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('does not show an error from a superseded search', async () => {
    const slow = deferred()
    fetchMock
      .mockImplementationOnce(() => slow.promise)
      .mockResolvedValueOnce(ok([repo(2)]))
    const { fetchUserRepos, error } = useGitHub()

    const first = fetchUserRepos('alice')
    await fetchUserRepos('bob')
    slow.resolve(fail(404))
    await first

    expect(error.value).toBeNull()
  })

  it('ignores an earlier search whose body is still being read when a later one starts', async () => {
    const slowBody = deferred()
    fetchMock.mockResolvedValueOnce({ ...ok([]), json: () => slowBody.promise })
    const { fetchUserRepos, error } = useGitHub()

    const first = fetchUserRepos('alice')
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    await fetchUserRepos('not--valid')
    slowBody.resolve([repo(1)])

    expect(await first).toBeNull()
    expect(error.value).toBe('That is not a valid GitHub username')
  })

  it('stays loading until the latest search finishes', async () => {
    const slowSecond = deferred()
    fetchMock
      .mockResolvedValueOnce(ok([repo(1)]))
      .mockImplementationOnce(() => slowSecond.promise)
    const { fetchUserRepos, loading } = useGitHub()

    const first = fetchUserRepos('alice')
    const second = fetchUserRepos('bob')
    await first
    expect(loading.value).toBe(true)

    slowSecond.resolve(ok([repo(2)]))
    await second
    expect(loading.value).toBe(false)
  })
})
