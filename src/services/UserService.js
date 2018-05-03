import Api from './Api'

export default {
  fetchUsers(params) {
    return Api().get('users', {
      params: {
        userID: params.userID
      }
    })
  },
  fetchUser(params) {
    return Api().get('user', {
      params: {
        userID: params.userID
      }
    })
  }
}