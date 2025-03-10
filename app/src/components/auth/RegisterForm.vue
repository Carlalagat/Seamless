<template>
  <div
    class="min-h-screen flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Username -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Enter your username"
            :class="{ 'border-red-500': v$.username.$error }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div v-if="v$.username.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.username.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>
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
        <!-- Phone Number -->
        <div>
          <label
            for="phoneNumber"
            class="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            v-model="formData.phoneNumber"
            placeholder="Enter your phone number"
            :class="{ 'border-red-500': v$.phoneNumber.$error }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div v-if="v$.phoneNumber.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.phoneNumber.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>
        <!-- Role Selection -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            v-model="formData.role"
            :class="{ 'border-red-500': v$.role.$error }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="CLIENT">Client</option>
            <!-- <option value="ADMIN">Admin</option> -->
            <option value="TAILOR">Tailor</option>
          </select>
          <div v-if="v$.role.$error" class="mt-1 text-red-500 text-xs">
            <span v-for="error in v$.role.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
        </div>
        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            :class="{ 'border-red-500': v$.password.$error }"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            Sign Up
          </button>
        </div>
      </form>
      <!-- Loading Indicator -->
      <div v-if="loading" class="mt-4 text-center text-gray-700">
        Signing up...
      </div>
      <!-- Error Message -->
      <div v-if="error" class="mt-4 text-center text-red-500">
        {{ error }}
      </div>
      <!-- Link to Login -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
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
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const formData = reactive({
  username: "",
  email: "",
  phoneNumber: "",
  role: "CLIENT",
  password: "",
});

const rules = computed(() => ({
  username: { required },
  email: { required, email },
  phoneNumber: { required },
  role: { required },
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
    await authStore.signup(formData);
  } catch (err) {
    console.error("Signup error:", err);
  } finally {
    loading.value = false;
  }
};
</script>
