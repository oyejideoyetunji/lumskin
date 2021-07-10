import React, { FC, ReactNode } from 'react'
import '../../styles/modal.css'

interface ModalWrapperProps {
    className: string
    children: ReactNode
}

const ModalWrapper: FC<ModalWrapperProps> = (
    props: ModalWrapperProps
) => {

    return(
        <section className={`${props.className} modal`}>
            {props.children}
        </section>
    )
}

export default ModalWrapper
