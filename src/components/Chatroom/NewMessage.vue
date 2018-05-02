<template>
  <div class="users">
    <v-form v-model="valid">
      <v-layout row wrap>
        <v-flex xs3>
          <v-subheader>To:</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-select
            v-model="toUser"
            v-bind:items="users"
            item-text="username"
            item-value="_id"
            label="Select User"
            required
          >
          </v-select>
        </v-flex>
        <v-flex xs3>
          <v-subheader>Message:</v-subheader>
        </v-flex>
        <v-flex xs9> 
          <v-text-field
            label="Enter Message"
            v-model="message"
            :rules="messageRules"
            :counter="120"
            max="120"
            multi-line
            single-line
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'NewMessage',
  data () {
    return {
      users: [],
      valid: false,
      message: '',
      toUser: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => v.length < 120 || 'Message must be less than 121 characters'
      ]
    }
  },
  mounted() {
    this.getUsers()
  },
  props: ['userID'],
  methods: {
    async getUsers() {
      const response = await UserService.fetchUsers();
      this.users = response.data.users; 
    },
    async newMessage() {

    }
  }
}
</script>

<style scoped>
  h1 {
    margin: 35px 0 30px 0;
  }
</style>