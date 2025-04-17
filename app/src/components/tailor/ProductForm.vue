<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ editMode ? "Update Product" : "Add New Product" }}
      </h2>
      <button
        @click="$emit('cancel')"
        class="text-gray-500 hover:text-gray-700"
      >
        <i class="fas fa-times text-xl"></i>
      </button>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 mb-2">Product Name</label>
          <input
            v-model="localFormData.productName"
            type="text"
            class="w-full p-3 border border-purple-300 rounded focus:ring focus:ring-purple-200 focus:border-purple-500"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Price ($)</label>
          <input
            v-model="localFormData.price"
            type="number"
            step="0.01"
            class="w-full p-3 border border-purple-300 rounded focus:ring focus:ring-purple-200 focus:border-purple-500"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Location</label>
          <input
            v-model="localFormData.location"
            type="text"
            class="w-full p-3 border border-purple-300 rounded focus:ring focus:ring-purple-200 focus:border-purple-500"
            placeholder="Enter location"
            required
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-gray-700 mb-2">Description</label>
          <textarea
            v-model="localFormData.description"
            class="w-full p-3 border border-purple-300 rounded resize-none focus:ring focus:ring-purple-200 focus:border-purple-500"
            rows="4"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Fabric Types</label>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <input
                v-model="newFabricType"
                type="text"
                class="p-2 border border-purple-300 rounded flex-grow focus:ring focus:ring-purple-200 focus:border-purple-500"
                placeholder="Enter fabric type and press Enter"
                @keydown.enter.prevent="addFabricType"
              />
              <button
                type="button"
                @click="addFabricType"
                class="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded flex items-center"
              >
                <i class="fas fa-plus mr-1"></i> Add
              </button>
            </div>

            <div
              v-if="localFormData.fabricTypes.length > 0"
              class="mt-2 p-3 bg-gray-50 rounded border border-gray-200"
            >
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(fabric, index) in localFormData.fabricTypes"
                  :key="index"
                  class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
                >
                  {{ fabric.name }}
                  <button
                    type="button"
                    @click="removeFabricType(index)"
                    class="ml-2 text-purple-600 hover:text-red-600"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-gray-700 mb-2">Display Images</label>

          <div class="mb-4">
            <input
              ref="displayImagesInput"
              type="file"
              multiple
              accept="image/jpg, image/png, image/jpeg"
              class="hidden"
              @change="handleDisplayImages"
            />
            <div class="flex flex-wrap gap-4 mb-2">
              <div
                v-for="(preview, index) in displayImagePreviews"
                :key="index"
                class="relative w-24 h-24 border rounded overflow-hidden"
              >
                <img :src="preview" class="w-full h-full object-cover" />
                <button
                  type="button"
                  @click="removeDisplayImage(index)"
                  class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="$refs.displayImagesInput.click()"
              class="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-lg p-4 w-full text-center text-purple-600 hover:text-purple-800 transition"
            >
              <i class="fas fa-cloud-upload-alt text-2xl mb-2"></i>
              <div>Click to upload display images</div>
            </button>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-gray-700 mb-2">Detail Images</label>
          <input
            ref="detailImagesInput"
            type="file"
            multiple
            accept="image/jpg, image/png, image/jpeg"
            class="hidden"
            @change="handleDetailImages"
          />
          <div class="flex flex-wrap gap-4 mb-2">
            <div
              v-for="(preview, index) in detailImagePreviews"
              :key="index"
              class="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img :src="preview" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeDetailImage(index)"
                class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="$refs.detailImagesInput.click()"
            class="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-lg p-4 w-full text-center text-purple-600 hover:text-purple-800 transition"
          >
            <i class="fas fa-cloud-upload-alt text-2xl mb-2"></i>
            <div>Click to upload detail images</div>
          </button>
        </div>

        <div class="md:col-span-2">
          <label class="block text-gray-700 mb-2"
            >Measurement Guide (Video)</label
          >
          <input
            ref="measurementVideoInput"
            type="file"
            accept="video/mp4"
            class="hidden"
            @change="handleMeasurementVideo"
          />
          <div v-if="measurementVideoPreview" class="mb-2">
            <div class="relative w-full h-40 bg-black rounded">
              <video
                :src="measurementVideoPreview"
                class="w-full h-full object-contain"
                controls
              ></video>
              <button
                type="button"
                @click="removeMeasurementVideo"
                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <button
            v-if="!measurementVideoPreview"
            type="button"
            @click="$refs.measurementVideoInput.click()"
            class="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-lg p-4 w-full text-center text-purple-600 hover:text-purple-800 transition"
          >
            <i class="fas fa-film text-2xl mb-2"></i>
            <div>Click to upload measurement guide video</div>
          </button>
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center"
          :disabled="submitting"
        >
          <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
          {{
            submitting
              ? "Saving..."
              : editMode
                ? "Update Product"
                : "Add Product"
          }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);

