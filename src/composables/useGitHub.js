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

// GitHub's own rules: 1-39 alphanumerics or single hyphens, not starting or ending with a hyphen
const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export function useGitHub() {
  const loading = ref(false)
  const error = ref(null)

  const fetchUserRepos = async (username) => {
    error.value = null

    if (!GITHUB_USERNAME.test(username)) {
      error.value = 'That is not a valid GitHub username'
      return null
    }

    loading.value = true

    try {
      const repos = []
      for (let page = 1; page <= MAX_PAGES; page++) {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${PER_PAGE}&page=${page}`)

        if (!response.ok) {
          throw new Error(describeFailure(response))
        }

        const pageRepos = await response.json()
        repos.push(...pageRepos)
        if (pageRepos.length < PER_PAGE) break
      }

      // Filter out forks and add commit count estimation
      const filteredRepos = repos
        .filter(repo => !repo.fork)
        .map(repo => ({
          ...repo,
          // Use repo size as commit count proxy (GitHub's size field)
          commitCount: repo.size || 1
        }))
      
      return filteredRepos
      
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchRepoCommits = async (username, repoName) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=1`)
      if (response.ok) {
        const commits = await response.json()
        return commits.length
      }
    } catch (err) {
      console.warn(`Could not fetch commits for ${repoName}:`, err)
    }
    return 1 // Default fallback
  }

  return {
    loading,
    error,
    fetchUserRepos,
    fetchRepoCommits
  }
}
