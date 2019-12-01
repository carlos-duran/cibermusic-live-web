<template>
  <nuxt-child :key="$route.fullPath" />
</template>

<script>
export default {
  layout: 'main',
  middleware: 'auth'
}
</script>
