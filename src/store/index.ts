import { createStore } from "vuex";
import ProductType from "../types/ProductType";
import StoreType from "../types/StoreType";
import Commit from "../types/CommitType";
import { api } from "../API/api";

const store = createStore({
  state: {
    addProductModal: false,
    editProductModal: false,
    products: [],
  },
  mutations: {
    toggleAddProductModal(state: StoreType) {
      state.addProductModal = !state.addProductModal;
    },
    toggleEditProductModal(state: StoreType) {
      state.editProductModal = !state.editProductModal;
    },
    updateProducts(state: StoreType, payload: ProductType[]) {
      state.products = payload;
    },
  },
  actions: {
    updateProductsAction({ commit }: Commit, payload: ProductType[]) {
      commit("updateProducts", payload);
    },
    fetchProductsData({ commit }: Commit) {
      const response = api.getProducts();
      response
        .then((res) => {
          if (res.status === 200) {
            commit("updateProducts", res?.data);
          }
        })
        .catch((err) => console.log(err));
    },
  },
  getters: {
    products(state: StoreType) {
      return state.products;
    },
    addProductModal(state: StoreType) {
      return state.addProductModal;
    },
    editProductModal(state: StoreType) {
      return state.editProductModal;
    },
  },
});

export default store;
