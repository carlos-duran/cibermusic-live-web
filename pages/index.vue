<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'main',
  middleware: 'auth'
}
</script>
