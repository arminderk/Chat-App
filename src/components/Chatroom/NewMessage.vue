<template>
  <div class="new-message">
    <v-form v-model="valid">
      <v-layout row wrap>
        <v-flex xs3>
          <v-subheader>To:</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-select
            v-model="toUser"
            v-bind:items="users"
            item-text="username"
            item-value="_id"
            return-object
            label="Select User"
            required
          >
          </v-select>
        </v-flex>
        <v-flex xs3>
          <v-subheader>Message:</v-subheader>
        </v-flex>
        <v-flex xs9> 
          <v-text-field
            label="Enter Message"
            v-model="message"
            :rules="messageRules"
            :counter="120"
            max="120"
            multi-line
            rows="3"
            no-resize
            required
          ></v-text-field>
        </v-flex>
        <v-btn color="info" @click="newMessage">Send</v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import MessageService from '@/services/MessagesService'
export default {
  name: 'NewMessage',
  data () {
    return {
      users: [],
      valid: false,
      toUser: '',
      message: '',
      messageRules: [
        v => v.length < 120 || 'Message must be less than 121 characters'
      ],
      isConnected: false,
      socketMessage: ''
    }
  },
  mounted() {
    this.getUsers()
  },
  props: ['userID', 'username'],
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
    async getUsers() {
      await UserService.fetchUsers({
        userID: this._props.userID
      }).then(response => {
        this.users = response.data.users;
      }) 
    },
    newMessage() {
      this.$socket.emit('newMessage', {
        to: {
          id: this.toUser._id,
          username: this.toUser.username
        },
        from: {
          id: this._props.userID,
          username: this._props.username
        },
        message: this.message
      })
      this.toUser = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
  h1 {
    margin: 35px 0 30px 0;
  }
</style>