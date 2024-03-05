<template>
  <div class="flex flex-col gap-10 items-center">
    <h2 class="text-5xl text-center">Categories list</h2>
    <ul class="list-none flex flex-col w-2/3 gap-2">
      <li
        class="w-full flex items-center gap-10 p-5 bg-slate-100 shadow-md rounded-md hover:bg-slate-200 transition cursor-pointer"
        v-for="category in categories"
        :key="category?.id"
      >
        <div class="text-2xl">{{ category?.id }}</div>
        <div class="text-2xl">{{ category?.category_title }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { api } from "../API/api";
const categories = ref([]);

onMounted(() => {
  const response = api.getCategories();
  response
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        categories.value = res.data;
      }
    })
    .catch((err) => console.log(err));
});
</script>
