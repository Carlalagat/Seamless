<template>
  <form @submit.prevent="handleSubmit">
    <input type="file" @change="handleFileChange" />
    <button type="submit">Upload</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async handleSubmit() {
      if (this.selectedFile) {
        await this.uploadImage(this.selectedFile);
      }
    },
    async uploadImage(file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
  },
};
</script>
