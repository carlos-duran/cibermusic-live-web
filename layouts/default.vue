<template>
  <div class="h-full relative">
    <div class="absolute inset-0 overflow-hidden">
      <div class="sliding-background relative">
        <div class="bg-black-trans absolute inset-0"></div>
      </div>
    </div>
    <div class="relative h-full overflow-auto">
      <nuxt />
    </div>
    <notifications group="auth" position="top center" />
  </div>
</template>

<style lang="postcss" scoped>
.sliding-background {
  background: url('https://placehold.it/250x250/056593') repeat;
  height: 100%;
  width: 200%;
  animation: slide 6s linear infinite;
}

@keyframes slide {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-250px, 0, 0);
  }
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
