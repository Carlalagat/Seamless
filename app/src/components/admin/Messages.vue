<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />

  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="text-sm w-1/5 md:w-[16%] lg:w-[10%] w-70 bg-purple-100 p-4 flex flex-col items-center md:items-start rounded mt-1">
  
  <RouterLink
    to="/admin-dashboard"
    class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
    active-class="bg-purple-700"
  >
    <i class="fa fa-home text-sm"></i>
    <span class="md:ml-1 text-sm">Dashboard</span>
  </RouterLink>

  <RouterLink
    to="/clients"
    class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
    active-class="bg-purple-700"
  >
    <i class="fa fa-user text-sm"></i>
    <span class="md:ml-2 text-sm">Clients</span>
  </RouterLink>

  <RouterLink
    to="/tailors"
    class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
    active-class="bg-purple-700"
  >
    <i class="fa fa-scissors text-sm"></i>
    <span class="md:ml-2 text-sm">Tailors</span>
  </RouterLink>

  <RouterLink
    to="/messages"
    class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
    active-class="bg-purple-700"
  >
    <i class="fa fa-comments text-sm"></i>
    <span class="md:ml-1 text-sm">Messages</span>
  </RouterLink>

</div>

    <!-- Main Content -->
    <div class="relative flex flex-row bg-purple-100 ml-1 mt-1 rounded h-full w-full">
      <div class="absolute top-6 left-4">
        <h1 class="text-2xl">MESSAGES</h1>
      </div>

      <!-- Left Panel: List of Conversations -->
      <div class="bg-slate-100 text-black mt-16 ml-1 h-[88vh] w-52 rounded-lg shadow-lg overflow-auto flex-shrink-0 p-1">
        <!-- Title Section -->
        <!-- Title Section -->
        <div class="sticky top-0 z-10 bg-slate-100">

  <button class="bg-purple-500 text-white px-4 py-2 rounded-lg w-full font-semibold">
    + Compose
  </button>
</div>

        <!-- Client & Tailor List -->
        <div class="mt-4 space-y-2">
          <div
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="flex items-center justify-between cursor-pointer hover:bg-purple-200 p-2 rounded-lg"
            @click="selectUser(user)"
          >
            <i class="fa fa-inbox text-purple-500"></i>
            <span class="flex-1 text-left ml-2 truncate">{{ user.name }}</span>
            <span class="bg-purple-300 text-white px-3 py-1 rounded text-sm">{{ user.messages.length }}</span>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="mt-6 space-y-3">
          <h2 class="text-sm font-semibold">Filter by Label</h2>
          <div class="filter-option" @click="filterBy('tailor')">
            <span class="indicator bg-teal-500"></span>
            <span>Tailors</span>
          </div>
          <div class="filter-option" @click="filterBy('client')">
            <span class="indicator bg-purple-500"></span>
            <span>Clients</span>
          </div>
          <div class="filter-option" @click="filterBy('all')">
            <span class="indicator bg-gray-500"></span>
            <span>All</span>
          </div>
        </div>
      </div>

      <!-- Right Panel: Chat Window -->
      <div v-if="selectedUser" class="flex-1 flex flex-col bg-white rounded-lg mt-16 ml-1 shadow-lg h-[88vh] overflow-hidden">
        <!-- Chat Header -->
        <div class="p-2 bg-purple-500 text-white flex items-center rounded-t-lg">
          <i class="fa fa-user-circle text-2xl"></i>
          <h2 class="ml-2 text-lg font-semibold">{{ selectedUser.name }}</h2>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
          <div
            v-for="(message, index) in selectedUser.messages"
            :key="index"
            class="flex"
            :class="{
              'justify-start': message.sender !== 'admin',
              'justify-end': message.sender === 'admin'
            }"
          >
            <div
              class="p-2 rounded-lg shadow max-w-xs"
              :class="{
                'bg-gray-200 text-black': message.sender !== 'admin',
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
      return this.filterType === "all" ? this.users : this.users.filter(user => user.role === this.filterType);
    },
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
    },
    sendMessage() {
      if (!this.newMessage.trim()) return;
      this.selectedUser.messages.push({ sender: "admin", text: this.newMessage });
      this.newMessage = "";
    },
    filterBy(type) {
      this.filterType = type;
    },
  },
};
</script>

<style scoped>
.nav-link { @apply bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base; }
.filter-option { @apply flex items-center cursor-pointer space-x-2; }
.indicator { @apply w-3 h-3 rounded-full; }
</style>
