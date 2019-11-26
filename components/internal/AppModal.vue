<template>
  <transition name="page">
    <div
      v-if="show"
      class="modal fixed inset-0 h-full z-20 overflow-auto flex items-center justify-center p-4 md:p-12"
      @click.self="bgClose && $emit('update:show', false)"
    >
      <div :class="contentClass">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    bgClose: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String,
      default: 'bg-white text-black max-w-lg m-auto p-6 rounded'
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
