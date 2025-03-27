<template>
  <div class="profile-content">
    <h1 class="text-2xl font-semibold mb-6 text-center">My Profile</h1>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex flex-col items-center">
          <div class="relative mb-4">
            <div v-if="!user.profileImage && !selectedImage" class="rounded-full w-32 h-32 bg-gray-400 flex items-center justify-center text-white font-bold text-4xl">
              {{ userInitials }}
            </div>
            <img v-else :src="selectedImage || user.profileImage" class="rounded-full w-32 h-32 object-cover border-4 border-purple-200" :alt="user.username" />
            <button @click="triggerFileInput" class="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-200">
              <i class="fas fa-camera"></i>
            </button>
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleProfileImageChange" />
          </div>
          <h2 class="text-xl font-bold">{{ user.username }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
        <div class="flex-1">
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input v-model="profileForm.firstName" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input v-model="profileForm.lastName" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="profileForm.email" type="email" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea v-model="profileForm.bio" rows="3" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button type="button" @click="cancelEdit" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mt-[10px]" >
      <h1 class="font-bold text-2xl text-center">Delete Account!</h1>
      <form action="">
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" placeholder="Enter your registered Email"  required>
        <button type="submit" class="bg-red-600 text-white p-[10px] my-[5px] w-full rounded shadow-lg font-bold hover:bg-red-700 transition duration-400">Delete Account</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const selectedImage = ref(null);
const userInitials = computed(() => {
  if (!user.value.username) return '';
  return user.value.username
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();
});

const fileInput = ref(null);
const profileForm = ref({
  firstName: user.value.firstName || '',
  lastName: user.value.lastName || '',
  email: user.value.email || '',
  bio: user.value.bio || ''
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleProfileImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target.result;
      authStore.updateUser({ profileImage: e.target.result });
    };
    reader.readAsDataURL(file);
  }
};

const updateProfile = () => {
  authStore.updateUser(profileForm.value);
};

const cancelEdit = () => {
  profileForm.value = {
    firstName: user.value.firstName || '',
    lastName: user.value.lastName || '',
    email: user.value.email || '',
    bio: user.value.bio || ''
  };
  selectedImage.value = null;
};
</script>

<style scoped>
/* Add any required styles here */
</style>