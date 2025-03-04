<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white shadow rounded p-8">
      <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold mb-4">Client Dashboard</h1>
      <button 
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <p>
        Welcome, {{ userName }}! You are logged in as a
        <span class="font-semibold">CLIENT</span>.
      </p>
      <!-- Client-specific content -->
      <div class="mt-6">
        <p>Here you can view your orders, profile, and more.</p>
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
  if (!u) return "Client";
  // If stored as string, parse it
  if (typeof u === "string") {
    try {
      u = JSON.parse(u);
    } catch (err) {
      console.error("Error parsing user:", err);
      return "Client";
    }
  }
  return u.username || u.email || "Client";
});

const logout = () => {
  authStore.logout();
};
</script>
