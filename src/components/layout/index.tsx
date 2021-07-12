import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { CartData, ICart, IPersonalizationDetails, StoreKey } from '../../lib/types'
import ModalWrapper from '../../components/modalWrapper'
import { getStoreData } from '../../store'
import Navbar from '../navbar'
import Cart from '../../components/cart'

const defaultCartData: CartData = {
    cart: [],
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
    const [cart, setCart] = useState<ICart>([])
    const [showCart, setShowCart] = useState<boolean>(false)
    const [currentPersonalDetails, setCurrentPersonalDetails] = useState<
        IPersonalizationDetails[]
    >([])

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            setCart(getStoreData<ICart>(StoreKey.CART) || [])
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
                cart,
                showCart,
                currentPersonalDetails,
                setCart,
                setShowCart,
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
                    <Cart cart={cart} setCart={setCart} onClose={handleCloseCart} />
                </ModalWrapper>
            )}
        </CartContext.Provider>
    )

    function handleCloseCart() {
        setShowCart(false)
    }
}

export default Layout