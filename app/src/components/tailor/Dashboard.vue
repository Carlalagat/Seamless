<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- Sidebar (Collapsible on Small Screens) -->
    <div class="hidden md:block">
      <Sidebar />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar (Always Visible) -->
      <NavBar />

      <!-- Dashboard Content -->
      <div class="p-4 sm:p-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-sm sm:text-base text-gray-500">
          Overview of your store’s performance
        </p>

        <!-- Stats Overview Cards -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6"
        >
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 transition-transform transform hover:scale-105"
            :class="stat.borderColor"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">
              {{ stat.title }}
            </h3>
            <p class="text-2xl sm:text-3xl font-bold" :class="stat.textColor">
              {{ stat.value }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ stat.percentage }} from last month
            </p>
          </div>
        </div>

        <!-- Stats Graph (Fully Responsive) -->
        <div class="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 class="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
            Sales & Revenue
          </h2>
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

Chart.register(...registerables);

const chartCanvas = ref(null);

// Sample stats data
const stats = ref([
  {
    title: "Total Sales",
    value: "$24,560",
    percentage: "+12%",
    textColor: "text-purple-600",
    borderColor: "border-purple-500",
  },
  {
    title: "Orders",
    value: "320",
    percentage: "+8%",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",
  },
  {
    title: "New Customers",
    value: "58",
    percentage: "+5%",
    textColor: "text-green-600",
    borderColor: "border-green-500",
  },
  {
    title: "Revenue",
    value: "$9,820",
    percentage: "+18%",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500",
  },
]);

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [5000, 7000, 8000, 12000, 15000, 20000],
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Sales",
            data: [100, 150, 200, 250, 300, 350],
            borderColor: "#F59E0B",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
});
</script>
