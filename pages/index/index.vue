<template>
  <div>
    <!-- <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
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
    </div> -->

    <div v-for="playlist in selectedPlaylists" :key="playlist.id">
      <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
        {{ playlist.title }}
      </h3>
      <div class="-mx-2 overflow-x-auto pb-4 mb-6">
        <div class="flex">
          <div
            v-for="(track, i) in playlist.tracks.data.slice(0, 20)"
            :key="track.id"
            class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <div
              class="cursor-pointer"
              @click="loadFullAndPlay({ queue: playlist.tracks.data, pos: i })"
            >
              <img
                class="rounded"
                :src="track.album.cover_medium"
                :title="track.title"
              />
              <h4 class="md:text-lg truncate mt-2">
                {{ track.title }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(results, r) in selectedArtists" :key="r">
      <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
        Selección de prueba
      </h3>
      <div class="-mx-2 overflow-x-auto pb-4 mb-6">
        <div class="flex">
          <div
            v-for="(track, i) in results.data.slice(0, 20)"
            :key="track.id"
            class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <div
              class="cursor-pointer"
              @click="loadFullAndPlay({ queue: results.data, pos: i })"
            >
              <img
                class="rounded"
                :src="track.album.cover_medium"
                :title="track.title"
              />
              <h4 class="md:text-lg truncate mt-2">
                {{ track.title }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">Tus favoritas</h3>
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
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('player', ['queue']),
    ...mapState('home', ['selectedPlaylists', 'selectedArtists'])
  },
  async mounted() {
    if (!this.selectedPlaylists.length) {
      await this.loadSelected()
    }
    if (!this.queue.length) {
      this.loadFull({ queue: this.selectedPlaylists[0].tracks.data, pos: 0 })
    }
  },
  methods: {
    ...mapActions('player', ['loadFull', 'loadFullAndPlay']),
    ...mapActions('home', ['loadSelected'])
  }
}
</script>
