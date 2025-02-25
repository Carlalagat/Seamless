import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers";
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore("users", () => {
  const users = ref({});

  async function getAll() {
    users.value = { loading: true };
    fetchWrapper
      .get(baseUrl)
      .then((fetchedUsers) => (users.value = fetchedUsers))
      .catch((error) => (users.value = { error }));
  }

  return { users, getAll };
});
