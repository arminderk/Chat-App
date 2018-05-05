<template>
  <div class="messages">
    <h1>Messages</h1>
    <div ref="chatArea"></div>
    <div class="chatbox">
      <div class="chatlogs">
        <ul>
          <li v-for="message in messages">{{ message.fromUsername }} : {{ message.message }}</li>
        </ul>
      </div>
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
      messages: [],
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
        console.log(`User: ${data.fromUsername}, message: ${data.message}`)
        this.messages.push(data)
        console.log(this.$refs)
      }.bind(this))
    }
  }

}
</script>

<style scoped>
  .chatbox {
    width: 500px;
    min-width: 390px;
    height: 500px;
    background: #fff;
    padding: 25px;
    margin: 20px auto;
    overflow-x: hidden;
    overflow-y: scroll; 
  }
  .chatlogs {
    padding: 10px;
    width: 100%;
    height: 450px; 
    background: #d3d3d3;
  }
</style>
