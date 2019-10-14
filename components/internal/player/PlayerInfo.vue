<template>
  <div class="flex items-center">
    <div class="flex-none px-2">
      <img
        class="w-12 h-12 bg-black"
        :src="currentTrack ? currentTrack.album.cover_medium : ''"
        alt=""
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
    <div class="hidden sm:block flex-none px-2">
      <button class="focus:outline-none">
        <Icon :name="isLiked ? 'heart' : 'heart-outline'" class="w-8 h-8" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', ['currentTrack']),
    isLiked() {
      return true
    }
  }
}
</script>
