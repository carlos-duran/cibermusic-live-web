<template>
  <div class="min-h-full flex flex-col justify-center items-center p-3">
    <form @submit.prevent="submit">
      <h3 class="text-xl text-center mb-10 text-grey-700 md:w-full mx-auto">
        ¿Quieres eliminar tu cuenta?
      </h3>
      <div class="mb-5 flex flex-wrap items-center w-full">
        <label
          for="password"
          class="block md:px-2 mb-2 md:w-full md:text-center text-l"
        >
          Ingrese Contraseña
        </label>
        <input
          id="password"
          v-model="password"
          class="form-input form-input-lg"
          type="password"
          placeholder="Contraseña"
          required
        />
      </div>
      <div class="mb-20">
        <button
          class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline "
        >
          ¡Eliminar ahora !
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userdate: [],
      password: ''
    }
  },
  computed: {
    ...mapState('perfil', ['perfil']),
    user() {
      return this.$auth.user
    }
  },
  async mounted() {
    this.userdate = await this.$axios.$get('/user')
  },
  methods: {
    goHome() {
      return this.$auth.redirect('/')
    },
    async submit() {
      try {
        await this.$axios.$put('/user/down', {
          password: this.password
        })
        this.$emit('done')
        this.$auth.logout('local')
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.$notify({
            group: 'main',
            type: 'error',
            title: 'Error',
            text: 'Contraseña invalida'
          })
        } else {
          const { message } = e.response.data
          this.$notify({
            group: 'main',
            type: 'error',
            title: 'Error',
            text: message
          })
        }
      }
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
