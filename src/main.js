import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/base/loading/directive'
import NoResultDirective from './components/base/no-result/directive'
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/songs'
// 引入全局样式文件
import '@/assets/scss/index.scss'
// update local songs
const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs && favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}
const historySongs = load(PLAY_KEY)
if (historySongs && historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}
createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, { loading: require('@/assets/images/default.png') })
  .directive('loading', loadingDirective)
  .directive('no-result', NoResultDirective)
  .mount('#app')
