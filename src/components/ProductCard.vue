<template>
  <li
    class="relative shadow-md shadow-slate-400 lg:w-1/4 md:w-1/3 min-w-[320px] p-4 rounded-md flex flex-col items-center max-h-[650px] overflow-y-auto overflow-x-hidden"
  >
    <img
      class="object-contain w-40"
      :src="
        props.product.product_image
          ? `http://localhost:5173/${props.product.product_image}`
          : '../assets/images/s23.jpg'
      "
      alt="Image"
    />
    <div class="flex flex-col items-start p-2 gap-2 pt-10 w-full">
      <span class="price-tag font-mono">{{ props.product.retail_price }}$</span>
      <p class="text-xl">
        <span class="font-medium">Model</span>: {{ props.product.model_title }}
      </p>
      <p class="text-xl">
        <span class="font-medium">Category</span>:
        {{ props.product.category_title }}
      </p>
      <p class="text-xl">
        <span class="font-medium">Release year</span>:
        {{ props.product.release_year }}
      </p>
      <p
        class="text-justify text-xl font-light text-wrap max-w-[100%] break-all"
      >
        <span class="font-medium">Description</span>:
        {{
          props.product.product_desc ||
          "No description available for this product"
        }}
      </p>
      <p class="text-xl mt-auto">
        <span class="font-medium">Created at</span>:
        {{ props.product?.created_at || "02.01.2024y" }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-3 w-full pt-10 mt-auto">
      <form class="flex items-center gap-2">
        <input
          class="w-5 h-5 accent-green-400"
          :id="props.product.id"
          :checked="props.product.product_visibility == 'false' ? false : true"
          type="checkbox"
        />
        <label class="text-lg cursor-pointer" :for="props.product.id"
          >Visible to users</label
        >
      </form>
      <div class="flex gap-2 w-full">
        <button class="edit-btn" @click="toggleModal">EDIT</button>
        <button class="delete-btn" @click="toggleDeleteModal">DELETE</button>
      </div>
    </div>
  </li>
  <div class="overlay" @click="handleModal" v-if="toggleModalRef">
    <div class="modal">
      <button class="close-btn" @click="store.commit('toggleEditProductModal')">
        &times;
      </button>
      <div class="flex flex-col items-center justify-center gap-5 w-full">
        <h3 class="text-4xl">Edit Product</h3>
        <Form
          class="flex flex-col gap-4 w-full items-center"
          @submit="onSubmit"
          :validation-schema="editProductSchema"
        >
          <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-2 w-full">
              <Field
                class="form-input"
                name="model_title"
                placeholder="Model title*"
                type="text"
                :value="props.product?.model_title"
              />
              <ErrorMessage class="err-msg" name="model_title" />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <Field
                class="form-input"
                name="release_year"
                placeholder="Year of release*"
                type="number"
                min="1000"
                :value="props.product?.release_year"
              />
              <ErrorMessage class="err-msg" name="release_year" />
            </div>
          </div>
          <Field
            class="form-input select-input"
            name="category_title"
            as="select"
            v-model="selectedCategory"
          >
            <option value="" hidden>Choose category*</option>
            <option
              v-for="category in categories"
              :value="category?.category_title"
              :key="category?.id"
              :selected="category.category_title == selectedCategory"
            >
              {{ category?.category_title }}
            </option>
            <option value="Se">Something</option>
          </Field>
          <ErrorMessage class="err-msg" name="category_title" />
          <Field
            class="form-input"
            name="retail_price"
            placeholder="Recommended retail price*"
            type="number"
            min="1"
            :value="props.product?.retail_price"
          />
          <ErrorMessage class="err-msg" name="retail_price" />
          <Field
            class="form-input"
            name="product_image"
            placeholder="Upload product image*"
            id="product-image"
            type="file"
            accept="image/*"
          />
          <ErrorMessage class="err-msg" name="product_image" />
          <Field
            class="form-input min-h-[120px]"
            name="product_desc"
            as="textarea"
            placeholder="Product description*"
            id="product-desc"
            :value="props.product?.product_desc"
          />
          <ErrorMessage class="err-msg" name="product_desc" />
          <Field name="product_visibility">
            <div class="flex items-center gap-5">
              <input
                id="product-visibility"
                class="checkbox-input"
                type="checkbox"
                v-model="selectedVisibility"
                :checked="selectedVisibility == 'true' ? true : false"
              />
              <label class="text-xl cursor-pointer" for="product-visibility">
                Visible to users
              </label>
            </div>
          </Field>
          <button class="contained-btn" type="submit">Submit</button>
        </Form>
      </div>
    </div>
  </div>
  <div class="overlay" @click="handleDeleteModal" v-if="toggleDeleteModalRef">
    <div class="modal">
      <button class="close-btn">&times;</button>
      <div class="flex flex-col items-center justify-center gap-14 w-full">
        <h3 class="text-4xl">Do you really want to delete ?</h3>
        <div class="flex items-center gap-8">
          <button
            class="contained-btn min-w-[150px]"
            @click="toggleDeleteModal"
          >
            No
          </button>
          <button
            class="contained-btn danger-btn min-w-[150px]"
            @click="handleDelete"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineProps } from "vue";
