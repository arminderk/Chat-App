import Api from './Api'

export default {
  fetchMessages () {
    return Api().get('messages')
  }
}