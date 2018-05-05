<template>
  <v-app dark>
    <v-content>
      <v-container>
        <v-alert id="login-alert" v-model="loginAlert" type="error" dismissible>
          Wrong Username/Password
        </v-alert>
        <v-alert id="blank-fields" v-model="blankFields" type="error" dismissible>
          Required Fields Can't be Blank
        </v-alert>
          <v-layout align-center justify-center id="login-card">
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    prepend-icon="person"
                    :rules="usernameRules"
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
                  <v-btn color="primary" @click="loginUser">Login</v-btn>
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
import LoginService from '@/services/LoginService'
export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      loginAlert: false,
      blankFields: false,
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
            this.loginAlert = true;
          }
        })
      }
      else {
        this.blankFields = true;
      }
    }
  }
}
</script>

<style scoped>
  #login-card {
    margin-top: 100px;
  }
  a {
    text-decoration: none;
  }
  #login-alert { 
    margin: 20px 0 40px 0; 
  }
  #blank-fields {
    margin: 20px 0 40px 0;
  }
</style>