import Api from './Api'

export default {
  sentMessages (params) {
    return Api().get('/sent', {
      params: {
        userID: params.userID
      }
    })
  },
  receivedMessages(params) {
    return Api().get('/received', {
      params: {
        userID: params.userID
      }
    })
  },
  addMessage(params) {
    return Api().post('messages', params)
  }
}