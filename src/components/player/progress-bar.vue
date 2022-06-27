<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle" @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove" @touchend.prevent="onTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
const progressBtnWidth = 16
export default {
  name: 'progress-bar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const offset = ref(0)

    // computed
    const progressStyle = computed(() => {
      console.log(offset.value)
      return {
        width: `${offset.value}px`
      }
    })
    const btnStyle = computed(() => {
      return {
        transform: `translate3D(${offset.value}px,0,0)`
      }
    })
    watch(props.progress, (newProgress) => {
      console.log(props.progress)
      const barWidth = this.$el.clientWidth - progressBtnWidth
      offset.value = barWidth * newProgress
    })
    const onTouchStart = (e) => {
      return '123'
    }
    return {
      progressStyle,
      btnStyle,
      onTouchStart
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
