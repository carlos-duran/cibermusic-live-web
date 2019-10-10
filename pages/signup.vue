<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-3">
    <div class="my-4 p-3">
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
    <div class="w-full max-w-xl bg-white px-4 py-8 md:px-8 rounded-lg">
      <form @submit="submit">
        <h3 class="text-xl text-center mb-6 text-grey-700 md:w-2/3 mx-auto">
          ¡Regístrate y conecta con nuestra variedad de artistas!
        </h3>

        <div class="mb-4 flex flex-wrap items-center">
          <label for="first-name" class="block px-2 mb-1 md:w-2/5">
            Nombres
          </label>
          <input
            id="first-name"
            class="form-input md:w-3/5"
            type="text"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="last-name" class="block px-2 mb-1 md:w-2/5">
            Apellidos
          </label>
          <input
            id="last-name"
            class="form-input md:w-3/5"
            type="text"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="email" class="block px-2 mb-1 md:w-2/5">
            Correo electrónico
          </label>
          <input id="email" class="form-input md:w-3/5" type="email" required />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="password" class="block px-2 mb-1 md:w-2/5">
            Contraseña
          </label>
          <input
            id="password"
            class="form-input md:w-3/5"
            type="password"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="repeat-password" class="block px-2 mb-1 md:w-2/5">
            Confirma tu contraseña
          </label>
          <input
            id="repeat-password"
            class="form-input md:w-3/5"
            type="password"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="birthdate" class="block px-2 mb-1 md:w-2/5">
            Fecha de nacimiento
          </label>
          <input
            id="birthdate"
            class="form-input md:w-3/5"
            type="date"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center">
          <label for="country" class="block px-2 mb-1 md:w-2/5">
            País
          </label>
          <select id="country" class="form-input md:w-3/5" required>
            <option value selected disabled>Selecciona tu país</option>
            <option value="Perú">Perú</option>
          </select>
        </div>
        <div class="mb-4">
          <button class="p-2 w-full bg-primary text-white rounded-lg">
            Registrarse
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
    async submit() {
      // Do your stuff
    }
  }
}
</script>

<style></style>
