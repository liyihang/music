import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/service/songs'
export default function useLyric() {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
     return
    }
    const lyric = await getLyric(newSong)
    console.log(lyric)
  })
}
