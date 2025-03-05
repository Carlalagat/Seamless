<template>
  <nav class="flex justify-between items-center p-6 shadow-md bg-white">
    <div class="flex items-center space-x-2">
      <img :src="Logo" alt="Logo" class="w-12" />
      <span class="text-xl font-bold text-gray-800"
        >Seam<span class="text-purple-600">Less</span></span
      >
    </div>
    <ul class="hidden md:flex space-x-6 text-gray-700">
      <RouterLink to="/" class="hover:text-purple-600">Home</RouterLink>
      <RouterLink to="/about" class="hover:text-purple-600"
        >About Us</RouterLink
      >
      <RouterLink to="/find-garments" class="hover:text-purple-600"
        >Find Garments</RouterLink
      >
      <RouterLink to="/find-tailors" class="hover:text-purple-600"
        >Find Tailors</RouterLink
      >
      <RouterLink to="/contact" class="hover:text-purple-600"
        >Contact Us</RouterLink
      >
    </ul>

    <RouterLink to="/login">
      <button
        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        Sign In
      </button>
    </RouterLink>
  </nav>
</template>

<script setup>
import Logo from "@/assets/images/Logo.png";
</script>

<style lang="scss" scoped></style>
