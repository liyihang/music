import { useStore } from 'vuex'
import { computed } from 'vue'
export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
}
