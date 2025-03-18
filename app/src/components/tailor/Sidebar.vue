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
        'bg-gray-100/2 p-6 shadow-lg fixed md:static transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
      :style="{ height: isMobile && isOpen ? 'auto' : '100vh' }"
    >
      <!-- Close Button (Mobile) -->
      <button
        @click="toggleSidebar"
        class="absolute top-4 right-4 md:hidden text-gray-600"
      >
        <font-awesome-icon icon="times" class="text-2xl" />
      </button>

      <!-- logo linking to Client Dashboard -->
       <RouterLink to="/client-dashboard" class="flex items-center space-x-2">
        <img src="@/assets/logo.png" alt="SeamLess" class="w-40 center">
       </RouterLink>

      <!-- Navigation Menu -->
      <nav class="mt-8">
        <ul class="space-y-8">
          <li>
            <router-link to="/tailor-dashboard" class="sidebar-link" @click="toggleSidebar">
              <font-awesome-icon icon="chart-line" /> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/orders" class="sidebar-link" @click="toggleSidebar">
              <font-awesome-icon icon="box" /> Orders
              <!-- <span class="badge">32</span> -->
            </router-link>
          </li>
          <li>
            <router-link to="/measurements" class="sidebar-link" @click="toggleSidebar">
              <font-awesome-icon icon="ruler" /> Measurements
            </router-link>
          </li>
          <li>
            <router-link to="/notifications" class="sidebar-link" @click="toggleSidebar">
              <font-awesome-icon icon="bell" /> Notifications
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="sidebar-link" @click="toggleSidebar">
              <font-awesome-icon icon="user" /> Profile
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Additional Content (Visible on larger screens) -->
      <div v-if="!isMobile">

        <!-- Profile Section -->
        <div class="mt-12 border-t pt-4">
          <div class="flex items-center space-x-3">
            <img
              :src="user.profileImage || 'https://fakeimg.pl/40x40'"
              class="rounded-full w-10 h-10"
              :alt="user.username"
            />
            <div class="flex flex-col items-center mt-8 space-y-4">
              <h4 class="font-semibold">{{ user.username }}</h4>
              <p class="text-xs text-gray-500">{{ user.email }}</p>
              <router-link to="/profile" class="text-purple-600 text-sm">
                <font-awesome-icon icon="cog" /> Edit Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, defineProps, defineEmits, onUnmounted } from "vue";
import { useAuthStore } from "@/store";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["toggleSidebar"]);

const toggleSidebar = () => {
  emit("toggleSidebar");
};

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const isMobile = ref(window.innerWidth <= 768);

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768;
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
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