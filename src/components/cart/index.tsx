import React, { FC } from 'react'
import '../../styles/asideFrame.css'
import '../../styles/cart.css'
import Button from '../button'
import Select from '../select'

interface CartProps{
    onClose(): void
}

const Cart: FC<CartProps> = (
    { onClose }: CartProps
) => {
    return (
        <section className="aside-frame bg-gray-1 relative">
            <section className="w-full h-50px flex items-center">
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
            <div className="w-100px flex items-center h-50px">
                <Select defaultValue="NGN">
                    <option value="NGN">NGN</option>
                </Select>
            </div>

            <section className="cart-items-wrp w-full overflow-y-auto">

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
