import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/service/songs'
import Lyric from 'lyric-parser'
export default function useLyric({ songReady, currentTime }) {
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
    // if play show lyric
    if (songReady.value) {
      playLyric()
    }
  })
  // play lyric
  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      // console.log(currentLyricVal)
      // updates the current file cursor offset to the position (in bytes) specified when calling the method.
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }
  // lyric logic function
  function handleLyric({ lineNum }) {
    currentLineNum.value = lineNum
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric
  }
}
