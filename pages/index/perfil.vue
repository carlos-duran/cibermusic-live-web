<template>
  <div>
    <h1 class="text-2xl md:text-4xl mb-6">Perfil</h1>

    <div class="md:columns-2">
      <h4 class="text-lg md:text-2xl font-bold">Nombres</h4>
      <p class="text-lg md:text-xl mb-6">{{ user.firstName }}</p>

      <h4 class="text-lg md:text-2xl font-bold">Apellidos</h4>
      <p class="text-lg md:text-xl mb-6">{{ user.lastName }}</p>

      <h4 class="text-lg md:text-2xl font-bold">Correo electrónico</h4>
      <p class="text-lg md:text-xl mb-6">{{ user.email }}</p>

      <h4 class="text-lg md:text-2xl font-bold">Fecha de nacimiento</h4>
      <p class="text-lg md:text-xl mb-6">{{ user.birthdate }}</p>

      <h4 class="text-lg md:text-2xl font-bold">País</h4>
      <p class="text-lg md:text-xl mb-6">{{ user.country }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    }
  }
}
</script>

<style lang="postcss">
@responsive {
  .columns-2 {
    columns: 2;
  }
}
</style>
