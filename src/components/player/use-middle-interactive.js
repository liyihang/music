import { ref } from 'vue'
export default function useMiddleInterActive() {
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)
  const touch = {}
  let currentView = 'cd'
  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].pageX
  }
  function onMiddleTouchMove(e) {
    const deltaX = e.touches[0].pageX - touch.startX
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)
    if (currentView == 'cd') {
      if (touch.percent > 0.2) {
        touc
      }
    }
  }
  function onMiddleTouchEnd() { }
  return {
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}