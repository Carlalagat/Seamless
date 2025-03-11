<template>
  <nav
    class="relative flex items-center justify-between p-6 shadow-md bg-white"
  >
    <!-- Logo and Title -->
    <div class="flex items-center space-x-2">
      <img :src="Logo" alt="Logo" class="w-12" />
      <img :src="logo" alt="SeamLess Logo" class="h-6 mb-2" />
      
    </div>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex space-x-6 text-gray-700">
      <li>
        <RouterLink
          to="/"
          class="hover:text-purple-600"
          active-class="text-purple-600 font-bold"
          exact
        >
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/about"
          class="hover:text-purple-600"
          active-class="text-purple-600 font-bold"
        >
          About Us
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/find-garments"
          class="hover:text-purple-600"
          active-class="text-purple-600 font-bold"
        >
          Find Garments
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/find-tailors"
          class="hover:text-purple-600"
          active-class="text-purple-600 font-bold"
        >
          Find Tailors
        </RouterLink>
      </li>
<!-- Desktop Navigation for Measurement -->
<li>

  <RouterLink
    to="/measurements"
    class="hover:text-purple-600"
    active-class="text-purple-600 font-bold"
  >
    Measurements
  </RouterLink>
</li>

<!-- In Mobile Menu Dropdown for Measurement -->
<!-- <li>
  <RouterLink
    to="/measurements"
    class="hover:text-purple-600"
    active-class="text-purple-600 font-bold"
    @click="toggleMobileMenu"
  >
    Measurements
  </RouterLink>
</li> -->
      <li>
        <RouterLink
          to="/contact"
          class="hover:text-purple-600"
          active-class="text-purple-600 font-bold"
        >
          Contact Us
        </RouterLink>
      </li>
    </ul>

    <!-- Auth Buttons (Desktop) -->
    <div class="hidden md:flex items-center space-x-4">
      <template v-if="!isAuthenticated">
        <RouterLink to="/login">
          <button
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Sign In
          </button>
        </RouterLink>
      </template>
      <template v-else>
        <span class="mr-4 text-gray-800">{{ userDisplayName }}</span>
        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </template>
    </div>

    <!-- Mobile Menu Toggle Button -->
    <div class="md:hidden">
      <button
        @click="toggleMobileMenu"
        class="text-gray-800 text-2xl focus:outline-none"
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
        <li>
          <RouterLink
            to="/"
            class="hover:text-purple-600"
            active-class="text-purple-600 font-bold"
            exact
            @click="toggleMobileMenu"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/about"
            class="hover:text-purple-600"
            active-class="text-purple-600 font-bold"
            @click="toggleMobileMenu"
          >
            About Us
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/find-garments"
            class="hover:text-purple-600"
            active-class="text-purple-600 font-bold"
            @click="toggleMobileMenu"
          >
            Find Garments
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/find-tailors"
            class="hover:text-purple-600"
            active-class="text-purple-600 font-bold"
            @click="toggleMobileMenu"
          >
            Find Tailors
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/contact"
            class="hover:text-purple-600"
            active-class="text-purple-600 font-bold"
            @click="toggleMobileMenu"
          >
            Contact Us
          </RouterLink>
        </li>
        <template v-if="!isAuthenticated">
          <li>
            <RouterLink
              to="/login"
              class="hover:text-purple-600"
              active-class="text-purple-600 font-bold"
              @click="toggleMobileMenu"
            >
              Sign In
            </RouterLink>
          </li>
        </template>
        <template v-else>
          <li class="flex items-center justify-between">
            <span>{{ userDisplayName }}</span>
            <button
              @click="logout"
              class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import Logo from "@/assets/images/Logo.png";
import logo from '@/assets/SeamLess..png';
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const mobileMenuOpen = ref(false);

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
/* Additional custom styles if needed */
</style>
