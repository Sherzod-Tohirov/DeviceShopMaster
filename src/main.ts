import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import ToastPlugin from 'vue-toast-notification';
import { createApp } from "vue";
import PrimeVue from 'primevue/config'
import router from "./router/index";
import App from "./App.vue";
import store from './store';
import "./style.css";
const app = createApp(App);
app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastPlugin);
store.dispatch('fetchProductsData');
store.dispatch('fetchCategoriesData');
app.mount("#app");