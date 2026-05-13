import { ref } from 'vue'
import { detectSeason } from '../config/seasons.js'
 
export function useSeason() {
  const season = ref(detectSeason())
 
  function setSeason(s) {
    season.value = s
  }
 
  return { season, setSeason }
}
 