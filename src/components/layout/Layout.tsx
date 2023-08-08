import { FC } from "react";
import { Post } from "contentlayer/generated"

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode
    className?: string
    hideSeparator?: boolean
    post?: Post | undefined
}

const Layout: FC<LayoutProps> = ({ children, className, hideSeparator, post }) => {
    return (
        <div className={className ? `page-layout ${className}` : 'page-layout'}>
            <Header hideSeparator={hideSeparator} post={post}/>
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
