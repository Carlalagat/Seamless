<template>
    <div>
        <div class="flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-50 min-h-screen">
      <div class="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg md:mr-12">
        <h2 class="text-4xl font-bold text-black">Get In Touch</h2>
        <p class="text-gray-600 mt-2 text-lg">Have questions? We are here to help. Send us a message and we will reply as soon as possible!</p>
        
        <form class="mt-6 space-y-4">
          <label class="block text-gray-700 font-semibold">Name</label>
          <input type="text" placeholder="Your name" class="w-full p-3 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          
          <label class="block text-gray-700 font-semibold">Email</label>
          <input type="email" placeholder="your@gmail.com" class="w-full p-3 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          
          <label class="block text-gray-700 font-semibold">Subject</label>
          <input type="text" placeholder="How can we help?" class="w-full p-3 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          
          <label class="block text-gray-700 font-semibold">Message</label>
          <textarea placeholder="Your message" rows="4" class="w-full p-3 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          
          <button class="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 text-lg font-semibold">Send Message</button>
        </form>
      </div>
      
      <div class="grid grid-cols-2 gap-6 mt-8 md:mt-0 max-w-lg w-full">
        <div class="bg-purple-100 p-6 rounded-lg shadow-xl flex items-center space-x-4 min-w-[250px]">
          <i class="fas fa-map-marker-alt text-purple-600 text-2xl"></i>
          <div class="whitespace-normal">
            <h3 class="text-lg font-semibold">Visit Us</h3>
            <p class="text-gray-600 text-sm">Nakuru, Kenyatta Avenue<br>Kenya, 20100</p>
          </div>
        </div>
        <div class="bg-purple-100 p-6 rounded-lg shadow-xl flex items-center space-x-4 min-w-[250px]">
          <i class="fas fa-phone text-purple-600 text-2xl"></i>
          <div class="whitespace-normal">
            <h3 class="text-lg font-semibold">Call Us</h3>
            <p class="text-gray-600 text-sm">Mon-Fri, 8am to 5pm<br>+254 123 245 678</p>
          </div>
        </div>
        <div class="bg-purple-100 p-6 rounded-lg shadow-xl flex items-start space-x-4 min-w-[250px]">
          <i class="fas fa-envelope text-purple-600 text-2xl"></i>
          <div class="flex-1 whitespace-normal break-words">
            <h3 class="text-lg font-semibold">Email Us</h3>
            <p class="text-gray-600 text-sm">support@seamless.com<br>customercare@seamless.com</p>
          </div>
        </div>
        <div class="bg-purple-100 p-6 rounded-lg shadow-xl flex items-center space-x-4 min-w-[250px]">
          <i class="fas fa-clock text-purple-600 text-2xl"></i>
          <div class="whitespace-normal">
            <h3 class="text-lg font-semibold">Business Hours</h3>
            <p class="text-gray-600 text-sm">Monday to Friday<br>24hrs</p>
          </div>
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