<template>
  
  <nav class="flex justify-between items-center p-6 shadow-md bg-white text-lg font-bold font-sans relative">
    <!-- Logo Section -->
    <div class="flex items-center space-x-2">
      <img :src="Logo" alt="Logo" class="w-10" />
      <img :src="seamless" alt="SeamLess Logo" class="h-5 mb-2" />
    </div>

    <!-- Navigation Links for Large Screens -->
    <ul class="hidden md:flex space-x-6 text-gray-700">
      <RouterLink to="/" class="hover:text-purple-600 transition duration-500">Home</RouterLink>
      <RouterLink to="/about" class="hover:text-purple-600 transition duration-500">About Us</RouterLink>
      <RouterLink to="/find-garments" class="hover:text-purple-600 transition duration-500">Find Garments</RouterLink>
      <RouterLink to="/find-tailors" class="hover:text-purple-600 transition duration-500">Find Tailors</RouterLink>
      <RouterLink to="/contact" class="hover:text-purple-600 transition duration-500">Contact Us</RouterLink>
    </ul>

    <!-- Sign In Button -->
    <RouterLink to="/login" class="hidden md:block">
      <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
        Sign In
      </button>
    </RouterLink>

    <!-- Hamburger Icon (Visible on Small Screens) -->
    <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
      <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Navigation Menu -->
    <div v-if="menuOpen" class=" absolute top-16 right-0 w-full bg-white shadow-md md:hidden flex flex-col space-y-4 p-6">
      <RouterLink to="/" class="hover:text-purple-600 transition duration-500" @click="toggleMenu">Home</RouterLink>
      <RouterLink to="/about" class="hover:text-purple-600 transition duration-500" @click="toggleMenu">About Us</RouterLink>
      <RouterLink to="/find-garments" class="hover:text-purple-600 transition duration-500" @click="toggleMenu">Find Garments</RouterLink>
      <RouterLink to="/find-tailors" class="hover:text-purple-600 transition duration-500" @click="toggleMenu">Find Tailors</RouterLink>
      <RouterLink to="/contact" class="hover:text-purple-600 transition duration-500" @click="toggleMenu">Contact Us</RouterLink>
      <RouterLink to="/login">
        <button class="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700">
          Sign In
        </button>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import Logo from "@/assets/images/Logo.png";
import seamless from "@/assets/SeamLess..png";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style lang="scss" scoped></style>
