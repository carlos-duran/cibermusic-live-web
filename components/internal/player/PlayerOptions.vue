<template>
  <div>
    <div class="flex justify-end items-center text-gray-200">
      <button class="player-option mx-1">
        <Icon name="playlist-play" class="w-5 h-5" />
      </button>
      <button class="player-option mx-1">
        <Icon name="volume-high" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // ..
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
