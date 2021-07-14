import React, { FC, useContext } from 'react'
import '../../styles/navbar.css'
import { ImageUrls } from '../assets/images/urls'
import { CartContext } from '../layout'

interface NavBarProps {
    scrolled: boolean
}

const Navbar: FC<NavBarProps> = ({ scrolled }: NavBarProps) => {

    const { cart, setShowCart } = useContext(CartContext)

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
        setShowCart && setShowCart(true)
    }
}

export default Navbar