<template>
  <div class="group flex items-center hover:bg-black-trans">
    <div
      class="cursor-pointer min-w-0 w-full flex-1 flex items-center py-2 md:py-3 px-2"
      @click="action"
    >
      <div class="flex-none">
        <!-- <img
          class="group-hover:hidden w-10 h-10"
          :src="playlist.image"
          :alt="playlist.title"
        /> -->
      </div>
      <div class="truncate px-2 flex-1 min-w-0 truncate">
        <p class="text-base xl:text-lg truncate">
          {{ playlist.name }}
        </p>
        <p class="text-sm text-gray-400 truncate">
          {{ playlist.tracks.length }} canciones
        </p>
      </div>
    </div>
    <div v-if="showOptions" class="flex-none ml-auto flex items-center px-2">
      <button class="p-1 focus:outline-none">
        <Icon name="dots-vertical" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({})
    },
    showOptions: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      required: true
    }
  }
}
</script>
