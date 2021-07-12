import React, { FC, useContext } from 'react'
import { ICart, ICartItem, StoreKey } from '../../lib/types'
import { setStoreData } from '../../store'
import '../../styles/cartCard.css'
import { CartContext } from '../layout'


interface CartItemCardProps {
    cartItem: ICartItem
}

const CartItemCard: FC<CartItemCardProps> = (
    { cartItem }: CartItemCardProps
) => {

    const { cart, setCart } = useContext(CartContext)

    return (
        <section className="cart-card w-full bg-white">
            <span
                onClick={onRemoveItemFromCart}
                className="w-full flex justify-end cursor-pointer"
            >
                X
            </span>
            <section className="w-full flex justify-between">
                <div className="w-70">
                    <h4>{cartItem.product.title}</h4>
                    <span className="block">combination</span>
                    <span className="block">One time purchase of Two Month supply</span>
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
                        <span>50000000</span>
                    </div>
                </div>
                <div className="w-30">
                    <img src="" alt="" className="w-full" />
                </div>
            </section>
        </section>
    )

    function onRemoveItemFromCart() {
        const newCart = cart.filter(itm => itm.product.id !== cartItem.product.id)
        setStoreData<ICart>(StoreKey.CART, newCart)
        setCart && setCart(newCart)
    }

    function onIncreaseCount() {
        const newCart = cart.map(
            itm => itm.product.id === cartItem.product.id
                ? { ...itm, count: itm.count + 1 }
                : itm
        )
        setStoreData<ICart>(StoreKey.CART, newCart)
        setCart && setCart(newCart)
    }

    function onDecreaseCount() {
        if (cartItem.count < 2) return
        const newCart = cart.map(
            itm => itm.product.id === cartItem.product.id
                ? { ...itm, count: itm.count - 1 }
                : itm
        )
        setStoreData<ICart>(StoreKey.CART, newCart)
        setCart && setCart(newCart)
    }
}

export default CartItemCard