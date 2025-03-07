import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

/** Import API URL from .env */
const ROOT_URL = `${import.meta.env.VITE_API_URL}`;

/** Capture the access token from local storage */
const access_token = useLocalStorage("x-token", null);

/** Create an axios instance */
const axiosInstance = axios.create({
  baseURL: ROOT_URL,
});

/** Create a request interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to header if it exists
    if (access_token.value) {
      config.headers["Authorization"] = `Bearer ${access_token.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** Handle Forbidden and Unauthorized errors with refresh token handling */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    /** Safely check for error.response */
    if (!error.response) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    /** If 401 (Unauthorized) and we haven't retried yet, attempt token refresh */
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Unauthorized error detected. Attempting token refresh...");

      try {
        /** Dynamically import the auth store to avoid circular dependencies */
        const { useAuthStore } = await import("../../store/modules/auth.store");
        const authStore = useAuthStore();

        /** If there's no refresh token, logout immediately */
        if (!authStore.refreshToken) {
          console.log("No refresh token available. Logging out...");
          authStore.logout();
          return Promise.reject(error);
        }

        /** Attempt to refresh the token */
        const refreshResponse = await axiosInstance.post(
          "/api/auth/refresh-token",
          {
            refreshToken: authStore.refreshToken,
          }
        );

        /** Update tokens in both the store and local storage */
        authStore.access_token = refreshResponse.data.token;
        access_token.value = refreshResponse.data.token;

        /** Update the authorization header and retry the original request */
        originalRequest.headers["Authorization"] =
          `Bearer ${refreshResponse.data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed. Logging out...");
        const { useAuthStore } = await import("../../store/modules/auth.store");
        const authStore = useAuthStore();
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    /** If a 401 occurs again or a 403 error is received, logout. */
    if (error.response.status === 401) {
      console.log("Unauthorized access. Logging out...");
      const { useAuthStore } = await import("../../store/modules/auth.store");
      const authStore = useAuthStore();
      authStore.logout();
    }
    if (error.response.status === 403) {
      console.log("Access forbidden. Logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
