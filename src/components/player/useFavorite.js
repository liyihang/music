import { useStore } from 'vuex'
import { computed } from 'vue'
import { save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@ /assets/js/constant'
export default function useFavorite() {
  const store = useStore()
  const maxLen = 100
  const favoriteList = computed(() => store.state.favoriteList)

  // favorite iocn 图标
  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }
  // 歌曲收藏
  function toggleFavorite(song) {
    let list
    if (isFavorite(song)) {
      // remove
    } else {
      // save
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    song.commit('setFavoriteList', list)
    function compare(item) {
      return item.id === song.id
    }
  }

  // 获取收藏歌曲
  function isFavorite(song) {
    return (
      favoriteList.value.findIndex((item) => {
        return item.id === song.id
      }) > -1
    )
  }

  return { getFavoriteIcon }
}
