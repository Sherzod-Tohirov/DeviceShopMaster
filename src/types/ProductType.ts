export default interface ProductType {
    model_title: string,
    release_year: string | Blob | unknown,
    retail_price: string | Blob | unknown,
    product_desc: string,
    category_title: string,
    product_image: string | File | Blob | unknown,
    product_visibility: boolean | string | undefined,
    created_at: string
}
