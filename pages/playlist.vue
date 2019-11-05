<template>
  <div class="p-16 text-center text-xl">
    <h4>Tus Playlists</h4>
    <br />
    <form @submit="create">
      <button
        class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline"
      >
        Agregar
      </button>
    </form>
    <nuxt-link to="/" class="underline text-base">Regresar al inicio</nuxt-link>
  </div>
</template>

<script>
export default {}
</script>