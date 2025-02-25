<template>
  <div>Pinia test</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<!-- <template>
  <div class="">
    <h1>Name is {{ store.user.name }}</h1>
    <h2>Email is {{ store.user.email }}</h2>
    <h2>Website is {{ store.website }}</h2>
    <input
      class="border"
      type="text"
      placeholder="New Name"
      v-model="nameInput"
    />
    <button class="shadow ml-2 bg-emerald-400 p-2" @click="handleSubmit">
      Change name
    </button>
    <button @click="store.count++">Count : {{ store.count }}</button>
  </div>
</template> -->

<!-- <script setup>
import { useUserStore } from "../store/userTest2";
import { ref } from "vue";

const store = useUserStore();
const nameInput = ref("");

const handleSubmit = () => {
  store.changeName(nameInput.value);
  nameInput.value = "";
};
</script> -->

<!-- <style lang="scss" scoped></style> -->
