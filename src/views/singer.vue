<template>
  <div class="singer" v-loading="!result.length">
    <index-list :data="result"></index-list>
  </div>
</template>

<script>
import { getSingerList } from '../service/singer'
import indexList from '@/components/base/index-list/index-list.vue'
export default {
  name: 'singer',
  data() {
    return {
      result: []
    }
  },
  components: {
    indexList
  },
  async created() {
    const result = await getSingerList()
    this.result = result.singers
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
