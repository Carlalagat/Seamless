<template>
  <div class="flex flex-col md:flex-row items-center p-10 md:p-16 bg-gray-50 min-h-screen w-full">
    <div class="w-full md:w-3/5 bg-white p-12 rounded-lg shadow-lg md:mr-12">
      <h2 class="text-5xl font-bold text-black">Get In Touch</h2>
      <p class="text-gray-600 mt-4 text-xl">Have questions? We are here to help. Send us a message and we will reply as soon as possible!</p>
      
      <form class="mt-8 space-y-6">
        <label class="block text-gray-700 font-semibold text-lg">Name</label>
        <input type="text" placeholder="Your name" class="w-full p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg" />
        
        <label class="block text-gray-700 font-semibold text-lg">Email</label>
        <input type="email" placeholder="your@gmail.com" class="w-full p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg" />
        
        <label class="block text-gray-700 font-semibold text-lg">Subject</label>
        <input type="text" placeholder="How can we help?" class="w-full p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg" />
        
        <label class="block text-gray-700 font-semibold text-lg">Message</label>
        <textarea placeholder="Your message" rows="6" class="w-full p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"></textarea>
        
        <button class="w-full bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 text-xl font-semibold">Send Message</button>
      </form>
    </div>
    
    <div class="grid grid-cols-2 gap-8 mt-10 md:mt-0 w-full md:w-2/5">
      <div class="bg-purple-100 p-8 rounded-lg shadow-xl flex items-center space-x-6 min-w-[280px]">
        <i class="fas fa-map-marker-alt text-purple-600 text-3xl"></i>
        <div class="whitespace-normal">
          <h3 class="text-xl font-semibold">Visit Us</h3>
          <p class="text-gray-600 text-lg">Nakuru, Kenyatta Avenue<br>Kenya, 20100</p>
        </div>
      </div>
      <div class="bg-purple-100 p-8 rounded-lg shadow-xl flex items-center space-x-6 min-w-[280px]">
        <i class="fas fa-phone text-purple-600 text-3xl"></i>
        <div class="whitespace-normal">
          <h3 class="text-xl font-semibold">Call Us</h3>
          <p class="text-gray-600 text-lg">Mon-Fri, 8am to 5pm<br>+254 123 245 678</p>
        </div>
      </div>
      <div class="bg-purple-100 p-8 rounded-lg shadow-xl flex items-start space-x-6 min-w-[280px]">
        <i class="fas fa-envelope text-purple-600 text-3xl"></i>
        <div class="flex-1 whitespace-normal break-words">
          <h3 class="text-xl font-semibold">Email Us</h3>
          <p class="text-gray-600 text-lg">support@seamless.com<br>customercare@seamless.com</p>
        </div>
      </div>
      <div class="bg-purple-100 p-8 rounded-lg shadow-xl flex items-center space-x-6 min-w-[280px]">
        <i class="fas fa-clock text-purple-600 text-3xl"></i>
        <div class="whitespace-normal">
          <h3 class="text-xl font-semibold">Business Hours</h3>
          <p class="text-gray-600 text-lg">Monday to Friday<br>24hrs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>
