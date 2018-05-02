<template>
  <div class="messages">
    <h1>Messages</h1>
    This file lists all the messages

    <div v-for="message in messages" :key="message.id">
        <p>
            <span>{{message.name}}</span><br />
            <span><b>{{message.message}}</b></span>
        </p>
    </div>
  </div>
</template>

<script>
import MessagesService from '../services/MessagesService'
export default {
    name: 'Messages',
        data () {
        return {
            messages: []
        }
    },
    mounted() {
        this.getMessages()
    },
    methods: {
        async getMessages() {
            const response = await MessagesService.fetchMessages()
            this.messages = response.data
        }
    }

}
</script>