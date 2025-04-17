import { ref } from "vue";
import { defineStore } from "pinia";
import { get, post, patch, deleteItem } from "../../providers/api/main";

export const useProductsStore = defineStore(
  "products",
  () => {
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function fetchProducts() {
      loading.value = true;
      error.value = null;

      try {
        const response = await get("api/products");
        products.value = response.data;
        return response.data;
      } catch (err) {
        console.error("Error fetching products:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function createProduct(productData) {
      try {
        const response = await post("api/products", productData);
        products.value.push(response.data);
        return response.data;
      } catch (err) {
        console.error("Error creating product:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function updateProduct(productId, productData) {
      try {
        const response = await patch(`api/products/${productId}`, productData);
        const index = products.value.findIndex((p) => p.id === productId);
        if (index !== -1) {
          products.value[index] = response.data;
        }
        return response.data;
      } catch (err) {
        console.error("Error updating product:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function deleteProduct(productId) {
      try {
        await deleteItem(`api/products/${productId}`);
        products.value = products.value.filter(
          (product) => product.id !== productId
        );
      } catch (err) {
        console.error("Error deleting product:", err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    async function getProductById(productId) {
      try {
        const response = await get(`api/products/${productId}`);
        return response.data;
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        error.value = err.response ? err.response.data.message : err.message;
        throw err;
      }
    }

    return {
      products,
      loading,
      error,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      getProductById,
    };
  },
  {
    persist: {
      key: "products-store",
      storage: localStorage,
      paths: ["products"], // Only persist products data
    },
  }
);