import store from "../store/index";
import editProductSchema from "../schema/editProductSchema";
import { AxiosResponse } from "axios";
import { onMounted, ref, computed, reactive } from "vue";
import * as Yup from "yup";
import { api } from "../API/api";
import Modal from "../components/Modal.vue";
import ProductType from "../types/ProductType";
import { formatted_date } from "../lib/customFunctions";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const categories = ref([]);
const loading = reactive({
  loader: false,
});
const isProductVisible = ref(false);
const $toast = useToast();
const toggleModalRef = ref(false);
const toggleDeleteModalRef = ref(false);
onMounted(async () => {
  const response = await api.getCategories();
  if (response.status === 200) {
    categories.value = response?.data;
  } else {
    throw new Error("Something went wrong !");
  }
});
const props = defineProps(["product"]);
const selectedCategory = ref(props.product.category_title);
const selectedVisibility = ref(props.product.product_visibility);

const handleEdit = (e: MouseEvent) => {
  store.commit("toggleEditProductModal");
};

const toggleModal = () => {
  toggleModalRef.value = !toggleModalRef.value;
};

const toggleDeleteModal = () => {
  toggleDeleteModalRef.value = !toggleDeleteModalRef.value;
};

const handleModal = (e: MouseEvent) => {
  const target = e.target as Element;
  if (target?.matches(".overlay") || target?.matches(".close-btn")) {
    toggleModal();
  }
};

const handleDeleteModal = (e: MouseEvent) => {
  const target = e.target as Element;
  if (target?.matches(".overlay") || target?.matches(".close-btn")) {
    toggleDeleteModal();
  }
};

const handleDelete = () => {
  const deleteResponse = api.deleteProduct(props.product.id);
  deleteResponse
    .then((res: AxiosResponse) => {
      console.log(res);

      if (res.status === 200) {

        const response = api.getProducts();
        response.then((res: AxiosResponse) => {
          if (res.status === 200) {
            store.dispatch("updateProductsAction", res?.data);
          }
        });
        $toast.success("Deleted successfully !");
        toggleDeleteModal();
      }
    })
    .catch((err: AxiosResponse) => console.log(err));
};

const onSubmit = (values: ProductType, { resetForm }: any) => {
  loading.loader = true;
  console.log(isProductVisible);

  const productData = new FormData();
  productData.append("model_title", values?.model_title);
  productData.append("release_year", values?.release_year);
  productData.append("retail_price", values?.retail_price);
  productData.append("product_desc", values?.product_desc);
  productData.append("category_title", values?.category_title);
  productData.append(
    "product_image",
    values?.product_image || props?.product?.product_image
  );
  productData.append("product_visibility", selectedVisibility.value);
  productData.append("created_at", formatted_date());
  const response = api.editProduct(props.product.id, productData);
  response.then((res: AxiosResponse) => console.log(res));
  console.log(isProductVisible);
  response.then((res: AxiosResponse) => {
    if (res?.status === 200) {
      loading.loader = false;
      resetForm();
      toggleModal();
      store.dispatch("fetchProductsData");
      $toast.success("Updated successfully !");
    }
  });
};
</script>
