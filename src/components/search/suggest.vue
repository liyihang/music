<template>
  <div ref="rootRef" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ song.singer }}-{{ song.name }}
          </p>
        </div>
      </li>
      <div class="suggest-item"></div>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { search } from '../../service/search'
import { processSongs } from '../../service/songs'
export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    watch(() => props.query, async (newQuery) => {
      if (!newQuery) {
        return
      }
      await searchFirst()
    })
    // init search
    const searchFirst = async () => {
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true
      const result = await search(props.query, page.value, props.showSinger)
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore
    }
    return {
      singer,
      songs
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-d;
        }
      }

      .name {
        flex: inherit;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;

        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
