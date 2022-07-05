import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)
export default function useMiniSlider() {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)
  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen)
  const playList = computed(() => store.state.playList)
  const currentIndex = computed(() => store.state.currentIndex)
  const sliderShow = computed(() => {
    return !fullScreen.value && !!playList.value
  })
  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: false,
            scrollY: true,
            momentum: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
    // watch currentIndex
    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
  })
  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })
  return {
    sliderWrapperRef
  }
}