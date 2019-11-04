<template>
  <div
    v-touch:swipe.bottom="collapse"
    class="fixed inset-0 bg-gradient flex flex-col"
  >
    <div class="flex items-center bg-black-trans p-2 sm:p-3">
      <PlayerInfo class="flex-1" />
      <button class="focus:outline-none px-4 sm:px-6 py-2" @click="collapse">
        <icon name="close" class="w-4 h-4" />
      </button>
    </div>
    <div
      class="flex-1 p-4 bg-center bg-cover"
      :style="{ backgroundImage: `url(${currentTrack.album.cover_big})` }"
    ></div>
    <div class="bg-black-trans p-3">
      <PlayerControls expanded />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerInfo from '../player/PlayerInfo'
import PlayerControls from '../player/PlayerControls'

export default {
  components: {
    PlayerInfo,
    PlayerControls
  },
  computed: {
    ...mapGetters('player', ['currentTrack'])
  },
  methods: {
    collapse() {
      this.$emit('collapse')
    }
  }
}
</script>
