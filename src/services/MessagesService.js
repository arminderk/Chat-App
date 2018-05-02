import Api from './Api'

export default {
  fetchMessages () {
    return Api().get('messages')
  },

  addMessage(params) {
    return Api().post('messages', params)
  }
}