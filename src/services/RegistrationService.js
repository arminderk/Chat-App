import Api from './Api'

export default {
  addUser (params) {
    return Api().post('register', params)
  }
}