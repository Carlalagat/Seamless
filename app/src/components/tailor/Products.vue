<template>
  <div class="flex-1 min-h-screen bg-gray-100 w-full">
    <div class="p-4 sm:p-6 w-full">
      <!-- Header section with search and add button -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full"
      >
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
          Manage Products
        </h1>
        <div
          class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <div class="relative w-full sm:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="pl-10 pr-4 py-2 w-full border border-purple-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <i class="fas fa-search"></i>
            </div>
          </div>
          <button
            @click="showAddProductForm = true"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <i class="fas fa-plus"></i>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <!-- Products grid -->
      <div v-if="!showAddProductForm">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
          ></div>
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6"
        >
          <div class="text-gray-500 text-xl mb-4">No products found</div>
          <button
            @click="showAddProductForm = true"
            class="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Add Your First Product
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
            <div class="relative aspect-square overflow-hidden">
              <img
                :src="getDisplayImage(product)"
                :alt="product.productName"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 right-2">
                <span
                  class="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm"
                >
                  {{ formatPrice(product.price) }}
                </span>
              </div>
            </div>
            <div class="p-4 flex flex-col flex-1">
              <h2 class="text-xl font-bold text-gray-800 mb-2">
                {{ product.productName }}
              </h2>
              <p class="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">
                {{ product.description }}
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <i class="fas fa-map-marker-alt mr-2 text-purple-500"></i>
                <span class="truncate">{{ product.location }}</span>
              </div>
              <div class="flex gap-2 mt-auto">
                <button
                  @click="editProduct(product)"
                  class="bg-purple-600 flex-1 p-2 text-white rounded-lg hover:bg-purple-500 transition duration-300 flex items-center justify-center gap-2"
                >
                  <i class="fas fa-edit"></i>
                  <span class="hidden sm:inline">Update</span>
                </button>
                <button
                  @click="confirmDelete(product)"
                  class="bg-gray-600 flex-1 p-2 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
                >
                  <i class="fas fa-trash-alt"></i>
                  <span class="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Product Form -->
      <div
        v-if="showAddProductForm"
        class="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ editMode ? "Update Product" : "Add New Product" }}
          </h2>
          <button @click="cancelForm" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <form @submit.prevent="submitProduct" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 mb-2">Product Name</label>
              <input
                v-model="formData.productName"
                type="text"
                class="w-full p-3 border border-purple-300 rounded focus:ring focus:ring-purple-200 focus:border-purple-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label class="block text-gray-700 mb-2">Price ($)</label>
              <input
                v-model="formData.price"
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
                v-model="formData.location"
                type="text"
                class="w-full p-3 border border-purple-300 rounded focus:ring focus:ring-purple-200 focus:border-purple-500"
                placeholder="Enter location"
                required
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-gray-700 mb-2">Description</label>
              <textarea
                v-model="formData.description"
                class="w-full p-3 border border-purple-300 rounded resize-none focus:ring focus:ring-purple-200 focus:border-purple-500"
                rows="4"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-gray-700 mb-2">Fabric Types</label>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(fabric, index) in formData.fabricTypes"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="formData.fabricTypes[index].name"
                    type="text"
                    class="p-2 border border-purple-300 rounded flex-grow focus:ring focus:ring-purple-200 focus:border-purple-500"
                    placeholder="Fabric type"
                  />
                  <button
                    type="button"
                    @click="removeFabricType(index)"
                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addFabricType"
                  class="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded flex items-center"
                >
                  <i class="fas fa-plus mr-1"></i> Add Fabric
                </button>
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
              @click="cancelForm"
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
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete
          <span class="font-semibold">{{ productToDelete?.productName }}</span
          >? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
          >
            Cancel
          </button>
          <button
            @click="deleteProduct"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition flex items-center"
            :disabled="deletingProduct"
          >
            <i v-if="deletingProduct" class="fas fa-spinner fa-spin mr-2"></i>
            {{ deletingProduct ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Notification -->
    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300"
      :class="{
        'bg-green-500 text-white': notification.type === 'success',
        'bg-red-500 text-white': notification.type === 'error',
      }"
    >
      <div class="flex items-center">
        <i
          class="mr-2 text-lg"
          :class="{
            'fas fa-check-circle': notification.type === 'success',
            'fas fa-exclamation-circle': notification.type === 'error',
          }"
        ></i>
        <div class="flex-1">{{ notification.message }}</div>
        <button @click="hideNotification" class="ml-4 text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { post, get, patch, deleteItem } from "../../providers/api/main";
import { useAuthStore } from "@/store/modules/auth.store";

// State variables
const authStore = useAuthStore();
// Create computed property for authUser like in Sidebar.vue
const authUser = computed(() => authStore.user || {});
const products = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const showAddProductForm = ref(false);
const editMode = ref(false);
const formData = ref({
  productName: "",
  description: "",
  price: "",
  location: "",
  tailorName: "",
  fabricTypes: [{ name: "" }],
});

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

// Delete confirmation
const showDeleteModal = ref(false);
const productToDelete = ref(null);
const deletingProduct = ref(false);

// Form submission status
const submitting = ref(false);

// Notification system
const notification = ref({
  show: false,
  type: "success",
  message: "",
  timeout: null,
});

// Computed property for filtered products
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;

  const query = searchQuery.value.toLowerCase();
  return products.value.filter(
    (product) =>
      product.productName.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tailorName.toLowerCase().includes(query) ||
      product.location.toLowerCase().includes(query)
  );
});

// Life cycle hooks
onMounted(async () => {
  await fetchProducts();
});

