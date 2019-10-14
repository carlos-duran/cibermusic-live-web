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
        <div
          v-for="(track, i) in results.data"
          :key="track.id"
          class="flex items-center hover:bg-black-trans py-2 md:py-3 px-1 md:px-2"
        >
          <div
            class="min-w-0 flex-1 flex items-center cursor-pointer"
            @click="loadFullAndPlay({ queue: results.data, pos: i })"
          >
            <div class="flex-none px-2">
              <img class="w-10 h-10" :src="track.album.cover_medium" alt="" />
            </div>
            <div class="truncate px-2 flex-1 min-w-0 truncate">
              <p class="text-base xl:text-lg truncate">
                {{ track.title }}
              </p>
              <p class="text-sm text-gray-400 truncate">
                {{ track.artist.name }}
              </p>
            </div>
          </div>
          <div class="flex-none ml-auto flex items-center">
            <p class="px-1">{{ track.duration | toTime }}</p>
            <button class="p-1 focus:outline-none">
              <Icon name="dots-vertical" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div v-else class="py-10 px-4 text-center max-w-md mx-auto">
        No pudimos encontrar resultados para tu búsqueda, pero te invitamos a
        encontrar otras canciones para que sigas disfrutando.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'main',
  middleware: 'auth',
  key: (to) => to.fullPath,
  filters: {
    toTime(duration) {
      return parseInt(duration / 60) + ':' + ('0' + (duration % 60)).slice(-2)
    }
  },
  data() {
    return {
      searching: true,
      results: null
    }
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
    ...mapActions('player', ['loadFullAndPlay'])
  }
}
</script>
