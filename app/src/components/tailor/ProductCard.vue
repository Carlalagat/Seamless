<template>
  <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="getDisplayImage(product)"
        :alt="product.productName"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-2 right-2">
        <span class="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <h2 class="text-xl font-bold text-gray-800 mb-2">
        {{ product.productName }}
      </h2>
      <p class="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">
        {{ product.description }}
      </p>
      <div class="flex items-center text-sm text-gray-500 mb-3">
        <i class="fas fa-map-marker-alt mr-2 text-purple-500"></i>
        <span class="truncate">{{ product.location }}</span>
      </div>
      <div class="flex gap-2 mt-auto">
        <button
          @click="$emit('edit', product)"
          class="bg-purple-600 flex-1 p-2 text-white rounded-lg hover:bg-purple-500 transition duration-300 flex items-center justify-center gap-2"
        >
          <i class="fas fa-edit"></i>
          <span class="hidden sm:inline">Update</span>
        </button>
        <button
          @click="$emit('delete', product)"
          class="bg-gray-600 flex-1 p-2 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
        >
          <i class="fas fa-trash-alt"></i>
          <span class="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const getDisplayImage = (product) => {
  const displayImage = product.media?.find(
    (m) => m.purpose === "PRODUCT_DISPLAY"
  );
  return displayImage?.url || "/api/placeholder/400/320";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

img {
  transition: transform 0.3s ease-in-out;
}
</style>
