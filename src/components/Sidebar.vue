<template>
  <div
    class="sticky top-[150px] w-[400px] h-screen shadow-md p-4 flex flex-col gap-10"
  >
    <div class="flex flex-col gap-10">
      <h3 class="text-center text-3xl text-slate-800">Filters</h3>
      <form class="flex flex-col gap-4 justify-center items-center">
        <input
          class="w-full p-4 rounded-md border border-slate-500 placeholder:text-black text-lg"
          type="text"
          placeholder="Filter with model"
          :onKeyup="handleFilterModel"
        />

        <select
          class="w-full p-4 rounded-md border border-slate-500 text-lg"
          :onChange="handleFilterCategory"
          name=""
          id=""
        >
          <option value="" hidden>Filter by Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.category_title"
          >
            {{ category.category_title }}
          </option>
        </select>
      </form>
    </div>
    <div class="flex flex-col gap-6">
      <h3 class="text-center text-3xl text-slate-800">Actions</h3>
      <div class="flex flex-col gap-4 items-center">
        <button class="contained-btn" @click="toggleModal">
          Add new product
        </button>
        <button class="contained-btn" @click="toggleCategoryModal">Add new category</button>
        <p class="select-none opacity-15 text-lg">
          ...Other actions coming soon
        </p>
      </div>
    </div>
  </div>
  <div class="overlay" @click="handleCloseModal" v-if="modalRef">
    <div class="modal">
      <button class="close-btn">&times;</button>
      <div class="flex flex-col items-center justify-center gap-5 w-full">
        <h3 class="text-4xl">Add Product</h3>
        <Form
          class="flex flex-col gap-4 w-full items-center"
          @submit="onSubmit"
          :validation-schema="productSchema"
        >
          <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-2 w-full">
              <Field
                class="form-input"
                name="model_title"
                placeholder="Model title*"
                type="text"
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
              />
              <ErrorMessage class="err-msg" name="release_year" />
            </div>
          </div>
          <Field
            class="form-input select-input"
            name="category_title"
            as="select"
          >
            <option value="" hidden>Choose category*</option>
            <option
              :value="category?.category_title"
              v-for="category in categories"
              :key="category?.id"
            >
              {{ category?.category_title }}
            </option>
          </Field>
          <ErrorMessage class="err-msg" name="category_title" />
          <Field
            class="form-input"
            name="retail_price"
            placeholder="Recommended retail price*"
            type="number"
            min="1"
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
          />
          <ErrorMessage class="err-msg" name="product_desc" />
          <Field name="product_visibility">
            <div class="flex items-center gap-5">
              <input
                id="product-visibility"
                class="checkbox-input"
                type="checkbox"
                v-model="isProductVisible"
              />
              <label class="text-xl cursor-pointer" for="product-visibility">
                Visible to users
              </label>
            </div>
          </Field>
          <button
            class="contained-btn"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
  <div class="overlay" @click="handleCategoryCloseModal" v-if="categoryRef">
    <div class="modal">
      <button class="close-btn">&times;</button>
      <div class="flex flex-col items-center justify-center gap-5 w-full">
        <h3 class="text-4xl">Add Category</h3>
        <Form
          class="flex flex-col gap-4 w-full items-center"
          @submit="onCategorySubmit"
          :validation-schema="addCategorySchema"
        >
          <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-2 w-full">
              <Field
                class="form-input"
                name="category_title"
                placeholder="Category title*"
                type="text"
              />
              <ErrorMessage class="err-msg" name="category_title" />
            </div>
          </div>
          <button
            class="contained-btn"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import productSchema from "../schema/productSchema";
import addCategorySchema from '../schema/addCategorySchema';
import { onMounted, ref } from "vue";
import { AxiosResponse } from "axios";
import { api } from "../API/api";
import ProductType from "../types/ProductType";
import { formatted_date } from "../lib/customFunctions";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import store from "../store/index";
import CategoryType from "../types/CategoryType";

const filterModelRef = ref("");
let timeout = undefined as (number | undefined);
const handleFilterModel = (e: any) => {
  if (timeout) {
    clearInterval(timeout);
  }
  timeout = setTimeout(() => {
    filterModelRef.value = e?.target?.value;
    const response = api.getProducts();
    response
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          const filteredResult = res.data.filter((item: ProductType) => {
            return item.model_title
              .toLowerCase()
              .includes(filterModelRef.value.toLowerCase());
          });
          store.dispatch("updateProductsAction", filteredResult);
        }
      })
      .catch((err: AxiosResponse) => console.log(err));
  }, 800);
};

const handleFilterCategory = (e: any) => {
  const response = api.getProductsByCategory(e?.target?.value);
  response
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        store.dispatch("updateProductsAction", res?.data);
      }
    })
    .catch((err: AxiosResponse) => console.log(err));
};

const categories = ref([]);
const response = api.getCategories();
response.then((res) => {
  if (res.status === 200) {
    categories.value = res.data;
  }
});
const modalRef = ref(false);
const categoryRef = ref(false);
const toggleModal = () => {
  modalRef.value = !modalRef.value;
};

const toggleCategoryModal = () => {
  categoryRef.value = !categoryRef.value;
};
const handleCloseModal = (e) => {
  if (e.target.matches(".overlay") || e.target.matches(".close-btn")) {
    toggleModal();
  }
};

const handleCategoryCloseModal = (e) => {
  if (e.target.matches(".overlay") || e.target.matches(".close-btn")) {
    toggleCategoryModal();
  }
};

const isProductVisible: any = ref(false);

const $toast = useToast();

onMounted(async () => {
  const response = await api.getCategories();
  if (response.status === 200) {
    categories.value = response?.data;
  } else {
    throw new Error("Something went wrong !");
  }
});
const onSubmit = (values: ProductType, { resetForm }: any) => {
  const productData = new FormData();
  productData.append("model_title", values?.model_title);
  productData.append("release_year", values?.release_year);
  productData.append("retail_price", values?.retail_price);
  productData.append("product_desc", values?.product_desc);
  productData.append("category_title", values?.category_title);
  productData.append("product_image", values?.product_image);
  productData.append("product_visibility", isProductVisible.value);
  productData.append("created_at", formatted_date());
  const response = api.addProduct(productData);
  response.then((res: AxiosResponse) => {
    if (res?.status === 201) {
      resetForm();
      toggleModal();
      store.dispatch("fetchProductsData");
      $toast.success("Created successfully !");
    }
  });
};

const onCategorySubmit = (values: CategoryType, { resetForm }: any) => {
  const categoryData = new FormData();
  categoryData.append("category_title", values?.category_title);
  categoryData.append("created_at", formatted_date());
  const response = api.addCategory(categoryData);
  response.then((res: AxiosResponse) => {
    if (res?.status === 201) {
      resetForm();
      toggleCategoryModal();
      store.dispatch("fetchCategoriesData")
      $toast.success("Created successfully !");
    }
  });
};
</script>
