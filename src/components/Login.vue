<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center">{{msg}}</h1> 
        <v-alert id="login-alert" v-model="alert" type="error" dismissible>
          Wrong Username/Password
        </v-alert>
        <v-form v-model="valid">
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
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
            <v-btn color="success" @click="loginUser">Login</v-btn>
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
import LoginService from '@/services/LoginService'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      valid: false,
      alert: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length <= 10 || 'Password must be less than 10 characters'
      ]
    }
  },
  methods: {
    async loginUser() {
      if(this.username != "" && this.password != "") {
        await LoginService.loginUser({
          username: this.username,
          password: this.password
        }).then(response => {
          if(response.data.login === true) {
            let userID = response.data.userID;
            this.$router.push({ name: 'Chatroom', params: { userID }});
          }
          else {
            this.$router.push({ name: 'Login' });
            this.alert = true;
          }
        })
      }
    }
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
  #login-alert{ 
    margin: 20px 0 40px 0; 
  }
</style>