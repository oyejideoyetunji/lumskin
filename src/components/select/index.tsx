import React, { FC, SelectHTMLAttributes } from 'react'
import '../../styles/forms.css'


const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = (
    props: SelectHTMLAttributes<HTMLSelectElement>
) => {
    return (
        <select className="bg-white" {...props} />
    )
}

export default Select
