<template>
  <div class="px-8">
    <h1 class="text-red-700">Hi {{ user?.firstName }}!</h1>
    <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
    <h3>Users from secure api end point:</h3>
    <ul v-if="users">
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }}
      </li>
    </ul>
    <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
    <div v-if="users.error" class="text-danger">
      Error loading users: {{ users.error }}
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-2"
      @click="authStore.test()"
    >
      Test-API
    </button>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      @click="authStore.logout()"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuthStore, useUsersStore } from "../store";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();
const usersStore = useUsersStore();

onMounted(() => {
  usersStore.getAll();
});

const user = computed(() => {
  return JSON.parse(authStore.user);
});

const users = computed(() => {
  return usersStore.users;
});
usersStore.getAll();
</script>
