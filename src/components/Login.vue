<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center">{{msg}}</h1> 
        <v-form v-model="valid">
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <br />
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRules"
            :counter="10"
            required
          ></v-text-field>
          <br />
          <v-layout justify-center>
            <v-btn color="success">Login</v-btn>
            <router-link :to="{name: 'Home'}">
              <v-btn>Home</v-btn>
            </router-link>
          </v-layout>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      valid: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length <= 10 || 'Password must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  h1 {
    margin: 50px 0;
  }
  a {
    text-decoration: none;
  }
</style>