import { useStore } from 'vuex'
import { PLAY_KEY } from '@/assets/js/constant'
import { save } from '@/assets/js/array-store.js'
export default function usePlayHistory() {
  const store = useStore()
  const maxLen = 200

  function savePlay(song) {
    const songs = save(song, PLAY_KEY, (item) => {
      return song.id === item.id
    }, maxLen)
    store.commit('setPlayHistory', songs)
  }
  return { savePlay }
}
