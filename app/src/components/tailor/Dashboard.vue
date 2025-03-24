<template>
  
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- hamburger menu button -->
    <button 
      @click="toggleSidebar"
      class="md:hidden p-4 text-gray-600 absolute top-24 right-4 text-2xl z-50">
      ☰
    </button>
    <!-- Sidebar -->
    <Sidebar 
      :isOpen="sidebarOpen" 
      @toggleSidebar="toggleSidebar" 
      :activeContent="activeContent"
      @update:activeContent="updateActiveContent" 
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- <button @click="toggleSidebar" class="md:hidden p-4 text-gray-600 absolute right-10 text-2xl ">☰</button> -->

      <!-- Dashboard Content -->
      <div class="p-4 sm:p-6" v-if="activeContent.name === 'Dashboard'">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Tailor Dashboard</h1>
        <p class="text-sm sm:text-base text-gray-500">Manage your orders and clients</p>

        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4"
            :class="stat.borderColor"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">{{ stat.title }}</h3>
            <p class="text-2xl sm:text-3xl font-bold" :class="stat.textColor">{{ stat.value }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">{{ stat.percentage }} from last month</p>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 class="text-lg sm:text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <table class="w-full text-left">
            <thead>
              <tr class="text-gray-600">
                <th class="p-2">Client</th>
                <th class="p-2">Garment</th>
                <th class="p-2">Status</th>
                <th class="p-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id" class="border-t">
                <td class="p-2">{{ order.client }}</td>
                <td class="p-2">{{ order.garment }}</td>
                <td class="p-2">
                  <span class="px-2 py-1 text-xs rounded-full" :class="order.statusClass">
                    {{ order.status }}
                  </span>
                </td>
                <td class="p-2">{{ order.dueDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Orders Chart -->
        <div class="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 class="text-lg sm:text-2xl font-bold text-gray-800 mb-4">Monthly Orders</h2>
          <div class="w-full h-52 sm:h-64">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import Sidebar from "./Sidebar.vue";

Chart.register(...registerables);

const chartCanvas = ref(null);
const sidebarOpen = ref(false);
const activeContent = ref({ name: "Dashboard" }); 

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Update active content
const updateActiveContent = (newContent) => {
  activeContent.value = newContent;
}

// Tailor-specific stats
const stats = ref([
  { title: "Pending Orders", value: "12", percentage: "+5%", textColor: "text-blue-600", borderColor: "border-blue-500" },
  { title: "Completed Orders", value: "45", percentage: "+12%", textColor: "text-green-600", borderColor: "border-green-500" },
  { title: "New Clients", value: "8", percentage: "+3%", textColor: "text-purple-600", borderColor: "border-purple-500" },
  { title: "Earnings This Month", value: "$3,240", percentage: "+15%", textColor: "text-yellow-600", borderColor: "border-yellow-500" },
]);

// Recent Orders
const recentOrders = ref([
  { id: 1, client: "John Doe", garment: "Custom Suit", status: "Pending", dueDate: "March 15", statusClass: "bg-yellow-100 text-yellow-600" },
  { id: 2, client: "Jane Smith", garment: "Evening Gown", status: "In Progress", dueDate: "March 18", statusClass: "bg-blue-100 text-blue-600" },
  { id: 3, client: "Chris Brown", garment: "Casual Jacket", status: "Completed", dueDate: "March 10", statusClass: "bg-green-100 text-green-600" },
]);

// Orders Chart
onMounted(() => {
  if (chartCanvas.value && activeContent.value.name === 'Dashboard') {
    new Chart(chartCanvas.value, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Orders",
            data: [5, 8, 12, 15, 18, 22],
            backgroundColor: "#6366F1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });
  }
});
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
}

.chart-container {
  position: relative;
  height: 300px;
}
</style>