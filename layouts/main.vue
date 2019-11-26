<template>
  <div class="bg-gradient text-white h-full flex w-full">
    <div class="min-w-0 flex-1 flex flex-col">
      <Topnav />

      <transition name="page" mode="out-in">
        <div
          :key="$route.path"
          class="min-w-0 flex-1 overflow-y-auto overscroll-none"
        >
          <div class="mx-auto container my-4 md:my-8 p-3 sm:p-4 md:p-8">
            <nuxt />
          </div>
        </div>
      </transition>

      <Player />
    </div>
    <div
      class="fixed inset-0 w-full lg:static lg:max-w-xs xl:max-w-sm"
      :hidden="isSidenavVisible"
    >
      <Sidenav />
    </div>
    <Chatbot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultTheme from 'tailwindcss/defaultTheme'
import Topnav from '@/components/internal/Topnav'
import Sidenav from '@/components/internal/Sidenav'
import Player from '@/components/internal/Player'
import Chatbot from '@/components/internal/Chatbot'

export default {
  components: {
    Topnav,
    Sidenav,
    Player,
    Chatbot
  },
  computed: {
    ...mapGetters('layout', ['isSidenavVisible'])
  },
  watch: {
    '$route.path'() {
      this.$store.commit('layout/setSidenavMobile', false)
    }
  },
  mounted() {
    this.$store.dispatch('user/loadPlaylists')
    this.$store.dispatch('chatbot/connect')
    this.defineDesktop()
    window.addEventListener('resize', this.defineDesktop)
  },
  beforeDestroy() {
    this.$store.dispatch('chatbot/disconnect')
    window.removeEventListener('resize', this.defineDesktop)
    this.$store.dispatch('player/pause')
  },
  methods: {
    defineDesktop() {
      const isDesktop = window.innerWidth >= parseInt(defaultTheme.screens.lg)
      this.$store.commit('layout/setDesktop', isDesktop)
    }
  }
}
</script>

<style lang="postcss">
body {
  overscroll-behavior: none;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
