<template>
  <div
    class="min-h-screen flex justify-center items-center text-white text-center"
  >
    <div class="text-center max-w-md p-6">
      <div class="my-6 md:my-8">
        <img
          class="mx-auto max-w-full"
          width="360"
          height="120"
          src="/logo/vector/default-monochrome.svg"
          alt=""
        />
      </div>
      <p class="text-lg md:text-2xl italic my-8">
        ¡Descubre la mejor música y siente el ritmo sin tener que pagar!
      </p>

      <div class="w-full flex flex-wrap justify-around my-4 md:my-10">
        <nuxt-link
          to="/login"
          class="w-full inline-block sm:w-auto border-2 border-white hover:bg-white hover:text-primary py-3 px-6 m-2 rounded-lg text-xl"
        >
          Iniciar sesión
        </nuxt-link>
        <nuxt-link
          to="/signup"
          class="w-full inline-block sm:w-auto border-2 border-white hover:bg-white hover:text-primary py-3 px-6 m-2 rounded-lg text-xl"
        >
          Regístrate
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest'
}
</script>
