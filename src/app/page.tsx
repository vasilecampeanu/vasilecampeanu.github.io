import { FC } from 'react'

import Layout from '../components/layout/Layout'
import RecentlyPublished from '../components/features/RecentlyPublished'

interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => {
    return (
        <Layout className="home">
            <RecentlyPublished />
        </Layout>
    )
}

export default HomePage
