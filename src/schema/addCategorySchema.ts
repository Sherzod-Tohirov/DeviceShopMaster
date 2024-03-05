import * as Yup from 'yup';

const addCategorySchema = Yup.object({
    category_title: Yup.string().required("Category is required !"),
  });

  export default addCategorySchema;