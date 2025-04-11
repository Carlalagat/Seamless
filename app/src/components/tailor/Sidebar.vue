<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />

  <!-- Sidebar Overlay (Mobile) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black opacity-50 md:hidden z-20"
    @click="toggleSidebar"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'bg-gray-200 fixed left-0 top-0 h-screen overflow-y-auto w-64 p-6 shadow-lg transition-transform duration-300 z-30',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
  >
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 md:hidden text-gray-600"
      aria-label="Close sidebar"
    >
      <i class="fas fa-times text-2xl"></i>
    </button>
    <RouterLink to="/client-dashboard" class="flex items-center justify-center mb-2">
      <img src="@/assets/logo.png" alt="SeamLess" class="w-40" />
    </RouterLink>
    <nav class="mt-8">
      <ul class="space-y-2">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="[
            'flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-purple-100 transition-all duration-300',
            activeContent.name === item.name ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
          ]"
          @click="setActiveContent(item.content)"
        >
          <i :class="[item.iconClass, 'w-5 text-center']"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </nav>
    <div class="mt-auto border-t pt-6 mt-8">
      <div class="flex items-center p-3 rounded-lg mb-4 w-full">
        <div
          v-if="!authUser.profileImage"
          class="rounded-full w-12 h-12 bg-purple-600 flex items-center justify-center text-white font-bold text-xl mr-3"
        >
          {{ userInitials }}
        </div>
        <img
          v-else
          :src="authUser.profileImage"
          class="rounded-full w-12 h-12 object-cover mr-3"
          :alt="authUser.username"
        />
        <div class="flex flex-col">
          <h4 class="font-semibold text-gray-800">{{ authUser.username || 'User' }}</h4>
          <p class="text-xs text-gray-500">{{ authUser.email || 'email@example.com' }}</p>
        </div>
      </div>
      <button
        @click="handleLogout"
        class="w-full text-white bg-red-600 shadow-md p-3 rounded-lg items-center justify-center flex font-medium hover:bg-red-700 transition-all duration-300 gap-2"
        id="logout"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  </aside>
  <div
    class="md:pl-64 w-full"
    id="maincontent"
    v-show="activeContent.name !== 'Dashboard'"
  >
    <component :is="activeContent.component" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";

// Import components
import Customers from "./Customers.vue";
import Orders from "./Orders.vue";
import Products from "./Products.vue";
import Chats from "./Chats.vue";
import Profile from "./Profile.vue";

const router = useRouter();
const authStore = useAuthStore();

// Props for Sidebar visibility
const props = defineProps({
  isOpen: Boolean,
  activeContent: Object,
});

// Emit function to toggle the sidebar
const emit = defineEmits(["toggleSidebar", "update:activeContent"]);
const toggleSidebar = () => {
  emit("toggleSidebar");
};

// Auth user from store
const authUser = computed(() => authStore.user || {});

// Get user initials for avatar
const userInitials = computed(() => {
  if (!authUser.value || !authUser.value.username) return "";
  return authUser.value.username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
});

// Logout function
const handleLogout = () => {
  authStore.logout();
};

// Profile navigation
const navigateToProfile = () => {
  setActiveContent({ name: "Profile", component: Profile });
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Menu items with FontAwesome icons for better visibility
const menuItems = [
  {
    name: "Dashboard",
    iconClass: "fas fa-home",
    content: {
      name: "Dashboard",
      component: { template: "<div>Dashboard Content</div>" },
      content: "Social Media Feed, Promotions, and Legal/Compliance",
    },
  },
  {
    name: "Orders",
    iconClass: "fas fa-shopping-cart",
    content: {
      name: "Orders",
      component: Orders,
      title: "Your Orders",
      content: "Here are your orders and details.",
    },
  },
  {
    name: "Products",
    iconClass: "fas fa-list",
    content: {
      name: "Products",
      component: Products,
      title: "",
      content: "Add and update products.",
    },
  },
  {
    name: "Customers",
    iconClass: "fas fa-users",
    content: {
      name: "Customers",
      component: Customers,
      title: "Customer Insights",
      content: "Manage and view customer data.",
    },
  },
  {
    name: "Chats",
    iconClass: "fas fa-comment-dots",
    content: {
      name: "Chats",
      component: Chats,
      title: "",
      content: "Manage Notifications.",
    },
  },
  {
    name: "Profile",
    iconClass: "fas fa-user",
    content: {
      name: "Profile",
      component: Profile,
      title: "Your Profile",
      content: "View and update your profile.",
    },
  },
];

// set active content and handle sidebar toggle for mobile view
const setActiveContent = (content) => {
  emit("update:activeContent", content);
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Handle resizing for mobile view
const isMobile = ref(window.innerWidth <= 768);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};
window.addEventListener("resize", updateIsMobile);
onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<style scoped>
/* Fixed sidebar style */
aside {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  aside {
    width: 250px;
  }
}

/* Active menu item animation */
.active-item {
  position: relative;
}

.active-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #8b5cf6;
  border-radius: 0 4px 4px 0;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Improved scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
