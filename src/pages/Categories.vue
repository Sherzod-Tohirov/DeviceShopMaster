<template>
  <div class="flex flex-col gap-10 items-center">
    <h2 class="text-5xl text-center">Categories list</h2>
    <ul class="list-none flex flex-col w-2/3 gap-2">
      <li
        class="w-full flex items-center justify-between gap-10 p-5 bg-slate-100 shadow-md rounded-md hover:bg-slate-200 transition cursor-pointer"
        v-for="category in store.getters.categories"
        :key="category?.id"
      >
        <div class="flex itesm-center gap-10">
          <div class="text-2xl">{{ category?.id }}</div>
          <div class="text-2xl">{{ category?.category_title }}</div>
        </div>
        <div>
          <button
            class="contained-btn danger-btn narrow-btn"
            :data-id="category?.id"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {AxiosResponse} from 'axios';
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import { useStore } from "vuex";
import { api } from "../API/api";
const categories = ref([]);
const store = useStore();
const $toast = useToast();
const handleDelete = (e: MouseEvent) => {
  const response = api.deleteCategory(e?.target?.dataset?.id);
  response.then((res: AxiosResponse) => {
    if (res.status === 200) {
      store.dispatch("fetchCategoriesData");
      $toast.success("Deleted successfully !");
    }
  }).catch((err: AxiosResponse) => console.log(err));
};
</script>
