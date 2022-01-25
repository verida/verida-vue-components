import { createApp } from 'vue';
import VueClipboard from "vue-clipboard2";
import Dev from './serve.vue';


const app = createApp(Dev);
app.use(VueClipboard).mount('#app');
