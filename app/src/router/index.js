import { createRouter, createWebHistory } from "vue-router";
import {
  // HomeView,
  SignupView,
  LoginView,
  AdminView,
  ClientView,
  TailorView,
} from "../views";
import { useAuthStore } from "../store";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/signup", name: "signup", component: SignupView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/admin-dashboard", name: "admin", component: AdminView },
  { path: "/client-dashboard", name: "client", component: ClientView },
  { path: "/tailor-dashboard", name: "tailor", component: TailorView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard: if the route is not public and user is not logged in, redirect to login.
router.beforeEach(async (to) => {
  // Define public pages that do not require authentication.
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // If auth is required and no user is stored, set the return URL and redirect to login.
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
