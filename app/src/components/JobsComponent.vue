<template>
  <div>
    <h1>Jobs</h1>
  </div>
  <div v-for="job in jobs" :key="job.id" class="job">
    <router-link :to="{ name: 'job_details', params: { id: job.id } }">
      <h2>{{ job.title }}</h2>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define a reactive jobs array
const jobs = ref([]);
onMounted(() => {
  fetch("http://localhost:3000/jobs")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((el) => {
        jobs.value.push(el);
      });
    })
    .catch((err) => console.log(err.message));
});
</script>

<style lang="scss" scoped></style>
