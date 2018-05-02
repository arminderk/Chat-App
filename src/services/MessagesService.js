import Api from './Api'

export default {
  fetchMessages () {
    return Api().get('messages')
  },

  addPost(params) {
    return Api().post('posts', params)
  }
}