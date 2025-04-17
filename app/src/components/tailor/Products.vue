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
        <LoadingSpinner v-if="loading" class="h-64" />

        <EmptyState
          v-else-if="filteredProducts.length === 0"
          message="No products found"
          actionText="Add Your First Product"
          @action="showAddProductForm = true"
        />

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @edit="editProduct"
            @delete="confirmDelete"
          />
        </div>
      </div>

      <!-- Add/Edit Product Form -->
      <ProductForm
        v-if="showAddProductForm"
        :form-data="formData"
        :edit-mode="editMode"
        :submitting="submitting"
        @submit="submitProduct"
        @cancel="cancelForm"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :product="productToDelete"
      :deleting="deletingProduct"
      @confirm="deleteProduct"
      @cancel="showDeleteModal = false"
    />

    <!-- Success/Error Notification -->
    <NotificationToast
      :show="notification.show"
      :type="notification.type"
      :message="notification.message"
      @close="hideNotification"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { post, get, patch, deleteItem } from "../../providers/api/main";
import { useAuthStore } from "@/store/modules/auth.store";
import LoadingSpinner from "./LoadingSpinner.vue";
import ProductCard from "./ProductCard.vue";
import ProductForm from "./ProductForm.vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";
import NotificationToast from "./NotificationToast.vue";
import EmptyState from "./EmptyState.vue";

// State variables
const authStore = useAuthStore();
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
  displayImagePreviews: [],
  detailImagePreviews: [],
  measurementVideoPreview: null,
  displayImageFiles: [],
  detailImageFiles: [],
  measurementVideoFile: null,
});

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

const resetForm = () => {
  formData.value = {
    productName: "",
    description: "",
    price: "",
    location: "",
    tailorName: "",
    fabricTypes: [{ name: "" }],
    displayImagePreviews: [],
    detailImagePreviews: [],
    measurementVideoPreview: null,
    displayImageFiles: [],
    detailImageFiles: [],
    measurementVideoFile: null,
  };

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
    tailorName: authUser.value.username,
    fabricTypes: product.fabric?.fabricTypes?.map((ft) => ({
      name: ft.name,
    })) || [{ name: "" }],
    displayImagePreviews: [],
    detailImagePreviews: [],
    measurementVideoPreview: null,
    displayImageFiles: [],
    detailImageFiles: [],
    measurementVideoFile: null,
  };

  // Load existing images as previews if available
  if (product.media) {
    product.media.forEach((mediaItem) => {
      if (mediaItem.purpose === "PRODUCT_DISPLAY") {
        formData.value.displayImagePreviews.push(mediaItem.url);
      } else if (mediaItem.purpose === "PRODUCT_DETAIL") {
        formData.value.detailImagePreviews.push(mediaItem.url);
      } else if (mediaItem.purpose === "MEASUREMENT_GUIDE") {
        formData.value.measurementVideoPreview = mediaItem.url;
      }
    });
  }

  showAddProductForm.value = true;
};

const submitProduct = async (formDataFromChild) => {
  // Check if user is logged in
  if (!authUser.value || !authUser.value.id) {
    showNotification("error", "You must be logged in to manage products.");
    return;
  }

  submitting.value = true;

  try {
    // Create FormData object
    const productFormData = new FormData();

    // Add basic product info
    productFormData.append("productName", formDataFromChild.productName);
    productFormData.append("description", formDataFromChild.description);
    productFormData.append("price", formDataFromChild.price);
    productFormData.append("location", formDataFromChild.location);
    productFormData.append("tailorName", authUser.value.username);

    // Include user_id ONLY for create operation
    if (!editMode.value) {
      productFormData.append("user_id", authUser.value.id);
    }

    // Add fabric types as JSON
    const validFabricTypes = formDataFromChild.fabricTypes.filter(
      (ft) => ft.name.trim() !== ""
    );
    productFormData.append("fabricTypes", JSON.stringify(validFabricTypes));

    // Add display images
    if (formDataFromChild.displayImageFiles) {
      formDataFromChild.displayImageFiles.forEach((file) => {
        productFormData.append("display", file);
      });
    }

    // Add detail images
    if (formDataFromChild.detailImageFiles) {
      formDataFromChild.detailImageFiles.forEach((file) => {
        productFormData.append("detail", file);
      });
    }

    // Add measurement video if any
    if (formDataFromChild.measurementVideoFile) {
      productFormData.append(
        "measurement",
        formDataFromChild.measurementVideoFile
      );
    }

    let response;

    if (editMode.value) {
      // Update existing product
      productFormData.append("id", formDataFromChild.id);
      response = await patch(
        `api/products/${formDataFromChild.id}`,
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
