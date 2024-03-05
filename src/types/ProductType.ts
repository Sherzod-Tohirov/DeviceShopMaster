export default interface ProductType {
    model_title: string,
    release_year: string | Blob,
    retail_price: string | Blob,
    product_desc: string,
    category_title: string,
    product_image: string | File | Blob,
    product_visibility: boolean | string | undefined,
    created_at: string
}
