<template>
    <div class="flex flex-col md:flex-row items-center justify-between p-8 bg-white">
        <!-- Text Section -->
        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold text-gray-900">Custom Tailoring, <br> Made Simple</h1>
          <p class="mt-4 text-gray-600">
            Experience the perfect fit with our network of expert tailors. Get started with easy
            self-measurements and personalized service.
          </p>
          <div class="mt-6 flex space-x-4">
            <router-link to="/login">
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700">Get Started</button>
            </router-link>
            <router-link to = "/find-garments">
            <button class="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-100">Browse Garments</button>
            </router-link>
          </div>
        </div>
        
        <!-- Image Section -->
        <div class="md:w-1/2 mt-6 md:mt-0">
          <img 
            :src="Tailorimage" 
            alt="Tailoring Shop"
            class="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </template>
    
    <script setup>
    import Tailorimage from '@/assets/images/tailor-shop.png';
    </script>
    
    <style lang="scss" scoped></style>
    