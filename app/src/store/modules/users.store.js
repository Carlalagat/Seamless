import { ref } from "vue";
import { defineStore } from "pinia";
import { post, get, patch, deleteItem } from "../../providers/api/main";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore(
  "users",
  () => {
    const users = ref([]);
    const newUsersCount = ref(0);
    const loading = ref(false);
    const error = ref(null);

    async function getAll() {
      loading.value = true;
      error.value = null;

      try {
        const response = await get("api/users");
        users.value = response.data;
        return response.data;
      } catch (err) {
        console.error("Error fetching users:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function fetchNewUsersCount() {
      try {
        const response = await get("api/users/new-count");
        newUsersCount.value = response.data.count;
        return response.data;
      } catch (err) {
        console.error("Error fetching new users count:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function createUser(userData) {
      try {
        const response = await post("api/users", userData);
        return response.data;
      } catch (err) {
        console.error("Error creating user:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function updateUser(userId, userData) {
      try {
        const response = await patch(`api/users/${userId}`, userData);
        return response.data;
      } catch (err) {
        console.error("Error updating user:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function deleteUser(userId) {
      try {
        await deleteItem(`api/users/${userId}`);
        // Remove from local state
        users.value = users.value.filter((user) => user.id !== userId);
      } catch (err) {
        console.error("Error deleting user:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    return {
      users,
      newUsersCount,
      loading,
      error,
      getAll,
      fetchNewUsersCount,
      createUser,
      updateUser,
      deleteUser,
    };
  },
  {
    persist: {
      key: "users-store",
      storage: localStorage,
      paths: ["users", "newUsersCount"], // Only persist these specific properties
    },
  }
);
