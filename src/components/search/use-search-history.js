import { save, remove } from '@/assets/js/array-store'
import { useStore } from 'vuex'
import { SEARCH_KEY } from '../../assets/js/constant'
export default function useSearchHistory() {
  const maxLen = 200
  const store = useStore()
  function saveSearch(query) {
    const searches = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    store.commit('setSearchHistory', searches)
  }
  function deleteSearch(query) {
    const searches = remove(SEARCH_KEY, (item) => {
      return item === query
    })
    store.commit('setSearchHistory', searches)
  }
  return {
    saveSearch,
    deleteSearch
  }
}
