<template>
  <div class="messages">
    <h1>Messages</h1>
      <div class="chatlogs">
        <!-- <ul>
          <li v-for="message in messages" :key="message._id">{{ message.fromUsername }} : {{ message.message }}</li>
        </ul> -->
        <template v-for="(message, index) in messages">
          <v-card-text :key="message._id">
            <h3>{{ message.fromUsername }}:</h3>
            {{ message.message }}
          </v-card-text>
          <v-divider v-if="index + 1 < messages.length" :key="index"></v-divider>
        </template>
      </div>
      <new-message v-bind:userID="this._props.userID" v-bind:username="this._props.username"></new-message>
  </div>
</template>

<script>
import NewMessage from './NewMessage'
export default {
  name: 'CurrentMessages',
  data () {
    return {
      title: "CurrentMessages",
      messages: []
    }
  },
  props: ['userID', 'username'],
  components: {
    'new-message': NewMessage
  },
  mounted() {
    this.joinUserRoom()
    this.getMessages()
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    }
  },
  methods: {
    joinUserRoom() {
      this.$socket.emit('join', {userID: this._props.userID, username: this._props.username})
    },
    getMessages() {
      this.$socket.on('message', function(data) {
        // console.log(`User: ${data.fromUsername}, message: ${data.message}, message_id: ${data.message_id}`)
        this.messages.push(data)
      }.bind(this))
    }
  }

}
</script>

<style scoped>
  h1 {
    margin-bottom: 10px;
  }
  .chatlogs {
    padding: 10px;
    margin-bottom: 25px;
    width: 100%;
    height: 400px; 
    background: #A9A9A9;
    overflow-x: hidden;
    overflow-y: scroll; 
  }
</style>