// Create a local copy of the form data to avoid directly mutating props
const localFormData = ref({
  productName: "",
  price: "",
  location: "",
  description: "",
  fabricTypes: [],
  ...props.formData,
});

// For adding new fabric types
const newFabricType = ref("");

// Watch for changes in props.formData and update local copy
watch(
  () => props.formData,
  (newValue) => {
    // Ensure we keep the object structure with default values for any missing properties
    localFormData.value = {
      productName: "",
      price: "",
      location: "",
      description: "",
      fabricTypes: [],
      ...newValue,
    };
  },
  { deep: true }
);

// Image handling
const displayImagesInput = ref(null);
const detailImagesInput = ref(null);
const measurementVideoInput = ref(null);
const displayImageFiles = ref([]);
const detailImageFiles = ref([]);
const measurementVideoFile = ref(null);
const displayImagePreviews = ref([]);
const detailImagePreviews = ref([]);
const measurementVideoPreview = ref(null);

onMounted(() => {
  // Initialize image previews from existing data if in edit mode
  if (props.editMode && props.formData.displayImagePreviews) {
    displayImagePreviews.value = [...props.formData.displayImagePreviews];
  }
  if (props.editMode && props.formData.detailImagePreviews) {
    detailImagePreviews.value = [...props.formData.detailImagePreviews];
  }
  if (props.editMode && props.formData.measurementVideoPreview) {
    measurementVideoPreview.value = props.formData.measurementVideoPreview;
  }

  // Ensure fabricTypes is initialized
  if (!localFormData.value.fabricTypes) {
    localFormData.value.fabricTypes = [];
  }
});

// Fabric Types Management
const addFabricType = () => {
  if (newFabricType.value.trim()) {
    // Create a new array with the existing fabric types plus the new one
    localFormData.value.fabricTypes = [
      ...localFormData.value.fabricTypes,
      { name: newFabricType.value.trim() },
    ];
    // Clear input after adding
    newFabricType.value = "";
  }
};

const removeFabricType = (index) => {
  // Create a new array without the removed item
  localFormData.value.fabricTypes = localFormData.value.fabricTypes.filter(
    (_, i) => i !== index
  );
};

// Image Management
const handleDisplayImages = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    displayImageFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      displayImagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeDisplayImage = (index) => {
  displayImageFiles.value.splice(index, 1);
  displayImagePreviews.value.splice(index, 1);
};

const handleDetailImages = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    detailImageFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      detailImagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeDetailImage = (index) => {
  detailImageFiles.value.splice(index, 1);
  detailImagePreviews.value.splice(index, 1);
};

const handleMeasurementVideo = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  measurementVideoFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    measurementVideoPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeMeasurementVideo = () => {
  measurementVideoFile.value = null;
  measurementVideoPreview.value = null;
  if (measurementVideoInput.value) {
    measurementVideoInput.value.value = "";
  }
};

const submitForm = () => {
  // Prepare form data for submission
  const formDataToSubmit = {
    ...localFormData.value,
    displayImageFiles: displayImageFiles.value,
    detailImageFiles: detailImageFiles.value,
    measurementVideoFile: measurementVideoFile.value,
    displayImagePreviews: displayImagePreviews.value,
    detailImagePreviews: detailImagePreviews.value,
    measurementVideoPreview: measurementVideoPreview.value,
  };

  emit("submit", formDataToSubmit);
};
</script>

<style scoped>
/* Fix for file input styling */
input[type="file"] {
  display: none;
}

/* Additional styles for smooth hover effects */
button {
  transition: all 0.2s ease-in-out;
}
</style>
