import { ref } from 'vue'

export function useGitHub() {
  const loading = ref(false)
  const error = ref(null)

  const fetchUserRepos = async (username) => {
    loading.value = true
    error.value = null
    
    try {
      // Fetch user's repositories
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'User not found' : 'Failed to fetch repositories')
      }
      
      const repos = await response.json()
      
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