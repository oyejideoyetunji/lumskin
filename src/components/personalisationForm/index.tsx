import React, { ChangeEvent, FC, useContext, useState } from 'react'
import { IPersonalizationDetails, IProduct } from '../../lib/types'
import '../../styles/personalisationForm.css'
import '../../styles/asideFrame.css'
import Button from '../button'
import Select from '../select'
import { CartContext } from '../layout'

interface PersonalisationFormProps {
    product: IProduct
    onClose(): void
    addToCart(item: IProduct, option: IPersonalizationDetails[]): void
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

    const { currentPersonalDetails } = useContext(CartContext)

    const initialOptionData: Record<string, { title: string, value: string }> = {}

    for (const option of product?.product_options) {
        initialOptionData[option.title] = {
            title: option.title,
            value: currentPersonalDetails?.find(
                itm => itm.title === option.title
            )?.value || ''
        }
    }

    const [optionsData, setOptionsData] = useState(initialOptionData)

    return (
        <form className="aside-frame bg-gray-1 relative px-1rem py-1rem">
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
            <h2>Products that you receive may vary according to your age bracket &#38; skin type to optimize results.</h2>
            <h3>Personalization details</h3>
            {
                product?.product_options?.length > 0 &&
                product.product_options.map((pdOption) => {
                    return (
                        <Select
                            name={pdOption.title}
                            value={optionsData[pdOption.title].value}
                            key={pdOption.title}
                            onChange={onOptionsDataChange}
                        >
                            {
                                pdOption?.options.map(option => (
                                    <option
                                        key={option.id}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </option>
                                ))
                            }
                        </Select>
                    )
                })
            }
            <section className="absolute btm-btn-wrp">
                <Button
                    className="white-text bg-brandGray"
                    onClick={onAddToCart}
                    type="button"
                >
                    Add to Cart
                </Button>
            </section>
        </form>
    )

    function onAddToCart() {
        addToCart(product, Object.values(optionsData))
        onClose()
        onShowCart()
    }

    function onOptionsDataChange(event: ChangeEvent<HTMLSelectElement>) {
        setOptionsData({
            ...optionsData,
            [event.target.name]: { title: event.target.name, value: event.target.value }
        })
    }
}

export default PersonalisationForm