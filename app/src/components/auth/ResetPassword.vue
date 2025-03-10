<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Reset Password</h2>
      <form @submit.prevent="handleResetPassword" class="space-y-4">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >New Password</label
          >
          <input
            id="password"
            v-model="newPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your new password"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Reset Password
        </button>
      </form>
      <div v-if="message" class="mt-4 text-center text-green-600">
        {{ message }}
      </div>
      <div v-if="error" class="mt-4 text-center text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/providers/api/axios";

const newPassword = ref("");
const message = ref("");
const error = ref("");
const route = useRoute();

// Assume token is passed as a query param or route param
const token = route.query.token || route.params.token;

const handleResetPassword = async () => {
  message.value = "";
  error.value = "";
  try {
    const response = await axiosInstance.post("api/auth/reset-password", {
      token,
      newPassword: newPassword.value,
    });
    message.value = response.data.message;
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to reset password.";
  }
};
</script>
