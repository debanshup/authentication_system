import React from 'react'

const Navbar = ({ children }: any) => {
    return (
        <>
            <header className="p-2 text-end bg-light sticky-top shadow-sm">
                {children}
            </header>
        </>
    )
}

export default Navbar