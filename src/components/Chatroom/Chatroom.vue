<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center display-2">{{ title }}</h1>
        <new-message v-bind:userID="userID" v-bind:username="username"></new-message>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService'
import NewMessage from './NewMessage'
export default {
  name: 'Chatroom',
  data () {
    return {
      title: "Chatroom",
      userID: this.$route.params.userID,
      username: ''
    }
  },
  components: {
    'new-message': NewMessage
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      await UserService.fetchUser({
        userID: this.$route.params.userID
      }).then(response => {
        this.username = response.data.username;
      }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 35px 0 30px 0;
  }
</style>