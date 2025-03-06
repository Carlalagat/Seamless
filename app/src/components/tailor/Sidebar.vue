<template>
  <div>
    <!-- Sidebar Overlay (Mobile) -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-50 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white min-h-screen p-6 shadow-lg fixed md:static transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Close Button (Mobile) -->
      <button
        @click="toggleSidebar"
        class="absolute top-4 right-4 md:hidden text-gray-600"
      >
        <font-awesome-icon icon="times" class="text-2xl" />
      </button>

      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img
          src="@/assets/logo.png"
          alt="SeamLess"
          class="w-32 md:w-40 mx-auto"
        />
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-8">
        <ul class="space-y-6">
          <li>
            <router-link to="/dashboard" class="sidebar-link">
              <font-awesome-icon icon="chart-line" /> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/orders" class="sidebar-link">
              <font-awesome-icon icon="box" /> Orders
              <span class="badge">32</span>
            </router-link>
          </li>
          <li>
            <router-link to="/measurements" class="sidebar-link">
              <font-awesome-icon icon="ruler" /> Measurements
            </router-link>
          </li>
          <li>
            <router-link to="/marketing" class="sidebar-link">
              <font-awesome-icon icon="bullhorn" /> Marketing
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Notifications -->
      <div class="mt-6">
        <router-link to="/notifications" class="sidebar-link">
          <font-awesome-icon icon="bell" /> Notifications
          <span class="badge">10</span>
        </router-link>
      </div>

      <!-- Profile Section -->
      <div class="mt-12 border-t pt-4">
        <div class="flex items-center space-x-3">
          <img
            src="https://fakeimg.pl/40x40"
            class="rounded-full w-10 h-10"
            alt="Tailor"
          />
          <div class="flex flex-col">
            <h4 class="font-semibold">Tailor</h4>
            <p class="text-xs text-gray-500">kinya@nakurutailors.co.ke</p>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <button
        class="mt-6 w-full bg-red-500 py-2 rounded-xl hover:bg-red-400"
        id="logout"
      >
        <router-link
          to="/login"
          class="font-medium text-white hover:text-gray-300"
        >
          <font-awesome-icon icon="sign-out-alt" /> Logout
        </router-link>
      </button>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
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
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
  }
}
</style>
