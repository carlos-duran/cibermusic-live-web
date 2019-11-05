<template>
  <form @submitPlaylist.prevent="submitPlaylist">
    <h3 class="text-xl text-center mb-6 text-grey-700 md:w-2/3 mx-auto">
      Tus Playlists
    </h3>

    <div class="mb-4 flex flex-wrap items-center">
      <label for="playlistName" class="block md:px-2 mb-1 md:w-2/5">
        Nombre
      </label>
      <input
        id="playlistName"
        v-model.trim="raw.playlistID"
        class="form-input md:w-3/5"
        type="text"
        required
      />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      raw: {
        PlaylistID: ''
      }
    }
  },
  methods: {
    async submitPlaylist() {
      try {
        await this.$axios.$post('/playlist', {
          ...this.raw
        })
      } catch (e) {
        if (e.response && e.response.status === 400) {
          const { message } = e.response.data
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Error',
            text: message
          })
        } else {
          this.$emit('error')
        }
      }
    },
    async addSong() {
      try {
        await this.$axios.$post(
          '/playlist',
          {
            ...this.raw
          },
          '/tracks',
          {
            ...this.songs
          }
        )
      } catch (e) {
        if (e.response && e.response.status === 400) {
          const { message } = e.response.data
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Error',
            text: message
          })
        } else {
          this.$emit('error')
        }
      }
    }
  }
}
</script>
