<template>
  <div>
    <!-- Hero Section -->
    <div class="flex flex-col justify-between p-8 bg-white right">
      <div
        class="flex max-w-9xl max-md:flex-col-reverse max-md:gap-6 gap-2 justify-between w-full"
      >
        <h1 class="text-4xl font-bold text-gray-900">Find Your Tailor</h1>
        <div
          class="flex items-center gap-2 border-2 border-purple-300 rounded-lg px-4 py-2 transition duration-900 hover:border-purple-600 ml-auto"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tailor"
            class="w-full bg-transparent focus:outline-none"
          />
          <button>
            <img
              src="../../assets/images/search-icon.png"
              alt="Search"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
      <div class="w-full max-w-7xl">
        <div class="max-w-xl">
          <p class="mt-4 text-gray-900">
            Browse through our network of professional tailors and find the
            perfect match for your garment.
          </p>
        </div>
      </div>
    </div>

    <!-- Tailors Section -->
    <div class="min-h-screen flex items-center justify-center px-10 py-10">
      <div
        class="w-full max-w-8xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <!-- Show "No Results Found" when no match -->
        <div
          v-if="filteredTailors.length === 0"
          class="text-center text-gray-600 col-span-3"
        >
          No tailors found.
        </div>

        <!-- Tailor Cards -->
        <div
          v-for="(tailor, index) in filteredTailors"
          :key="index"
          class="bg-purple-100 rounded-lg p-4 flex flex-col gap-4 items-center shadow-md min-w-[300px] sm:min-w-[300px] md:max-w-[570px]"
        >
          <img
            :src="tailor.image"
            class="rounded-lg w-[90%] h-[200px] object-cover"
          />
          <div class="flex flex-col gap-2 w-[90%] text-center">
            <div class="text-black text-lg font-semibold">
              {{ tailor.name }}
            </div>
            <div class="flex items-center gap-1 justify-center">
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
              <div class="text-black text-sm">{{ tailor.reviewText }}</div>
            </div>
            <div class="text-black text-xs">{{ tailor.description }}</div>
            <button
              class="bg-purple-600 rounded-lg py-2 px-4 flex justify-center items-center text-white text-base hover:bg-purple-700 w-full"
            >
              View Tailors
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // search input value
      tailors: [
        {
          image: "../src/assets/images/tailor a.webp",
          name: "James Michael",
          reviewText: "4.9 (126 reviews)",
          description: "Specialized in custom and formal suits.",
        },
        {
          image: "../src/assets/images/tailor b.avif",
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
        {
          image: "../src/assets/images/tailor d.jpg",
          name: "Ann Mitchell",
          reviewText: "4.9 (124 reviews)",
          description: "Specialized in custom and formal suits.",
        },
        {
          image: "../src/assets/images/tailor e.jpg",
          name: "Anorld Mutuse",
          reviewText: "4.9 (124 reviews)",
          description: "Specializing in custom suits and formal wear.",
        },
        {
          image: "../src/assets/images/tailor f.webp",
          name: "Mary Rose",
          reviewText: "4.8 (123 reviews)",
          description: "Specializing in bespoke suits and formal wear.",
        },
        {
          image: "../src/assets/images/tailor g.jpg",
          name: "Ann Wanjiru",
          reviewText: "4.5 (120 reviews)",
          description: "Specializing in bespoke suits and formal wear.",
        },
        {
          image: "../src/assets/images/tailor h.webp",
          name: "Ezekile Opio",
          reviewText: "4.7 (122 reviews)",
          description: "Specializing in bespoke suits and formal wear.",
        },
        {
          image: "../src/assets/images/tailor i.jpg",
          name: "Benard Nyansi",
          reviewText: "4.7 (122 reviews)",
          description: "Specializing in bespoke suits and formal wear.",
        },
      ],
    };
  },
  computed: {
    // Filters tailors based on searchQuery
    filteredTailors() {
      return this.tailors.filter((tailor) =>
        tailor.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
};
</script>
