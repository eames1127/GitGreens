import { ref } from 'vue'

const PER_PAGE = 100
// Unauthenticated callers get 60 requests an hour, so cap how many one garden can spend
const MAX_PAGES = 5

function describeFailure(response) {
  if (response.status === 404) return 'User not found'
  const rateLimited = response.status === 429 ||
    (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')
  if (rateLimited) {
    const reset = Number(response.headers.get('x-ratelimit-reset'))
    const when = reset ? ` after ${new Date(reset * 1000).toLocaleTimeString()}` : ' later'
    return `GitHub rate limit reached, please try again${when}`
  }
  return 'Failed to fetch repositories'
}

// fetch only rejects when no reply arrived (offline, DNS, blocked by an extension), and the
// browser's own wording for that ("Failed to fetch", "NetworkError...") means nothing to users
async function fetchFromGitHub(url) {
  try {
    return await fetch(url)
  } catch (err) {
    throw new Error('Could not reach GitHub, please check your connection and try again', { cause: err })
  }
}

// GitHub's own rules: 1-39 alphanumerics or single hyphens, not starting or ending with a hyphen
const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export function useGitHub() {
  const loading = ref(false)
  const error = ref(null)
  // Replies can arrive out of order, so only the most recent search may update state
  let latestSearch = 0

  const fetchUserRepos = async (username) => {
    const search = ++latestSearch
    const isCurrent = () => search === latestSearch
    error.value = null

    if (!GITHUB_USERNAME.test(username)) {
      loading.value = false
      error.value = 'That is not a valid GitHub username'
      return null
    }

    loading.value = true

    try {
      const repos = []
      for (let page = 1; page <= MAX_PAGES; page++) {
        const response = await fetchFromGitHub(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${PER_PAGE}&page=${page}`)

        // Stop paging for a search the user has replaced, saving rate-limited requests
        if (!isCurrent()) return null

        if (!response.ok) {
          throw new Error(describeFailure(response))
        }

        const pageRepos = await response.json()
        repos.push(...pageRepos)
        if (pageRepos.length < PER_PAGE) break
      }

      return repos.filter(repo => !repo.fork)

    } catch (err) {
      if (isCurrent()) error.value = err.message
      return null
    } finally {
      if (isCurrent()) loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchUserRepos
  }
}
