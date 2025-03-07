<template>
  <header
    class="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md"
  >
    <!-- Menu Button (Mobile) -->
    <button @click="toggleSidebar" class="md:hidden text-2xl">
      <font-awesome-icon icon="bars" />
    </button>

    <!-- Search Bar (Icon Only on Mobile) -->
    <div class="relative">
      <input
        v-if="!isMobile"
        type="text"
        placeholder="Search..."
        class="pl-10 pr-4 py-2 rounded-full bg-transparent border border-white text-white opacity-75 hidden md:block"
      />
      <font-awesome-icon
        :icon="isMobile ? 'search' : 'search'"
        class="absolute left-3 top-3 text-gray-300 cursor-pointer"
      />
    </div>

    <!-- Icons -->
    <div class="flex space-x-6 items-center">
      <font-awesome-icon icon="user" class="text-xl cursor-pointer" />
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isMobile = computed(() => window.innerWidth < 768);
</script>

<style scoped>
@media (max-width: 768px) {
  input {
    display: none;
  }
}
</style>
