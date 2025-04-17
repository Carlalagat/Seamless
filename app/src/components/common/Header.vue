<template>
  <nav
    class="relative flex items-center justify-between p-6 shadow-md bg-gradient-to-r from-white to-gray-50"
  >
    <!-- Logo and Title -->
    <div class="flex items-center space-x-2">
      <RouterLink
        to="/"
        class="cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-lg"
      >
        <img
          :src="logo"
          alt="SeamLess Logo"
          class="h-6 mb-2 transition-transform"
        />
      </RouterLink>
    </div>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex space-x-6 text-gray-700">
      <li v-for="route in routes" :key="route.path">
        <RouterLink
          :to="route.path"
          class="relative group text-gray-700 transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 font-medium"
          active-class="text-purple-600 font-bold"
          :exact="route.exact"
        >
          {{ route.name }}
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          ></span>
        </RouterLink>
      </li>
    </ul>

    <!-- Auth Buttons (Desktop) -->
    <div class="hidden md:flex items-center space-x-4">
      <template v-if="!isAuthenticated">
        <RouterLink to="/login">
          <button
            class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
          >
            Sign In
          </button>
        </RouterLink>
      </template>
      <template v-else>
        <span
          class="mr-4 text-gray-800 hover:text-purple-600 transition-colors"
          >{{ userDisplayName }}</span
        >
        <button
          @click="logout"
          class="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-6 rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
        >
          Logout
        </button>
      </template>
    </div>

    <!-- Mobile Menu Toggle Button -->
    <div class="md:hidden">
      <button
        @click="toggleMobileMenu"
        class="text-gray-800 text-2xl focus:outline-none transition-transform hover:rotate-90"
      >
        <span v-if="mobileMenuOpen">✖</span>
        <span v-else>☰</span>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-if="mobileMenuOpen"
      class="absolute top-full left-0 w-full bg-white shadow-md md:hidden"
    >
      <ul class="flex flex-col space-y-2 p-4 text-gray-700">
        <li v-for="route in routes" :key="route.path">
          <RouterLink
            :to="route.path"
            class="block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 py-2"
            active-class="text-purple-600 font-bold"
            :exact="route.exact"
            @click="toggleMobileMenu"
          >
            {{ route.name }}
          </RouterLink>
        </li>
        <template v-if="!isAuthenticated">
          <li>
            <RouterLink
              to="/login"
              class="block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 py-2"
              active-class="text-purple-600 font-bold"
              @click="toggleMobileMenu"
            >
              Sign In
            </RouterLink>
          </li>
        </template>
        <!-- <template v-else>
          <li class="flex items-center justify-between">
            <span>{{ userDisplayName }}</span>
            <button
              @click="logout"
              class="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-500"
            >
              Logout
            </button>
          </li>
        </template> -->
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import logo from "@/assets/SeamLess..png";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const mobileMenuOpen = ref(false);

const routes = [
  { path: "/", name: "Home", exact: true },
  { path: "/about", name: "About Us" },
  { path: "/find-garments", name: "Find Garments" },
  { path: "/find-tailors", name: "Find Tailors" },
  { path: "/measurements", name: "Measurements" },
  { path: "/contact", name: "Contact Us" },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Computed: Check if user is authenticated
const isAuthenticated = computed(() => !!authStore.user);

// Computed: Get user's display name (username if available, otherwise email)
const userDisplayName = computed(() => {
  const user = authStore.user;
  if (!user) return "";
  return user.username || user.email;
});

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
