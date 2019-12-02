<template>
  <div class="relative w-full">
    <input
      v-model.trim="q"
      type="search"
      class="form-input md:form-input-lg opacity-75 focus:opacity-100 pl-10 md:pl-10"
      placeholder="Buscar..."
      @keyup.enter="submit"
    />
    <div
      class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center"
    >
      <svg
        class="fill-current pointer-events-none text-gray-600 w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: this.$route.query.q
    }
  },
  methods: {
    submit() {
      if (!this.q) {
        return
      }
      this.$router.push({ path: '/search', query: { q: this.q } })
    }
  }
}
</script>
