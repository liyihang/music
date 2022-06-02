<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from '../service/singer'
export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  async created() {
    const result = await getSingerDetail(this.singer)
    console.log(result)
  }

}
</script>

<style>
</style>
