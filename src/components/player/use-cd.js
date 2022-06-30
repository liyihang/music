import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
export default function useCD() {
  const cdRef = ref(null)
  const imageRef = ref(null)
  const store = useStore()
  const playing = computed(() => store.state.playing)
  const CDstyle = computed(() => {
    return playing.value ? 'playing' : ''
  })
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      asyncTransform(cdRef.value, imageRef.value)
    }
  })
  function asyncTransform(wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat('', wrapperTransform)
  }
  return { CDstyle, cdRef, imageRef }
}
