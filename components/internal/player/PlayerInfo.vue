<template>
  <div class="flex items-center relative">
    <div
      v-touch:swipe.top="expand"
      class="md:hidden absolute inset-0"
      @click="expand"
    ></div>
    <div class="flex-none px-2">
      <img
        class="w-12 h-12 bg-black"
        :src="currentTrack ? currentTrack.album.cover_small : ''"
        :alt="currentTrack.album.title"
      />
    </div>
    <div class="overflow-hidden">
      <h5 class="text-base xl:text-lg truncate">
        {{ currentTrack ? currentTrack.title_short : '-' }}
      </h5>
      <h6 class="text-xs text-gray-400 truncate">
        {{ currentTrack ? currentTrack.artist.name : '-' }}
      </h6>
    </div>
    <div v-if="favorites" class="hidden sm:block flex-none px-2">
      <button
        class="focus:outline-none"
        @click="isLiked ? removeFromFavorites() : addToFavorites()"
      >
        <Icon :name="isLiked ? 'heart' : 'heart-outline'" class="w-8 h-8" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', ['currentTrack']),
    ...mapGetters('user', ['favorites']),
    isLiked() {
      return (
        this.favorites &&
        this.favorites.tracks.some((t) => t.id === this.currentTrack.id)
      )
    }
  },
  methods: {
    ...mapActions('user', ['addTrackToPlaylist', 'removeTrackFromPlaylist']),
    expand() {
      this.$emit('expand')
    },
    async addToFavorites() {
      try {
        await this.addTrackToPlaylist({
          playlist: this.favorites.id,
          track: this.currentTrack
        })
        this.$notify({
          group: 'main',
          type: 'success',
          title: 'Canción agregada a favoritos'
        })
      } catch (error) {
        this.$notify({
          group: 'main',
          type: 'error',
          title: 'Ocurrió un error.',
          text: 'Inténtalo más tarde'
        })
      }
    },
    async removeFromFavorites() {
      try {
        await this.removeTrackFromPlaylist({
          playlist: this.favorites.id,
          track: this.currentTrack.id
        })
        this.$notify({
          group: 'main',
          title: 'Canción removida de favoritos'
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
