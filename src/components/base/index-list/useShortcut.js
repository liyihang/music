import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18

  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })
  const touch = {}
  // touch start
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    // const targetEl = groupRef.value.children[anchorIndex]
    // const scroll = scrollRef.value.scroll
    // scroll.scrollToElement(targetEl, 0)
    scrollTo(anchorIndex)
  }
  // touch move
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }
  // scroll to
  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    // index range
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }
  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
