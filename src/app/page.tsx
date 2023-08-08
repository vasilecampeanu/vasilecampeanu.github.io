import RecentlyPublished from '@/components/features/RecentlyPublished'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <Layout>
            <RecentlyPublished />
        </Layout>
    )
}

export default Home
