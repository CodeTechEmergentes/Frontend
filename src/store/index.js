import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import NewAppointmentStore from '@/safetech/views/new-appointment/new-appointment.store'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    NewAppointmentStore,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
