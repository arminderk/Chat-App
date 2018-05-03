<template>
  <div class="messages">
    <h1>Messages</h1>
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
  methods: {
    
  }

}
</script>