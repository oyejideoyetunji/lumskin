import React, { FC, useContext } from 'react';
import { IProduct } from '../../lib/types';
import { delimitNumber } from '../../lib/utils';
import '../../styles/productCard.css'
import Button from '../button';
import { CartContext } from '../layout';

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

    const { currency } = useContext(CartContext)

    return (
        <div className="flex flex-col items-center justify-end pd-card-wrp">
            <img src={product.image_url} alt={product.title} className="py-1rem" />
            <span className="small-text primary-text text-center">
                {product.title}
            </span>
            <span className="small-text primary-text text-center py-1rem">
                {`${currency} ${delimitNumber(product.price)}`}
            </span>
            <Button onClick={onPickItemForCart} className="white-text bg-brandGray">
                Add to Cart
            </Button>
        </div>
    )
}

export default ProductCard