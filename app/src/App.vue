<template>
  <div class="min-h-screen bg-white">
    <Header />
    <div class="mt-4">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
import MeasurementPage from "./components/client/MeasurementPage.vue";
// import Measurement from "./components/client/Measurement.vue";

</script>

<style scoped></style>
