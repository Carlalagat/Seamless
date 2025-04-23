<template>
  <div>
    <!-- Hero Section -->
    <div class="flex flex-col justify-between p-8 bg-white right">
      <div class="flex max-w-9xl max-md:flex-col-reverse max-md:gap-6 gap-2 justify-between w-full">
        <h1 class="text-4xl font-bold text-gray-900">
          Find Your Tailor
        </h1>
        <div class="flex items-center gap-2 border-2 border-purple-300 rounded-lg px-4 py-2 transition duration-900 hover:border-purple-600 ml-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tailor"
            class="w-full bg-transparent focus:outline-none" />
          <button>
            <img
              src="../../assets/images/search-icon.png"
              alt="Search"
              class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="w-full max-w-7xl">
        <div class="max-w-xl">
          <p class="mt-4 text-gray-900">
            Browse through our network of professional tailors and find the perfect match for your garment.
          </p>
        </div>
      </div>
    </div>

    <!-- Tailors Section -->
    <div v-if="!selectedTailor" class="min-h-screen flex items-center justify-center px-10 py-10 transition-all duration-500 ease-in-out">
      <div class="w-full max-w-8xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div v-if="filteredTailors.length === 0" class="text-center text-gray-600 col-span-3">
          No tailors found.
        </div>

        <div
          v-for="(tailor, index) in filteredTailors"
          :key="index"
          class="bg-purple-100 rounded-lg p-4 flex flex-col gap-4 items-center shadow-md min-w-[300px] sm:min-w-[300px] md:max-w-[570px] hover:scale-105 transition duration-300 ease-in-out">
          <img
            :src="tailor.image"
            class="rounded-lg w-[90%] h-[200px] object-cover" />
          <div class="flex flex-col gap-2 w-[90%] text-center">
            <div class="text-black text-lg font-semibold">{{ tailor.name }}</div>
            <div class="flex items-center gap-1 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="20px" viewBox="0 -960 960 960" fill="#FFD700">
                <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
              </svg>
              <div class="text-black text-sm">{{ tailor.reviewText }}</div>
            </div>
            <div class="text-black text-xs">{{ tailor.description }}</div>
            <button
              @click="viewTailor(tailor)"
              class="bg-purple-600 rounded-lg py-2 px-4 flex justify-center items-center text-white text-base hover:bg-purple-700 w-full transition duration-300">
              View Tailors
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Tailor Details Full Page View -->
    <transition name="fade-slide" mode="out-in">
      <div v-if="selectedTailor" class="p-10 bg-white min-h-screen w-full animate-fadeIn transition-all duration-500 ease-in-out">
        <button @click="selectedTailor = null" class="text-purple-700 hover:underline mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tailors
        </button>

        <div class="flex flex-col lg:flex-row gap-10 items-start">
          <img :src="selectedTailor.image" :alt="selectedTailor.name" class="w-full lg:w-1/2 h-[400px] object-cover rounded-lg shadow-md" />

          <div class="flex-1">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedTailor.name }}</h2>
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="20px" viewBox="0 -960 960 960" fill="#FFD700">
                <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
              </svg>
              <span class="text-gray-900">{{ selectedTailor.reviewText }}</span>
            </div>

          

            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-2">Specialties</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(specialty, index) in selectedTailor.specialties"
                  :key="index"
                  class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {{ specialty }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Descriptions</h3>
                <p class="text-gray-700">{{ selectedTailor.Descriptions }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Experience</h3>
                <p class="text-gray-700">{{ selectedTailor.experience }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Location</h3>
                <p class="text-gray-700">{{ selectedTailor.location }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">certifications</h3>
                <p class="text-gray-700">{{ selectedTailor.certifications }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Availability</h3>
                <p class="text-gray-700">{{ selectedTailor.availability }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedTailor: null,
      tailors: [
      {
  image: "../src/assets/images/tailor a.webp",
  name: "James Michael",
  reviewText: "4.9 (126 reviews)",
  description: "Specialized in custom and formal suits.",
  Descriptions: "Renowned tailor specializing in high-end custom and formal suits for men and women.",
  specialties: ["Custom Suits","Formal Wear","Wedding Attire","Traditional African Wear","Bespoke Shirts"],
  experience: "15+ years of tailoring excellence, including celebrity clientele and bridal couture.",
  location: "Westlands, Nairobi, Kenya",
  certifications: "Certified Bespoke Tailor Member of the Kenya Tailors Association",
  availability: "Monday to Saturday, 9:00 AM – 6:00 PM"
},
  {
    image: "../src/assets/images/tailor b.avif",
    name: "Benson Ogola",
    reviewText: "4.9 (124 reviews)",
    description: "Specializing in bespoke suits and formal wear.",
    Descriptions: "Expert in crafting high-quality bespoke suits with a flair for modern design.",
    specialties: ["Bespoke Suits", "Alterations", "Custom Shirts", "Business Attire"],
    experience: "12 years of dedicated craftsmanship",
    location: "Ngong Road, Nairobi, Kenya",
    certifications: "Kenya Fashion Council Member",
    availability: "Mon - Sat, 9:00 AM – 6:00 PM"
  },
  {
    image: "../src/assets/images/tailor c.jpg",
    name: "Ezelda Nkosi",
    reviewText: "4.9 (124 reviews)",
    description: "Specializing in bespoke suits and custom wear.",
    Descriptions: "Blending modern fashion with rich cultural influence for unique custom wear.",
    specialties: ["Custom Wear", "Traditional Attire", "Modern Fashion", "Cultural Designs"],
    experience: "10 years",
    location: "Kisumu City Center, Kenya",
    certifications: "Kenya Fashion Institute Graduate",
    availability: "Tues - Sun, 10:00 AM – 5:00 PM"
  },
  {
    image: "../src/assets/images/tailor d.jpg",
    name: "Ann Mitchell",
    reviewText: "4.9 (124 reviews)",
    description: "Specialized in custom and formal suits.",
    Descriptions: "Specialist in women's tailoring, evening gowns, and event-ready fashion.",
    specialties: ["Women's Suits", "Evening Wear", "Alterations", "Bridal Couture"],
    experience: "8 years in women's fashion design",
    location: "Nakuru, CBD, Kenya",
    certifications: "Fashion Design Diploma - Nairobi Institute of Design",
    availability: "Mon - Fri, 10:00 AM – 4:00 PM"
  },
  {
    image: "../src/assets/images/tailor e.jpg",
    name: "Anorld Mutuse",
    reviewText: "4.9 (124 reviews)",
    description: "Specializing in custom suits and formal wear.",
    Descriptions: "Tailor with deep expertise in formal and traditional Kenyan menswear.",
    specialties: ["Custom Suits", "Traditional Wear", "Formal Attire", "Corporate Uniforms"],
    experience: "14 years working with local and international clients",
    location: "Mombasa Old Town, Kenya",
    certifications: "Tailoring Diploma - Mombasa Fashion Academy",
    availability: "Mon - Sat, 8:30 AM – 5:30 PM"
  },
  {
    image: "../src/assets/images/tailor f.webp",
    name: "Mary Rose",
    reviewText: "4.8 (123 reviews)",
    description: "Specializing in bespoke suits and formal wear.",
    Descriptions: "Experienced bridalwear designer focused on elegance and comfort.",
    specialties: ["Bespoke Design", "Wedding Dresses", "Formal Wear", "Evening Gowns"],
    experience: "11 years in bridal fashion",
    location: "Karen Blixen District, Nairobi, Kenya",
    certifications:"Wedding Gown Specialist – East Africa Institute of Fashion",
    availability: "Wed - Sun, 10:00 AM – 6:00 PM"
  },
  {
    image: "../src/assets/images/tailor g.jpg",
    name: "Ann Wanjiru",
    reviewText: "4.5 (120 reviews)",
    description: "Specializing in bespoke suits and formal wear.",
    Descriptions: "Combines modern fashion trends with authentic African fabrics and cuts.",
    specialties: ["Custom Tailoring", "African Attire", "Modern Fashion", "Youth Trends"],
    experience: "9 years in the Nairobi fashion scene",
    location: "Thika Road Mall Area, Nairobi, Kenya",
    certifications: "Fashion Design Certificate - Nairobi Fashion Academy",
    availability: "Mon - Sat, 9:00 AM – 5:00 PM"
  },
  {
    image: "../src/assets/images/tailor h.webp",
    name: "Ezekile Opio",
    reviewText: "4.7 (122 reviews)",
    description: "Specializing in bespoke suits and formal wear.",
    Descriptions: "Tailor focused on men's business and traditional formal wear.",
    specialties: ["Men's Suits", "Traditional Wear", "Business Attire", "Smart Casual"],
    experience: "13 years",
    location: "Kisii CBD, Kenya",
    certifications: "Tailoring Diploma - Kisii Fashion Institute",
    availability: "Tues - Sat, 9:30 AM – 6:00 PM"
  },
  {
    image: "../src/assets/images/tailor i.jpg",
    name: "Benard Nyansi",
    reviewText: "4.7 (122 reviews)",
    description: "Specializing in bespoke suits and formal wear.",
    Descriptions: "Master tailor known for detailed craftsmanship in both cultural and modern suits.",
    specialties: ["Bespoke Tailoring", "Cultural Wear", "Modern Suits", "Event Wear"],
    experience: "16 years tailoring across East Africa",
    location: "Machakos Town, Kenya",
    certifications: "Advanced Tailoring – Kenya National Tailors Guild",
    availability: "Mon - Sat, 8:00 AM – 6:00 PM"
  }
]
    };
  },
  computed: {
    filteredTailors() {
      return this.tailors.filter(tailor =>
        tailor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    viewTailor(tailor) {
      this.selectedTailor = tailor;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
