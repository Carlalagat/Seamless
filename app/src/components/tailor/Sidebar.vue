<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />

  <!-- Sidebar Overlay (Mobile) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black opacity-50 md:hidden"
    @click="toggleSidebar"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'bg-gray-200 h-screen p-6 shadow-lg fixed md:static transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
    :style="{ height: isMobile && isOpen ? '' : '100vh' }"
  >
    <!-- Close Button (Mobile) -->
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 md:hidden text-gray-600"
      aria-label="Close sidebar"
    >
      <font-awesome-icon icon="times" class="text-2xl" />
    </button>

    <!-- Logo linking to Client Dashboard -->
    <RouterLink to="/client-dashboard" class="flex items-center space-x-2">
      <img src="@/assets/logo.png" alt="SeamLess" class="w-40 center" />
    </RouterLink>

    <!-- Navigation Menu -->
    <nav class="mt-8">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
          @click="activeContent = item.content"
        >
          <component :is="item.icon" />
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <!-- Profile Section -->
    <div class="mt-12 border-t pt-4">
      <div class="flex items-center space-x-3">
        <div class="flex flex-col mt-8 space-y-4">
          <img
            :src="user.profileImage || 'https://fakeimg.pl/40x40'"
            class="rounded-full w-10 h-10"
            :alt="user.username"
          />
          <h4 class="font-semibold">{{ user.username }}</h4>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
          <router-link
            to="/logout"
            class="text-white bg-red-600 p-2 space-x-2 rounded items-center justify-center flex font-bold"
            id="logout"
          >
            <i class="fa fa-sign-out"></i> <p>Logout</p>
          </router-link>
        </div>
      </div>
    </div>
  </aside>

  <div class="flex-1 p-6">
    <h1 class="text-2xl font-semibold">{{ activeContent }}</h1>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed, defineProps, defineEmits, onUnmounted } from 'vue';
import { useAuthStore } from '@/store';
import { Home, List, ShoppingCart, Users } from 'lucide-vue-next';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['toggleSidebar']);

const toggleSidebar = () => {
  emit('toggleSidebar');
};

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const menuItems = [
  { name: 'Dashboard', icon: Home, content: 'Welcome to the Dashboard!' },
  { name: 'Orders', icon: ShoppingCart, content: 'Here are your orders.' },
  { name: 'Products', icon: List, content: 'Manage your products here.' },
  { name: 'Customers', icon: Users, content: 'Customer details and insights.' },
];

const activeContent = ref(menuItems[0].content);

const isMobile = ref(window.innerWidth <= 768);

// Handle resize event for mobile view
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

window.addEventListener('resize', updateIsMobile);

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  transition: color 0.2s;
}

.sidebar-link:hover {
  color: #6b46c1;
}

.active {
  color: #6b46c1;
  font-weight: 600;
}

.badge {
  background-color: #6b46c1;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  margin-left: 0.5rem;
}

#logout {
  color: #f5f5f5;
}

#logout:hover {
  transform: translateY(-3px);
  color: #e0e0e0;
}

/* Mobile Sidebar Hidden by Default */
@media (max-width: 768px) {
  aside {
    width: 75%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
  }
}
</style>
