<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
      <div v-if="loading" class="text-center text-lg text-gray-700">
        Verifying your account...
      </div>
      <div v-else>
        <p v-if="message" class="text-green-600 text-center">{{ message }}</p>
        <p v-else-if="error" class="text-red-600 text-center">{{ error }}</p>
        <div class="mt-4 text-center">
          <router-link to="/login" class="text-indigo-600 hover:underline"
            >Go to Login</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/providers/api/axios";
import { useRoute } from "vue-router";

const loading = ref(true);
const message = ref("");
const error = ref("");
const route = useRoute();

onMounted(async () => {
  const token = route.params.token;
  try {
    const response = await axiosInstance.get(`api/auth/verify/${token}`);
    message.value = response.data.message || "Account verified successfully!";
  } catch (err) {
    error.value = err.response?.data?.error || "Verification failed.";
  } finally {
    loading.value = false;
  }
});
</script>
