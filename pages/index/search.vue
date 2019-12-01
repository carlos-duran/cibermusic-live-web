<template>
  <div>
    <div v-if="searching">
      <h3 class="text-xl mb-4">
        Buscando...
      </h3>
    </div>
    <div v-else>
      <h3 class="text-lg md:text-xl mb-4 text-center">
        Resultados de búsqueda para
        <br />
        "{{ $route.query.q }}"
      </h3>
      <div v-if="results">
        <TrackItem
          v-for="(track, i) in results.data"
          :key="track.id"
          :tracks="results.data"
          :pos="i"
          :options="[
            {
              text: 'Agregar a la playlist',
              action: () => openAddToPlaylistModal(results.data[i])
            }
          ]"
        />
      </div>
      <div v-else class="py-10 px-4 text-center max-w-md mx-auto">
        No pudimos encontrar resultados para tu búsqueda, pero te invitamos a
        encontrar otras canciones para que sigas disfrutando.
      </div>
    </div>

    <AppModal
      :show.sync="showAddToPlaylistModal"
      content-class="bg-gray-900 text-white rounded"
    >
      <div class="flex flex-wrap md:justify-between items-center w-full">
        <div class="w-full md:w-auto p-4 text-center md:text-left">
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
          :action="() => addTrackAction(playlist)"
        />
      </div>
    </AppModal>

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
import { mapActions, mapGetters, mapState } from 'vuex'
import TrackItem from '~/components/internal/TrackItem'
import PlaylistItem from '~/components/internal/PlaylistItem'
import AppModal from '~/components/internal/AppModal'

export default {
  key: (to) => to.fullPath,
  components: {
    AppModal,
    TrackItem,
    PlaylistItem
  },
  data() {
    return {
      searching: true,
      results: null,
      showAddToPlaylistModal: false,
      selectedTrack: null,
      showNewPlaylistModal: false,
      newPlaylist: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['playlists']),
    ...mapGetters('player', ['currentTrack'])
  },
  watchQuery: ['q'],
  async mounted() {
    if (this.$route.query.q) {
      this.searching = true
      this.results = await this.$axios.$get('/search?q=' + this.$route.query.q)
      this.searching = false
    }
  },
  methods: {
    ...mapActions('player', ['loadFullAndPlay', 'pause']),
    ...mapActions('user', ['addTrackToPlaylist']),
    openAddToPlaylistModal(selectedTrack) {
      this.selectedTrack = selectedTrack
      this.showAddToPlaylistModal = true
    },
    ...mapActions('user', ['createPlaylist']),
    async submitPlaylist() {
      try {
        await this.createPlaylist(this.newPlaylist)
        this.newPlaylist.name = ''
        this.showNewPlaylistModal = false
      } catch (error) {
        this.$notify({
          group: 'main',
          type: 'error',
          title: 'Ocurrió un error.',
          text: 'Inténtalo más tarde'
        })
      }
    },
    async addTrackAction(playlist) {
      try {
        await this.addTrackToPlaylist({
          playlist: playlist.id,
          track: this.selectedTrack
        })
        this.showAddToPlaylistModal = false
        this.$notify({
          group: 'main',
          title: 'Canción agregada'
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
