<template>
  <svg class="fill-current" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script>
import icons from '../icons.js'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    path() {
      return icons[this.name] || ''
    }
  }
}
</script>
