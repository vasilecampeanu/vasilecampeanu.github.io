import { Inter } from 'next/font/google'
import { FC } from 'react'

import '../styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
    children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}

export default RootLayout;
