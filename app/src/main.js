import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faTimes,
  faChartLine,
  faBox,
  faRuler,
  faBullhorn,
  faBell,
  faUser,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
// for font awesome to work install "npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fontawesome/vue-fontawesome" in the terminal

// styling
import "./assets/styles/tailwind.css"; //tailwind

// setup fake backend
import { fakeBackend } from "./helpers";
fakeBackend();

// Add icons to library
library.add(
  faBars,
  faTimes,
  faChartLine,
  faBox,
  faRuler,
  faBullhorn,
  faBell,
  faUser,
  faSignOutAlt,
  faSearch
);

const app = createApp(App);
const pinia = createPinia();

// Configure the Pinia persistence plugin
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
