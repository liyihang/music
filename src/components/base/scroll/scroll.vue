<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useScroll from './use-scroll'
export default {
  name: 'Scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const rootRef = ref(null)
    useScroll(rootRef)
    return {
      rootRef
    }
  }
}
</script>

<style>
</style>
