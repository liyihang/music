<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="search-content" v-show="!query">
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li class="item" v-for="(item) in hotKeys" :key="item.index" @click="addQuery(item)">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="search-content">
        <h1 class="title">
          <span class="text">搜索历史</span>
        </h1>
        <search-list :searches="searchHistory"></search-list>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in" appear>
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import SearchInput from '../components/search/search-input'
import { getHotKeys } from '../service/search'
import Suggest from '../components/search/suggest.vue'
import SearchList from '../components/search/search-list'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest,
    SearchList
  },
  setup() {
    const query = ref('')
    const noHotKeys = ['稻香', '一路向北', '海阔天空', '周杰伦']
    const hotKeys = ref([])
    const selectedSinger = ref(null)
    const store = useStore()
    const router = useRouter()
    const searchHistory = computed(() => store.state.searchHistory)
    getHotKeys().then((result) => {
      if (!result) {
        hotKeys.value = noHotKeys
      } else {
        hotKeys.value = result.hotKeys
      }
    })
    const addQuery = (s) => {
      query.value = s
    }
    function selectSong(song) {
      store.dispatch('addSong', song)
    }
    function selectSinger(singer) {
      selectedSinger.value = singer
      cacheSinger(singer)
      router.push({
        path: `/search/${singer.mid}`
      })
    }
    function cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
    return {
      query,
      hotKeys,
      addQuery,
      selectSong,
      selectSinger,
      selectedSinger,
      searchHistory
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .search-input-wrapper {
    margin: 20px;
  }

  .search-content {
    flex: 1;
    overflow: hidden;

    .hot-keys {
      margin: 0 20px 20px 20px;

      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }

      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }

    .search-history {
      position: relative;
      margin: 0 20px;

      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;

        .text {
          flex: 1;
        }

        .clear {
          @include extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }

  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
