<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center display-2">{{ title }}</h1>
        <new-message v-bind:userID="userID"></new-message>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NewMessage from './NewMessage'
export default {
  name: 'Home',
  data () {
    return {
      title: "Chatroom",
      userID: this.$route.params.userID
    }
  },
  components: {
    'new-message': NewMessage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 35px 0 30px 0;
  }
</style>