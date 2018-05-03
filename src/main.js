// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import('../node_modules/vuetify/dist/vuetify.min.css')

export const SocketInstance = socketio('http://localhost:8081')

Vue.use(VueSocketIO, SocketInstance)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
