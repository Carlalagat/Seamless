<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getPost } from "../providers/api/getPosts";

const props = defineProps(["id"]);

const { post, error, load } = getPost(props.id);

/**Load data after mount */
onMounted(() => {
  load();
});
</script>

<style lang="scss" scoped></style>
