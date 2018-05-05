<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center display-2">{{ title }}</h1>
        <h2 class="text-xs-center headline">{{intro}}</h2>
        <v-layout justify-center>
          <router-link :to="{name: 'Login'}">
            <v-btn color="primary">Login</v-btn>
          </router-link>
          <router-link :to="{name: 'Register'}">
            <v-btn>Register</v-btn>
          </router-link>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: "Welcome to The Chat App",
      intro: "Real time chat experience"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 50px 0 30px 0;
  }
  h2 {
    margin-bottom: 40px;
  }
  a {
    text-decoration: none;
  }
</style>
