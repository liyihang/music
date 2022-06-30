import { useStore } from 'vuex'
import { computed } from 'vue'
export default function useCD() {
  const store = useStore()
  const playing = computed(() => store.state.playing)
  const CDstyle = computed(() => {
    return playing.value ? 'playing' : ''
  })
  return { CDstyle }
}
