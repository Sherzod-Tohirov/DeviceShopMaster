import axios from 'axios';
import ProductType from '../types/ProductType';

const BASE_URL = "http://localhost:3000"


export const api = {
    getCategories: () => {
        const response = axios.get(`${BASE_URL}/categories`);
        return response;
    },
    addProduct: (formData: ProductType | FormData) => {
        const response = axios.postForm(`${BASE_URL}/products`, formData);
        return response;
    },
    getProducts: () => {
        const response = axios.get(`${BASE_URL}/products`);
        return response;
    },
    getProductsByCategory: (category: string) => {
        const response = axios.get(`${BASE_URL}/products?category_title=${category}`);
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
}