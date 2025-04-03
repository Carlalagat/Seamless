<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div v-if="loading" class="text-center">
        <div class="animate-pulse">
          <div class="h-8 w-8 mx-auto mb-4 rounded-full bg-purple-200"></div>
          <p class="text-gray-600">Verifying your account...</p>
        </div>
      </div>

      <div v-else-if="!verified" class="space-y-4">
        <h2 class="text-2xl font-bold text-center mb-4">Verify Account</h2>

        <div
          v-if="error"
          class="text-red-600 bg-red-50 p-4 rounded-lg text-center"
        >
          <p class="font-medium mb-4">{{ error }}</p>
          <button
            @click="redirectToLogin"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
          >
            Return to Login
          </button>
        </div>
      </div>

      <div v-else class="text-center space-y-4">
        <svg
          class="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <p class="mt-4 text-lg font-medium text-gray-900">{{ message }}</p>
        <p class="text-sm text-gray-600">
          You will be redirected to login in a moment...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/providers/api/axios";
import { useRoute, useRouter } from "vue-router";

const loading = ref(true);
const verified = ref(false);
const message = ref("");
const error = ref("");
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const token = route.query.token || route.params.token;

  try {
    const response = await axiosInstance.post("api/auth/verify", {
      token,
    });
    message.value = response.data.message || "Account verified successfully!";
    verified.value = true;

    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (err) {
    error.value = err.response?.data?.error || "Verification failed.";
    verified.value = false;
  } finally {
    loading.value = false;
  }
});

const redirectToLogin = () => {
  router.push("/login");
};
</script>
