<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />

  <div class="flex h-screen">
    <!-- Sidebar -->
    <div
      class="text-sm w-1/5 md:w-[16%] lg:w-[10%] w-70 bg-purple-100 p-4 flex flex-col items-center md:items-start rounded mt-1"
    >
      <RouterLink to="/admin-dashboard" class="nav-link">
        <i class="fa fa-home text-sm"></i>
        <span class="md:ml-1 text-sm">Dashboard</span>
      </RouterLink>

      <RouterLink to="/clients" class="nav-link">
        <i class="fa fa-user text-sm"></i>
        <span class="md:ml-2 text-sm">Clients</span>
      </RouterLink>

      <RouterLink to="/tailors" class="nav-link">
        <i class="fa fa-scissors text-sm"></i>
        <span class="md:ml-2 text-sm">Tailors</span>
      </RouterLink>

      <RouterLink to="/messages" class="nav-link">
        <i class="fa fa-comments text-sm"></i>
        <span class="md:ml-1 text-sm">Messages</span>
      </RouterLink>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex bg-purple-100 ml-1 mt-1 rounded overflow-auto relative">
      <div class="absolute ml-4 mt-6">
        <h1 class="text-2xl">MESSAGES</h1>
      </div>

      <!-- Left Panel: List of Conversations -->
      <div class="relative z-10 bg-slate-100 text-white mt-16 ml-3 h-full w-64 rounded-lg shadow-lg overflow-auto">
        <!-- Title Section -->
        <div class="flex justify-between items-center p-4 border-b">
          <button class="bg-purple-500 text-white px-6 py-1 rounded">
            <strong>+</strong> Compose
          </button>
        </div>

        <!-- Client & Tailor List -->
        <div class="mt-4 space-y-4 px-4">
          <div
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="flex items-center justify-between cursor-pointer hover:bg-purple-200 p-1 rounded"
            @click="selectUser(user)"
          >
            <i class="fa fa-inbox text-purple-500"></i>
            <span class="text-black mr-8 w-32 text-left ml-1">
              {{ user.name }}
            </span>
            <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">
              {{ user.messages.length }}
            </span>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="mt-6 px-4 space-y-4">
          <h2 class="text-black text-sm font-semibold">Filter by Label</h2>
          <div class="flex items-center cursor-pointer" @click="filterBy('tailor')">
            <span class="w-3 h-3 bg-teal-500 rounded-full"></span>
            <span class="ml-2 text-black text-sm">Tailors</span>
          </div>
          <div class="flex items-center cursor-pointer" @click="filterBy('client')">
            <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span class="ml-2 text-black text-sm">Clients</span>
          </div>
          <div class="flex items-center cursor-pointer" @click="filterBy('all')">
            <span class="w-3 h-3 bg-gray-500 rounded-full"></span>
            <span class="ml-2 text-black text-sm">All</span>
          </div>

          <!-- Advertisements -->
          <div class="flex items-center">
            <span class="w-3 h-3 bg-pink-500 rounded-full"></span>
            <span class="ml-2  text-black text-sm">Advertisements</span>
          </div>
        </div>

        <!-- Footer Section -->
        <div class="mt-4 px-4">
          <button class="text-sm text-gray-500 hover:text-black">
            + Create New Label
          </button>
        </div>
      </div>

      <!-- Right Panel: Chat Window -->
      <div v-if="selectedUser" class="flex-1 bg-white flex flex-col h-full rounded mt-16 ml-3">
        <!-- Chat Header -->
        <div class="p-4 bg-purple-500 text-white flex items-center rounded-t">
          <i class="fa fa-user-circle text-2xl"></i>
          <h2 class="ml-2 text-lg font-semibold">{{ selectedUser.name }}</h2>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 p-4 overflow-y-auto space-y-2">
          <div
            v-for="(message, index) in selectedUser.messages"
            :key="index"
            class="flex"
            :class="{
              'justify-start': message.sender === 'client' || message.sender === 'tailor',
              'justify-end': message.sender === 'admin'
            }"
          >
            <div
              class="p-2 rounded-lg shadow max-w-xs"
              :class="{
                'bg-gray-200 text-black': message.sender === 'client' || message.sender === 'tailor',
                'bg-purple-500 text-white': message.sender === 'admin'
              }"
            >
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="p-4 border-t flex">
          <input
            v-model="newMessage"
            type="text"
            class="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <button
            class="ml-2 bg-purple-500 text-white px-4 py-2 rounded-lg"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",

  data() {
    return {
      users: [
        { name: "Tenma", role: "client", messages: [{ sender: "client", text: "Hey, how can I help?" }] },
        { name: "Hoop", role: "client", messages: [{ sender: "client", text: "Let's discuss the new design." }] },
        { name: "Ashton", role: "client", messages: [{ sender: "client", text: "I have a question about my order." }] },
        { name: "Tariq", role: "tailor", messages: [{ sender: "tailor", text: "The fabric has arrived." }] },
        { name: "Victor", role: "tailor", messages: [{ sender: "tailor", text: "I need clarification on the measurements." }] },
        { name: "Chris", role: "tailor", messages: [{ sender: "tailor", text: "Are we still on schedule?" }] },
      ],

      selectedUser: null,
      newMessage: "",
      filterType: "all",
    };
  },

  computed: {
    filteredUsers() {
      if (this.filterType === "all") return this.users;
      return this.users.filter(user => user.role === this.filterType);
    },
  },

  methods: {
    selectUser(user) {
      this.selectedUser = user;
    },

    sendMessage() {
      if (!this.newMessage.trim()) return;

      this.selectedUser.messages.push({
        sender: "admin",
        text: this.newMessage,
      });

      this.newMessage = "";
    },

    filterBy(type) {
      this.filterType = type;
    },
  },
};
</script>

<style scoped>
.nav-link {
  @apply bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base;
}

.nav-link i {
  @apply text-sm;
}

.nav-link span {
  @apply md:ml-2 text-sm;
}
</style>
