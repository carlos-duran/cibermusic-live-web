<template>
  <div class="flex flex-wrap md:justify-between w-full -mx-4">
    <div class="w-full md:w-auto px-4">
      <h4 class="text-xl md:text-2xl xl:text-3xl mb-2 md:mb-4">
        Tus Playlists
      </h4>
    </div>
    <div class="w-full md:w-auto px-4">
      <button
        class="block px-4 py-2 bg-primary rounded mt-6 mb-8 md:mb-32 mx-auto focus:outline-none"
        @click="createPlaylist"
      >
        Crear playlist
      </button>
    </div>
  </div>
</template>

<script>
// import PlaylistItem from '~/components/internal/PlaylistItem'

export default {
  components: {
    // PlaylistItem
  },
  methods: {
    createPlaylist() {
      // ..
    },
    loadPlaylists() {
      this.$axios.$get('/user/playlists')
    }
  }
}
</script>
