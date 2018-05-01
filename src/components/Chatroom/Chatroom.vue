<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center display-2">{{ title }}</h1>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: "Chatroom"
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