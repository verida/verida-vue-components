import { createApp } from "vue";
import VueClipboard from "vue-clipboard2";
import App from "./App.vue";

import "./assets/scss/main.scss";

createApp(App).use(VueClipboard).mount("#app");
