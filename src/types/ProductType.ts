export default interface ProductType {
    model_title: string | boolean,
    release_year: string | boolean,
    retail_price: string | boolean,
    product_desc: string | boolean,
    category_title: string | boolean,
    product_image: string | File | Blob | boolean,
    product_visibility: boolean | string | undefined,
    created_at: string | boolean
}
