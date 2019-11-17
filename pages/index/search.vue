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
        />
      </div>
      <div v-else class="py-10 px-4 text-center max-w-md mx-auto">
        No pudimos encontrar resultados para tu búsqueda, pero te invitamos a
        encontrar otras canciones para que sigas disfrutando.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TrackItem from '~/components/internal/TrackItem'

export default {
  key: (to) => to.fullPath,
  components: {
    TrackItem
  },
  data() {
    return {
      searching: true,
      results: null
    }
  },
  computed: {
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
    ...mapActions('player', ['loadFullAndPlay', 'pause'])
  }
}
</script>
