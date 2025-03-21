<template>
  <!-- Header Section -->
  <div class="flex flex-col justify-between p-8 bg-white">
    <div class="flex mx-auto max-w-7xl max-md:flex-col-reverse max-md:gap-6 gap-2 justify-between w-full">
      <h1 class="text-4xl font-bold text-gray-900">Find your Perfect Garments</h1>
      <div class="relative w-80">
        <div class="flex items-center gap-2 border-2 border-purple-300 rounded-lg px-4 py-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="focus:outline-none w-full bg-transparent text-gray-700"
            @focus="showDropdown = true"
            @blur="hideDropdown"
          />
          <button @click="searchGarment">
            <img src="../../assets/images/search-icon.png" alt="Search" class="w-4 h-4" />
          </button>
        </div>

        <!-- Dropdown List -->
        <ul v-if="showDropdown" class="absolute w-full bg-white shadow-lg mt-2 rounded-lg border max-h-60 overflow-auto">
          <li 
            v-for="(card, index) in filteredCards" 
            :key="index" 
            class="p-2 hover:bg-gray-200 cursor-pointer text-gray-800"
            @mousedown="selectItem(card.title)"
          >
            {{ card.title }}
          </li>
          <li v-if="filteredCards.length === 0" class="p-2 text-gray-600 text-center">No results found</li>
        </ul>
      </div>
    </div>
    <div class="w-full mx-auto max-w-7xl">
      <div class="max-w-xl">
        <p class="mt-4 text-gray-600">
          Browse through our extensive collection of customization garments and
          find the perfect piece for your style.
        </p>
      </div>
    </div>
  </div>

  <!-- Cards Section -->
  <div class="p-10 flex flex-wrap gap-5 items-center justify-center">
    <div
      v-for="(card, index) in displayedCards"
      :key="index"
      class="bg-[#faefff] rounded-lg p-6 flex flex-col gap-4 items-center shadow-md w-[350px] md:w-[400px] lg:w-[424px]"
    >
      <img :src="card.image" class="rounded-lg w-[90%] h-[180px] object-cover" />
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
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
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

  <!-- Reset Button -->
  <div v-if="selectedGarment" class="flex justify-center mt-4">
    <button
      @click="resetSearch"
      class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
    >
      View All Garments
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      selectedGarment: null, // Store the selected garment
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
        {
          image: "../src/assets/images/card image (3).png",
          title: "Men's Double-Breasted Coat",
          reviewText: "4.9 (124 reviews)",
          description: "A stylish, custom-tailored men's suit in charcoal gray.",
        },
        {
          image: "../src/assets/images/card image (4).png",
          title: "Burgundy Power",
          reviewText: "4.9 (124 reviews)",
          description: "A beautifully tailored women's blazer in deep burgundy.",
        },
        {
          image: "../src/assets/images/card image (5).png",
          title: "Navy Prestige",
          reviewText: "4.9 (124 reviews)",
          description: "A custom-tailored men's overcoat in classic navy blue.",
        },
        {
          image: "../src/assets/images/card image (6).png",
          title: "Structured Tailored Jumpsuit",
          reviewText: "4.9 (124 reviews)",
          description: "Elegant fitted jumpsuit with rich fabrics and modern tailoring.",
        },
        {
          image: "../src/assets/images/card image (7).png",
          title: "Embroidered Tailored Vest",
          reviewText: "4.9 (124 reviews)",
          description: "Waist-length vest with gold-thread embroidery.",
        },
        {
          image: "../src/assets/images/card image (8).png",
          title: "High-Waisted Tailored Cape Skirt",
          reviewText: "4.9 (124 reviews)",
          description: "Knee-length skirt with a detachable cape, pleated detailing.",
        },
      ],
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    displayedCards() {
      return this.selectedGarment ? [this.selectedGarment] : this.cards;
    },
  },
  methods: {
    selectItem(title) {
      this.searchQuery = title;
      this.searchGarment();
      this.showDropdown = false;
    },
    searchGarment() {
      const foundGarment = this.cards.find(
        (card) => card.title.toLowerCase() === this.searchQuery.toLowerCase()
      );
      this.selectedGarment = foundGarment || null;
    },
    resetSearch() {
      this.selectedGarment = null;
      this.searchQuery = "";
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200); // Delay hiding so click event registers
    },
  },
};
</script>

<style lang="scss" scoped></style>
