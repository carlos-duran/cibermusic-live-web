<template>
  <div class="min-h-full flex flex-col justify-center items-center p-3">
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
            v-model="email"
            class="form-input form-input-lg"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div class="mb-4">
          <input
            id="password"
            v-model="password"
            class="form-input form-input-lg"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div>
          <button
            class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline"
          >
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
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (error) {
        this.$notify({
          group: 'auth',
          type: 'error',
          title: 'Error',
          text: 'Usuario o contraseña inválidos'
        })
      }
    }
  }
}
</script>

<style></style>
