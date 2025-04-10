<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="text-sm w-1/5 md:w-[16%] lg:w-[10%] bg-purple-100 p-4 flex flex-col items-center md:items-start rounded mt-1">
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

      <!-- Logout Button -->
      <button
        @click="logout"
        class="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
      >
        Logout
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="px-1 absolute right-[2px] h-screen flex flex-col md:w-[84%] lg:w-[90%] w-4/5 overflow-auto">
      <!-- Dashboard Cards -->
      <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
        <!-- Title & Icon -->
        <div class="h-10 flex justify-between">
          <div class="text-2xl">Total Appointments</div>
          <div>
            <i class="fa-solid fa-calendar-days text-purple-600 text-4xl"></i>
          </div>
        </div>
        <!-- Chart Placeholder -->
        <div class="flex-1 flex justify-center items-center">
          <canvas ref="chartCanvas"></canvas>
        </div>
        <!-- Number & Growth Percentage -->
        <div class="h-10 flex justify-between">
          <span class="text-2xl px-3">224</span>
          <div class="flex items-center">
            <i class="fa-solid fa-arrow-up text-green-600 text-3xl"></i>
            <span class="text-2xl p-2">12%</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
        <!-- Header -->
        <div class="h-10 flex justify-between">
          <div class="text-2xl p-3">Total Revenue</div>
          <div>
            <i class="fa-solid fa-bank text-purple-600 text-4xl p-2"></i>
          </div>
        </div>
        <!-- Bar Chart -->
        <div class="flex-1 flex justify-center items-center">
          <canvas ref="revenueChart"></canvas>
        </div>
        <!-- Footer -->
        <div class="h-10 flex justify-between">
          <span class="text-2xl px-3">KES 240,000</span>
          <div class="flex items-center">
            <i class="fa-solid fa-arrow-up text-green-600 text-3xl"></i>
            <span class="text-2xl p-2">8%</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
        <!-- header -->
        <div class="h-10 flex justify-between">
          <div class="text-2xl p-3">New Clients</div>
          <div>
            <i class="fa-solid fa-user text-purple-600 text-4xl p-2"></i>
          </div>
        </div>
        <!-- chart -->
        <div class="flex-1 flex justify-center items-center">
          <canvas ref="clientsChart"></canvas>
        </div>
        <!-- footer -->
        <div class="h-10 flex justify-between">
          <span class="text-2xl px-3">1500</span>
          <div class="flex items-center">
            <i class="fa-solid fa-arrow-down text-red-600 text-3xl"></i>
            <span class="text-2xl p-2">2%</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
        <!-- header -->
        <div class="h-10 flex justify-between">
          <div class="text-2xl p-3">New Tailors</div>
          <div>
            <i class="fa-solid fa-scissors text-purple-600 text-3xl p-2"></i>
          </div>
        </div>
        <!-- chart -->
        <div class="flex-1 flex justify-center items-center">
          <canvas ref="tailorsChart"></canvas>
        </div>
        <!-- footer -->
        <div class="h-10 flex justify-between">
          <span class="text-2xl px-3">100</span>
          <div class="flex items-center">
            <i class="fa-solid fa-arrow-down text-red-600 text-3xl"></i>
            <span class="text-2xl p-2">50%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const chartCanvas = ref(null);
const revenueChart = ref(null);
const clientsChart = ref(null);
const tailorsChart = ref(null);

const logout = () => {
  authStore.logout();
};

onMounted(() => {
  // Setup for chartCanvas: line chart for appointments
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [{
          label: "Appointments",
          data: [50000, 40000, 30000, 60000, 20000, 40000, 60000, 70000, 90000, 100000, 150000],
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Setup for revenueChart: bar chart for revenue
  if (revenueChart.value) {
    new Chart(revenueChart.value, {
      type: "bar",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [{
          label: "Revenue (KES)",
          data: [50000, 40000, 30000, 60000, 20000, 40000, 60000, 70000, 90000, 100000, 150000],
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Setup for clientsChart: line chart for new clients
  if (clientsChart.value) {
    new Chart(clientsChart.value, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [{
          label: "New Clients",
          data: [480, 1000, 346, 1500, 1559, 1299, 1200, 1300, 1500, 1100, 700, 500],
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Setup for tailorsChart: bar chart for new tailors
  if (tailorsChart.value) {
    new Chart(tailorsChart.value, {
      type: "bar",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [{
          label: "New Tailors",
          data: [1480, 10000, 16006, 15000, 9000, 8100, 7500, 7100, 6500, 5500, 2500, 1000],
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
});
</script>
