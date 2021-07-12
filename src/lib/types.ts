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

// export enum currency {
//     USD = 'USD',
//     AED = 'AED',
//     AFN = 'AFN',
//     ALL = 'ALL',
//     AMD = 'AMD',
//     ANG = 'ANG',
//     AOA = 'AOA',
//     ARS = 'ARS',
//     AUD = 'AUD',
//     AWG = 'AWG',
//     AZN = 'AZN',
//     BAM = 'BAM',
//     BBD = 'BBD',
//     BDT = 'BDT',
//     BGN = 'BGN',
//     BIF = 'BIF',
//     BMD = 'BMD',
//     BND = 'BND',
//     BOB = 'BOB',
//     BRL = 'BRL',
//     BSD = 'BSD',
//     BWP = 'BWP',
//     BZD = 'BZD',
//     CAD = 'CAD',
//     CDF = 'CDF',
//     CHF = 'CHF',
//     CLP = 'CLP',
//     CNY = 'CNY',
//     COP = 'COP',
//     CRC = 'CRC',
//     CVE = 'CVE',
//     CZK = 'CZK',
//     DJF = 'DJF',
//   DKK
//   DOP
//   DZD
//   EGP
//   ETB
//   EUR
//   FJD
//   FKP
//   GBP
//   GEL
//   GIP
//   GMD
//   GNF
//   GTQ
//   GYD
//   HKD
//   HNL
//   HRK
//   HTG
//   HUF
//   IDR
//   ILS
//   INR
//   ISK
//   JMD
//   JPY
//   KES
//   KSG
//   KHR
//   KMF
//   KRW
//   KYD
//   KZT
//   LAK
//   LBP
//   LKR
//   LRD
//   LSL
//   MAD
//   MDL
//   MGA
//   MKD
//   MMK
//   MNT
//   MOP
//   MRO
//   MUR
//   MVR
//   MWK
//   MXN
//   MYR
//   MZN
//   NAD
//   NGN
//   NIO
//   NOK
//   NPR
//   NZD
//   PAB
//   PEN
//   PGK
//   PHP
//   PKR
//   PLN
//   PYG
//   QAR
//   RON
//   RSD
//   RUB
//   RWF
//   SAR
//   SBD
//   SCR
//   SEK
//   SGD
//   SHP
//   SLL
//   SOS
//   SRD
//   STD
//   SVC
//   SZL
//   THB
//   TJS
//   TOP
//   TRY
//   TTD
//   TWD
//   TZS
//   UAH
//   UGX
//   UYU
//   UZS
//   VND
//   VUV
//   WST
//   XAF
//   XCD
//   XOF
//   XPF
//   YER
//   ZAR
//   ZMW

// }