import React, { FC, useState } from 'react'
import Select from '../../components/select'
import ProductCard from '../../components/productCard'
import '../../styles/products.css'
import ModalWrapper from '../../components/modalWrapper'
import { IProduct } from '../../lib/types'
import PersonalisationForm from '../../components/personalisationForm'
import Cart from '../../components/cart'

const productData = {
    id: 0,
    title: "Mordern Bathrom Pack",
    image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
    price: 123484,
    product_options: []
}


const Products: FC = () => {
    const [showPersonalise, setShowPersonalise] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [itemToAddToCart, setItemToAddToCart] = useState<IProduct>()

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
                        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].map(product => {
                            function onPickItemForCart() {
                                handlePickItemForCart(productData)
                            }
                            return (<ProductCard
                                key={product.id}
                                product={productData}
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
            {showCart && (
                <ModalWrapper
                    className="fixed items-start justify-end bg-modal-light"
                >
                    <Cart onClose={handleCloseCart} />
                </ModalWrapper>
            )}
        </>
    )

    function addToCart(item: IProduct) {
        return null
    }
    function handlePickItemForCart(item: IProduct) {
        setItemToAddToCart(item)
        handleShowPersonalise()
    }
    function handleShowCart() {
        setShowCart(true)
    }
    function handleCloseCart() {
        setShowCart(false)
    }
    function handleShowPersonalise() {
        setShowPersonalise(true)
    }
    function handleClosePersonalise() {
        setShowPersonalise(false)
    }
}

export default Products