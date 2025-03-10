<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Log In to Your Account
      </h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        
        <!-- Identifier Input -->
        <div>
          <label for="identifier" class="block text-sm font-medium text-gray-700"
            >Email or Username </label
          >
          <input
            type="text"
            id="identifier"
            v-model="formData.identifier"
            placeholder="Enter your email or username"
            :class="{
              'border-red-500': v$.identifier.$error,
              'focus:ring-purple-500 focus:border-purple-500': !v$.identifier.$error,
            }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
          />
          <div v-if="v$.identifier.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.identifier.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>
        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            :class="{
              'border-red-500': v$.password.$error,
              'focus:ring-purple-500 focus:border-purple-500':
                !v$.password.$error,
            }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
          />
          <div v-if="v$.password.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.password.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </div>
      </form>

      <!-- Loading Indicator -->
      <div v-if="loading" class="mt-4 text-center text-gray-700">
        Logging in...
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 text-center text-red-500">
        {{ error }}
      </div>

      <!-- Forgot Password Link -->
      <div class="mt-4 text-center">
        <router-link
          to="/forgot-password"
          class="text-sm text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </router-link>
      </div>

      <!-- Link to Signup -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const formData = reactive({
  identifier: "",
  password: "",
});

const rules = computed(() => ({
  identifier: { required },
  password: { required, minLength: minLength(3) },
}));

const v$ = useVuelidate(rules, formData);

const loading = ref(false);

onMounted(() => {
  authStore.error = null;
});

const error = computed(() => authStore.error);

const onSubmit = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;
  loading.value = true;
  try {
    await authStore.login(formData);
  } catch (err) {
    console.error("Login error caught in component:", err);
  } finally {
    loading.value = false;
  }
};
</script>
