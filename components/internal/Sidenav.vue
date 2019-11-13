<template>
  <div class="bg-black lg:bg-black-trans-dark h-full flex flex-col relative">
    <div class="absolute p-2 md:p-4 top-0 right-0">
      <div class="lg:hidden h-10 md:h-12 flex items-center">
        <div class="px-2 md:px-4">
          <button
            type="button"
            class="flex p-2 items-center focus:outline-none"
            @click="$store.commit('layout/toggleSidenav')"
          >
            <icon name="close" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div class="my-auto px-4">
      <div
        class="mt-8 mb-8 md:mb-32 rounded-full w-32 h-32 mx-auto bg-white text-black flex items-center justify-center"
      >
        <icon name="account" class="w-24 h-24" />
      </div>

      <div
        class="w-full max-w-sm mx-auto text-center text-xl py-3 my-3 md:my-6 overflow-y-auto border-t border-b border-white"
      >
        <nuxt-link to="/perfil" class="block p-4">Editar Perfil</nuxt-link>
        <nuxt-link to="/biblioteca" class="block p-4">Biblioteca</nuxt-link>
        <nuxt-link to="/favoritos" class="block p-4">Favoritos</nuxt-link>
        <nuxt-link to="/terminos" class="block p-4">
          Términos y Condiciones
        </nuxt-link>
      </div>

      <button
        class="block px-4 py-2 bg-red-500 rounded mt-6 mb-8 md:mb-32 mx-auto focus:outline-none"
        @click="$auth.logout('local')"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // ...
}
</script>
