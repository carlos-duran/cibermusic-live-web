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
      <SignupForm v-if="!credentials" @done="credentials = $event" />
      <div v-else class="text-center text-grey-700">
        <h3 class="text-xl mb-6 md:w-2/3 mx-auto">
          ¡Felicidades!
        </h3>
        <p class="mb-6">
          Se registró tu cuenta con éxito! Ahora puedes disfrutar de toda
          nuestra música y artistas!
        </p>
        <button class="py-2 px-6 bg-primary text-white rounded-lg">
          Ir al inicio
        </button>
      </div>
    </div>

    <div class="text-center my-3 text-white underline">
      <nuxt-link v-if="!credentials" to="/">Regresar</nuxt-link>
    </div>
  </div>
</template>

<script>
import SignupForm from '~/components/external/SignupForm'

export default {
  components: {
    SignupForm
  },
  data() {
    return {
      credentials: false
    }
  },
  methods: {
    goHome() {
      this.$auth.loginWith('local', { data: this.credentials })
    }
  }
}
</script>
