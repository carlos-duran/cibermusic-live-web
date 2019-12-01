import dotenv from 'dotenv'
const env = process.env.NODE_ENV
dotenv.config({ path: '.env' + (env !== 'development' ? `.${env}` : '') })

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'CiberMusic Live!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/logo/profile.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  loadingIndicator: {
    name: 'three-bounce',
    color: 'white',
    background: 'linear-gradient(to left, #02023E, #08C7D6)'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/global' }, { src: '~/plugins/closable' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // PWA
    '@nuxtjs/pwa'
  ],

  env: {
    API_URL: process.env.API_URL
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  pwa: {
    meta: {
      name: 'CiberMusic Live',
      theme_color: '#000',
      lang: 'es'
    },
    manifest: {
      name: 'CiberMusic Live',
      short_name: 'CiberMusic Live',
      lang: 'es',
      background_color: '#000',
      orientation: 'portrait'
    }
  },

  auth: {
    redirect: {
      login: '/welcome',
      logout: '/welcome',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
