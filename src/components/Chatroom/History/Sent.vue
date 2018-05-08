<template>
  <div id="sent-messages">
    <v-card>
      <div v-if="sent.length === 0">
        <template>
          <v-card-text>
            No Sent Messages
          </v-card-text>
          <v-divider></v-divider>
        </template>
      </div>
      <div v-else>
        <template v-for="(message, index) in sent">
          <v-card-text :key="message._id">
            <h3>To: {{ message.to.username }}</h3>
            {{ message.message }}
          </v-card-text>
          <v-divider v-if="index + 1 < sent.length" :key="index"></v-divider>
        </template>
      </div>
    </v-card>
  </div>
</template>

<script>
import MessageService from '@/services/MessagesService'
export default {
  name: 'Sent',
  data () {
    return {
      title: "Sent",
      sent: [],
    }
  },
  props: ['userID'],
  mounted() {
    this.sentMessages()
    this.socketSentMessage()
  },
  methods: {
    async sentMessages() {
      await MessageService.sentMessages({
        userID: this._props.userID
      }).then(response => {
        this.sent = response.data.sent;
      }) 
    },
    socketSentMessage() {
      this.$socket.on('sent', function(data) {
        // console.log(`Username: ${data.newMessage}`)
        this.sent.unshift(data.newMessage)
      }.bind(this))
    }
  }

}
</script>

<style scoped>
  #sent-messages {
    width: 300px;
    max-width: 300px;
    height: 350px;
    max-height: 350px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
