<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- Hamburger menu button for mobile -->
    <button
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md shadow-md"
      aria-label="Menu"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <Sidebar
      :isOpen="sidebarOpen"
      @toggleSidebar="toggleSidebar"
      :activeContent="activeContent"
      @update:activeContent="updateActiveContent"
    />

    <!-- Main Content - now with proper margin for fixed sidebar -->
    <div class="flex-1 md:ml-64 min-h-screen">
      <!-- Dashboard Content -->
      <div class="p-4 sm:p-6" v-if="activeContent.name === 'Dashboard'">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
              Tailor Dashboard
            </h1>
            <p class="text-sm sm:text-base text-gray-500">
              Manage your orders and clients
            </p>
          </div>
          <div class="relative">
            <span v-if="loading" class="inline-block text-purple-600">
              <i class="fas fa-spinner fa-spin"></i> Loading...
            </span>
            <button
              v-else
              @click="refreshDashboard"
              class="bg-purple-100 text-purple-600 p-2 rounded-full hover:bg-purple-200 transition-all"
              title="Refresh Data"
            >
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <!-- Stats Overview Cards -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6"
        >
          <div
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">
              Pending Orders
            </h3>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">
              {{ statsData.pendingOrders }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ statsData.pendingOrdersPercentage }} from last month
            </p>
          </div>

          <div
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">
              Completed Orders
            </h3>
            <p class="text-2xl sm:text-3xl font-bold text-green-600">
              {{ statsData.completedOrders }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ statsData.completedOrdersPercentage }} from last month
            </p>
          </div>

          <div
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">
              New Clients
            </h3>
            <p class="text-2xl sm:text-3xl font-bold text-purple-600">
              {{ statsData.newClients }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ statsData.newClientsPercentage }} from last month
            </p>
          </div>

          <div
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-700">
              Earnings This Month
            </h3>
            <p class="text-2xl sm:text-3xl font-bold text-yellow-600">
              {{ formatCurrency(statsData.earnings) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ statsData.earningsPercentage }} from last month
            </p>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg sm:text-2xl font-bold text-gray-800">
              Recent Orders
            </h2>
            <RouterLink
              to="/orders"
              class="text-purple-600 hover:text-purple-800 text-sm flex items-center"
            >
              View All <i class="fas fa-arrow-right ml-1"></i>
            </RouterLink>
          </div>

          <div v-if="loadingRecentOrders" class="text-center py-8">
            <i class="fas fa-spinner fa-spin text-purple-500 text-2xl"></i>
            <p class="mt-2 text-gray-500">Loading recent orders...</p>
          </div>

          <div v-else-if="recentOrdersError" class="text-center py-8">
            <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
            <p class="mt-2 text-red-500">{{ recentOrdersError }}</p>
            <button
              @click="fetchRecentOrders"
              class="mt-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>

          <div
            v-else-if="recentOrdersData.length === 0"
            class="text-center py-8"
          >
            <i class="fas fa-inbox text-gray-400 text-2xl"></i>
            <p class="mt-2 text-gray-500">No recent orders found</p>
          </div>

          <table v-else class="w-full text-left">
            <thead>
              <tr class="text-gray-600 border-b">
                <th class="p-2">Client</th>
                <th class="p-2">Garment</th>
                <th class="p-2">Status</th>
                <th class="p-2">Due Date</th>
                <th class="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in recentOrdersData"
                :key="order.id"
                class="border-t hover:bg-gray-50"
              >
                <td class="p-2">{{ order.client }}</td>
                <td class="p-2">{{ order.garment }}</td>
                <td class="p-2">
                  <span
                    class="px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="p-2">{{ formatDate(order.dueDate) }}</td>
                <td class="p-2 text-right">
                  <button
                    @click="viewOrderDetails(order.id)"
                    class="text-blue-500 hover:text-blue-700 mr-2"
                    title="View Details"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    @click="editOrder(order.id)"
                    class="text-purple-500 hover:text-purple-700"
                    title="Edit Order"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Orders Chart -->
        <div class="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg sm:text-2xl font-bold text-gray-800">
              Monthly Orders
            </h2>
            <div class="flex gap-2">
              <select
                v-model="chartTimeframe"
                @change="fetchChartData"
                class="text-sm border rounded-md px-2 py-1 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="6">Last 6 Months</option>
                <option value="12">Last 12 Months</option>
                <option value="3">Last 3 Months</option>
              </select>
            </div>
          </div>

          <div
            v-if="loadingChartData"
            class="w-full h-52 sm:h-64 flex items-center justify-center"
          >
            <i class="fas fa-spinner fa-spin text-purple-500 text-2xl"></i>
          </div>

          <div
            v-else-if="chartError"
            class="w-full h-52 sm:h-64 flex flex-col items-center justify-center"
          >
            <i class="fas fa-chart-bar text-red-400 text-2xl mb-2"></i>
            <p class="text-red-500">Unable to load chart data</p>
            <button
              @click="fetchChartData"
              class="mt-2 bg-purple-100 text-purple-600 px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>

          <div v-else class="w-full h-52 sm:h-64">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useRouter } from "vue-router";
