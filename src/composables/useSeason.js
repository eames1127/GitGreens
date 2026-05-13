export function useSeason() {
  const month = new Date().getMonth(); // 0–11

  const season = computed(() => {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  });

  return { season };
}