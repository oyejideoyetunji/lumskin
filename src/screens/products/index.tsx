import React, { FC } from 'react'
import Select from '../../components/select'
import ProductCard from '../../components/productCard'
import '../../styles/products.css'

const productData = {
    id: 0,
    title: "Mordern Bathrom Pack",
    image_url: "https://cdn.shopify.com/s/files/1/2960/5204/products/classic-maintenance_1024x1024_1_1024x1024.png?v=1602810560",
    price: 123484,
    product_options: []
}


const Products: FC = () => {
    return (
        <section className="w-full">
            <section className="filter-blck flex flex-col px-2rem">
                <div>
                    <h1>All Products</h1>
                    <span className="small-text primary-text pr-2rem">
                        A 360 look at lumin
                    </span>
                </div>
                <div className="py-2rem">
                    <Select>
                        <option selected disabled>Filter By</option>
                    </Select>
                </div>
            </section>
            <section className="w-full product-grid bg-gray-3 flex flex-row flex-wrap">
                {
                    [ {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}].map(product => (
                        <ProductCard 
                            key={product.id}
                            product={productData}
                        />
                    ))
                }
            </section>
        </section>
    )
}

export default Products