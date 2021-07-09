import React, { FC } from "react"
import "../../styles/products.css"


const Products: FC = () => {
    return (
        <section className="wrapper w-full px-2rem">
            <section className="w-full flex flex-col">
                <div>
                    <h1>All Products</h1>
                    <span className="small-text primary-text pr-2rem">
                        A 360 look at lumin
                    </span>
                </div>
            </section>
        </section>
    )
}

export default Products