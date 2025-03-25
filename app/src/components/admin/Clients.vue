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

      <!-- Table with spaced rows -->
      <div class="overflow-hidden rounded-lg">
        <table class="min-w-full border-separate" style="border-spacing: 0 0.5rem">
          <thead class="bg-purple-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">Edit</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="i in filteredData"
              :key="i"
              class="hover:bg-gray-50 transition-colors duration-200 bg-white shadow-sm hover:shadow-md"
            >
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-900">{{ i }}</td>
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-900">User{{ i }}</td>
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-900">user{{ i }}@example.com</td>
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm" :class="getStatusClass(i)">{{ getStatus(i) }}</td>
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700 cursor-pointer">Edit</td>
              <td class="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-red-500 hover:text-red-700 cursor-pointer">Delete</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-end mt-4">
        <button class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 mr-2">
          Previous
        </button>
        <button class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
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
      showAddClientModal: false,
      newClient: {
        username: "",
        email: "",
      },
      data: Array.from({ length: 100 }, (_, i) => i + 1),
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
    openAddClientModal() {
      this.showAddClientModal = true;
    },
    closeAddClientModal() {
      this.showAddClientModal = false;
      this.newClient.username = '';
      this.newClient.email = '';
    },
    addClient() {
      if (this.newClient.username && this.newClient.email) {
        console.log('New Client Added:', this.newClient);
        this.data.push(this.data.length + 1);
        this.closeAddClientModal();
      } else {
        alert('Please fill in both fields.');
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>