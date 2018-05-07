<template>
  <v-app dark>
    <v-content>
      <v-container>
        <v-alert id="error-alert" v-model="alert" type="error" dismissible>
          Required fields can't be blank
        </v-alert>
        <v-layout align-center justify-center id="register-card">
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="info">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    :rules="usernameRules"
                    prepend-icon="person"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    prepend-icon="lock"
                    :rules="passwordRules"
                    :counter="10"
                    required
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="addUser">Register</v-btn>
                <router-link :to="{name: 'Home'}">
                  <v-btn>Home</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
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
    async addUser() {
      if(this.username !== "" && this.password !== "") {
        await RegisterService.addUser({
          username: this.username,
          password: this.password
        }).then(response => {
          if(response.data.success === true) {
            let userID = response.data.userID;
            this.$router.push({ name: 'Chatroom', params: { userID }})
          }
        })
      }
      else {
        this.alert = true;
      }
    }
  }
}
</script>

<style scoped>
  #register-card {
    margin-top: 100px;
  }
  a {
    text-decoration: none;
  }
  #error-alert {
    margin: 20px 0 40px 0;
  }
</style>