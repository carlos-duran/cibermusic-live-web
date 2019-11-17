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
import { mapState } from 'vuex'
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

<style lang="postcss" scoped>
.player-progress {
  background-color: lightslategrey;
  cursor: pointer;
  height: 2px;
  min-width: 100%;
  position: relative;

  .player-seeker {
    background-color: green;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
  }
}
</style>
