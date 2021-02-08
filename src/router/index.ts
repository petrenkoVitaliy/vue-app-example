import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MoneyAmountInput from "../views/MoneyAmountInput.vue";

export enum ROUTER_PATHS {
  MAIN = "/",
  CCY = "/ccy",
  CONVERTATION_RESULT = "/convert"
}

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTER_PATHS.MAIN,
    name: "Main",
    component: MoneyAmountInput
  },
  {
    path: ROUTER_PATHS.CCY,
    name: "CCYSelect",
    component: () =>
      import(/* webpackChunkName: "CCYSelect" */ "../views/CCYSelect.vue")
  },
  {
    path: ROUTER_PATHS.CONVERTATION_RESULT,
    name: "CONVERTATION_RESULT",
    component: () =>
      import(
        /* webpackChunkName: "CONVERTATION_RESULT" */ "../views/ConvertationResult.vue"
      )
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/PageNotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
