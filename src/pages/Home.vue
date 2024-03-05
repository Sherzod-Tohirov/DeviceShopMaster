<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import productSchema from "../schema/productSchema";
import { AxiosResponse } from "axios";
import { onMounted, ref, computed, reactive } from "vue";
import * as Yup from "yup";
import { api } from "../API/api";
import Modal from "../components/Modal.vue";
import Sidebar from "../components/Sidebar.vue";
import { RouterView } from "vue-router";
import ProductType from "../types/ProductType";
import { formatted_date } from "../lib/customFunctions";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import store from "../store/index";


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
