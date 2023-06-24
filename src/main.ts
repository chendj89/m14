import { createApp } from "vue";
import App from "./App.vue";
import useGlobalComponents from "./components";
import { useAppRouter } from "./router";
import useRouterGuard from "./router/guard";
import useAppPinia from "./store";
// @ts-ignore
import "@/scss/app.scss";
import "@/scss/transition.scss";
import "@/scss/css-animi.scss";
import "virtual:svg-icons-register";
// @ts-ignore
import scss from "@/scss/alias.module.scss";
console.log(scss.theme);
function vawBoot() {
  const app = createApp(App);
  useAppPinia(app);
  useAppRouter(app);
  useGlobalComponents(app);
  useRouterGuard();
  app.mount("#app");
}

vawBoot();
