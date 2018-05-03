<template>
  <v-card>
    <div v-if="sent.length === 0">
      <v-list two-line>
        <template>
          <v-list-tile
            avatar
            ripple
          >
            <v-list-tile-content>
              <v-list-tile-title>No Sent Messages</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
    <div v-else>
      <v-list two-line>
        <template v-for="(message, index) in sent">
          <v-list-tile
            avatar
            ripple
            :key="message._id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ message.to.username }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ message.message }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < sent.length" :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </v-card>
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
  },
  methods: {
    async sentMessages() {
      await MessageService.sentMessages({
        userID: this._props.userID
      }).then(response => {
        this.sent = response.data.sent;
      }) 
    }
  }

}
</script>