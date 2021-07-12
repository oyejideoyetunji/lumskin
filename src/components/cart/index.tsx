import { useQuery } from '@apollo/client'
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { ICart, IProduct, StoreKey } from '../../lib/types'
import { GET_CURRENCIES, GET_PRODUCTS } from '../../services/queries'
import { setStoreData } from '../../store'
import '../../styles/asideFrame.css'
import '../../styles/cart.css'
import Button from '../button'
import CartItemCard from '../cartItemCard'
import Select from '../select'

interface CartProps {
    cart: ICart
    currency: string
    setCurrency: Dispatch<SetStateAction<string>>
    onClose(): void
    setCart: Dispatch<SetStateAction<ICart>>
}

const Cart: FC<CartProps> = (
    {
        onClose,
        cart,
        currency,
        setCurrency
    }: CartProps
) => {
    const {loading, error, data} = useQuery(GET_CURRENCIES)
    const { loading: pdLoading, error: pdError, data: pdData } = useQuery(GET_PRODUCTS, {
        variables: { currency }
    })

    function getCartLiveData(products: IProduct[]){
        return cart.map(item => {
            const liveData: IProduct = products.find(
                    (product: IProduct) => product.id === item.product.id
                ) as IProduct
            return liveData ? ({...item, product: liveData}) : item
        })
    }

    return (
        <section className="aside-frame bg-gray-1 relative">
            <section className="w-full h-80px flex items-center justify-between px-1rem">
                <span
                    className="circle-icon-wrp flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                >
                    &#62;
                </span>
                <div className="w-90 flex justify-center">
                    <span>Your Cart</span>
                </div>
            </section>
            <div className="w-full flex items-center h-50px px-1rem">
                <Select
                    value={currency}
                    className="w-100px"
                    onChange={onCurrencyChange}
                >
                    {
                        !loading && !error && data &&
                        data.currency && !!data.currency?.length &&
                            data.currency.map((item: string) => (
                                <option key={item} value={item}>{item}</option>
                            ))
                    }
                </Select>
            </div>

            <section className="cart-items-wrp w-full overflow-y-auto px-1rem">
                {
                    !pdLoading && !pdError && pdData && !!pdData.products?.length && 
                    getCartLiveData(pdData.products).map(itm => (
                        <CartItemCard cartItem={itm} key={itm.product.id} />
                    ))
                }
            </section>

            <section className="w-full h-35 absolute btm-card">
                <div className="w-full flex items-center justify-between py-2rem">
                    <span>Subtotal</span>
                    <span>{pdData?.products?.length && getSubTotal(pdData?.products)}</span>
                </div>
                <Button className="white-text bg-brandGray my-1rem">
                    PROCEED TO CHECKOUT
                </Button>
            </section>
        </section>
    )

    function getSubTotal(products: IProduct[]){
        return getCartLiveData(products).reduce((prev, curr) => prev + (curr.count * curr.product.price), 0)
    }
    function onCurrencyChange(event: ChangeEvent<HTMLSelectElement>){
        setStoreData<string>(StoreKey.CURRENCY, event.target.value)
        setCurrency(event.target.value)
    }
}

export default Cart