// Methods
const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await get("api/products");
    products.value = response.data;
  } catch (error) {
    showNotification("error", "Failed to load products. Please try again.");
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

const getDisplayImage = (product) => {
  const displayImage = product.media?.find(
    (m) => m.purpose === "PRODUCT_DISPLAY"
  );
  return displayImage?.url || "/api/placeholder/400/320";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Fabric Types Management
const addFabricType = () => {
  formData.value.fabricTypes.push({ name: "" });
};

const removeFabricType = (index) => {
  formData.value.fabricTypes.splice(index, 1);
  if (formData.value.fabricTypes.length === 0) {
    addFabricType();
  }
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

// Form Management
const resetForm = () => {
  formData.value = {
    productName: "",
    description: "",
    price: "",
    location: "",
    tailorName: "",
    fabricTypes: [{ name: "" }],
  };

  displayImageFiles.value = [];
  detailImageFiles.value = [];
  measurementVideoFile.value = null;
  displayImagePreviews.value = [];
  detailImagePreviews.value = [];
  measurementVideoPreview.value = null;

  editMode.value = false;
};

const cancelForm = () => {
  showAddProductForm.value = false;
  resetForm();
};

const editProduct = (product) => {
  editMode.value = true;
  formData.value = {
    id: product.id,
    productName: product.productName,
    description: product.description,
    price: product.price,
    location: product.location,
    tailorName: authUser.value.username, // Fixed: use authUser.value
    fabricTypes: product.fabric?.fabricTypes?.map((ft) => ({
      name: ft.name,
    })) || [{ name: "" }],
  };

  // Reset file inputs
  displayImageFiles.value = [];
  detailImageFiles.value = [];
  measurementVideoFile.value = null;
  displayImagePreviews.value = [];
  detailImagePreviews.value = [];
  measurementVideoPreview.value = null;

  // Load existing images as previews if available
  if (product.media) {
    product.media.forEach((mediaItem) => {
      if (mediaItem.purpose === "PRODUCT_DISPLAY") {
        displayImagePreviews.value.push(mediaItem.url);
      } else if (mediaItem.purpose === "PRODUCT_DETAIL") {
        detailImagePreviews.value.push(mediaItem.url);
      } else if (mediaItem.purpose === "MEASUREMENT_GUIDE") {
        measurementVideoPreview.value = mediaItem.url;
      }
    });
  }

  showAddProductForm.value = true;
};

const submitProduct = async () => {
  // Check if user is logged in - FIXED
  if (!authUser.value || !authUser.value.id) {
    showNotification("error", "You must be logged in to manage products.");
    return;
  }

  // Validate form inputs
  if (
    !formData.value.productName ||
    !formData.value.description ||
    !formData.value.price
  ) {
    showNotification("error", "Please fill in all required fields");
    return;
  }

  // Validate fabric types
  const validFabricTypes = formData.value.fabricTypes.filter(
    (ft) => ft.name.trim() !== ""
  );
  if (validFabricTypes.length === 0) {
    showNotification("error", "Please add at least one fabric type");
    return;
  }

  // Set tailorName from auth store - FIXED
  formData.value.tailorName = authUser.value.username;

  submitting.value = true;

  try {
    // Create FormData object
    const productFormData = new FormData();

    // Add basic product info
    productFormData.append("productName", formData.value.productName);
    productFormData.append("description", formData.value.description);
    productFormData.append("price", formData.value.price);
    productFormData.append("location", formData.value.location);
    productFormData.append("tailorName", formData.value.tailorName);

    // Include user_id ONLY for create operation - FIXED
    if (!editMode.value) {
      productFormData.append("user_id", authUser.value.id);
    }

    // Add fabric types as JSON
    productFormData.append("fabricTypes", JSON.stringify(validFabricTypes));

    // Add display images
    displayImageFiles.value.forEach((file) => {
      productFormData.append("display", file);
    });

    // Add detail images
    detailImageFiles.value.forEach((file) => {
      productFormData.append("detail", file);
    });

    // Add measurement video if any
    if (measurementVideoFile.value) {
      productFormData.append("measurement", measurementVideoFile.value);
    }

    let response;

    if (editMode.value) {
      // Update existing product
      productFormData.append("id", formData.value.id);
      response = await patch(
        `api/products/${formData.value.id}`,
        productFormData
      );
    } else {
      // Create new product
      response = await post("api/products", productFormData);
    }

    await fetchProducts(); // Refresh products list
    showAddProductForm.value = false;
    resetForm();
    showNotification(
      "success",
      editMode.value
        ? "Product updated successfully"
        : "Product added successfully"
    );
  } catch (error) {
    console.error("Error submitting product:", error);
    showNotification("error", "Failed to save product. Please try again.");
  } finally {
    submitting.value = false;
  }
};

// Delete Product
const confirmDelete = (product) => {
  productToDelete.value = product;
  showDeleteModal.value = true;
};

const deleteProduct = async () => {
  if (!productToDelete.value) return;

  deletingProduct.value = true;
  try {
    await deleteItem(`api/products/${productToDelete.value.id}`);
    await fetchProducts();
    showDeleteModal.value = false;
    showNotification("success", "Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    showNotification("error", "Failed to delete product. Please try again.");
  } finally {
    deletingProduct.value = false;
  }
};

// Notification System
const showNotification = (type, message) => {
  // Clear any existing timeout
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout);
  }

  notification.value = {
    show: true,
    type,
    message,
    timeout: setTimeout(() => {
      hideNotification();
    }, 3000),
  };
};

const hideNotification = () => {
  notification.value.show = false;
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout);
  }
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

/* Improved card transitions */
.aspect-square {
  aspect-ratio: 1/1;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Smoother image scaling */
img {
  transition: transform 0.3s ease-in-out;
}
</style>
