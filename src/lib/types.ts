export enum LocalStoreKey {
    CART = 'cart',
    CURRENCY = 'currency',
    PERSONAL_DETAILS = 'personalization-details'
}

export interface IAction<T, K> {
    type: T
    payload: K
}

export interface IStoreState {
    cart: ICart
    showCart: boolean
    currency: string
    personalDetails: IPersonalizationDetails[]
}

export type ICart = ICartItem[]

export interface ICartItem {
    id: number
    personalDetails: IPersonalizationDetails[]
    count: number
}

export interface LiveCartItem {
    id: number
    personalDetails: IPersonalizationDetails[]
    count: number
    product: IProduct
}

export interface IPersonalizationDetails {
    title: string
    value: string
}

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

