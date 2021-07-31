import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState, LiveCartItem } from '../../lib/types'
import { delimitNumber } from '../../lib/utils'
import { decreaseItemCount, increaseItemCount, removeItemFromCart } from '../../reducers/cartReducers'
import '../../styles/cartCard.css'


interface CartItemCardProps {
    cartItem: LiveCartItem
}

const CartItemCard: FC<CartItemCardProps> = (
    { cartItem }: CartItemCardProps
) => {

    const { currency } = useSelector((state: IStoreState) => state)
    const dispatch = useDispatch()

    return (
        <section className="cart-card w-full bg-white">
            <div className="w-full flex justify-end body-font">
                <span
                    onClick={onRemoveItemFromCart}
                    className="w-fit body-font cursor-pointer"
                >
                    X
                </span>
            </div>
            <section className="w-full flex justify-between">
                <div className="w-70">
                    <h4 className="thick-txt font-16">{cartItem.product.title}</h4>
                    <span className="block">combination</span>
                    <span className="block light-txt font-14">One time purchase of Two Month supply</span>
                    <div className="w-full flex items-center justify-between py-1rem">
                        <div className="ctrl-bx w-100px flex items-center justify-between">
                            <span onClick={onDecreaseCount} className="cursor-pointer">
                                -
                            </span>
                            <span className="cursor-pointer">{cartItem.count}</span>
                            <span onClick={onIncreaseCount} className="cursor-pointer">
                                +
                            </span>
                        </div>
                        <span className="light-txt font-16">
                            {`${currency}${delimitNumber(cartItem.count * cartItem.product.price)}`}
                        </span>
                    </div>
                </div>
                <div className="w-30">
                    <img
                        src={cartItem.product.image_url}
                        alt={cartItem.product.title}
                        className="cart-itm-img"
                    />
                </div>
            </section>
        </section>
    )

    function onRemoveItemFromCart() {
        dispatch(
            removeItemFromCart({ id: cartItem.product.id })
        )
    }

    function onIncreaseCount() {
        dispatch(
            increaseItemCount({ id: cartItem.product.id })
        )
    }

    function onDecreaseCount() {
        dispatch(
            decreaseItemCount(cartItem)
        )
    }
}

export default CartItemCard
