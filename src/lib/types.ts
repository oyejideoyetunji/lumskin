export interface IProduct {
    id: number
    title: string
    image_url: string
    price: number
    product_options: IProductOption[]
}

export interface IProductOption {
    title: string
    prefix?: string
    suffix?: string
    options: IProductOptionValue[]
}

export interface IProductOptionValue {
    id: number
    value: string
}