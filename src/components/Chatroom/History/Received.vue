<template>
  <div id="received-messages">
    <v-card>
      <div v-if="received.length === 0">
        <template>
          <v-card-text>
            No Received Messages
          </v-card-text>
          <v-divider></v-divider>
        </template>
      </div>
      <div v-else>
        <template v-for="(message, index) in received">
          <v-card-text :key="message._id">
            <h3>From: {{ message.from.username }}</h3>
            {{ message.message }}
          </v-card-text>
          <v-divider v-if="index + 1 < received.length" :key="index"></v-divider>
        </template>
      </div>
    </v-card>
  </div>
</template>

<script>
import MessageService from '@/services/MessagesService'
export default {
  name: 'Received',
  data () {
    return {
      received: [],
    }
  },
  props: ['userID', 'from'],
  mounted() {
    this.receivedMessages()
  },
  methods: {
    async receivedMessages() {
      await MessageService.receivedMessages({
        userID: this._props.userID
      }).then(response => {
        this.received = response.data.received;
      }) 
    }
  }

}
</script>

<style scoped>
  #received-messages {
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
