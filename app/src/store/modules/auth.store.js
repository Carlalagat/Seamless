import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { fetchWrapper } from "../../helpers";
import { post, get } from "../../providers/api/main";
import router from "../../router";

/**Import API URL from .env */
const baseUrl = `${import.meta.env.VITE_API_URL}`;
const mode = `${import.meta.env.VITE_MODE}`;

/** Auth store */
export const useAuthStore = defineStore("auth", () => {
  const user = ref(useLocalStorage("user", null));
  const access_token = ref(useLocalStorage("x-token", null));
  const returnUrl = ref(null);
  const error = ref(null);
  let login;

  /** Signup method for creating a new user (remote instance) */
  async function signup(formData) {
    try {
      const response = await post("api/auth/signup", formData);
      console.log("Signup successful:", response.data);
      // Option 1: Auto-login after signup:
      // user.value = response.data.user;
      // access_token.value = response.data.token;
      // Redirect based on role if auto-login is desired.
      // Option 2: Redirect to login page after signup:
      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err);
      error.value = err.response
        ? err.response.data.error || err.response.data.message
        : err.message;
      throw err;
    }
  }

  /** Login method for local instance */
  async function login_local(formData) {
    const username = formData.email;
    const password = formData.password;
    console.log("This is the formData in store", { username, password });
    const fetchedUser = await fetchWrapper
      .post(`${baseUrl}/login`, { username, password })
      .catch((err) => {
        console.log(err);
        error.value = err.response ? err.response.data.message : err.message;
      });
    console.log("Fetched user:", fetchedUser);
    // Update state: store user as an object
    user.value = fetchedUser;
    // Redirect based on role if available
    if (fetchedUser && fetchedUser.role) {
      if (fetchedUser.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (fetchedUser.role === "CLIENT") {
        router.push("/client-dashboard");
      } else if (fetchedUser.role === "TAILOR") {
        router.push("/tailor-dashboard");
      } else {
        router.push(returnUrl.value || "/");
      }
    } else {
      router.push(returnUrl.value || "/");
    }
  }

  /** Login method for remote instance */
  async function login_remote(credentials) {
    try {
      const response = await post("api/auth/signin", credentials);
      console.log("Remote login response:", response);
      /** Store the user */
      user.value = response.data.user;
      /** Store the access token */
      access_token.value = response.data.token;
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
    router.push("/login");
  }

  /** Identify the login method */
  if (mode === "local") {
    login = login_local;
  } else if (mode === "remote") {
    login = login_remote;
  }

  return { user, returnUrl, error, test, login, signup, logout };
});
