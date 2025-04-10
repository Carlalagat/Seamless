<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Forgot Password
      </h2>
      <form @submit.prevent="handleForgotPassword" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            :class="{ 'border-red-500': v$.email.$error }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div v-if="v$.email.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.email.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Reset Link
        </button>
      </form>
      <!-- Loading Indicator -->
      <div v-if="loading" class="mt-4 text-center text-gray-700">
        Sending link...
      </div>
      <!-- Error Message -->
      <div v-if="error" class="mt-4 text-center text-red-500">
        {{ error }}
      </div>
      <!-- Link to Login -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Go back to login?
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </router-link>
        </p>
      </div>
    </div>
  </div>
  <NotificationPopup
    v-model="showSuccessPopup"
    title="Password Reset"
    :message="authStore.notificationMessage"
    @close="handlePopupClose"
  />
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";
import NotificationPopup from "../utils/NotificationPopup.vue";
import { post } from "../../providers/api/main";

const router = useRouter();
const authStore = useAuthStore();
const showSuccessPopup = ref(false);

const formData = reactive({
  email: "",
});

const rules = computed(() => ({
  email: { required, email },
}));

const v$ = useVuelidate(rules, formData);

const loading = ref(false);

onMounted(() => {
  authStore.error = null;
});

const error = computed(() => authStore.error);

const handleForgotPassword = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;

  loading.value = true;
  try {
    const response = await post("api/auth/forgot-password", {
      email: formData.email,
    });

    // Use the auth store to manage notification
    authStore.showNotification = true;
    authStore.notificationMessage =
      response.data.message || "Password reset link sent successfully!";

    showSuccessPopup.value = true;
  } catch (err) {
    console.error("Forgot password error:", err);
    authStore.error = err.response
      ? err.response.data.error || err.response.data.message
      : err.message;
  } finally {
    loading.value = false;
  }
};

const handlePopupClose = () => {
  router.push("/login");
};
</script>
