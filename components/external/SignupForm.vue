<template>
  <form @submit.prevent="submit">
    <h3 class="text-xl text-center mb-6 text-grey-700 md:w-2/3 mx-auto">
      ¡Regístrate y conecta con nuestra variedad de artistas!
    </h3>

    <div class="mb-4 flex flex-wrap items-center">
      <label for="first-name" class="block md:px-2 mb-1 md:w-2/5">
        Nombres
      </label>
      <input
        id="first-name"
        v-model.trim="raw.firstName"
        class="form-input md:w-3/5"
        type="text"
        pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
        title="Solo letras"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="last-name" class="block md:px-2 mb-1 md:w-2/5">
        Apellidos
      </label>
      <input
        id="last-name"
        v-model.trim="raw.lastName"
        class="form-input md:w-3/5"
        type="text"
        pattern="[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ ]{2,}"
        title="Solo letras"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="email" class="block md:px-2 mb-1 md:w-2/5">
        Correo electrónico
      </label>
      <input
        id="email"
        v-model.trim="raw.email"
        class="form-input md:w-3/5"
        type="email"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="password" class="block md:px-2 mb-1 md:w-2/5">
        Contraseña
      </label>
      <input
        id="password"
        v-model="raw.password"
        class="form-input md:w-3/5"
        type="password"
        minlength="8"
        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*"
        title="La contraseña debe contener al menos 1 letra minúscula, 1 mayúscula y 1 número."
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="repeat-password" class="block md:px-2 mb-1 md:w-2/5">
        Confirma tu contraseña
      </label>
      <input
        id="repeat-password"
        class="form-input md:w-3/5"
        type="password"
        :pattern="raw.password"
        title="La contraseña debe ser igual"
        minlength="8"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="birthdate" class="block md:px-2 mb-1 md:w-2/5">
        Fecha de nacimiento
      </label>
      <div class="flex md:w-3/5 -mx-1">
        <div class="w-1/3 px-1">
          <input
            id="birthdate"
            v-model="raw.birthdate.year"
            type="number"
            class="form-input"
            placeholder="Año"
            :min="year - 100"
            :max="year - 18"
            required
          />
        </div>
        <div class="w-1/3 px-1">
          <input
            id="month"
            v-model="raw.birthdate.month"
            type="number"
            class="form-input"
            placeholder="Mes"
            min="1"
            max="12"
            required
          />
        </div>
        <div class="w-1/3 px-1">
          <input
            id="day"
            v-model="raw.birthdate.day"
            type="number"
            class="form-input"
            placeholder="Día"
            min="1"
            :max="lastDay"
            required
          />
        </div>
      </div>
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="country" class="block md:px-2 mb-1 md:w-2/5">
        País
      </label>
      <select
        id="country"
        v-model="raw.country"
        class="form-input md:w-3/5"
        required
      >
        <option value selected disabled>Selecciona tu país</option>
        <option value="Perú">Perú</option>
      </select>
    </div>
    <div class="mb-4">
      <button
        class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline"
      >
        Registrarse
      </button>
    </div>
  </form>
</template>

<script>
const attrs = {
  birthdate: 'Fecha de cumpleaños',
  email: 'Correo electrónico'
}

const formats = {
  date: 'fecha'
}

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      raw: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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
  methods: {
    async submit() {
      try {
        await this.$axios.$post('/signup', {
          ...this.raw,
          birthdate: this.birthdate
        })
        this.$emit('done', {
          email: this.raw.email,
          password: this.raw.password
        })
      } catch (e) {
        if (e.response && e.response.data.statusCode === 400) {
          let { message } = e.response.data

          const matchAttr = message.match(/{([^}]+)}/)
          const attr = matchAttr && matchAttr[1]
          if (attr) {
            message = message.replace(`{${attr}}`, attrs[attr])
            const matchFormat = message.match(/"([^"]+)"/)
            const format = matchFormat && matchFormat[1]
            if (format) {
              message = message.replace(`"${format}"`, formats[format])
            }
          }

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
