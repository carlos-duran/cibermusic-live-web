<template>
  <div class="bg-gradient text-white h-screen flex">
    <div class="w-full flex-1 flex flex-col">
      <Topnav />

      <div class="w-full flex-1 overflow-y-auto">
        <div class="mx-auto container my-4 md:my-8 p-3 sm:p-4 md:p-8">
          <nuxt />
        </div>
      </div>

      <Player />
    </div>
    <div
      class="fixed inset-0 w-full lg:static lg:max-w-xs xl:max-w-sm"
      :hidden="isSidenavVisible"
    >
      <Sidenav />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultTheme from 'tailwindcss/defaultTheme'
import Topnav from '@/components/internal/Topnav'
import Sidenav from '@/components/internal/Sidenav'
import Player from '@/components/internal/Player'

export default {
  components: {
    Topnav,
    Sidenav,
    Player
  },
  computed: {
    ...mapGetters('layout', ['isSidenavVisible'])
  },
  mounted() {
    this.defineDesktop()
    window.addEventListener('resize', this.defineDesktop)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.defineDesktop)
  },
  methods: {
    defineDesktop() {
      const isDesktop = window.innerWidth >= parseInt(defaultTheme.screens.lg)
      this.$store.commit('layout/setDesktop', isDesktop)
    }
  }
}
</script>

<style lang="postcss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
