<template>
  <div class="w-full bg-black-trans p-2 md:p-4">
    <div class="flex items-center justify-between h-10 md:h-12 relative">
      <div class="flex-none px-2 md:px-4">
        <nuxt-link to="/" class="px-2 block">
          <img
            class="block h-6 md:h-8"
            src="/logo/vector/isolated-monochrome-white.svg"
            alt
          />
        </nuxt-link>
      </div>
      <div
        class="px-2 md:px-4 md:max-w-lg md:absolute inset-0 mx-auto flex items-center"
      >
        <Searchbox />
      </div>
      <div class="px-2 md:px-4">
        <button
          type="button"
          class="inline-flex p-2 items-center text-white focus:outline-none"
          @click="$store.commit('layout/toggleSidenav')"
        >
          <svg
            class="fill-current w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbox from './Searchbox'

export default {
  components: {
    Searchbox
  }
}
</script>

<style></style>
