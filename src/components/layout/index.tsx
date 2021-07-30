import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { CartData, IPersonalizationDetails, StoreKey } from '../../lib/types'
import ModalWrapper from '../../components/modalWrapper'
import { getStoreData } from '../../store'
import Navbar from '../navbar'
import Cart from '../../components/cart'

const defaultCartData: CartData = {
    currency: 'NGN',
    currentPersonalDetails: [],
    showCart: false,
}

export const CartContext = createContext<CartData>(defaultCartData)

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}: LayoutProps) => {
    const hasScrolled = () => window.scrollY > 70
    const [scrolled, setScrolled] = useState<boolean>(hasScrolled())
    const [currency, setCurrency] = useState('NGN')
    const [showCart, setShowCart] = useState<boolean>(false)
    const [currentPersonalDetails, setCurrentPersonalDetails] = useState<
        IPersonalizationDetails[]
    >([])

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            setCurrency(getStoreData<string>(StoreKey.CURRENCY) || 'NGN')
            setCurrentPersonalDetails(
                getStoreData<IPersonalizationDetails[]>(StoreKey.PERSONAL_DETAILS)
                || []
            )
            window.addEventListener(
                'scroll', () => setScrolled(hasScrolled())
            )
        }
        return () => { isMounted = false }
    }, [])

    return (
        <CartContext.Provider
            value={{
                showCart,
                currency,
                currentPersonalDetails,
                setShowCart,
                setCurrency,
                setCurrentPersonalDetails
            }}
        >
            <Navbar scrolled={scrolled} />
            <main className="w-full container">
                {children}
            </main>
            {showCart && (
                <ModalWrapper
                    className="fixed items-start justify-end bg-modal-light"
                >
                    <Cart onClose={handleCloseCart} />
                </ModalWrapper>
            )}
        </CartContext.Provider>
    )

    function handleCloseCart() {
        setShowCart(false)
    }
}

export default Layout