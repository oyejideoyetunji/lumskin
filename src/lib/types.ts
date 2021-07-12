import { Dispatch, SetStateAction } from "react";

export enum StoreKey {
    CART = 'cart',
    PERSONAL_DETAILS = 'personalization-details'
}

export interface CartData {
    cart: ICart
    showCart: boolean
    setCart?: Dispatch<SetStateAction<ICart>>
    setShowCart?: Dispatch<SetStateAction<boolean>>
    currentPersonalDetails: IPersonalizationDetails[]
    setCurrentPersonalDetails?: Dispatch<
        SetStateAction<IPersonalizationDetails[]>
    >
}

export type ICart = ICartItem[]

export interface ICartItem {
    product: IProduct
    personalDetails: IPersonalizationDetails[]
    count: number
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