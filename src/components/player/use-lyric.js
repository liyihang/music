import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/service/songs'
import Lyric from 'lyric-parser'
export default function useLyric() {
  const currentLyric = ref(null)
  // song line num
  const currentLineNum = ref(0)
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })
    // change song deal
    if (currentSong.value.lyric !== lyric) {
      return
    }
    // parse lyric
    currentLyric.value = new Lyric(lyric, handleLyric)
  })
  // lyric logic function
  function handleLyric(lineNum) {
    currentLineNum.value = lineNum
  }
  return {
    currentLyric,
    currentLineNum
  }
}
