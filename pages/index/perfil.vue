<template>
  <form class="items-center flex flex-wrap " @submit.prevent="submit">
    <div class="mb-3 flex flex-wrap items-center md:w-3/6 ml-1">
      <label for="first-name" class="block  mb-1 md:w-4/5 text-center ">
        Nombres
      </label>
      <input
        id="first-name"
        v-model.trim="raw.firstName"
        class="form-input block md:px-2 md:w-4/5 text-center "
        type="text"
        pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
        title="Solo letras"
        required
        :placeholder="user.firstName"
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center md:w-3/6 -mx-10 ml-1">
      <label for="last-name" class="block md:px-0 mb-1 md:w-4/5 text-center">
        Apellidos
      </label>
      <input
        id="last-name"
        v-model.trim="raw.lastName"
        class="form-input md:w-4/5 text-center"
        type="text"
        pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
        title="Solo letras"
        required
        :placeholder="user.lastName"
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center md:w-5/6 ml-1">
      <label for="email" class="block md:px-2 mb-1 md:w-2/6 text-center">
        Correo electrónico
      </label>
      <input
        id="email"
        v-model.trim="raw.email"
        class="form-input md:w-4/6 text-center"
        type="email"
        pattern="[a-zA-Z\d]([\._-]?[a-zA-Z\d])*@[a-zA-Z\d](\.?[a-zA-Z\d])*\.[a-zA-Z]{2,4}"
        title="Ingrese un email válido."
        required
        :placeholder="user.email"
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center md:w-5/6 ml-1">
      <label for="birthdate" class="block md:px-2 mb-1 md:w-2/6  text-center">
        Fecha de nacimiento
      </label>
      <div class="flex  -mx-0 text-center md:w-4/6">
        <div class="w-1/3 px-1">
          <input
            id="birthdate"
            v-model="raw.birthdate.year"
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
            v-model="raw.birthdate.month"
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
            v-model="raw.birthdate.day"
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
    <div class="mb-4 flex flex-wrap items-center md:w-5/6">
      <label for="country" class="block md:px-2 mb-1 md:w-2/6 text-center">
        País
      </label>
      <select
        id="country"
        v-model="raw.country"
        class="form-input md:w-4/6 "
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
          :placeholder="user.country"
        >
          {{ c }}
        </option>
      </select>
    </div>
    <div class="mb-4 md:w-5/6 items-center ml-5">
      <button
        class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline "
      >
        Actualizar Datos
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      year: new Date().getFullYear(),
      raw: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: {
          year: '',
          month: '',
          day: ''
        },
        country: ''
      }
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    lastDay() {
      const { year, month } = this.raw.birthdate
      const date = new Date(year, month, 0)
      return date ? date.getDate() : 31
    },
    birthdate() {
      const month = ('0' + this.raw.birthdate.month).slice(-2)
      const day = ('0' + this.raw.birthdate.day).slice(-2)
      return `${this.raw.birthdate.year}-${month}-${day}`
    }
  },
  async mounted() {
    this.countries = await this.$axios.$get('/countries')
  },
  methods: {
    async submit() {
      try {
        await this.$axios.$put('/perfil', {
          ...this.raw,
          birthdate: this.birthdate
        })
        this.$emit('done', {
          email: this.raw.email
        })
      } catch (e) {
        if (e.response && e.response.status === 400) {
          const { message } = e.response.data
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Error',
            text: message
          })
        } else {
          this.$emit('error')
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
