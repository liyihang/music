<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"> {{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle">
      <div class="filter"></div>
    </div>
    <scroll class="list">
      <div class="song-list-wrapper">

      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/components/base/scroll/scroll'
export default {
  name: 'music-list',
  components: {
    Scroll
  }
}
</script>

<style>
</style>
