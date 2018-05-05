<template>
  <v-app dark>
    <v-content>
      <v-toolbar>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat @click=logout>Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <h1 class="text-xs-center display-2">Welcome {{ username }}</h1>
        <v-layout row wrap>
          <v-flex xs5>
            <history v-bind:userID="userID"></history>
          </v-flex>
          <v-flex xs7>
            <current-messages v-bind:userID="userID" v-bind:username="username"></current-messages>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import History from '../Messages/History'
import CurrentMessages from './CurrentMessages'
import UserService from '@/services/UserService'
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
    'history': History,
    'current-messages': CurrentMessages,
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
    },
    logout() {
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 35px 0 100px 0;
  }
</style>