import ProductType from "./ProductType";

export default interface StoreType {
  addProductModal: boolean;
  products: ProductType[] | [];
  editProductModal: boolean | string;
}
