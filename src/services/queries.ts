import { gql } from '@apollo/client'

export const GET_CURRENCIES = gql`
    query currency{
        currency
    }
`

export const GET_PRODUCTS = gql`
    query products($currency: Currency!){
        products{
            id
            title
            image_url
            price(currency: $currency)
            product_options{
                title
                prefix
                suffix
                options{
                    id
                    value
                }
            }
        }
    }
`