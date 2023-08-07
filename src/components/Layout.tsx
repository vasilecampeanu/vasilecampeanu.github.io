import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode
    className?: string
    hideSeparator?: boolean
}

const Layout: FC<LayoutProps> = ({ children, className, hideSeparator }) => {
    return (
        <div className={className ? `page-layout ${className}` : 'page-layout'}>
            <Header hideSeparator={hideSeparator} />
            <main>
                <div className="main-inner-wrapper">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
