import Vue from 'vue'
import Notifications from 'vue-notification'
import Vue2TouchEvents from 'vue2-touch-events'
import Icon from '~/components/Icon'

Vue.use(Notifications)
Vue.use(Vue2TouchEvents)
Vue.component('Icon', Icon)
