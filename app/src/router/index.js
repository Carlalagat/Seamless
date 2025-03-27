import { createRouter, createWebHistory } from "vue-router";
import {
  HomeView,
  RegisterView,
  LoginView,
  ForgotPasswordView,
  ResetPasswordView,
  VerifyAccountView,
  AdminView,
  ClientView,
  TailorView,
  AboutView,
  FindGarmentView,
  FindTailorView,
  ContactView,
  MeasurementView,
  ChatView,
  MessagesView,
  

} from "../views";
import { useAuthStore } from "../store";
import Client1View from "../views/admin/Client1View.vue";
import Tailors1View from "../views/admin/Tailors1View.vue";



const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/find-garments", name: "find-garments", component: FindGarmentView },
  { path: "/find-tailors", name: "find-tailors", component: FindTailorView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/verify/:token", name: "verify-account", component: VerifyAccountView },
  { path: "/forgot-password", name: "forgot-password", component: ForgotPasswordView },
  { path: "/reset-password", name: "reset-password", component: ResetPasswordView },
  { path: "/admin-dashboard", name: "admin-dashboard", component: AdminView },
  { path: "/client-dashboard", name: "client-dashboard", component: ClientView},
  {path: '/measurements' , name: 'Measurements', component: MeasurementView,},
  {path: "/tailor-dashboard", name: "tailor-dashboard", component: TailorView},
  {path: "/tailor-dashboard/Chat", name: "Chat", component: ChatView},
  {path: "/Clients", name: "Clients", component: Client1View},
  {path: "/Tailors", name: "Tailors", component: Tailors1View},
  {path: "/Messages", name: "Messages", component: MessagesView},

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard: if the route is not public and user is not logged in, redirect to login.
router.beforeEach(async (to) => {
  // Define public pages that do not require authentication.
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/find-garments",
    "/find-tailors",
    "/forgot-password",
    "/reset-password",
    "/verify/:token",
    "/measurements",
  ];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // If auth is required and no user is stored, set the return URL and redirect to login.
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;


