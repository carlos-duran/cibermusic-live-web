<template>
  <div>
    <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
      Las más escuchadas
    </h3>
    <div class="-mx-2 overflow-x-auto pb-4 mb-4">
      <div class="flex">
        <div
          v-for="i in 5"
          :key="i"
          class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <img class="rounded" src="https://placehold.it/250x250" alt="" />
        </div>
      </div>
    </div>

    <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
      Recientemente agregadas
    </h3>
    <div class="-mx-2 overflow-x-auto pb-4 mb-4">
      <div class="flex">
        <div
          v-for="i in 4"
          :key="i"
          class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <img class="rounded" src="https://placehold.it/250x250" alt="" />
        </div>
      </div>
    </div>

    <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">Tus favoritas</h3>
    <div class="-mx-2 overflow-x-auto pb-4 mb-4">
      <div class="flex">
        <div
          v-for="i in 7"
          :key="i"
          class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <img class="rounded" src="https://placehold.it/250x250" alt="" />
        </div>
      </div>
    </div>

    <div v-if="playlist">
      <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
        Playlist de prueba
      </h3>
      <div class="-mx-2 overflow-x-auto pb-4 mb-4">
        <div class="flex">
          <div
            v-for="(track, i) in playlist.tracks.data.slice(0, 9)"
            :key="track.id"
            class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <img
              v-if="i < 8"
              class="rounded"
              :src="track.album.cover_medium"
              :title="track.title"
              @click="loadFullAndPlay({ queue: playlist.tracks.data, pos: i })"
            />
            <div
              v-else-if="i < 9"
              class="bg-gray-400 w-full h-full rounded"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      playlist: null
    }
  },
  computed: {
    ...mapState('player', ['queue'])
  },
  async mounted() {
    this.playlist = await this.$axios.$get('/common')
    if (!this.queue.length) {
      this.loadFull({ queue: this.playlist.tracks.data, pos: 0 })
    }
  },
  methods: {
    ...mapActions('player', ['loadFull', 'loadFullAndPlay'])
  }
}
</script>
