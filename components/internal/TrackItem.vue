<template>
  <div class="group flex items-center hover:bg-black-trans py-2 md:py-3 px-2">
    <div class="min-w-0 w-full flex-1 flex items-center">
      <div class="flex-none">
        <img
          class="group-hover:hidden w-10 h-10"
          :class="{ hidden: isCurrentPlaying }"
          :src="track.album.cover_medium"
          :alt="track.album.title"
        />
        <button
          class=" group-hover:flex w-10 h-10 justify-center items-center text-black bg-white rounded-full focus:outline-none"
          :class="isCurrentPlaying ? 'flex' : 'hidden'"
          @click="thumbAction"
        >
          <icon :name="isCurrentPlaying ? 'pause' : 'play'" class="w-6 h-6" />
        </button>
      </div>
      <div
        class="truncate px-2 flex-1 min-w-0 truncate"
        :class="{
          'font-bold': currentTrack && currentTrack.id === track.id
        }"
      >
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
      <div
        v-closable="{
          handler: 'onClickOutsideOptions',
          exclude: []
        }"
        class="relative"
      >
        <button class="p-1 focus:outline-none" @click="showOptions = true">
          <Icon name="dots-vertical" class="w-6 h-6" />
        </button>
        <div
          v-if="showOptions"
          class="w-48 absolute top-0 right-0 bg-black-trans-dark text-white"
        >
          <div
            v-for="(option, i) in options"
            :key="i"
            class="p-2 cursor-pointer"
            @click="doOptionAction(option)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  filters: {
    toTime(duration) {
      return parseInt(duration / 60) + ':' + ('0' + (duration % 60)).slice(-2)
    }
  },
  props: {
    tracks: {
      type: Array,
      default: () => []
    },
    pos: {
      type: Number,
      default: -1
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showOptions: false
    }
  },
  computed: {
    ...mapState('player', ['playing']),
    ...mapGetters('player', ['currentTrack']),
    track() {
      return this.tracks.length && this.tracks[this.pos]
    },
    isCurrent() {
      return this.currentTrack && this.currentTrack.id === this.track.id
    },
    isCurrentPlaying() {
      return this.isCurrent && this.playing
    }
  },
  methods: {
    ...mapActions('player', ['loadFullAndPlay', 'play', 'pause']),
    thumbAction() {
      if (this.isCurrentPlaying) {
        this.pause()
      } else if (this.isCurrent) {
        this.play()
      } else {
        this.loadFullAndPlay({ queue: this.tracks, pos: this.pos })
      }
    },
    onClickOutsideOptions() {
      this.showOptions = false
    },
    doOptionAction(option) {
      option.action()
      this.showOptions = false
    }
  }
}
</script>
