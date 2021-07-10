import React, { FC } from 'react';
import { IProduct } from '../../lib/types';
import '../../styles/productCard.css'
import Button from '../button';

interface ProductCardProps {
    product: IProduct
    onPickItemForCart(): void
}

const ProductCard: FC<ProductCardProps> = (
    {
        product,
        onPickItemForCart
    }: ProductCardProps
) => {
    return (
        <div className="flex flex-col items-center pd-card-wrp">
            <img src={product.image_url} alt="" className="py-1rem" />
            <span className="small-text primary-text text-center">
                {product.title}
            </span>
            <span className="small-text primary-text text-center py-1rem">
                {product.price}
            </span>
            <Button onClick={onPickItemForCart} className="white-text bg-brandGray">
                Add to Cart
            </Button>
        </div>
    )
}

export default ProductCard