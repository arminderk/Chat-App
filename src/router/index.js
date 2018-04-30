import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Messages from '../components/Messages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/loginForm',
      name: 'Login',
      component: Login
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    }
  ],
  mode: 'history'
})
