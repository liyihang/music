<template>
  <div class="singer" v-loading="!result.length">
    <index-list :data="result" @select="selectSinger"></index-list>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '../service/singer'
import indexList from '@/components/base/index-list/index-list.vue'
export default {
  name: 'singer',
  data() {
    return {
      result: [],
      selectedSinger: null
    }
  },
  components: {
    indexList
  },
  async created() {
    const result = await getSingerList()
    this.result = result.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
