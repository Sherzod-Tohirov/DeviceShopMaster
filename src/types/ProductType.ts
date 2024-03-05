export default interface ProductType {
    model_title: string,
    release_year: string,
    retail_price: string,
    product_desc: string,
    category_title: string,
    product_image: string | File | Blob,
    product_visibility: boolean | string | undefined,
    created_at: string
}
