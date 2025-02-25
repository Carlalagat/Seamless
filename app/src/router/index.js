import { createRouter, createWebHistory } from "vue-router";
import { HomeView, LoginView } from "../views";
import { useAuthStore } from "../store";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },

];

/**Initialize here */
const router = createRouter({ history: createWebHistory(), routes });

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   /**add function to check if user is logged in */

//   if (authRequired && !auth.user) {
//     auth.returnUrl = to.fullPath;
//     return "/login";
//   }
// });

export default router;
