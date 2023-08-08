import { FC } from 'react'

import Layout from '../components/layout/Layout'
import RecentlyPublished from '../components/features/RecentlyPublished'

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <Layout>
            <RecentlyPublished />
        </Layout>
    )
}

export default Home
