<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ title }}</h2>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <button 
          @click="close"
          class="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Notification'
  },
  message: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const show = ref(props.modelValue);

const close = () => {
  show.value = false;
  emit('update:modelValue', false);
  emit('close');
};

watch(() => props.modelValue, (newVal) => {
  show.value = newVal;
});
</script>
