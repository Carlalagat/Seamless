<template>
    <div class="flex flex-col h-screen bg-gray-100">
      <!-- Chat Header -->
      <div class="bg-purple-700 text-white p-4 flex items-center shadow-md">
        <RouterLink to="/tailor-dashboard" class="flex items-center space-x-2 mx-[7px]">
            <i class="fa fa-arrow-left"></i>
    </RouterLink>
        <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
          <span class="text-xl font-bold">C</span>
        </div>
        <div class="flex">
       
    <div>
      <h2 class="font-bold text-lg">Client's Name</h2>
          <p class="text-xs text-purple-200">Online</p>
    </div>
        
        </div>
        <div class="ml-auto flex space-x-3">
          <button class="p-2 rounded-full hover:bg-purple-600">
            <i class="fas fa-phone"></i>
          </button>
          <button class="p-2 rounded-full hover:bg-purple-600">
            <i class="fas fa-video"></i>
          </button>
          <button class="p-2 rounded-full hover:bg-purple-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
  
      <!-- Messages Container -->
      <div 
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        @scroll="handleScroll"
      >
        <!-- Date Divider -->
        <div class="flex justify-center">
          <span class="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm">
            Today
          </span>
        </div>
  
        <!-- Sample Initial Messages -->
        <div 
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex',
            message.sender === 'client' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div 
            :class="[
              'max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3',
              message.sender === 'client' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none shadow'
            ]"
          >
            <p>{{ message.content }}</p>
            <p 
              :class="[
                'text-xs mt-1',
                message.sender === 'client' ? 'text-purple-200' : 'text-gray-500'
              ]"
            >
              {{ formatTime(message.timestamp) }}
              <span v-if="message.sender === 'client' && message.read" class="ml-1">
                <i class="fas fa-check-double text-blue-300"></i>
              </span>
            </p>
          </div>
        </div>
  
        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white rounded-lg rounded-bl-none p-3 shadow">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Input Area -->
      <div class="bg-white border-t p-3">
        <div class="flex items-center">
          <button class="p-2 text-gray-500 hover:text-purple-700 mx-1">
            <i class="fas fa-paperclip"></i>
          </button>
          <button class="p-2 text-gray-500 hover:text-purple-700 mx-1">
            <i class="fas fa-image"></i>
          </button>
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border rounded-full py-2 px-4 mx-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
            @keyup.enter="sendMessage"
          >
          <button 
            @click="sendMessage"
            class="p-2 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700"
            :disabled="!newMessage.trim()"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        isTyping: false,
        messages: [
          {
            sender: 'client',
            content: 'Hi there! I wanted to check on my suit order.',
            timestamp: new Date(Date.now() - 3600000),
            read: true
          },
          {
            sender: 'tailor',
            content: 'Hello! Yes, your order #12345 is in progress. We\'re currently working on the stitching.',
            timestamp: new Date(Date.now() - 3500000),
            read: true
          },
          {
            sender: 'client',
            content: 'That\'s great! When do you expect it to be ready?',
            timestamp: new Date(Date.now() - 3400000),
            read: true
          },
          {
            sender: 'tailor',
            content: 'We should have it ready by Friday. Would you like to schedule a fitting?',
            timestamp: new Date(Date.now() - 3300000),
            read: true
          },
          {
            sender: 'client',
            content: 'Yes, Friday works for me. What times are available?',
            timestamp: new Date(Date.now() - 3200000),
            read: true
          },
          {
            sender: 'tailor',
            content: 'We have openings at 2pm or 4pm. Which would you prefer?',
            timestamp: new Date(Date.now() - 3100000),
            read: true
          }
        ],
        sampleResponses: [
          "I can check on that for you.",
          "The estimated completion time is 3 days.",
          "Would you like to make any changes to your order?",
          "We have your measurements on file from last time.",
          "That fabric choice will look excellent!",
          "I'll notify you when it's ready for pickup.",
          "Would you like to see some additional design options?",
          "Your payment has been processed successfully."
        ],
        isNearBottom: true
      }
    },
    mounted() {
      this.scrollToBottom();
      this.simulateIncomingMessage();
    },
    methods: {
      sendMessage() {
        if (!this.newMessage.trim()) return;
  
        const message = {
          sender: 'client',
          content: this.newMessage,
          timestamp: new Date(),
          read: false
        };
  
        this.messages.push(message);
        this.newMessage = '';
        this.scrollToBottom();
  
        // Simulate typing indicator
        this.isTyping = true;
        
        // Simulate response after 1-3 seconds
        setTimeout(() => {
          this.isTyping = false;
          this.simulateResponse();
        }, 1000 + Math.random() * 2000);
      },
      simulateResponse() {
        const response = {
          sender: 'tailor',
          content: this.getRandomResponse(),
          timestamp: new Date(),
          read: false
        };
  
        this.messages.push(response);
        this.scrollToBottom();
        
        // Mark client's last message as read
        for (let i = this.messages.length - 1; i >= 0; i--) {
          if (this.messages[i].sender === 'client') {
            this.messages[i].read = true;
            break;
          }
        }
      },
      getRandomResponse() {
        return this.sampleResponses[
          Math.floor(Math.random() * this.sampleResponses.length)
        ];
      },
      scrollToBottom() {
        this.$nextTick(() => {
          if (this.isNearBottom) {
            this.$refs.messagesContainer.scrollTop = 
              this.$refs.messagesContainer.scrollHeight;
          }
        });
      },
      handleScroll() {
        const container = this.$refs.messagesContainer;
        this.isNearBottom = 
          container.scrollTop + container.clientHeight >= 
          container.scrollHeight - 50;
      },
      formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
      simulateIncomingMessage() {
        // Simulate an incoming message every 20-40 seconds
        setInterval(() => {
          if (Math.random() > 0.7 && !this.isTyping) { // 30% chance of message
            this.isTyping = true;
            setTimeout(() => {
              this.isTyping = false;
              this.simulateResponse();
            }, 1000 + Math.random() * 2000);
          }
        }, 20000 + Math.random() * 20000);
      }
    }
  }
  </script>
  
  <style>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  </style>