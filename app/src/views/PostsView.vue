<template>
    <h1 class="text-red-700">Posts</h1>
    <div v-if="error">{{ error }}</div>
    <div class="" v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div class="" v-else>Loading...</div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import PostList from "../components/PostList.vue";
  import { getPosts } from "../providers/api/getPosts";
  
  const { posts, error, load } = getPosts();
  
  /**Load data after mount */
  onMounted(() => {
    // load();
  });
  </script>
  
  <style lang="scss" scoped></style>
  