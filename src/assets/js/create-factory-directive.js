import { createApp } from 'vue'

export default function createFactoryDirective(Comp) {
  return {
    mounted(el, binding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      el.instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
  function append(el) {
    el.appendChild(el.instance.$el)
  }
  function remove(el) {
    el.removeChild(el.instance.$el)
  }
}
