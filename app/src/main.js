import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

/**styling */
// import "./style.css";
import "./assets/tailwind.css"; //tailwind

// setup fake backend
import { fakeBackend } from "./helpers";
fakeBackend();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
