import { computed } from 'vue'

export default function useShortcut(props, groupRef) {
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  return {
    shortcutList
  }
}
