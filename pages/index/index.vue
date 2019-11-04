<template>
  <div>
    <div v-if="loading">
      Cargando canciones...
    </div>

    <div v-else>
      <div v-if="topTracks.length">
        <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
          Top 10 Perú
        </h3>
        <div class="-mx-2 overflow-x-auto pb-4 mb-6">
          <div class="flex">
            <div
              v-for="(track, i) in topTracks"
              :key="track.id"
              class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <div
                class="cursor-pointer"
                @click="loadFullAndPlay({ queue: topTracks, pos: i })"
              >
                <img
                  v-if="track.album.cover_medium"
                  class="rounded"
                  :src="track.album.cover_medium"
                  :title="track.title"
                />
                <img
                  v-else
                  class="rounded"
                  :src="track.artist.picture_medium"
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

      <div v-for="playlist in topPlaylists" :key="playlist.id">
        <h3 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
          {{ playlist.title }}
        </h3>
        <div class="-mx-2 overflow-x-auto pb-4 mb-6">
          <div class="flex">
            <div
              v-for="(track, i) in playlist.tracks.slice(0, 20)"
              :key="track.id"
              class="px-2 flex-none w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <div
                class="cursor-pointer"
                @click="loadFullAndPlay({ queue: playlist.tracks, pos: i })"
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
                @click="
                  loadFullAndPlay({ queue: playlist.tracks.data, pos: i })
                "
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('player', ['queue']),
    ...mapState('home', ['topTracks', 'topPlaylists', 'selectedPlaylists'])
  },
  async mounted() {
    if (!this.topTracks.length) {
      this.loading = true
      await this.loadSelected()
      this.loading = false
    }
    if (!this.queue.length) {
      this.loadFull({ queue: this.topTracks, pos: 0 })
    }
  },
  methods: {
    ...mapActions('player', ['loadFull', 'loadFullAndPlay']),
    ...mapActions('home', ['loadSelected'])
  }
}
</script>
