<template>
  <my-header></my-header>
  <tab></tab>
  <router-view></router-view>
</template>
<script>
import MyHeader from '@/components/header/header'
import Tab from '@/components/tab/tab'
export default {
  components: {
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
