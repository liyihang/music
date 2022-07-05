<template>
  <div class="progress-bar" ref="progressEl" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progressItem" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle" @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove" @touchend.prevent="onTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref, watch } from 'vue'
const progressBtnWidth = 16
export default {
  name: 'progress-bar',
  emits: ['progress-changing', 'progress-changed'],
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  setup(props, ctx) {
    const offset = ref(0)
    // ref $el
    const progressEl = ref(null)
    const progressItem = ref(null)
    // touch data
    const touch = reactive({
      x1: 0,
      beginWith: 0
    })
    // let { x1, beginWith } = toRefs(touch)

    // computed
    const progressStyle = computed(() => {
      return {
        width: `${offset.value}px`
      }
    })
    const btnStyle = computed(() => {
      return {
        transform: `translate3D(${offset.value}px,0,0)`
      }
    })
    watch(() => props.progress, (newProgress) => {
      // const barWidth = progressEl.value.clientWidth - progressBtnWidth
      // offset.value = barWidth * newProgress
      setOffset(newProgress)
    })
    /**
     * method
     */
    const onTouchStart = (e) => {
      touch.x1 = e.touches[0].pageX
      touch.beginWith = progressItem.value.clientWidth
      console.log(touch)
    }
    const onTouchMove = (e) => {
      const delta = e.touches[0].pageX - touch.x1
      const tempWidth = touch.beginWith + delta
      const barWidth = progressEl.value.clientWidth - progressBtnWidth
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
      offset.value = barWidth * progress
      // eslint-disable-next-line no-unused-expressions
      ctx.emit('progress-changing', progress)
    }
    const onTouchEnd = () => {
      const barWidth = progressEl.value.clientWidth - progressBtnWidth
      const progress = progressItem.value.clientWidth / barWidth
      ctx.emit('progress-changed', progress)
    }
    const onClick = (e) => {
      const rect = progressEl.value.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      const barWidth = progressEl.value.clientWidth - progressBtnWidth
      const progress = offsetWidth / barWidth
      ctx.emit('progress-changed', progress)
    }
    // fix mini-player change to fullScreen
    function setOffset(progress) {
      const barWidth = progressEl.value.clientWidth - progressBtnWidth
      offset.value = barWidth * progress
    }
    return {
      progressStyle,
      btnStyle,
      progressEl,
      progressItem,
      setOffset,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
