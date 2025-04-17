<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md shadow-md"
      aria-label="Menu"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <Sidebar
      :isOpen="sidebarOpen"
      @toggleSidebar="toggleSidebar"
      :activeContent="activeContent || null"
      @update:activeContent="updateActiveContent"
    />

    <!-- Main Content Area -->
    <div class="flex-1 md:ml-64 min-h-screen p-4 sm:p-6">
      <!-- Render the active component -->
      <component
        v-if="activeContent && activeContent.component"
        :is="activeContent.component"
      />
      <!-- Fallback slot for direct content -->
      <slot v-else></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Sidebar from './Sidebar.vue';
import Dashboard from './Dashboard.vue'; // Import Dashboard as default view

const sidebarOpen = ref(false);
// Initialize with Dashboard as the default component
const activeContent = ref({
  name: "Dashboard",
  component: Dashboard,
  title: "Dashboard"
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const updateActiveContent = (newContent) => {
  activeContent.value = newContent;
};

// Provide active content and toggle methods to child components
provide('sidebarOpen', sidebarOpen);
provide('activeContent', activeContent);
provide('toggleSidebar', toggleSidebar);
provide('updateActiveContent', updateActiveContent);
</script>

<style scoped>
/* Fix for scroll issue */
html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  overflow: hidden;
}

.min-h-screen {
  height: 100vh;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .md\:ml-64 {
    margin-left: 16rem;
  }
}
</style>