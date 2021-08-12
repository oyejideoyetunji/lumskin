import React, { ChangeEvent, FC, useState } from 'react'
import { IPersonalizationDetails, IProduct, IStoreState } from '../../lib/types'
import '../../styles/personalisationForm.css'
import '../../styles/asideFrame.css'
import Button from '../button'
import Select from '../select'
import { useSelector } from 'react-redux'

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

    const { personalDetails } = useSelector((state: IStoreState) => state)
    const [optionsData, setOptionsData] = useState(getInitialOptionsData())

    return (
        <form className="aside-frame bg-gray-1 relative px-1rem py-1rem">
            <section className="hdr w-full flex items-center justify-between">
                <span
                    className="circle-icon-wrp flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                >
                    &#62;
                </span>
                <div className="w-90 flex justify-center">
                    <img src={product.image_url} alt="" className="pd-hdr-img" />
                </div>
            </section>
            <h1 className="light-txt font-26">First Let's personalize.</h1>
            <h2 className="light-txt font-16">
                Products that you receive may vary according to your age bracket &#38; skin type to optimize results.
            </h2>
            <h3 className="thick-txt font-14">Personalization details</h3>
            {
                product?.product_options?.length > 0 &&
                product.product_options.map((pdOption) => {
                    return (
                        <div key={pdOption.title}>
                            <span className="thick-txt font-14">
                                {pdOption.title}
                            </span>
                            <Select
                                name={pdOption.title}
                                value={optionsData[pdOption.title].value}
                                onChange={onOptionsDataChange}
                                className="my-10px"
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
                        </div>
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

    function getInitialOptionsData() {
        const initialOptionData: Record<string, { title: string, value: string }> = {}

        for (const option of product?.product_options) {
            initialOptionData[option.title] = {
                title: option.title,
                value: personalDetails?.find(
                    itm => itm.title === option.title
                )?.value || ''
            }
        }

        return initialOptionData
    }

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