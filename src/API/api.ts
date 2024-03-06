import axios from "axios";
import ProductType from "../types/ProductType";
import CategoryType from "../types/CategoryType";
const port = '3000';
const BASE_URL = `http://localhost:${port}`;
export const api = {
  getCategories: () => {
    const response = axios.get(`${BASE_URL}/categories`);
    return response;
  },
  addCategory: (formData: CategoryType | FormData) => {
    const response = axios.post(`${BASE_URL}/categories`, formData);
    return response
  },
  deleteCategory: (id: string) => {
    const response = axios.delete(`${BASE_URL}/categories/${id}`);
    return response;
  },
  addProduct: (formData: ProductType | FormData) => {
    const response = axios.postForm(`${BASE_URL}/products`, formData);
    return response;
  },
  getProducts: (page = null) => {
    let response;
    if (page) {
        response = axios.get(`${BASE_URL}/products?_page=${page}&_limit=10`)
    } else {
      response = axios.get(`${BASE_URL}/products`);
    }
    return response;
  },
  getProductsByCategory: (category: string) => {
    const response = axios.get(
      `${BASE_URL}/products?category_title=${category}`
    );
    return response;
  },
  editProduct: (id: string | number, formData: ProductType | FormData) => {
    const response = axios.putForm(`${BASE_URL}/products/${id}`, formData);
    return response;
  },
  deleteProduct: (id: string) => {
    const response = axios.delete(`${BASE_URL}/products/${id}`);
    return response;
  },
};
