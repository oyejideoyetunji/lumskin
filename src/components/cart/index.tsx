import React, { Dispatch, FC, SetStateAction } from 'react'
import { ICart } from '../../lib/types'
import '../../styles/asideFrame.css'
import '../../styles/cart.css'
import Button from '../button'
import CartItemCard from '../cartItemCard'
import Select from '../select'

interface CartProps {
    cart: ICart
    onClose(): void
    setCart: Dispatch<SetStateAction<ICart>>
}

const Cart: FC<CartProps> = (
    { onClose, cart }: CartProps
) => {
    return (
        <section className="aside-frame bg-gray-1 relative">
            <section className="w-full h-50px flex items-center px-1rem">
                <span
                    className="circle-icon-wrp flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                >
                    &#62;
                </span>
                <div className="w-full flex justify-center">
                    <span>Your Cart</span>
                </div>
            </section>
            <div className="w-full flex items-center h-50px px-1rem">
                <Select className="w-100px" defaultValue="NGN">
                    <option value="NGN">NGN</option>
                </Select>
            </div>

            <section className="cart-items-wrp w-full overflow-y-auto px-1rem">
                {
                    cart.length > 0 && cart.map(itm => (
                        <CartItemCard cartItem={itm} key={itm.product.id} />
                    ))
                }
            </section>

            <section className="w-full h-35 absolute btm-card">
                <div className="w-full flex items-center justify-between py-2rem">
                    <span>Subtotal</span>
                    <span>4400020</span>
                </div>
                <Button className="white-text bg-brandGray my-1rem">
                    PROCEED TO CHECKOUT
                </Button>
            </section>
        </section>
    )
}

export default Cart
