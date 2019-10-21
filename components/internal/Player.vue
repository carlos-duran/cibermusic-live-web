<template>
  <div
    v-if="$store.state.player.queue.length"
    class="w-full bg-black-trans p-2 sm:p-3 md:p-4"
  >
    <div class="flex items-center justify-between">
      <PlayerInfo class="flex-1" />
      <PlayerControls class="flex-none" />
      <PlayerOptions class="hidden md:block flex-1" />
    </div>
  </div>
</template>

<script>
import PlayerInfo from './player/PlayerInfo'
import PlayerControls from './player/PlayerControls'
import PlayerOptions from './player/PlayerOptions'

export default {
  components: {
    PlayerInfo,
    PlayerControls,
    PlayerOptions
  }
}
</script>
