import { useStore } from 'vuex'
import { computed } from 'vue'
import { PLAYMODE } from '@/assets/js/constant'
export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)
  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAYMODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAYMODE.random
        ? 'icon-random'
        : 'icon-loop'
  })
  function changeMode() {
    const mode = (playMode.value + 1) % 3
    console.log(mode)
    store.dispatch('changeMode', mode)
  }
  return { modeIcon, changeMode }
}
