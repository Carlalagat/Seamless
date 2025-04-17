<template>
  <div class="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
    <div class="text-gray-500 text-xl mb-4">{{ message }}</div>
    <slot name="action">
      <button
        @click="$emit('action')"
        class="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
      >
        {{ actionText }}
      </button>
    </slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  message: {
    type: String,
    default: "No data found",
  },
  actionText: {
    type: String,
    default: "Add Item",
  },
});

const emit = defineEmits(["action"]);
</script>
