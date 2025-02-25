import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

/**Import API URL from .env */
const ROOT_URL = `${import.meta.env.VITE_API_URL}`;

/**Capture the access token from local storage */
const access_token = useLocalStorage("x-token", null);

/**Create an axios instance */
const axiosInstance = axios.create({
  baseURL: ROOT_URL,
});

/**Create a request interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    /** Add token to header if exists */
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token.value}`;
    }

    return config;
  },
  (error) => {
    /**Do something with request error */
    return Promise.reject(error);
  }
);

/** Handle Forbidden and Unauthorized errors */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);

    /** Handle 401 Unauthorized error */
    if (error.response.status === 401) {
      console.log("Unauthorized access. Logging out...");
      /** Perform a dynamic import of store to avoid circular dependency */
      const { useAuthStore } = await import("../../store/auth.store");
      const authStore = useAuthStore();
      /** Perform logout or redirect to the login page */
      authStore.logout();
    }

    /** Handle 403 Forbidden error */
    if (error.response.status === 403) {
      /** Perform logout or redirect to the login page */
      console.log("Access forbidden. Logging out...");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
