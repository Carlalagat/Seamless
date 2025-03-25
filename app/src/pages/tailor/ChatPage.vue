<template>
    <div class="chat-container ">
      <h2>Chat Between Client and Tailor</h2>
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class=" ['message', message.sender === 'Client' ? 'message-user' : 'message-bot']"
        >
          <div class="sender ">{{ message.sender }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-section">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: [
          { sender: 'Client', content: 'Hey, how are you?' },
          { sender: 'Tailor', content: 'I\'m good, thanks! How about you?' },
          { sender: 'Client', content: 'I\'m doing well, just working on some code.' },
          { sender: 'Tailor', content: 'That sounds interesting! What are you working on?' },
        ]
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        // Add the new message from Client
        this.messages.push({
          sender: 'Client',
          content: this.newMessage
        });
  
        // Scroll to the bottom of the messages
        this.$nextTick(() => {
          const messagesContainer = this.$el.querySelector('.messages');
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
  
        // Clear the input field
        this.newMessage = '';
  
        // Simulate a response from Person B after 1 second
        setTimeout(() => {
          this.messages.push({
            sender: 'Tailor',
            content: 'I\'m working on Vue.js too, that\'s cool!'
          });
  
          // Scroll to the bottom after the new message is added
          this.$nextTick(() => {
            const messagesContainer = this.$el.querySelector('.messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          });
        }, 1000);
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 75%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .messages {
    height: 400px;
    overflow-y: auto;
    padding-bottom: 20px;
  }
  .message {
    margin: 10px 0;
    
  }
  .message .sender {
    font-weight: bold;
  }
  .message .content {
    margin-top: 5px;
    background: #f0eded;
    padding: 10px;
    border-radius:6px;
  }
  .message-user {
    text-align: right;
  }
  .message-bot {
    text-align: left;
  }
  input[type="text"] {
    width: calc(100% - 80px);
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
  }
  </style>