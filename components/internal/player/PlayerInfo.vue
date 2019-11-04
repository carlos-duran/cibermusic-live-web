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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', ['currentTrack'])
  },
  methods: {
    expand() {
      this.$emit('expand')
    }
  }
}
</script>
