<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Orders</h1>
    <div class="flex justify-between items-center mb-6">
      <div>
        <p class="text-gray-500">Review and track your recent purchases</p>
      </div>
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        <i class="fas fa-plus mr-2"></i>New Order
      </button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          />
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <select
          class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        >
          <option>All Statuses</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <select
          class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        >
          <option>Sort by: Newest</option>
          <option>Sort by: Oldest</option>
          <option>Sort by: Price (High-Low)</option>
          <option>Sort by: Price (Low-High)</option>
        </select>
      </div>
    </div>
    <div class="space-y-4">
      <!-- Order Card 1 -->
      <div
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200"
      >
        <div class="p-5">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center">
                <span class="font-bold text-lg text-gray-800"
                  >Order #12345</span
                >
                <span
                  class="ml-3 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full"
                  >Completed</span
                >
              </div>
              <p class="text-sm text-gray-500 mt-1">
                <i class="far fa-calendar-alt mr-1"></i>Placed on March 20, 2025
              </p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex -space-x-2">
                <div
                  class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm"
                >
                  <img
                    src="@/assets/images/designersuit.png"
                    alt="Product"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm"
                >
                  <img
                    src=""
                    alt="Product"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-700 mb-2">
                  Ordered Items (2)
                </h4>
                <ul class="space-y-2">
                  <li class="flex justify-between">
                    <span class="text-gray-600">Men's Designer Suit</span>
                    <span class="font-medium">$29.99</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-gray-600">Women's Blazer</span>
                    <span class="font-medium">$49.99</span>
                  </li>
                </ul>
              </div>
              <div class="md:w-48">
                <div class="bg-gray-50 p-3 rounded-lg">
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-600">Subtotal:</span>
                    <span>$79.98</span>
                  </div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-600">Shipping:</span>
                    <span>$5.99</span>
                  </div>
                  <div
                    class="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2"
                  >
                    <span>Total:</span>
                    <span>$85.97</span>
                  </div>
                </div>
                <button
                  class="w-full mt-3 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Add more order cards as needed -->

      <!-- Order Card 2 -->
      <div
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200"
      >
        <div class="p-5">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center">
                <span class="font-bold text-lg text-gray-800"
                  >Order #12346</span
                >
                <span
                  class="ml-3 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
                  >Processing</span
                >
              </div>
              <p class="text-sm text-gray-500 mt-1">
                <i class="far fa-calendar-alt mr-1"></i>Placed on March 19, 2025
              </p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row gap-4">
              <!-- Product Images -->
              <div class="flex -space-x-2">
                <div
                  class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm"
                >
                  <img
                    src=""
                    alt="Product"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- Product Details -->
              <div class="flex-1">
                <h4 class="font-semibold text-gray-700 mb-2">
                  Ordered Items (1)
                </h4>
                <ul class="space-y-2">
                  <li class="flex justify-between">
                    <span class="text-gray-600">Tailored Trousers</span>
                    <span class="font-medium">$39.99</span>
                  </li>
                </ul>
              </div>

              <!-- Order Summary -->
              <div class="md:w-48">
                <div class="bg-gray-50 p-3 rounded-lg">
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-600">Subtotal:</span>
                    <span>$39.99</span>
                  </div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-600">Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div
                    class="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2"
                  >
                    <span>Total:</span>
                    <span>$39.99</span>
                  </div>
                </div>
                <button
                  class="w-full mt-3 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-600 text-white font-medium"
        >
          1
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100"
        >
          2
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100"
        >
          3
        </button>
        <span class="px-2">...</span>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100"
        >
          8
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store";
const authStore = useAuthStore();
</script>

<style scoped>
/* Add any required styles here */
</style>
