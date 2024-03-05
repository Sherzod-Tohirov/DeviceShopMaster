<template>
  <h2 class="text-5xl text-center">Products list</h2>
  <ul class="product-list">
    <ProductCard
      :product="product"
      v-for="product in store.getters.products.slice(currentPage * itemPerPage, currentPage * itemPerPage + itemPerPage)"
      :key="product.id"
    />
    <NotFound v-if="store.getters.products?.length === 0" />
  </ul>
  <Paginator
    v-if="store.getters.products.length"
    v-model="currentPage"
    :rows="itemPerPage"
    :totalRecords="store.getters.products.length"
    @page="onPageChange"
  ></Paginator>
</template>

<script lang="ts" setup>
import Paginator from "primevue/paginator";
import { useStore } from "vuex";
import ProductCard from "../components/ProductCard.vue";
import NotFound from "../components/NotFound.vue";
import { ref, onMounted } from "vue";
const store =  useStore();
const products = ref(store.getters.products || []);
const itemPerPage = 6;
const currentPage = ref(0);

onMounted(() => {
  products.value = store.getters.products;
});

const onPageChange = (e) => {
  currentPage.value = e.page;
};
</script>
