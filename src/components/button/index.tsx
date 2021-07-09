import React, { ButtonHTMLAttributes, FC } from 'react';
import '../../styles/button.css'


const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
    props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
    return (
        <button {...props} />
    )
}

export default Button