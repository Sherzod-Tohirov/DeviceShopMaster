<script lang="ts" setup>
import Sidebar from "../components/Sidebar.vue";
import { RouterView } from "vue-router";

</script>

<template>
  <div class="flex gap-2">
    <Sidebar />
    <div class="container mx-auto">
      <div class="flex flex-col gap-20 py-5">
        <RouterView />
      </div>
    </div>
  </div>
  
</template>
