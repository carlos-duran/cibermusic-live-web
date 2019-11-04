<template>
  <div
    v-if="$store.state.player.queue.length"
    class="w-full bg-black-trans p-2 sm:p-3 md:p-4"
  >
    <div class="flex items-center justify-between">
      <PlayerInfo class="flex-1" @expand="isPlayerMobileVisible = true" />
      <PlayerControls class="flex-none" />
      <PlayerOptions class="hidden md:block flex-1" />
    </div>
    <transition name="expand">
      <PlayerMobile
        v-if="isPlayerMobileVisible"
        @collapse="isPlayerMobileVisible = false"
      />
    </transition>
  </div>
</template>

<script>
import PlayerInfo from './player/PlayerInfo'
import PlayerControls from './player/PlayerControls'
import PlayerOptions from './player/PlayerOptions'
import PlayerMobile from './player/PlayerMobile'

export default {
  components: {
    PlayerInfo,
    PlayerControls,
    PlayerOptions,
    PlayerMobile
  },
  data() {
    return {
      isPlayerMobileVisible: false
    }
  }
}
</script>

<style scoped>
.expand-enter-active {
  transition: all 0.5s ease;
}
.expand-leave-active {
  transition: all 0.5s ease;
}
.expand-enter,
.expand-leave-to {
  transform: translateY(100vh);
  opacity: 0;
}
</style>
