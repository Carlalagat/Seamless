import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { post, get } from "../../providers/api/main";
import router from "../../router";

/** Import API URL from .env */
const baseUrl = `${import.meta.env.VITE_API_URL}`;
const mode = `${import.meta.env.VITE_MODE}`;

/** Auth store */
export const useAuthStore = defineStore("auth", () => {
  /** Storing user and tokens using useLocalStorage for persistence. */
  const user = ref(useLocalStorage("user", null));
  const access_token = ref(useLocalStorage("x-token", null));
  const refreshToken = ref(useLocalStorage("refresh-token", null));
  const returnUrl = ref(null);
  const error = ref(null);
  let login;

  /** Signup method for creating a new user (remote instance) */
  async function signup(formData) {
    try {
      const response = await post("api/auth/signup", formData);
      console.log("Signup successful:", response.data);
      /** Redirect to login page after signup: */
      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err);
      error.value = err.response
        ? err.response.data.error || err.response.data.message
        : err.message;
      throw err;
    }
  }

  /** Login method for remote instance */
  async function login_remote(credentials) {
    try {
      const response = await post("api/auth/signin", credentials);
      console.log("Remote login response:", response);
      /** Store the user object */
      user.value = response.data.user;
      
      /** Store the access token */
      access_token.value = response.data.token;
      /** Store the refresh token, if provided */
      if (response.data.refreshToken) {
        refreshToken.value = response.data.refreshToken;
      }
      error.value = null;
      /** Redirect based on role if available */
      if (user.value && user.value.role) {
        if (user.value.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else if (user.value.role === "CLIENT") {
          router.push("/client-dashboard");
        } else if (user.value.role === "TAILOR") {
          router.push("/tailor-dashboard");
        } else {
          router.push(returnUrl.value || "/");
        }
      } else {
        router.push(returnUrl.value || "/");
      }
    } catch (err) {
      console.error("Login error:", err);
      error.value = err.response
        ? err.response.data.error || err.response.data.message
        : err.message;
      throw err;
    }
  }

  /** Test API */
  async function test() {
    await get("shops")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** Logout */
  function logout() {
    user.value = null;
    access_token.value = null;
    refreshToken.value = null;
    router.push("/login");
  }

  /** Identify the login method */
  if (mode === "remote") {
    login = login_remote;
  } else {
    login = login_local;
  }

  return {
    user,
    access_token,
    refreshToken,
    returnUrl,
    error,
    test,
    login,
    signup,
    logout,
  };
});
