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
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null)
    useScroll(rootRef, props, emit)
    return {
      rootRef
    }
  }
}
</script>

<style>
</style>
