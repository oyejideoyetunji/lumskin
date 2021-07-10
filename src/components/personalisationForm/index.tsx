import React, { FC } from 'react'
import { IProduct } from '../../lib/types'
import '../../styles/personalisationForm.css'
import '../../styles/asideFrame.css'
import Button from '../button'
import Select from '../select'

interface PersonalisationFormProps {
    product: IProduct
    onClose(): void
    addToCart(product: IProduct): void
    onShowCart(): void
}

const PersonalisationForm: FC<PersonalisationFormProps> = (
    {
        product,
        onClose,
        addToCart,
        onShowCart,
    }: PersonalisationFormProps
) => {
    return(
        <form className="aside-frame bg-gray-1 relative">
            <section className="w-full flex items-center">
                <span
                    className="circle-icon-wrp flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                >
                    &#62;
                </span>
                <div className="w-full flex justify-center">
                    <img src={product.image_url} alt="" className="w-50" />
                </div>
            </section>
            <h1>First Let's personalize.</h1>
            <h2>Products that you receive may vary according to your age bracket & skin type to optimize results.</h2>
            <h3>Personalization details</h3>
            {
                product.product_options.length > 0 &&
                product.product_options.map((pdOption) => {
                    return (
                        <Select></Select>
                    )
                })
            }
            <section className="absolute btm-btn-wrp">
                <Button
                    className="white-text bg-brandGray"
                    onClick={onAddToCart}
                >
                    Add to Cart
                </Button>
            </section>
        </form>
    )

    function onAddToCart() {
        addToCart(product)
        onClose()
        onShowCart()
    }
}

export default PersonalisationForm