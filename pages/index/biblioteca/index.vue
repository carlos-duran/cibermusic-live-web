<template>
  <div>
    <div class="flex flex-wrap md:justify-between items-center w-full">
      <div class="w-full md:w-auto px-4 text-center md:text-left">
        <h4 class="text-xl md:text-2xl xl:text-3xl">
          Tus Playlists
        </h4>
      </div>
      <div class="w-full md:w-auto px-4">
        <button
          class="block px-4 py-2 bg-primary rounded m-4 mx-auto focus:outline-none"
          @click="showNewPlaylistModal = true"
        >
          Crear playlist
        </button>
      </div>
    </div>

    <div v-for="playlist in playlists" :key="playlist.id">
      <PlaylistItem
        :playlist="playlist"
        :show-play="true"
        :options="[
          {
            text: 'Eliminar playlist',
            action: () => deletePlaylistAction(playlist)
          }
        ]"
        :action="() => $router.push('/biblioteca/' + playlist.id)"
      />
    </div>

    <AppModal :show.sync="showNewPlaylistModal" class="text-center">
      <h3 class="text-xl mb-2">
        Crea tu Playlist
      </h3>
      <p>
        Indica el nombre de tu Playlist
      </p>
      <div class="my-3">
        <input
          v-model="newPlaylist.name"
          class="px-4 h-12 focus:outline-none border rounded"
          @keyup.enter="submitPlaylist"
        />
      </div>
      <div>
        <button
          class="bg-primary text-white py-2 px-4 m-2 rounded focus:outline-none"
          @click="submitPlaylist"
        >
          Crear
        </button>
        <button
          class="bg-gray-600 text-white py-2 px-4 m-2 rounded focus:outline-none"
          @click="showNewPlaylistModal = false"
        >
          Cancelar
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlaylistItem from '~/components/internal/PlaylistItem'
import AppModal from '~/components/internal/AppModal'

export default {
  components: {
    AppModal,
    PlaylistItem
  },
  data() {
    return {
      showNewPlaylistModal: false,
      newPlaylist: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['playlists'])
  },
  mounted() {
    this.loadPlaylists()
  },
  methods: {
    ...mapActions('user', [
      'loadPlaylists',
      'createPlaylist',
      'deletePlaylist'
    ]),
    async submitPlaylist() {
      try {
        const playlist = await this.createPlaylist(this.newPlaylist)
        this.newPlaylist.name = ''
        this.showNewPlaylistModal = false
        this.$router.push('/biblioteca/' + playlist.id)
      } catch (error) {
        this.$notify({
          group: 'main',
          type: 'error',
          title: 'Ocurrió un error.',
          text: 'Inténtalo más tarde'
        })
      }
    },
    async deletePlaylistAction(playlist) {
      try {
        await this.deletePlaylist(playlist.id)
        this.$notify({
          group: 'main',
          title: 'Playlist eliminada'
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
