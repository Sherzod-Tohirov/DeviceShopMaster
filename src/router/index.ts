import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Products from "../pages/Products.vue";
import Categories from "../pages/Categories.vue";
import store from "../store";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: '',
          component: Products,
        },
        {
            path: "categories",
            component: Categories,
          },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
    if(!store.state.products.length) {
      try {
        await store.dispatch('fetchProductsData');
        next();
      }catch(err)  {
        console.log(err);
      }
    }else {
      next();
    }
})

export default router;
