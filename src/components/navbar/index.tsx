import React, { FC } from "react"
import "../../styles/navbar.css"


const Navbar: FC = () => {
    return(
        <nav className="nav-wrp w-full flex items-center justify-between px-2rem">
            <div className="menu-icon">
                <p></p>
                <p></p>
                <p></p>
            </div>

            <div className="menu-items hidden items-center">
                <span className="small-text primary-text pr-2rem">Shop</span>
                <span className="small-text primary-text pr-2rem">Help</span>
                <span className="small-text primary-text pr-2rem">Blog</span>
            </div>

            <div>
                <span className="small-text primary-text">Account</span>
            </div>
        </nav>
    )
}

export default Navbar