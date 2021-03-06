import { useQuery } from '@apollo/client'
import React, { ChangeEvent, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IProduct, IStoreState } from '../../lib/types'
import { delimitNumber } from '../../lib/utils'
import { setCurrency } from '../../reducers/currencyReducer'
import { GET_CURRENCIES, GET_PRODUCTS } from '../../services/queries'
import '../../styles/asideFrame.css'
import '../../styles/cart.css'
import Button from '../button'
import CartItemCard from '../cartItemCard'
import LoadingCard from '../loadingCard'
import Select from '../select'

interface CartProps {
    onClose(): void
}

const Cart: FC<CartProps> = ({ onClose }: CartProps) => {

    const { cart, currency } = useSelector((state: IStoreState) => state )
    const dispatch = useDispatch()

    const { loading, error, data } = useQuery(GET_CURRENCIES)
    const { loading: pdLoading, error: pdError, data: pdData } = useQuery(GET_PRODUCTS, {
        variables: { currency }
    })

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
                        !loading && !error && !!data?.currency?.length &&
                        data.currency.map((item: string) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </div>

            <section className="cart-items-wrp w-full overflow-y-auto px-1rem">
                {
                    pdLoading
                        ? (
                            <LoadingCard />
                        )
                        : pdError
                            ? (
                                <div
                                    className="w-full px-2rem h-300px danger-text flex items-center justify-center text-center"
                                >
                                    Oops!! an unexpected error has ocurred please try again.
                                </div>
                            )
                            : (pdData?.products?.length && getCartLiveData(pdData.products).length)
                                ? getCartLiveData(pdData.products).map(itm => (
                                    <CartItemCard cartItem={itm} key={itm.id} />
                                ))
                                : <div
                                    className="w-full px-2rem h-300px flex items-center justify-center text-center"
                                >
                                    There are no items in your cart.
                                </div>
                }
            </section>

            <section className="w-full h-35 absolute btm-card">
                <div className="w-full flex items-center justify-between py-2rem">
                    <span>Subtotal</span>
                    <span>
                        {currency}
                        {
                            !!pdData?.products?.length
                            && delimitNumber(getSubTotal(pdData?.products))
                        }
                    </span>
                </div>
                <Button className="white-text bg-brandGray my-1rem">
                    PROCEED TO CHECKOUT
                </Button>
            </section>
        </section>
    )

    function getCartLiveData(products: IProduct[]) {
        try {
            return cart.map(item => {
                const liveData: IProduct = products.find(
                    (product: IProduct) => product.id === item.id
                ) as IProduct
                return ({ ...item, product: liveData })
            })
        } catch (err) {
            return []
        }
    }

    function getSubTotal(products: IProduct[]) {
        return getCartLiveData(products)
            .reduce((prev, curr) => prev + (curr.count * curr.product.price), 0)
    }
    function onCurrencyChange(event: ChangeEvent<HTMLSelectElement>) {
        dispatch(
            setCurrency(event.target.value)
        )
    }
}

export default Cart
