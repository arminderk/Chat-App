import Api from './Api'

export default {
  loginUser(params) {
    return Api().get('login', {
      params: {
        username: params.username,
        password: params.password
      }
    })
  }
}