<template>
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Chats</h2>
      <div class="space-y-4">
        <!-- Chat Item 1 -->
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                :src="TrouserImage" 
                alt="Customer" 
                class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              >
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-800 truncate">James Wilson</h3>
                <span class="text-xs text-gray-500">2 min ago</span>
              </div>
              <p class="text-gray-600 text-sm truncate">Hey, I wanted to check on my trouser order...</p>
            </div>
            <router-link 
              to="/tailor-dashboard/Chat" 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Reply
            </router-link>
          </div>
        </div>
  
        <!-- Chat Item 2 -->
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                :src="Blazerimage" 
                alt="Customer" 
                class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              >
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-800 truncate">Sarah Johnson</h3>
                <span class="text-xs text-gray-500">1 hour ago</span>
              </div>
              <p class="text-gray-600 text-sm truncate">About the blazer design, I had some ideas...</p>
            </div>
            <router-link 
              to="/tailor-dashboard/Chat" 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Reply
            </router-link>
          </div>
        </div>
  
        <!-- Chat Item 3 -->
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                :src="TuxedoImage" 
                alt="Customer" 
                class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              >
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-800 truncate">Michael Brown</h3>
                <span class="text-xs text-gray-500">Yesterday</span>
              </div>
              <p class="text-gray-600 text-sm truncate">The tuxedo fitting was perfect, thank you!</p>
            </div>
            <router-link 
              to="/tailor-dashboard/Chat" 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Reply
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Blazerimage from "@/assets/images/card image (1).png";
  import TrouserImage from "@/assets/images/card image (2).png";
  import TuxedoImage from "@/assets/images/designersuit.png";
  </script>
  
  <style scoped>
  /* Add any required styles here */
  </style>