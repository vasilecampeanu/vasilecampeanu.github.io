import { Inter } from 'next/font/google'
import { FC } from 'react'

import '@/styles/globals.scss'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
    children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    )
}

export default RootLayout;
