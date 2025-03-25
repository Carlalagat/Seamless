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
  
      <!-- Main content (Table) -->
      <div class="flex-1 p-4 overflow-auto bg-purple-100 mt-1 rounded ml-1">
        <!-- Search Bar and Add Button -->
        <div class="mb-4 flex items-center justify-between">
          <!-- Search Bar -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search clients..."
            class="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
          <!-- Add Button -->
          <button
            @click="openAddClientModal"
            class="ml-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 fa fa-add -xl"
          >
          </button>
        </div>
  
        <!-- Table -->
        <table class="min-w-full table-auto divide-y border-collapse bg-slate-100 shadow-lg rounded-lg">
          <thead>
            <tr class="text-white">
              <th class="px-4 py-2 text-left font-semibold cursor-pointer hover:bg-purple-600">ID</th>
              <th class="px-4 py-2 text-left font-semibold cursor-pointer hover:bg-purple-600">Username</th>
              <th class="px-4 py-2 text-left font-semibold cursor-pointer hover:bg-purple-600">Email</th>
              <th class="px-4 py-2 text-left font-semibold cursor-pointer hover:bg-purple-600">Status</th>
              <th class="px-4 py-2 text-left font-semibold">Edit</th>
              <th class="px-4 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in filteredData"
              :key="i"
              class="hover:bg-gray-100 cursor-pointer transition-colors duration-300 "
            >
              <td class="px-4 py-2">{{ i }}</td>
              <td class="px-4 py-2">User{{ i }}</td>
              <td class="px-4 py-2">user{{ i }}@example.com</td>
              <td class="px-4 py-2" :class="getStatusClass(i)">{{ getStatus(i) }}</td>
              <td class="px-4 py-2 text-blue-500 cursor-pointer hover:text-blue-700">Edit</td>
              <td class="px-4 py-2 text-red-500 cursor-pointer hover:text-red-700">Delete</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination (Optional) -->
        <div class="flex justify-end mt-40">
          <button class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-500">
            Previous
          </button>
          <button class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-500 ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  
    <!-- Modal for adding a new client -->
    <div
      v-if="showAddClientModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 class="text-xl font-semibold mb-4">Add New Client</h3>
        <form @submit.prevent="addClient">
          <div class="mb-4">
            <label for="username" class="block text-sm font-semibold">Username</label>
            <input
              v-model="newClient.username"
              type="text"
              id="username"
              placeholder="Enter username"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold">Email</label>
            <input
              v-model="newClient.email"
              type="email"
              id="email"
              placeholder="Enter email"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div class="flex justify-between">
            <button
              type="button"
              @click="closeAddClientModal"
              class="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        showAddClientModal: false, // Controls visibility of the "Add Client" modal
        newClient: {
          username: "",
          email: "",
        },
        data: Array.from({ length: 100 }, (_, i) => i + 1), // Example data (1 to 100)
      };
    },
    computed: {
      filteredData() {
        return this.data.filter((id) =>
          (`User${id}`.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            `user${id}@example.com`.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      },
    },
    methods: {
      getStatus(i) {
        const statuses = ['Active', 'Inactive', 'Pending'];
        return statuses[i % statuses.length];
      },
      getStatusClass(i) {
        const status = this.getStatus(i);
        if (status === 'Active') return 'text-green-500';
        if (status === 'Inactive') return 'text-red-500';
        return 'text-yellow-500';
      },
      // Open the Add Client modal
      openAddClientModal() {
        this.showAddClientModal = true;
      },
      
      // Close the Add Client modal
      closeAddClientModal() {
        this.showAddClientModal = false;
        this.newClient.username = '';
        this.newClient.email = '';
      },
      
      // Add a new client
      addClient() {
        if (this.newClient.username && this.newClient.email) {
          console.log('New Client Added:', this.newClient);
          this.data.push(this.data.length + 1); // Simulating new client added
          this.closeAddClientModal();
        } else {
          alert('Please fill in both fields.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-spacing: 1px;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px #ddd;
    padding: 10px;
  }
  
  th {
    background-color: #6b46c1; /* Purple */
    color: white;
  }
  </style>
  