<template>
  <div>
    <div class="flex justify-end items-center text-gray-200">
      <!-- <button class="player-option mx-1">
        <Icon name="playlist-play" class="w-5 h-5" />
      </button> -->
      <button class="player-option mx-1" @click="setMuted(!muted)">
        <Icon :name="muted ? 'volume-off' : 'volume-high'" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('player', ['muted'])
  },
  methods: {
    ...mapMutations('player', ['setMuted'])
  }
}
</script>

<style lang="postcss" scoped>
.player-option {
  @apply rounded-full p-2;
}

.player-option:focus {
  @apply outline-none;
}
</style>
