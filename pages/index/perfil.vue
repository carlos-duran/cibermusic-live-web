<template>
  <div>
    <div
      class="md:w-4/5 w-full flex flex-col justify-center items-center md:p-3 mx-auto "
    >
      <form v-if="!estado" class="w-full " @submit.prevent="submit">
        <div class="mb-4 flex flex-wrap items-center  mx-auto md:w-3/5 w-full">
          <label for="first-name" class="block md:px-2  mb-1 w-1/3">
            Nombres
          </label>
          <input
            id="first-name"
            v-model.trim="userdate.firstName"
            class="form-input w-2/3"
            type="text"
            pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
            title="Solo letras"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center  mx-auto md:w-3/5 w-full">
          <label for="last-name" class="block md:px-2 mb-1 w-1/3">
            Apellidos
          </label>
          <input
            id="last-name"
            v-model.trim="userdate.lastName"
            class="form-input w-2/3"
            type="text"
            pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
            title="Solo letras"
            required
          />
        </div>
        <div class="mb-4 flex flex-wrap items-center  mx-auto md:w-3/5 w-full">
          <label for="birthdate" class="block md:px-2 mb-1 w-1/3">
            Fecha de nacimiento
          </label>
          <div class="flex w-2/3 ">
            <div class="w-1/3 px-1">
              <input
                id="birthdate"
                v-model="fecha.year"
                type="number"
                class="form-input text-center"
                placeholder="Año"
                :min="year - 100"
                :max="year - 18"
                required
              />
            </div>
            <div class="w-1/3 px-1 ">
              <input
                id="month"
                v-model="fecha.month"
                type="number"
                class="form-input text-center"
                placeholder="Mes"
                min="1"
                max="12"
                required
              />
            </div>
            <div class="w-1/3 px-1 ">
              <input
                id="day"
                v-model="fecha.day"
                type="number"
                class="form-input text-center"
                placeholder="Día"
                min="1"
                :max="lastDay"
                required
              />
            </div>
          </div>
        </div>
        <div class="mb-4 flex flex-wrap items-center  mx-auto md:w-3/5 w-full">
          <label for="country" class="block md:px-2 mb-1 w-1/3">
            País
          </label>
          <select
            id="country"
            v-model="userdate.country"
            class="form-input w-2/3"
            required
          >
            <option value selected disabled>
              Selecciona tu país
            </option>
            <option
              v-for="c in countries"
              :key="c"
              class="text-center"
              :value="c"
            >
              {{ c }}
            </option>
          </select>
        </div>
        <div class="pb-20 mx-auto md:w-3/5 w-full">
          <button
            class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline md:mb-20 "
          >
            Actualizar Datos
          </button>
        </div>
        <div class="pt-10 md:pt-10  mx-auto md:w-3/5 w-full ">
          <nuxt-link
            to="/eliminar"
            class="block w-full bg-red-600 p-2 md:px-20 rounded-lg text-lg md:text-xl md:mt-20  mt-5 text-center"
          >
            Dar de baja mi Cuenta
          </nuxt-link>
        </div>
      </form>
      <div class="mb-4 flex flex-wrap items-center w-3/5"></div>
    </div>
    <div v-if="estado" class="text-center text-grey-700">
      <h3 class="text-xl mb-6 md:w-2/3 mx-auto">
        ¡Se Actualizaron los datos !
      </h3>
      <nuxt-link
        to="/"
        class="w-full inline-block sm:w-auto border-2 border-white hover:bg-white hover:text-primary py-2 px-2 md:px-6 m-2 rounded-lg text-lg md:text-xl"
      >
        Volver a Inicio
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      estado: false,
      countries: [],
      userdate: [],
      fecha: {
        year: '',
        month: '',
        day: ''
      },
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState('perfil', ['perfil']),
    user() {
      return this.$auth.user
    },
    lastDay() {
      const { year, month } = this.fecha
      const date = new Date(year, month, 0)
      return date ? date.getDate() : 31
    },
    fechaArreglo() {
      const user = this.userdate.birthdate
      const listfecha = user.split('-')
      return listfecha
    },
    birthdate() {
      const month = ('0' + this.fecha.month).slice(-2)
      const day = ('0' + this.fecha.day).slice(-2)
      return `${this.fecha.year}-${month}-${day}`
    }
  },
  async mounted() {
    this.countries = await this.$axios.$get('/countries')
    this.userdate = await this.$axios.$get('/user')
    this.fecha.year = await this.fechaArreglo[0]
    this.fecha.month = await this.fechaArreglo[1]
    this.fecha.day = await this.fechaArreglo[2]
  },
  methods: {
    goHome() {
      return this.$auth.redirect('/')
    },
    async submit() {
      try {
        await this.$axios.$put('/user', {
          ...this.userdate,
          birthdate: this.birthdate
        })
        this.$emit('done', {
          email: this.userdate.email
        })
        this.estado = !this.estado
      } catch (e) {
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
</script>

<style lang="postcss">
@responsive {
  .columns-2 {
    columns: 2;
  }
}
</style>
