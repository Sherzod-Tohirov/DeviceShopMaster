<template>
  <h2 class="text-5xl text-center">Products list</h2>
  <ul class="product-list">
    <ProductCard
      :product="product"
      v-for="product in store.getters.products"
      :key="product.id"
    />
    <p class="text-5xl">{{ store.getters.myState }}</p>
    <NotFound v-if="store.getters.products?.length === 0" />
  </ul>
</template>

<script setup>
import { useStore } from "vuex";
import { watchEffect } from "vue";
import ProductCard from "../components/ProductCard.vue";
import NotFound from "../components/NotFound.vue";
import { computed, ref, reactive, onMounted } from "vue";
const products = ref([]);
const store = useStore();
</script>
