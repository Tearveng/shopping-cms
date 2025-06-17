import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { supabase } from "./lib/supabase";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Antd);

const authStore = useAuthStore();
await authStore.fetchUser();

supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session) {
    await authStore.updateAuth(session);
  }
});
app.mount("#app");
