<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white shadow rounded p-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <button 
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <p class="mb-4">
        Welcome, {{ userName }}! You are logged in as an
        <span class="font-semibold">ADMIN</span>.
      </p>
      <!-- Admin-specific content -->
      <div class="mt-6">
        <p>Here you can manage users, view reports, and more.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const userName = computed(() => {
  let u = authStore.user;
  // If no user, return default
  if (!u) return "Admin";
  // If stored as string, parse it
  if (typeof u === "string") {
    try {
      u = JSON.parse(u);
    } catch (err) {
      console.error("Error parsing user:", err);
      return "Admin";
    }
  }
  return u.username || u.email || "Admin";
});

const logout = () => {
  authStore.logout();
};
</script>
