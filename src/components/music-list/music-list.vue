<template>
  <div class="music-list">
    <div class="back" @click="goback()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div ref="bgImage" class="bg-image" :style="bgImageStyle">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import Scroll from '@/components/base/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'
import { useStore } from 'vuex'
const REVERSED_HEIGHT = 40
export default {
  name: 'music-list',
  components: {
    Scroll,
    SongList
  },
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: '抱歉，暂未有相关歌曲'
    }
  },
  setup(props) {
    const bgImage = ref(null)
    const imageHeight = ref(null)
    const scrollY = ref(null)
    const maxTranslateY = ref(0)
    const zIndex = ref(0)
    const paddingTop = ref('70%')
    const height = ref(0)
    const translateZ = ref(0)
    const scale = ref(1)
    const blur = ref(0)
    const router = useRouter()
    const store = useStore()
    /**
     * bugs  need fixed
     */
    onMounted(() => {
      nextTick(() => {
        imageHeight.value = bgImage.value.clientHeight
        maxTranslateY.value = imageHeight.value - REVERSED_HEIGHT
      })
    })
    /**
     * computed
     * side-effect problems  just dislike use watch
     */
    const noResult = computed(() => {
      return !props.loading && !props.songs.length
    })
    const bgImageStyle = computed(() => {
      return {
        zIndex: zIndex.value,
        paddingTop: paddingTop.value,
        height: `${height.value}`,
        backgroundImage: `url(${props.pic})`,
        transform: `scale(${scale.value})translateZ(${translateZ.value}px)`
      }
    })
    const filterStyle = computed(() => {
      return {
        backdropFilter: `blur(${blur.value}px)`
      }
    })
    /**
     * style watch
     */
    watch(scrollY, () => {
      // console.log('==========', maxTranslateY.value)
      if (scrollY.value > maxTranslateY.value) {
        zIndex.value = 10
        paddingTop.value = 0
        height.value = `${REVERSED_HEIGHT}px`
        translateZ.value = 1
      } else {
        paddingTop.value = '70%'
        height.value = 0
        zIndex.value = 0
      }
      // scale
      if (scrollY.value < 0) {
        scale.value = 1 + Math.abs(scrollY.value / imageHeight.value)
      }
    })
    /**
     * blur watch
     *
     */
    watch(scrollY, () => {
      if (scrollY.value > 0) {
        blur.value =
          Math.min(
            maxTranslateY.value / imageHeight.value,
            scrollY.value / imageHeight.value
          ) * 20
      }
    })
    const scrollStyle = computed(() => {
      return {
        top: `${imageHeight.value}px`
      }
    })
    /**
     * methods
     */
    const goback = () => {
      router.back()
    }
    const onScroll = (pos) => {
      scrollY.value = -pos.y
    }
    const selectItem = ({ song, index }) => {
      selectPlay({
        list: props.songs,
        index: index
      })
    }
    const selectPlay = ({ list, index }) =>
      store.dispatch('selectPlay', { list, index })
    // leave a mapactions useage bug
    return {
      bgImage,
      bgImageStyle,
      scrollStyle,
      goback,
      onScroll,
      filterStyle,
      noResult,
      selectItem
    }
  }
}
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    // padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }

    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;

      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }

      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
