<template>
  <div class="min-h-screen bg-white">
    <Header v-if="isPublicRoute" />
    <div>
      <RouterView />
    </div>
    <Footer v-if="isPublicRoute" />
  </div>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";

// List of public pages
const publicPages = [
  "/",
  "/about",
  "/contact",
  "/find-garments",
  "/find-tailors",
  "/measurements",
];

const route = useRoute();

// Computed property to check if the current route is public
const isPublicRoute = computed(() => {
  return publicPages.includes(route.path);
});
</script>

<style scoped></style>