import React, { FC, ReactNode, useEffect, useState } from 'react'
import Navbar from '../navbar'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}: LayoutProps) => {
    const hasScrolled = () => window.scrollY > 70
    const [scrolled, setScrolled] = useState<boolean>(hasScrolled())

    useEffect(() => {
        let isMounted = true
        isMounted && window.addEventListener(
            'scroll', () => setScrolled(hasScrolled())
        )
        return () => {isMounted = false}
    }, [])

    return (
        <>
            <Navbar scrolled={scrolled} />
            <main className="w-full container">
                {children}
            </main>
        </>
    )
}

export default Layout