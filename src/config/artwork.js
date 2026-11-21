import beeSrc from '../assets/insects/bee.svg'
import flySrc from '../assets/insects/fly.svg'
import butterflySrc from '../assets/insects/butterfly.svg'

// Plant artwork is chosen by season at runtime, so let Vite resolve every variant up front;
// hand-built '/src/assets/...' strings only resolve on the dev server, not in the build.
const PLANT_IMAGES = import.meta.glob('../assets/plants/*.svg', { eager: true, query: '?url', import: 'default' })

export const INSECT_IMAGES = { bee: beeSrc, fly: flySrc, butterfly: butterflySrc }

// One place resolves artwork so the garden and its key can never show different pictures
export function plantImage(name) {
  return PLANT_IMAGES[`../assets/plants/${name}.svg`]
}
