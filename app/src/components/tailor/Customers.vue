<template>
    <div>
      <h1 class="text-2xl font-semibold mb-6 text-center">Customers</h1>
      <div class="mb-8">
        <p class="text-gray-500 mt-1">View and manage your customer relationships</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Customer Card 1 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span class="text-purple-700 font-bold">AJ</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Alex Johnson</h3>
                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Premium</span>
              </div>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
            <div class="flex items-center">
              <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
              <span>alex.j@example.com</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
              <span>Last: Mar 18, 2025</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
              <span>Total: $159.99</span>
            </div>
          </div>
          <div class="flex space-x-2 mt-4 pt-3 border-t">
            <router-link 
              to="/tailor-dashboard/Chat" 
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
            >
            <i class="fas fa-comment-dots mr-1"></i> Message
            </router-link>
            <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
              View Profile
            </button>
          </div>
        </div>
        <!-- Add more customer cards as needed -->

              <!-- Customer Card 2 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" class="w-full h-full object-cover">
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Sarah Williams</h3>
              <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Regular</span>
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
  
        <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
          <div class="flex items-center">
            <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
            <span>sarah.w@example.com</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
            <span>Last: Mar 16, 2025</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
            <span>Total: $89.99</span>
          </div>
        </div>
  
        <div class="flex space-x-2 mt-4 pt-3 border-t">
          <router-link 
            to="/tailor-dashboard/Chat" 
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
          >
          <i class="fas fa-comment-dots mr-1"></i> Message
        </router-link>
          <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
            View Profile
          </button>
        </div>
      </div>
      <!-- Add more customer cards as needed -->

            <!-- Customer Card 3 -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <span class="text-purple-700 font-bold">MC</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Michael Chen</h3>
              <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Premium</span>
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
  
        <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
          <div class="flex items-center">
            <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
            <span>michael.c@example.com</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
            <span>Last: Mar 20, 2025</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
            <span>Total: $245.50</span>
          </div>
        </div>
  
        <div class="flex space-x-2 mt-4 pt-3 border-t">
          <router-link 
            to="/tailor-dashboard/Chat" 
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
          >
          <i class="fas fa-comment-dots mr-1"></i> Message
        </router-link>
          <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
            View Profile
          </button>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/store';
  const authStore = useAuthStore();
  </script>
  
  <style scoped>
  /* Add any required styles here */
  </style>