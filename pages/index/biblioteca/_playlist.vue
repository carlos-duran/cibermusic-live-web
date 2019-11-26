<template>
  <div v-if="playlist">
    <div class="flex flex-wrap md:justify-between w-full">
      <div class="w-full md:w-auto px-4">
        <h4 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
          {{ playlist.name }}
        </h4>
      </div>
      <div class="w-full md:w-auto px-4">
        <button
          class="block px-4 py-2 bg-primary rounded m-4 mx-auto focus:outline-none"
        >
          Reproducir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['playlists']),
    playlist() {
      return this.playlists.find((p) => p.id === this.$route.params.playlist)
    }
  }
}
</script>
