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
          @click="loadFullAndPlay({ queue: playlist.tracks, pos: 0 })"
        >
          Reproducir
        </button>
      </div>
    </div>

    <TrackItem
      v-for="(track, i) in playlist.tracks"
      :key="track.id"
      :tracks="playlist.tracks"
      :pos="i"
      :options="[
        {
          text: 'Remover de la playlist',
          action: () => removeTrack(track)
        }
      ]"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TrackItem from '~/components/internal/TrackItem'

export default {
  components: {
    TrackItem
  },
  computed: {
    ...mapState('user', ['playlists']),
    playlist() {
      return this.playlists.find((p) => p.id === this.$route.params.playlist)
    }
  },
  methods: {
    ...mapActions('player', ['loadFullAndPlay']),
    ...mapActions('user', ['removeTrackFromPlaylist']),
    async removeTrack(track) {
      try {
        await this.removeTrackFromPlaylist({
          playlist: this.playlist.id,
          track: track._id
        })
        this.$notify({
          group: 'main',
          title: 'Canción removida'
        })
      } catch (error) {
        this.$notify({
          group: 'main',
          type: 'error',
          title: 'Ocurrió un error.',
          text: 'Inténtalo más tarde'
        })
      }
    }
  }
}
</script>
