<template>
  <div class="flex items-center justify-center">
    <button
      class="player-control"
      :class="!expanded && 'hidden sm:block'"
      @click="previous"
    >
      <Icon name="skip-previous" class="w-4 h-4" />
    </button>
    <button class="player-control" @click="playing ? pause() : play()">
      <Icon :name="playing ? 'pause' : 'play'" class="w-5 h-5 md:w-6 md:h-6" />
    </button>
    <button
      class="player-control"
      :class="!expanded && 'hidden sm:block'"
      @click="next"
    >
      <Icon name="skip-next" class="w-4 h-4" />
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    expanded: Boolean
  },
  computed: {
    ...mapState('player', ['playing'])
  },
  methods: {
    ...mapActions('player', ['previous', 'play', 'pause', 'next'])
  }
}
</script>

<style lang="postcss" scoped>
.player-control {
  @apply p-2 mx-2 text-white border border-white rounded-full;
}

.player-control:focus {
  @apply outline-none shadow-outline;
}
</style>
