<template>
  <div
    v-if="show"
    class="fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300"
    :class="{
      'bg-green-500 text-white': type === 'success',
      'bg-red-500 text-white': type === 'error',
      'bg-blue-500 text-white': type === 'info',
      'bg-yellow-500 text-white': type === 'warning',
    }"
  >
    <div class="flex items-center">
      <i
        class="mr-2 text-lg"
        :class="{
          'fas fa-check-circle': type === 'success',
          'fas fa-exclamation-circle': type === 'error',
          'fas fa-info-circle': type === 'info',
          'fas fa-exclamation-triangle': type === 'warning',
        }"
      ></i>
      <div class="flex-1">{{ message }}</div>
      <button @click="$emit('close')" class="ml-4 text-white">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) => ["success", "error", "info", "warning"].includes(value),
  },
  message: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);
</script>
