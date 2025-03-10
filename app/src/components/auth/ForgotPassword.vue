<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      <form @submit.prevent="handleForgotPassword" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Send Reset Link
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
import { ref } from "vue";
import axiosInstance from "@/providers/api/axios";

const email = ref("");
const message = ref("");
const error = ref("");

const handleForgotPassword = async () => {
  message.value = "";
  error.value = "";
  try {
    const response = await axiosInstance.post("api/auth/forgot-password", {
      email: email.value,
    });
    message.value = response.data.message;
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to send reset link.";
  }
};
</script>
