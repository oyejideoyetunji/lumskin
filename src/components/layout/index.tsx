import React, { FC, ReactNode, useEffect, useState } from 'react'
import { IStoreState } from '../../lib/types'
import ModalWrapper from '../../components/modalWrapper'
import Navbar from '../navbar'
import Cart from '../../components/cart'
import { useDispatch, useSelector } from 'react-redux'
import { setShowCart, ShowCartActions } from '../../reducers/showCartReducer'




interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}: LayoutProps) => {

    const { showCart } = useSelector((state: IStoreState) => state)
    const dispatch = useDispatch()

    const hasScrolled = () => window.scrollY > 70
    const [scrolled, setScrolled] = useState<boolean>(hasScrolled())

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            window.addEventListener(
                'scroll', () => setScrolled(hasScrolled())
            )
        }
        return () => { isMounted = false }
    }, [])

    return (
        <>
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
        </>
    )

    function handleCloseCart() {
        dispatch(
            setShowCart(ShowCartActions.hide)
        )
    }
}

export default Layout