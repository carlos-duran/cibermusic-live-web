<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['favorites'])
  },
  mounted() {
    this.$router.push('/biblioteca/' + (this.favorites._id || ''))
  }
}
</script>
