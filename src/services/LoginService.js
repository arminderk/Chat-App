import Api from './Api'

export default {
  loginUser () {
    return Api().get('login')
  }
}