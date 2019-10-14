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
        v-model="raw.firstName"
        class="form-input md:w-3/5"
        type="text"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="last-name" class="block md:px-2 mb-1 md:w-2/5">
        Apellidos
      </label>
      <input
        id="last-name"
        v-model="raw.lastName"
        class="form-input md:w-3/5"
        type="text"
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="email" class="block md:px-2 mb-1 md:w-2/5">
        Correo electrónico
      </label>
      <input
        id="email"
        v-model="raw.email"
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
        required
      />
    </div>
    <div class="mb-4 flex flex-wrap items-center">
      <label for="repeat-password" class="block md:px-2 mb-1 md:w-2/5">
        Confirma tu contraseña
      </label>
      <input
        id="repeat-password"
        :pattern="raw.password"
        class="form-input md:w-3/5"
        type="password"
        title="La contraseña debe ser igual"
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
            class="form-input"
            placeholder="Año"
            pattern="(19|20)\d{2}"
            title="Digite el año en 4 dígitos"
            maxlength="4"
            required
          />
        </div>
        <div class="w-1/3 px-1">
          <input
            id="motnh"
            v-model="raw.birthdate.month"
            class="form-input"
            placeholder="Mes"
            pattern="\d{1,2}"
            title="Número de mes"
            maxlength="2"
            required
          />
        </div>
        <div class="w-1/3 px-1">
          <input
            id="day"
            v-model="raw.birthdate.day"
            class="form-input"
            placeholder="Día"
            pattern="\d{1,2}"
            title="Solo dígitos"
            maxlength="2"
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

export default {
  data() {
    return {
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
          const { message } = e.response.data
          const attr = message.match(/{([^}]+)}/)
          if (attr && attr[1]) {
            alert(message.replace(`{${attr}}`, attrs[attr]))
          } else {
            alert(message)
          }
        } else {
          this.$emit('error')
        }
      }
    }
  }
}
</script>
