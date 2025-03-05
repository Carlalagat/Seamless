<template>
   <nav class="flex justify-between items-center p-6 shadow-md bg-white">
    <div class="flex items-center space-x-2">
      <!-- <img src="/logo.png" alt="Logo" class="h-8" /> -->
      <span class="text-xl font-bold text-gray-800">Seam<span class="text-purple-600">Less</span></span>
    </div>
    <ul class="hidden md:flex space-x-6 text-gray-700">
      <RouterLink to="/" class="hover:text-purple-600">Home</RouterLink>
     <RouterLink to ="/" class="hover:text-purple-600">About Us</RouterLink>
     <RouterLink to ="/" class="hover:text-purple-600">Find Garments</RouterLink>
     <RouterLink to ="/" class="hover:text-purple-600">Find Tailors</RouterLink>
     <RouterLink to ="/" class="hover:text-purple-600">Contact Us</RouterLink>
      
    </ul>
    
    <RouterLink to="/login">
      <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign In</button>
    </RouterLink>
  </nav>
</template>

<script setup></script>
export default {
  name: "NavbarComponent",
};
<style lang="scss" scoped></style>
