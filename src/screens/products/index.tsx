import React, { FC, useState } from 'react'
import Select from '../../components/select'
import ProductCard from '../../components/productCard'
import '../../styles/products.css'
import ModalWrapper from '../../components/modalWrapper'
import { IPersonalizationDetails, IProduct, IStoreState } from '../../lib/types'
import PersonalisationForm from '../../components/personalisationForm'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../services/queries'
import LoadingCard from '../../components/loadingCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../reducers/cartReducers'
import { setShowCart, ShowCartActions } from '../../reducers/showCartReducer'
import { setPersonalDetails } from '../../reducers/personalizationReducer'


const Products: FC = () => {
    const { currency, showCart } = useSelector((state: IStoreState) => state)
    const dispatch = useDispatch()

    const [itemToAddToCart, setItemToAddToCart] = useState<IProduct>()
    const [showPersonalise, setShowPersonalise] = useState<boolean>(false)

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
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
                            A 360<sup>0</sup> look at lumin
                        </span>
                    </div>
                    <div className="py-2rem">
                        <Select defaultValue="Filter By">
                            <option disabled>Filter By</option>
                        </Select>
                    </div>
                </section>
                <section className="w-full product-grid bg-gray-3 flex flex-row flex-wrap">
                    {loading
                        ? (
                            <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </>
                        )
                        : (error)
                            ? (
                                <div
                                    className="w-full px-2rem h-300px danger-text flex items-center justify-center text-center"
                                >
                                    Oops!! an unexpected error has ocurred please try again.
                                </div>
                            )
                            : (data?.products?.length)
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
                                : (
                                    <div
                                        className="w-full px-2rem h-300px flex items-center justify-center text-center"
                                    >
                                        Currently unable to get the data you requested for.
                                    </div>
                                )
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
        dispatch(
            addItemToCart({ id: item.id, personalDetails: option})
        )
        option.length && dispatch(
            setPersonalDetails(option)
        )
    }

    function handleShowCart() {
        dispatch(
            setShowCart(ShowCartActions.show)
        )
    }
    function handleShowPersonalise() {
        setShowPersonalise && setShowPersonalise(true)
    }
    function handleClosePersonalise() {
        setShowPersonalise && setShowPersonalise(false)
    }
}

export default Products