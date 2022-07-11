import { PLAYMODE, FAVORITE_KEY, SEARCH_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAYMODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY)
}

export default state
