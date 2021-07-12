import React, { FC, SelectHTMLAttributes } from 'react'
import '../../styles/forms.css'


const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = (
    props: SelectHTMLAttributes<HTMLSelectElement>
) => {
    const { className, ...rest } = props
    return (
        <select className={`bg-white ${className}`} {...rest} />
    )
}

export default Select
