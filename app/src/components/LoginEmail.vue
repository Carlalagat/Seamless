<template>
  <div>
    <p class="text-xl text-center p-4">Log in to access your account</p>
    <div>
      <form @submit.prevent="onSubmit">
        <p class="p-2 text-lg">E-mail</p>
        <input
          type="text"
          v-model="formData.email"
          :class="{ 'border-2 border-red-500': v$.email.$error }"
          name="enter your email address"
          id="LoginEmail"
          class="w-full md:w-[350px] border border-gray-400 p-2 rounded-md"
        />
        <p>
          <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="text-red-500"
            >{{ error.$message }}</span
          >
        </p>
        <p class="p-2 text-lg">Password</p>
        <input
          type="password"
          v-model="formData.password"
          :class="{ 'border-2 border-red-500': v$.password.$error }"
          name="Enter your password"
          id="LoginPassword"
          class="w-full md:w-[350px] border border-gray-400 p-2 rounded-md"
        />
        <p>
          <span
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            class="text-red-500"
            >{{ error.$message }}</span
          >
        </p>
        <div class="flex justify-center items-end sticky py-8 bottom-0">
          <button
            class="text-white bg-green-600 px-4 py-2 rounded-md w-full"
            :style="{
              opacity: !v$.email.$error && !v$.password.$error ? 1 : 0.5,
            }"
            :disabled="!(!v$.email.$error && !v$.password.$error)"
          >
            login
          </button>
        </div>
        <div v-if="error" class="text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/store";

/**initialise the auth store */
const authStore = useAuthStore();

/**Get error from auth store */
const error = computed(() => {
  return authStore.error;
});

onMounted(() => {
  //Clear the previous error
  authStore.error = null;
});

/**Form variables */
const formData = reactive({
  email: "",
  password: "",
});

const validations = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(3) },
  };
});

/**initialise form validation */
const v$ = useVuelidate(validations, formData);

/**Submit form */
const onSubmit = async () => {
  const result = await v$.value.$validate();
  console.log(formData);

  if (result) {
    console.log("Form submitted");
    return authStore.login(formData);
  } else {
    console.log("Form not submitted");
  }
};

const onSubmitDemo = async () => {
  v$.value.$validate();
  if (v$.value.$error) return;

  try {
    await authStore.login(formData);
  } catch (error) {
    if (error.response && error.response.data) {
    }
  }
};
</script>
