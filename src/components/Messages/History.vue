<template>
  <div class="messages">
    <h1>{{title}}</h1>
    <v-layout row wrap>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
      >
        <v-tab
          v-for="n in components"
          :key="n"
          ripple
        >
          {{ n }}
        </v-tab>
        <v-tab-item
          v-for="n in components"
          :key="n"
        >
          <div v-if="n == 'Sent'">
            <sent v-bind:userID="userID"></sent>
          </div>
          <div v-else>
            <received v-bind:userID="userID"></received>
          </div>
        </v-tab-item>
      </v-tabs>
    </v-layout>
  </div>
</template>

<script>
import Sent from './Sent'
import Received from './Received'
import MessageService from '@/services/MessagesService'
export default {
  name: 'History',
  data () {
    return {
      title: "History",
      active: null,
      components: ["Sent", "Received"]
    }
  },
  props: ['userID'],
  components: {
    sent: Sent,
    received: Received
  }
}
</script>