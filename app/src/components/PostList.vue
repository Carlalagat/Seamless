<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, onUpdated } from "vue";
import SinglePost from "./SinglePost.vue";

const props = defineProps(["posts"]);

// onMounted(() => {
//   console.log("Component mounted");
// });
// onUnmounted(() => {
//   console.log("Component unmounted");
// });
// onUpdated(() => {
//   console.log("Component updated");
// });
</script>

<style lang="scss" scoped></style>
