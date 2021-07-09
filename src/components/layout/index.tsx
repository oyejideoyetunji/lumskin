import React, { FC, ReactNode } from "react"
import Navbar from "../navbar"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main className="w-full container">
                {children}
            </main>
        </>
    )
}

export default Layout