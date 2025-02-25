<template>
  <div class="flex flex-col justify-center items-center">
    <!-- the track mode  -->
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white p-4 rounded-md border shadow-2xl max-w-7xl">
        <div class="flex flex-col">
          <div class="">
            <LoginEmail />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginEmail from "../components/LoginEmail.vue";
</script>
