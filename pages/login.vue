<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-3">
    <div class="my-4 md:my-8 p-3">
      <nuxt-link to="/">
        <img
          class="mx-auto max-w-full"
          width="300"
          height="97"
          src="/logo/vector/default-monochrome.svg"
          alt=""
        />
      </nuxt-link>
    </div>
    <div class="w-full max-w-md bg-white px-4 py-8 md:px-8 rounded-lg">
      <form @submit.prevent="submit">
        <div class="mb-4">
          <input
            id="email"
            class="form-input"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div class="mb-4">
          <input
            id="password"
            class="form-input"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div>
          <button class="p-2 w-full bg-primary text-white rounded-lg">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>

    <div class="text-center my-3 text-white underline">
      <nuxt-link to="/">Regresar</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    submit() {
      // Do your stuff
      this.$router.push('/home')
    }
  }
}
</script>

<style></style>
