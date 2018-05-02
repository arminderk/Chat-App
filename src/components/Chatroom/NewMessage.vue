<template>
  <div class="users">
    <v-select
      v-bind:items="users"
      item-text="username"
      item-value="_id"
      label="Select User"
    >
    </v-select>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'NewMessage',
  data () {
    return {
      users: []
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
    }
  }
}
</script>

<style scoped>
  h1 {
    margin: 35px 0 30px 0;
  }
</style>