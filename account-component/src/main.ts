import { createApp } from "vue";
import VueClipboard from "vue-clipboard2";
import App from "./App.vue";

import './components';

import "./assets/scss/main.scss";

createApp(App).use(VueClipboard).mount("#app");
