<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <footer class="bg-slate-700 text-gray-300 py-10">
    <div class="container mx-auto px-8 md:px-16 lg:px-32">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <img :src="logo" alt="SeamLess Logo" class="h-12 mb-4" />
          <p class="text-sm">
            Making custom tailoring accessible to everyone through technology and craftsmanship.
          </p>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">

            <li>
              <RouterLink to="/about" class="hover:text-white transition">About Us</RouterLink>
            </li>
            <li>
              <RouterLink to="/find-garments" class="hover:text-white transition">Find Garments</RouterLink>
            </li>
            <li>
              <RouterLink to="/find-tailors" class="hover:text-white transition">Find Tailors</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-white transition">Contact Us</RouterLink>
            </li>
          </ul>
        </div>


        <div>
          <h3 class="text-white font-semibold mb-4">Contact</h3>
          <p class="text-sm">Gibcon House, 4th Floor</p>
          <p class="text-sm">Nakuru</p>
          <p class="text-sm">seamless@info.com</p>
          <p class="text-sm">(+254)-714-856-790</p>
        </div>


        <div>
          <h3 class="text-white font-semibold mb-4">Legal</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition">Privacy</a></li>
            <li><a href="#" class="hover:text-white transition">Terms</a></li>
          </ul>
        </div>
      </div>

      <hr class="border-white-700 my-6" />

      <div class="mt-8 flex flex-col md:flex-row items-center justify-between text-sm border-t border-gray-700 pt-4">
        <p>© 2025 SeamLess. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/images/Logo.png';</script>

<style lang="scss" scoped></style>
