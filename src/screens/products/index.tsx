import React, { FC, useContext, useState } from 'react'
import Select from '../../components/select'
import ProductCard from '../../components/productCard'
import '../../styles/products.css'
import ModalWrapper from '../../components/modalWrapper'
import { ICart, IPersonalizationDetails, IProduct, StoreKey } from '../../lib/types'
import PersonalisationForm from '../../components/personalisationForm'
import { CartContext } from '../../components/layout'
import { setStoreData } from '../../store'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../services/queries'


const Products: FC = () => {
    const [itemToAddToCart, setItemToAddToCart] = useState<IProduct>()
    const [showPersonalise, setShowPersonalise] = useState<boolean>(false)
    const {
        cart,
        showCart,
        currency,
        setCurrentPersonalDetails,
        setShowCart,
        setCart
    } = useContext(CartContext)

    const {loading, error, data} = useQuery(GET_PRODUCTS, {
        variables: { currency }
    })

    return (
        <>
            <section
                className=
                {`w-full ${(showPersonalise || showCart) && 'h-screen-70 overflow-y-hidden'}`}
            >
                <section className="filter-blck flex flex-col px-2rem">
                    <div>
                        <h1 className="light-txt font-30">
                            All Products
                        </h1>
                        <span className="light-txt font-16">
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
                    { loading
                        ? (<div>Loading</div>)
                        : (error)
                        ? (<div>Error</div>)
                        : (data?.products && data.products?.length > 0 )
                        ? data.products.map((product: IProduct) => {
                                function onPickItemForCart() {
                                    handlePickItemForCart(product)
                                }
                                return (<ProductCard
                                    key={product.id}
                                    product={product}
                                    onPickItemForCart={onPickItemForCart}
                                />)
                            })
                        :(<div>No data</div>)
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
                itm => itm.product.id === item.id
                    ? { ...itm, count: itm.count + 1}
                : itm
            )
            : cart.concat({ product: item, personalDetails: option, count: 1})

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