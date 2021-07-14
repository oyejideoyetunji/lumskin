import React, { FC, HTMLAttributes } from 'react'
import '../../styles/modal.css'

const ModalWrapper: FC<HTMLAttributes<HTMLElement>> = (
    props: HTMLAttributes<HTMLElement>
) => {
    const { className, children, ...rest } = props
    return (
        <section className={`${className} modal`} {...rest} >
            {children}
        </section>
    )
}

export default ModalWrapper
