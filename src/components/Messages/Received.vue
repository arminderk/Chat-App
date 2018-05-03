<template>
  <v-card>
    <div v-if="received.length === 0">
      <v-list two-line>
        <template>
          <v-list-tile
            avatar
            ripple
          >
            <v-list-tile-content>
              <v-list-tile-title>No Received Messages</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
    <div v-else>
      <v-list two-line>
        <template v-for="(message, index) in received">
          <v-list-tile
            avatar
            ripple
            :key="message._id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ message.from.username }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ message.message }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < received.length" :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </v-card>
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
  props: ['userID'],
  mounted() {
    this.receivedMessages()
  },
  methods: {
    async receivedMessages() {
      await MessageService.receivedMessages({
        userID: this._props.userID
      }).then(response => {
        this.received = response.data.received;
        console.log(this.received);
      }) 
    }
  }

}
</script>