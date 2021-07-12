import { Dispatch, SetStateAction } from "react";

export enum StoreKey {
    CART = 'cart',
    CURRENCY = 'currency',
    PERSONAL_DETAILS = 'personalization-details'
}

export interface CartData {
    cart: ICart
    showCart: boolean
    currency: string
    setCart?: Dispatch<SetStateAction<ICart>>
    setShowCart?: Dispatch<SetStateAction<boolean>>
    currentPersonalDetails: IPersonalizationDetails[]
    setCurrentPersonalDetails?: Dispatch<
        SetStateAction<IPersonalizationDetails[]>
    >
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

