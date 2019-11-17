<template>
  <div>
    <div class="player-progress" title="Time played : Total time" @click="seek">
      <div
        :style="{ width: this.percentComplete + '%' }"
        class="player-seeker"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('player', ['playing'])
  },
  methods: {
    seek(e) {
      if (!this.playing || e.target.tagName === 'SPAN') {
        return
      }
      const el = e.target.getBoundingClientRect()
      const seekPos = (e.clientX - el.left) / el.width

      this.audio.currentTime = parseInt(this.audio.duration * seekPos)
    }
  }
}
</script>
