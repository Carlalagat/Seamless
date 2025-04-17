import { ref } from "vue";
import { defineStore } from "pinia";
import { get, post, patch, deleteItem } from "../../providers/api/main";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useOrdersStore = defineStore(
  "orders",
  () => {
    const orders = ref([]);
    const stats = ref({
      pending: 0,
      completed: 0,
      total: 0,
    });
    const recentOrders = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);

    async function fetchAllOrders(page = 1, filters = {}) {
      loading.value = true;
      error.value = null;

      try {
        let queryParams = new URLSearchParams();
        queryParams.append("page", page);

        if (filters.status) queryParams.append("status", filters.status);
        if (filters.sort) queryParams.append("sort", filters.sort);
        if (filters.search) queryParams.append("search", filters.search);

        const response = await get(`api/orders?${queryParams.toString()}`);
        orders.value = response.data.orders;
        currentPage.value = response.data.currentPage;
        totalPages.value = response.data.totalPages;
        return response.data;
      } catch (err) {
        console.error("Error fetching orders:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function fetchOrderStats() {
      try {
        const response = await get("api/orders/stats");
        stats.value = response.data;
        return response.data;
      } catch (err) {
        console.error("Error fetching order stats:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function fetchRecentOrders() {
      try {
        const response = await get("api/orders/recent");
        recentOrders.value = response.data;
        return response.data;
      } catch (err) {
        console.error("Error fetching recent orders:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function createOrder(orderData) {
      try {
        const response = await post("api/orders", orderData);
        return response.data;
      } catch (err) {
        console.error("Error creating order:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function updateOrder(orderId, orderData) {
      try {
        const response = await patch(`api/orders/${orderId}`, orderData);
        return response.data;
      } catch (err) {
        console.error("Error updating order:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function getOrderById(orderId) {
      try {
        const response = await get(`api/orders/${orderId}`);
        return response.data;
      } catch (err) {
        console.error(`Error fetching order ${orderId}:`, err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function deleteOrder(orderId) {
      try {
        await deleteItem(`api/orders/${orderId}`);
        // Remove from local state
        orders.value = orders.value.filter((order) => order.id !== orderId);
      } catch (err) {
        console.error("Error deleting order:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    return {
      orders,
      stats,
      recentOrders,
      loading,
      error,
      currentPage,
      totalPages,
      fetchAllOrders,
      fetchOrderStats,
      fetchRecentOrders,
      createOrder,
      updateOrder,
      getOrderById,
      deleteOrder,
    };
  },
  {
    persist: {
      key: "orders-store",
      storage: localStorage,
      paths: ["orders", "stats", "recentOrders", "currentPage", "totalPages"], // Persist relevant order data
    },
  }
);
