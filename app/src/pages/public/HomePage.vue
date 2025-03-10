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
    <div class="md:w-1/2 mt-8 md:mt-0">
      <img src="@/assets/images/tailor-shop.png" alt="Tailor Shop" class="rounded-lg shadow-lg" />
    </div>
  </div>
     
      
   <div class="bg-purple-50" >   
      <div
      class="flex flex-col justify-between p-8"
    >
      <div class="flex mx-auto max-w-7xl  max-md:flex-col-reverse max-md:gap-6 gap-2 justify-center w-full">
        <h2 class="text-2xl font-bold mb-6">Featured Garments</h2>
       
    </div>
    <div class="w-full mx-auto max-w-7xl ">
    <div class="max-w-xl ">
        
      </div>
    </div>
     </div>
  
  
    <!-- Cards Section -->
    <div class="p-10 flex flex-wrap gap-5 items-center justify-center">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white rounded-lg p-6 flex flex-col gap-4 items-center shadow-md w-[350px] md:w-[400px] lg:w-[424px]"
      >
        <img
          :src="card.image"
          class="rounded-lg w-[90%] h-[180px] object-cover"
        />
        <div class="flex flex-col gap-2 w-[90%]">
          <div class="text-black text-lg font-medium">{{ card.title }}</div>
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#FFD700"
            >
              <path
                d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
              />
            </svg>
            <div class="text-black text-sm">{{ card.reviewText }}</div>
          </div>
          <div class="text-black text-xs">{{ card.description }}</div>
          <button
            class="bg-[#ac1bf5] rounded-lg py-2 px-6 flex justify-center items-center text-white text-base hover:bg-purple-600 w-full"
          >
            View Garment
          </button>
        </div>
      </div>
    </div>
   </div>

    <section class="py-12">
      
    
      <div class="flex mx-auto max-w-7xl  max-md:flex-col-reverse max-md:gap-6 gap-2 justify-center w-full">
        <h2 class="text-2xl font-bold mb-6">Featured Tailors</h2> 
    </div>
     <div class="p-10 flex flex-wrap gap-5 items-center justify-center">
    <div
      v-for="(tailor, index) in tailors"
      :key="index"
      class="bg-purple-50 rounded-lg p-6 flex flex-col gap-4 items-center shadow-md w-[350px] md:w-[400px] lg:w-[424px]">
      <img
        :src="tailor.image"
        class="rounded-lg w-[90%] h-[180px] object-cover"/>
      <div class="flex flex-col gap-2 w-[90%] text-center">
        <div class="text-black text-lg font-semibold">{{ tailor.name }}</div>
        <div class="flex items-center gap-1 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFD700">
            <path
              d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
          </svg>
          <div class="text-black text-sm">{{ tailor.reviewText }}</div>
        </div>
        <div class="text-black text-xs">{{ tailor.description }}</div>
        <button
          class="bg-purple-600 rounded-lg py-2 px-6 flex justify-center items-center text-white text-base hover:bg-purple-600 w-full">
          View Tailors
        </button>
      </div>
    </div>
  </div>
   
    </section>
    <section class="py-12 bg-purple-50">
    <div class="container mx-auto text-center">
      <h2 class="text-2xl font-bold text-gray-900">How It Works</h2>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="bg-white p-6 rounded-lg shadow-md text-center"
        >
          <div class="bg-purple-100 p-4 rounded-full w-30 h-30 flex items-center justify-center mx-auto">
            <img :src="step.icon" :alt="step.title" class="w-20 h-20">
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ step.title }}</h3>
          <p class="text-gray-600 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section> 
  <section class="py-12">
    <div class="container mx-auto text-center">
      <h2 class="text-2xl font-bold text-gray-900">Stay Updated</h2>
      <div class="mt-6 bg-purple-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center">
        <div class="text-left flex-1">
          <h3 class="text-lg font-semibold text-gray-900">Subscribe</h3>
          <p class="text-gray-600 text-sm">Subscribe to our newsletter for exclusive offers and tailoring tips</p>
        </div>
        <div class="mt-4 md:mt-0 flex-1">
          <div class="flex border border-purple-400 rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="Eg: abc@gmail.com" 
              class="px-4 py-2 w-full outline-none bg-white text-gray-700"
              v-model="email"
            />
            <button 
              @click="subscribe"
              class="bg-purple-600 text-white px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
    </template>
    
    <script>
    
    export default {
      
    data() {
      return {
        cards: [
          {
            image: "../src/assets/images/card image.png",
            title: "Men's Designer Suit",
            reviewText: "4.9 (124 reviews)",
            description: "Specializing in bespoke suits and formal wear",
          },
          {
            image: "../src/assets/images/card image (1).png",
            title: "Women's Blazer",
            reviewText: "4.9 (124 reviews)",
            description: "High-end trench coat by women for women",
          },
          {
            image: "../src/assets/images/card image (2).png",
            title: "Tailored Trousers",
            reviewText: "4.9 (124 reviews)",
            description: "Women-tailored trousers perfect for every workday",
          },
         
          
         
        ],
        tailors: [
        {
          image: "../src/assets/images/tailor a.jpg",
          name: "James Michael",
          reviewText: "4.9 (126 reviews)",
          description: "Specialized in custom and formal suits.",
        },
        {
          image: "../src/assets/images/tailor b.jpg",
          name: "Benson Ogola",
          reviewText: "4.9 (124 reviews)",
          description: "Specializing in bespoke suits and formal wear.",
        },
        {
          image: "../src/assets/images/tailor c.jpg",
          name: "Ezelda Nkosi",
          reviewText: "4.9 (124 reviews)",
          description: "Specializing in bespoke suits and custom wear.",
        },
      ],
        steps: [
        {
          title: "1. Choose Garment",
          description: "Select a fabric and style. Our expert tailors will create your fit.",
          icon: "../src/assets/images/card-icon-1.png", 
        
        },
        {
          title: "2. Measure",
          description: "Get your measurements taken professionally or follow our detailed guide.",
          icon: "../src/assets/images/card-icon.png",
        },
        {
          title: "3. Make Order",
          description: "Select from our curated list of expert tailors based on your preferences.",
          icon: "../src/assets/images/card-icon-2.png",
        }
      ]
      };
    },
  };
  
    </script>
    
    <style lang="scss" scoped></style>
    