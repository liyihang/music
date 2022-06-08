<template>
  <div class="music-list">
    <div class="back" @click="goback()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div ref="bgImage" class="bg-image" :style="bgImageStyle">
      <div class="filter"></div>
    </div>
    <scroll class="list" :style="scrollStyle" v-loading="loading" :probe-type="3" @scroll="onScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import Scroll from '@/components/base/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'
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
    loading: Boolean
  },
  setup(props) {
    const bgImage = ref(null)
    const imageHeight = ref(null)
    const scrollY = ref(null)
    const maxTranslateY = ref(0)
    const zIndex = ref(0)
    const paddingTop = ref('70%')
    const height = ref(0)
    const router = useRouter()
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
     */
    const bgImageStyle = computed(() => {
      // console.log('==========', maxTranslateY.value)
      if (scrollY.value > maxTranslateY.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        zIndex.value = 10
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        paddingTop.value = 0
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        height.value = `${REVERSED_HEIGHT}px`
      }
      return {
        zIndex: zIndex.value,
        paddingTop: paddingTop.value,
        height: `${height.value}`,
        backgroundImage: `url(${props.pic})`
      }
    })
    const scrollStyle = computed(() => {
      return {
        top: `${imageHeight.value}px`
      }
    })
    /**
     * watch
     */
    watch(paddingTop, (paddingTop) => {
      console.log(paddingTop.value)
      if (paddingTop === '0px') {
        paddingTop.value = '70%'
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
      console.log(scrollY.value)
    }
    return {
      bgImage,
      bgImageStyle,
      scrollStyle,
      goback,
      onScroll
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
