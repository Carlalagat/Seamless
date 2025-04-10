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
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 md:hidden text-gray-600"
      aria-label="Close sidebar"
    >
      <font-awesome-icon icon="times" class="text-2xl" />
    </button>
    <RouterLink to="/client-dashboard" class="flex items-center space-x-2">
      <img src="@/assets/logo.png" alt="SeamLess" class="w-40 center" />
    </RouterLink>
    <nav class="mt-8">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:text-purple-700 transition duration-500"
          @click="setActiveContent(item.content)"
        >
          <component :is="item.icon" />
          {{ item.name }}
        </li>
      </ul>
    </nav>
    <div class="mt-12 border-t pt-4">
      <div
        class="flex items-center space-x-3 cursor-pointer hover:bg-gray-300 p-2 rounded-lg transition duration-200"
        @click="navigateToProfile"
      >
        <div class="flex flex-col space-y-4">
          <div
            v-if="!user.profileImage"
            class="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center text-white font-bold text-xl"
          >
            {{ userInitials }}
          </div>
          <img
            v-else
            :src="user.profileImage"
            class="rounded-full w-10 h-10 object-cover"
            :alt="user.username"
          />
          <h4 class="font-semibold">{{ user.username }}</h4>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
          <button
            @click.stop="logout"
            class="text-white bg-red-600 shadow-lg p-2 space-x-2 rounded items-center justify-center flex font-bold hover:bg-red-700 transition duration-200"
            id="logout"
          >
            <i class="fa fa-sign-out"></i>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  </aside>
  <div
    class="w-full p-6"
    id="maincontent"
    v-show="activeContent.name !== 'Dashboard'"
  >
    <component :is="activeContent.component" />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import {
  Home,
  List,
  MessageSquareIcon,
  ShoppingCart,
  Users,
} from "lucide-vue-next";

// Import new components
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

// Profile state
const showProfile = ref(false);
const user = computed(() => authStore.user);
const userInitials = computed(() => {
  if (!user.value.username) return "";
  return user.value.username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
});
const logout = () => {
  authStore.logout();
};

// Profile navigation
const navigateToProfile = () => {
  setActiveContent({ name: "Profile", component: Profile });
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Menu items with content linked to each section
const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    content: {
      name: "Dashboard",
      component: { template: "<div>Dashboard Content</div>" },
      content: "Social Media Feed, Promotions, and Legal/Compliance",
    },
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    content: {
      name: "Orders",
      component: Orders,
      title: "Your Orders",
      content: "Here are your orders and details.",
    },
  },
  {
    name: "Products",
    icon: List,
    content: {
      name: "Products",
      component: Products,
      title: "",
      content: "Add and update products.",
    },
  },
  {
    name: "Customers",
    icon: Users,
    content: {
      name: "Customers",
      component: Customers,
      title: "Customer Insights",
      content: "Manage and view customer data.",
    },
  },
  {
    name: "Chats",
    icon: MessageSquareIcon,
    content: {
      name: "Chats",
      component: Chats,
      title: "",
      content: "Manage Notifications.",
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
/* Styling for sidebar links */
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

/* Profile section styling */
.profile-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logout button styling */
#logout {
  color: #f5f5f5;
}

#logout:hover {
  transform: translateY(-3px);
  color: #e0e0e0;
}

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
