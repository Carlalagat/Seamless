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
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
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
          class="flex items-center gap-2 p-3 rounded-lg cursor-pointer  hover:text-purple-700 transition duration-500"
          @click="setActiveContent(item.content)"
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
        <div 
          v-if="!user.profileImage"
          class="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
          {{  userInitials }}
        </div>
          <img
            v-else
            :src="user.profileImage || 'https://fakeimg.pl/40x40'"
            class="rounded-full w-10 h-10"
            :alt="user.username"
          />
          <h4 class="font-semibold">{{ user.username }}</h4>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
          <button
            @click="logout"
            class="text-white bg-red-600 shadow-lg p-2 space-x-2 rounded items-center justify-center flex font-bold"
            id="logout"
          >
            <i class="fa fa-sign-out"></i> <p>Logout</p>
        </button>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <div class="w-full p-6" id="maincontent" v-show="activeContent.name !== 'Dashboard'">
    <h1 class="text-2xl font-semibold">{{ activeContent.title }}</h1>


    <!-- Display Orders when Orders Section is Active -->
    <div v-if="activeContent.name === 'Orders'" class="mt-6">
      <h2 class="text-xl font-semibold">Your Orders</h2>
      <p class="text-gray-600 mt-4">Here are the orders you placed.</p>
      
      <!-- Sample Orders List -->
      <ul class="mt-4 space-y-4">
        <li class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Order #12345</h3>
          <p class="text-sm text-gray-600">Placed on: 2025-03-20</p>
          <div class="mt-4">
            <h4 class="text-md font-semibold">Ordered Products:</h4>
            <ul class="space-y-2">
              <li class="flex items-center justify-between">
                <span>Product 1</span>
                <span>$29.99</span>
              </li>
              <li class="flex items-center justify-between">
                <span>Product 2</span>
                <span>$49.99</span>
              </li>
            </ul>
            <p class="mt-4 text-gray-800 font-semibold">Total: $79.98</p>
          </div>
        </li>

        <li class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Order #12346</h3>
          <p class="text-sm text-gray-600">Placed on: 2025-03-19</p>
          <div class="mt-4">
            <h4 class="text-md font-semibold">Ordered Products:</h4>
            <ul class="space-y-2">
              <li class="flex items-center justify-between">
                <span>Product 3</span>
                <span>$39.99</span>
              </li>
            </ul>
            <p class="mt-4 text-gray-800 font-semibold">Total: $39.99</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Display Products when Products Section is Active -->
    <div v-if="activeContent.name === 'Products'" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg p-4 bg-white shadow-lg"
      >
        <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">View Details</button>
        </div>
      </div>
    </div>

    <!-- Display Customers when Customers Section is Active -->
    <div v-if="activeContent.name === 'Customers'" class="mt-6">
      <h2 class="text-xl font-semibold">Customer Insights</h2>
      <p class="text-gray-600 mt-4">Here are the customer details and insights from recent interactions.</p>
      <ul class="mt-4 space-y-4">
        <li class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Customer #001</h3>
          <p class="text-sm text-gray-600">Last purchase: 2025-03-18</p>
          <p class="mt-2">Email: customer001@example.com</p>
          <p class="mt-2">Total spent: $159.99</p>
        </li>
        <li class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Customer #002</h3>
          <p class="text-sm text-gray-600">Last purchase: 2025-03-16</p>
          <p class="mt-2">Email: customer002@example.com</p>
          <p class="mt-2">Total spent: $89.99</p>
        </li>
      </ul>
    </div>

    <!-- Display Settings when Settings Section is Active -->
    <div v-if="activeContent.name === 'Settings'" class="mt-6">
      <h2 class="text-xl font-semibold">Settings</h2>
      <p class="text-gray-600 mt-4">Manage your account settings here.</p>
      
      <!-- Settings Form -->
      <form>
        <div class="mt-4">
          <label for="username" class="block text-sm font-semibold text-gray-800">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            class="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter new username"
          />
        </div>

        <div class="mt-4">
          <label for="email" class="block text-sm font-semibold text-gray-800">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter new email address"
          />
        </div>

        <div class="mt-4 flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed, onUnmounted } from 'vue';
import { useAuthStore } from '@/store';
import { CogIcon, Home, List, ShoppingCart, Users } from 'lucide-vue-next';

// Props for Sidebar visibility
const props = defineProps({
  isOpen: Boolean,
  activeContent: Object
});

// Emit function to toggle the sidebar
const emit = defineEmits(['toggleSidebar', 'update:activeContent']);
const toggleSidebar = () => {
  emit('toggleSidebar');
};

// Fetch user data from the store
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const logout = () => {
  authStore.logout()
}

// compute user initials from username
const userInitials = computed(() => {
  if (!user.value.username) return '';
  return user.value.username
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();
});

// Sample products and customer data
const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://via.placeholder.com/300',
    description: 'This is a description of Product 1.',
    price: 29.99
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://via.placeholder.com/300',
    description: 'This is a description of Product 2.',
    price: 49.99
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://via.placeholder.com/300',
    description: 'This is a description of Product 3.',
    price: 39.99
  }
];

const customers = [
  { name: 'Customer 1', email: 'customer1@example.com', lastPurchase: '2025-03-18', totalSpent: 159.99 },
  { name: 'Customer 2', email: 'customer2@example.com', lastPurchase: '2025-03-16', totalSpent: 89.99 }
];

// Menu items with content linked to each section
const menuItems = [
  { name: 'Dashboard', icon: Home, content: { name: 'Dashboard', content: 'Social Media Feed, Promotions, and Legal/Compliance' } },
  { name: 'Orders', icon: ShoppingCart, content: { name: 'Orders', title: 'Your Orders', content: 'Here are your orders and details.' } },
  { name: 'Products', icon: List, content: { name: 'Products', title: 'Manage Products', content: 'Add and update products.' } },
  { name: 'Customers', icon: Users, content: { name: 'Customers', title: 'Customer Insights', content: 'Manage and view customer data.' } },
  { name: 'Settings', icon: CogIcon, content: { name: 'Settings', title: 'Settings', content: 'Update your personal settings here.' } },
];

// // Set initial active content
// const activeContent = ref(menuItems[0].content);

// set active content and handle sidebar toggle for mobile view
const setActiveContent = (content) => {
  emit('update:activeContent', content);
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Handle resizing for mobile view
const isMobile = ref(window.innerWidth <= 768);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};
window.addEventListener('resize', updateIsMobile);
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
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
