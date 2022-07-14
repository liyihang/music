<template>
  <my-header></my-header>
  <tab></tab>
  <router-view></router-view>
  <router-view name="user" v-slot="{ Component }">
    <transition name="slide" mode="out-in" appear>
      <component :is="Component"></component>
    </transition>
  </router-view>
  <player></player>
</template>
<script>
import MyHeader from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player.vue'
export default {
  components: {
    Player,
    MyHeader: MyHeader,
    Tab
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
