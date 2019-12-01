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
    <div
      v-if="showPlay && playlist.tracks.length"
      class="flex-none items-center px-2"
    >
      <button
        class="p-1 text-white border border-white rounded-full"
        @click="loadFullAndPlay({ queue: playlist.tracks, pos: 0 })"
      >
        <Icon name="play" class="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
    <div
      v-if="options.length"
      v-closable="{
        handler: 'onClickOutsideOptions',
        exclude: []
      }"
      class="flex-none flex items-center px-2 relative"
    >
      <button class="p-1 focus:outline-none" @click="showOptions = true">
        <Icon name="dots-vertical" class="w-6 h-6" />
      </button>
      <div
        v-if="showOptions"
        class="w-48 absolute top-0 right-0 bg-black-trans-dark text-white"
      >
        <div
          v-for="(option, i) in options"
          :key="i"
          class="p-2 cursor-pointer"
          @click="doOptionAction(option)"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({})
    },
    showPlay: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showOptions: false
    }
  },
  methods: {
    ...mapActions('player', ['loadFullAndPlay']),
    onClickOutsideOptions() {
      this.showOptions = false
    },
    doOptionAction(option) {
      option.action()
      this.showOptions = false
    }
  }
}
</script>
