import * as Yup from 'yup';

const productSchema = Yup.object({
    model_title: Yup.string().required("Model title is required !"),
    release_year: Yup.string().required("Release year is required !"),
    retail_price: Yup.string().required("Retail price is required !"),
    product_desc: Yup.string().required("Product description is required !"),
    category_title: Yup.string().required("Category is required !"),
    product_image: Yup.mixed().required("Product image is required !")
  });

  export default productSchema;