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
      
      return repos.filter(repo => !repo.fork)

    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchUserRepos
  }
}