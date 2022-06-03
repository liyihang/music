<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from '../service/singer'
import { processSongs } from '../service/songs'
export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  async created() {
    const result = await getSingerDetail(this.singer)
    const songs = await processSongs(result.songs)
    console.log(songs)
  }

}
</script>

<style>
</style>
