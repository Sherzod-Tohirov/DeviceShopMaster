import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Products from "../pages/Products.vue";
import Categories from "../pages/Categories.vue";
import NotFound from "../pages/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "",
          component: Products,
        },
        {
          path: "categories",
          component: Categories,
        },
      ],
    },
    {
      path: "/:catchAll(.*)/",
      name: "404",
      component: NotFound
    }
  ],
});

export default router;
