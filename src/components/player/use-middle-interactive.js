import { ref } from 'vue'
export default function useMiddleInterActive() {
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)
  function onMiddleTouchStart() { }
  function onMiddleTouchMove() { }
  function onMiddleTouchEnd() { }
}