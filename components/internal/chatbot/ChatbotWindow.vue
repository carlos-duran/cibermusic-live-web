<template>
  <div class="window max-w-xs w-full fixed bottom-0 right-0 mb-32 mr-6">
    <div class="bg-gray-200 rounded w-full h-full text-black flex flex-col">
      <div class="flex-1 min-h-0 min-w-0 overflow-y-auto p-4">
        <div>
          <div class=""></div>
        </div>
      </div>
      <div class="flex-none">
        <input
          class="h-12 w-full px-2 focus:outline-none"
          placeholder="Say hello!"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // ...
}
</script>

<style>
.window {
  height: 30vh;
}
</style>
