import React, { FC, useContext, useState } from 'react'
import Select from '../../components/select'
import ProductCard from '../../components/productCard'
import '../../styles/products.css'
import ModalWrapper from '../../components/modalWrapper'
import { ICart, IPersonalizationDetails, IProduct, StoreKey } from '../../lib/types'
import PersonalisationForm from '../../components/personalisationForm'
import { CartContext } from '../../components/layout'
import { setStoreData } from '../../store'

const products: IProduct[] = [
    {
        id: 1,
        title: "Mordern Bathrom Pack 1",
        image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
        price: 123484,
        product_options: [
            {
                "title": "Age Bracket",
                "prefix": "Age",
                "suffix": '',
                "options": [
                    {
                        "id": 89,
                        "value": "13-24"
                    },
                    {
                        "id": 90,
                        "value": "25-34"
                    },
                    {
                        "id": 91,
                        "value": "35-45"
                    },
                    {
                        "id": 92,
                        "value": "46-55"
                    },
                    {
                        "id": 93,
                        "value": "56+"
                    }
                ]
            },
        ]
    },
    {
        id: 2,
        title: "Mordern Bathrom Pack 2",
        image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
        price: 123484,
        product_options: [
            {
                "title": "Age Bracket",
                "prefix": "Age",
                "suffix": '',
                "options": [
                    {
                        "id": 89,
                        "value": "13-24"
                    },
                    {
                        "id": 90,
                        "value": "25-34"
                    },
                    {
                        "id": 91,
                        "value": "35-45"
                    },
                    {
                        "id": 92,
                        "value": "46-55"
                    },
                    {
                        "id": 93,
                        "value": "56+"
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        title: "Mordern Bathrom Pack 3",
        image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
        price: 123484,
        product_options: [
            {
                "title": "Age Bracket",
                "prefix": "Age",
                "suffix": '',
                "options": [
                    {
                        "id": 89,
                        "value": "13-24"
                    },
                    {
                        "id": 90,
                        "value": "25-34"
                    },
                    {
                        "id": 91,
                        "value": "35-45"
                    },
                    {
                        "id": 92,
                        "value": "46-55"
                    },
                    {
                        "id": 93,
                        "value": "56+"
                    }
                ]
            },
        ]
    },
    {
        id: 4,
        title: "Mordern Bathrom Pack 4",
        image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
        price: 123484,
        product_options: [
            {
                "title": "Age Bracket",
                "prefix": "Age",
                "suffix": '',
                "options": [
                    {
                        "id": 89,
                        "value": "13-24"
                    },
                    {
                        "id": 90,
                        "value": "25-34"
                    },
                    {
                        "id": 91,
                        "value": "35-45"
                    },
                    {
                        "id": 92,
                        "value": "46-55"
                    },
                    {
                        "id": 93,
                        "value": "56+"
                    }
                ]
            },
        ]
    },
    {
        id: 5,
        title: "Mordern Bathrom Pack 5",
        image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
        price: 123484,
        product_options: [
            {
                "title": "Age Bracket",
                "prefix": "Age",
                "suffix": '',
                "options": [
                    {
                        "id": 89,
                        "value": "13-24"
                    },
                    {
                        "id": 90,
                        "value": "25-34"
                    },
                    {
                        "id": 91,
                        "value": "35-45"
                    },
                    {
                        "id": 92,
                        "value": "46-55"
                    },
                    {
                        "id": 93,
                        "value": "56+"
                    }
                ]
            },
        ]
    }
]


const Products: FC = () => {
    const [itemToAddToCart, setItemToAddToCart] = useState<IProduct>()
    const [showPersonalise, setShowPersonalise] = useState<boolean>(false)
    const {
        cart,
        showCart,
        setCurrentPersonalDetails,
        setShowCart,
        setCart
    } = useContext(CartContext)

    return (
        <>
            <section
                className=
                {`w-full ${(showPersonalise || showCart) && 'h-screen-70 overflow-y-hidden'}`}
            >
                <section className="filter-blck flex flex-col px-2rem">
                    <div>
                        <h1>All Products</h1>
                        <span className="small-text primary-text pr-2rem">
                            A 360 look at lumin
                        </span>
                    </div>
                    <div className="py-2rem">
                        <Select defaultValue="Filter By">
                            <option disabled>Filter By</option>
                        </Select>
                    </div>
                </section>
                <section className="w-full product-grid bg-gray-3 flex flex-row flex-wrap">
                    {
                        products.map(product => {
                            function onPickItemForCart() {
                                handlePickItemForCart(product)
                            }
                            return (<ProductCard
                                key={product.id}
                                product={product}
                                onPickItemForCart={onPickItemForCart}
                            />)
                        })
                    }
                </section>
            </section>
            {showPersonalise && itemToAddToCart && (
                <ModalWrapper
                    className="fixed items-start justify-end bg-modal-light"
                >
                    <PersonalisationForm
                        product={itemToAddToCart}
                        onClose={handleClosePersonalise}
                        onShowCart={handleShowCart}
                        addToCart={addToCart}
                    />
                </ModalWrapper>
            )}
        </>
    )


    function handlePickItemForCart(item: IProduct) {
        setItemToAddToCart(item)
        if (item.product_options.length) {
            handleShowPersonalise()
        } else {
            addToCart(item)
            handleShowCart()
        }
    }

    function addToCart(
        item: IProduct, option: IPersonalizationDetails[] = []
    ) {
        const newCart = cart.some(itm => itm.product.id === item.id)
            ? cart.map(
                itm => itm.product.id === item.id ? { ...itm, count: itm.count + 1 } : itm
            )
            : cart.concat({ product: item, personalDetails: option, count: 1 })

        setStoreData<ICart>(StoreKey.CART, newCart)
        setStoreData<IPersonalizationDetails[]>(StoreKey.PERSONAL_DETAILS, option)
        setCart && setCart(newCart)
        setCurrentPersonalDetails && setCurrentPersonalDetails(option)
    }

    function handleShowCart() {
        setShowCart && setShowCart(true)
    }
    function handleShowPersonalise() {
        setShowPersonalise && setShowPersonalise(true)
    }
    function handleClosePersonalise() {
        setShowPersonalise && setShowPersonalise(false)
    }
}

export default Products