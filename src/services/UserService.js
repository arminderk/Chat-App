import Api from './Api'

export default {
  fetchUsers () {
    return Api().get('users')
  }
}