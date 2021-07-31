import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../../lib/types'
import { setShowCart, ShowCartActions } from '../../reducers/showCartReducer'
import '../../styles/navbar.css'
import { ImageUrls } from '../assets/images/urls'


interface NavBarProps {
    scrolled: boolean
}

const Navbar: FC<NavBarProps> = ({ scrolled }: NavBarProps) => {

    const { cart } = useSelector((state: IStoreState) => state)
    const dispatch = useDispatch()

    return (
        <nav
            className={
                `nav-wrp w-full flex items-center justify-between px-2rem ${scrolled ? 'bg-white' : 'bg-gray-1'}`
            }
        >
            <div className="menu-icon">
                <p></p>
                <p></p>
                <p></p>
            </div>

            <div className="menu-items hidden items-center">
                <div className="pr-3rem">
                    <img
                        src={ImageUrls.logo}
                        alt="Lumin brand logo"
                        className='logo-img'
                    />
                </div>
                <span className="small-text primary-text pr-2rem cursor-pointer">Shop</span>
                <span className="small-text primary-text pr-2rem cursor-pointer">Help</span>
                <span className="small-text primary-text pr-2rem cursor-pointer">Blog</span>
            </div>

            <div className="flex items-center">
                <span className="small-text primary-text">Account</span>
                <div onClick={onShowCart} className="flex items-start cursor-pointer">
                    <img
                        src={ImageUrls.cart}
                        alt=""
                        className="cart"
                    />
                    <span className="small-text primary-text">
                        {cart.length}
                    </span>
                </div>
            </div>
        </nav>
    )

    function onShowCart() {
        dispatch(
            setShowCart(ShowCartActions.show)
        )
    }
}

export default Navbar