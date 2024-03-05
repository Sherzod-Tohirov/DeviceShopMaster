import CategoryType from "./CategoryType";
import ProductType from "./ProductType";

export default interface StoreType {
  addProductModal: any;
  products: any;
  editProductModal: any
  categories: any;
}


// addProductModal: boolean;
// products: ProductType[] | [];
// editProductModal: boolean | string;
// categories: CategoryType[] | [];