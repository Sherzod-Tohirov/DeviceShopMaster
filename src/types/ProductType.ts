export default interface ProductType {
    model_title: string,
    release_year: unknown,
    retail_price: unknown,
    product_desc: string,
    category_title: string,
    product_image: unknown,
    product_visibility: boolean | string | undefined,
    created_at: string
}
