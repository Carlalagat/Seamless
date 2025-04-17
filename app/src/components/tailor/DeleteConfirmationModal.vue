<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
      <p class="text-gray-600 mb-6">
        Are you sure you want to delete
        <span class="font-semibold">{{ product?.productName }}</span>? This action cannot be undone.
      </p>
      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition flex items-center"
          :disabled="deleting"
        >
          <i v-if="deleting" class="fas fa-spinner fa-spin mr-2"></i>
          {{ deleting ? "Deleting..." : "Delete" }}
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
  deleting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["confirm", "cancel"]);
</script>
