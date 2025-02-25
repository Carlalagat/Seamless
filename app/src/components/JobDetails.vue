<template>
  <div v-if="job">
    <h1>{{ job.title }}</h1>
    <p>The job id is {{ jobId }}</p>
    <p>{{ job.details }}</p>
  </div>
  <div v-else>
    <p>Loading job details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// defineProps({
//   id: String,
// });

const job = ref(null);
const jobId = ref(null);
const route = useRoute();
const id = route.params.id;
jobId.value = id;

onMounted(() => {
  fetch(`http://localhost:3000/jobs/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      job.value = data;
    })
    .catch((err) => console.log(err.message));
});
</script>

<style lang="scss" scoped></style>
