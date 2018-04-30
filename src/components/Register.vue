<template>
  <v-app dark>
    <v-content>
      <v-container>
        <h1 class="text-xs-center">{{msg}}</h1> 
        <v-alert id="error-alert" v-model="alert" type="error" dismissible>
          Required fields can't be blank
        </v-alert>
        <v-form v-model="valid">
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
            required
          ></v-text-field>
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
            <v-btn color="info" @click="addUser">Register</v-btn>
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
import RegisterService from '@/services/RegistrationService'
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register',
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
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    async addUser() {
      if(this.email !== "" && this.password !== "" && this.username !== "") {
        await RegisterService.addUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$router.push({ name: 'Home'})
      }
      else {
        this.alert = true;
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
  #error-alert {
    margin: 20px 0 40px 0;
  }
</style>