import Sidebar from "./Sidebar.vue";
import { useOrdersStore } from "@/store";
import { useUsersStore } from "@/store";
import { useAuthStore } from "@/store";
import { get } from "../../providers/api/main";

Chart.register(...registerables);

const router = useRouter();
const ordersStore = useOrdersStore();
const usersStore = useUsersStore();
const authStore = useAuthStore();

// Check if user is authenticated
const checkAuth = computed(() => {
  if (!authStore.access_token) {
    router.push("/login");
    return false;
  }
  return true;
});

const chartCanvas = ref(null);
const sidebarOpen = ref(false);
const activeContent = ref({ name: "Dashboard" });
const loading = ref(false);
const error = ref(null);

// Chart data
const chartTimeframe = ref(6); // Default to 6 months
const chartData = ref(null);
const loadingChartData = ref(false);
const chartError = ref(null);

// Stats data with defaults
const statsData = ref({
  pendingOrders: 0,
  pendingOrdersPercentage: "0%",
  completedOrders: 0,
  completedOrdersPercentage: "0%",
  newClients: 0,
  newClientsPercentage: "0%",
  earnings: 0,
  earningsPercentage: "0%",
});

// Recent orders data
const recentOrdersData = ref([]);
const loadingRecentOrders = ref(false);
const recentOrdersError = ref(null);

// Chart instance reference
let chartInstance = null;

// Toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Update active content
const updateActiveContent = (newContent) => {
  activeContent.value = newContent;
};

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

// Get status class for styling
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "in progress":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-green-100 text-green-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Fetch dashboard stats
const fetchDashboardStats = async () => {
  loading.value = true;
  error.value = null;

  try {
    const statsResponse = await get("api/dashboard/stats");
    statsData.value = statsResponse.data;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    error.value = err.response ? err.response.data.message : err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch recent orders
const fetchRecentOrders = async () => {
  loadingRecentOrders.value = true;
  recentOrdersError.value = null;

  try {
    const response = await get("api/orders/recent");
    recentOrdersData.value = response.data;
  } catch (err) {
    console.error("Error fetching recent orders:", err);
    recentOrdersError.value = err.response
      ? err.response.data.message
      : err.message;
  } finally {
    loadingRecentOrders.value = false;
  }
};

// Fetch chart data
const fetchChartData = async () => {
  loadingChartData.value = true;
  chartError.value = null;

  try {
    const response = await get(
      `api/dashboard/chart?months=${chartTimeframe.value}`
    );
    chartData.value = response.data;
    updateChart();
  } catch (err) {
    console.error("Error fetching chart data:", err);
    chartError.value = err.response ? err.response.data.message : err.message;
  } finally {
    loadingChartData.value = false;
  }
};

// Update chart with new data
const updateChart = () => {
  if (!chartCanvas.value || !chartData.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: chartData.value.labels,
      datasets: [
        {
          label: "Orders",
          data: chartData.value.orders,
          backgroundColor: "#6366F1",
          borderWidth: 0,
          borderRadius: 4,
        },
        {
          label: "Revenue",
          data: chartData.value.revenue,
          backgroundColor: "#10B981",
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.dataset.label === "Revenue") {
                return label + formatCurrency(context.raw);
              }
              return label + context.raw;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      animation: {
        duration: 1000,
      },
    },
  });
};

// View order details
const viewOrderDetails = (orderId) => {
  router.push(`/orders/${orderId}`);
};

// Edit order
const editOrder = (orderId) => {
  router.push(`/orders/${orderId}/edit`);
};

// Refresh all dashboard data
const refreshDashboard = async () => {
  await Promise.all([
    fetchDashboardStats(),
    fetchRecentOrders(),
    fetchChartData(),
  ]);
};

// Lifecycle hooks
onMounted(async () => {
  refreshDashboard();
});

// Watch for chart timeframe changes
watch(chartTimeframe, () => {
  fetchChartData();
});
</script>

<style scoped>
/* Fix for scroll issue */
html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  overflow: hidden;
}

.min-h-screen {
  height: 100vh;
  overflow-y: auto;
}

.dashboard-container {
  min-height: 100vh;
}

/* Adding animation for stats cards */
.bg-white {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.bg-white:hover {
  transform: translateY(-3px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-container {
  position: relative;
  height: 300px;
  animation: fadeIn 0.5s ease-out;
}

/** media query */
@media (min-width: 768px) {
  .md\:ml-64 {
    margin-left: 16rem;
  }
}
</style>
