import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/service/songs'
import Lyric from 'lyric-parser'
export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null)
  // song line num
  const currentLineNum = ref(0)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  // pure music
  const pureMusic = ref('')
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    // change song lyric trigger bugs
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
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
    const hasLyric = currentLyric.value.lines.length
    // if play show lyric
    if (hasLyric) {
      if (songReady.value) {
        playLyric()
      }
    } else {
      pureMusic.value = lyric.replace(/\[\d{2}]:[\d{2}]:[\d{2}]/g, '')
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
  // stop lyric
  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      // console.log(currentLyricVal)
      // updates the current file cursor offset to the position (in bytes) specified when calling the method.
      currentLyricVal.stop()
    }
  }
  // lyric logic function
  function handleLyric({ lineNum }) {
    currentLineNum.value = lineNum
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricListRef,
    lyricScrollRef,
    pureMusic
  }
}
