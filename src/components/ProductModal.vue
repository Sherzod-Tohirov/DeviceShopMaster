<template>
  <Modal v-if="store.getters.productModal">
    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <h3 class="text-4xl">{{title}}</h3>
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
        <button class="contained-btn" type="submit">Submit</button>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
import { api } from "../API/api";
import productSchema from "../schema/productSchema";
import Modal from "./Modal.vue";
import store from "../store/index";
import { Form, Field, ErrorMessage } from "vee-validate";
const categories = ref([]);
const isProductVisible = ref(false);

onMounted(async () => {
  const response = await api.getCategories();
  if (response.status === 200) {
    categories.value = response?.data;
  } else {
    throw new Error("Something went wrong !");
  }
});
</script>
