import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Chatroom from '../components/Chatroom/Chatroom';
import NewMessage from '../components/Chatroom/NewMessage' 

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
      path: '/chatroom/:userID',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/messages/new',
      name: NewMessage,
      component: NewMessage
    }
  ],
  mode: 'history'
})
