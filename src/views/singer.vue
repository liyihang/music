<template>
  <div class="singer" v-loading="!result.length">
    <index-list :data="result" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in" appear>
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '../service/singer'
import indexList from '@/components/base/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
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
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
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
